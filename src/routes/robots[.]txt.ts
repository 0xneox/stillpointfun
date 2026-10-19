import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const content =
          process.env.PUBLIC_LAUNCH === "true"
            ? "User-agent: *\nAllow: /\n"
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
