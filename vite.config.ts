import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";
import { assertLaunchMetadata, validateContentRegistry } from "./scripts/content-registry.mjs";

const publicLibraryModuleId = "virtual:stillpoint-public-library";
const resolvedPublicLibraryModuleId = `\0${publicLibraryModuleId}`;
const contentRegistryModuleId = "virtual:stillpoint-content-registry";
const resolvedContentRegistryModuleId = `\0${contentRegistryModuleId}`;

interface SourceLibraryManifestItem {
  action: "host" | "link_out" | "remove" | "verify";
  rights_status:
    | "public_domain_likely"
    | "in_copyright_likely"
    | "unknown"
    | "open_access_possible"
    | "verified_cleared";
  source_url: string | null;
  license: string | null;
  file_name: string | null;
  reviewer: string | null;
}

interface SourceLibraryManifest {
  shelves: string[];
  items: SourceLibraryManifestItem[];
}

function publicLibraryManifestPlugin(): Plugin {
  return {
    name: "public-library-manifest",
    resolveId(id) {
      return id === publicLibraryModuleId ? resolvedPublicLibraryModuleId : null;
    },
    load(id) {
      if (id !== resolvedPublicLibraryModuleId) return null;

      const manifestPath = path.resolve(process.cwd(), "content", "library", "manifest.json");
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as SourceLibraryManifest;
      const items = manifest.items.filter(
        (item) =>
          (item.action === "host" &&
            (item.rights_status === "verified_cleared" ||
              item.rights_status === "public_domain_likely") &&
            Boolean(item.source_url?.trim()) &&
            Boolean(item.license?.trim()) &&
            Boolean(item.reviewer?.trim()) &&
            !["verify", "unknown", "unverified"].includes(
              item.license?.trim().toLowerCase() ?? "",
            ) &&
            Boolean(item.file_name?.trim())) ||
          (item.action === "link_out" && Boolean(item.source_url?.trim())),
      );

      return `export default ${JSON.stringify({ shelves: manifest.shelves, items })};`;
    },
  };
}

function contentRegistryPlugin(publicLaunch: boolean): Plugin {
  const loadRegistry = () => {
    assertLaunchMetadata(publicLaunch, !publicLaunch);
    const registry = validateContentRegistry(process.cwd(), { publicLaunch });
    if (registry.issues.length > 0) {
      throw new Error(`Content registry validation failed:\n- ${registry.issues.join("\n- ")}`);
    }
    return registry;
  };

  return {
    name: "stillpoint-content-registry",
    resolveId(id) {
      return id === contentRegistryModuleId ? resolvedContentRegistryModuleId : null;
    },
    buildStart() {
      const registry = loadRegistry();
      for (const item of registry.all) {
        this.addWatchFile(path.resolve(process.cwd(), item.source_path));
      }
      this.addWatchFile(path.resolve(process.cwd(), "content", "content-types.yml"));
    },
    load(id) {
      if (id !== resolvedContentRegistryModuleId) return null;
      const registry = loadRegistry();
      for (const warning of registry.warnings) this.warn(warning);
      const pathSteps = registry.published
        .filter((item) => item.type === "path_step")
        .sort((a, b) => Number(a.order) - Number(b.order));
      return `export default ${JSON.stringify({
        items: registry.published,
        pathSteps,
        navSections: registry.navSections,
      })};`;
    },
  };
}

function localMediaDevServerPlugin(): Plugin {
  return {
    name: "local-media-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // 1. Audiobooks
        if (req.url?.startsWith("/audiobook/")) {
          const rawUrl = req.url.replace(/^\/audiobook\//, "").split("?")[0];
          const decodedPath = decodeURIComponent(rawUrl);
          const audiobooksRoot = path.resolve(process.cwd(), "audiobook");
          const filePath = path.resolve(audiobooksRoot, decodedPath);

          if (!filePath.startsWith(audiobooksRoot) || !fs.existsSync(filePath)) {
            return next();
          }

          const stat = fs.statSync(filePath);
          if (!stat.isFile()) {
            return next();
          }

          const range = req.headers.range;
          const totalSize = stat.size;

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
            const chunkSize = end - start + 1;

            res.writeHead(206, {
              "Content-Range": `bytes ${start}-${end}/${totalSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize,
              "Content-Type": "audio/mpeg",
            });

            fs.createReadStream(filePath, { start, end }).pipe(res);
          } else {
            res.writeHead(200, {
              "Content-Length": totalSize,
              "Accept-Ranges": "bytes",
              "Content-Type": "audio/mpeg",
            });
            fs.createReadStream(filePath).pipe(res);
          }
          return;
        }

        // 2. Library PDFs
        if (req.url && /^\/library\//i.test(req.url)) {
          const rawUrl = req.url.replace(/^\/library\//i, "").split("?")[0];
          const decodedPath = decodeURIComponent(rawUrl);
          const libraryRoot = path.resolve(process.cwd(), "Library");
          const filePath = path.resolve(libraryRoot, decodedPath);

          if (!filePath.startsWith(libraryRoot) || !fs.existsSync(filePath)) {
            return next();
          }

          const stat = fs.statSync(filePath);
          if (!stat.isFile()) {
            return next();
          }

          res.writeHead(200, {
            "Content-Length": stat.size,
            "Accept-Ranges": "bytes",
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${encodeURIComponent(path.basename(filePath))}"`,
          });

          fs.createReadStream(filePath).pipe(res);
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  const envFile = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

  const publicLaunch = process.env.PUBLIC_LAUNCH === "true";
  const siteUrl = (process.env.SITE_URL ?? "https://stillpoint.fun").replace(/\/+$/, "");
  return {
    define: {
      __PUBLIC_LAUNCH__: JSON.stringify(publicLaunch),
      __MEDIA_BASE_URL__: JSON.stringify(process.env.MEDIA_BASE_URL ?? ""),
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    plugins: [
      publicLibraryManifestPlugin(),
      contentRegistryPlugin(publicLaunch),
      localMediaDevServerPlugin(),
    ],
    tanstackStart: {
      server: { entry: "server" },
    },
    nitro: {
      preset: "vercel",
      routeRules: publicLaunch
        ? {}
        : {
            "/**": {
              headers: {
                "X-Robots-Tag": "noindex, nofollow",
              },
            },
          },
    },
  };
});
