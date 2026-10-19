import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

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
  return {
    define: {
      __PUBLIC_LAUNCH__: JSON.stringify(publicLaunch),
      __MEDIA_BASE_URL__: JSON.stringify(process.env.MEDIA_BASE_URL ?? ""),
    },
    plugins: [localMediaDevServerPlugin()],
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
