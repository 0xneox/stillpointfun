import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const publicLaunch = __PUBLIC_LAUNCH__;
        const content = publicLaunch
          ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl("/sitemap.xml")}\n`
          : "User-agent: *\nDisallow: /\n";

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
