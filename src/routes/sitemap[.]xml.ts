import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { POSTS } from "@/data/posts";
import { PUBLISHED_CONTENT, PUBLISHED_PATH_STEPS } from "@/data/content-registry";
import { siteUrl } from "@/lib/site-url";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/library", changefreq: "weekly", priority: "0.8" },
          { path: "/journal", changefreq: "weekly", priority: "0.8" },
          { path: "/discourses", changefreq: "weekly", priority: "0.8" },
          { path: "/writings", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
          ...(PUBLISHED_PATH_STEPS.length > 0
            ? [
                { path: "/path", changefreq: "monthly" as const, priority: "0.8" },
                ...PUBLISHED_PATH_STEPS.map((step) => ({
                  path: `/path/${step.id}`,
                  lastmod: step.updated_at,
                  changefreq: "monthly" as const,
                  priority: "0.7",
                })),
              ]
            : []),
          ...(PUBLISHED_CONTENT.some((item) => ["practice", "mantra"].includes(item.type))
            ? [{ path: "/practice", changefreq: "monthly" as const, priority: "0.7" }]
            : []),
          ...(PUBLISHED_CONTENT.some((item) => item.type === "log")
            ? [{ path: "/log", changefreq: "weekly" as const, priority: "0.5" }]
            : []),
          ...POSTS.map((post) => ({
            path: `/teachings/${post.slug}`,
            lastmod: post.date,
            changefreq: "yearly" as const,
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${siteUrl(e.path)}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
