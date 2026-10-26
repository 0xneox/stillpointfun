import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { StillpointNav } from "@/components/StillpointNav";
import { SiteFooter } from "@/components/SiteFooter";
import { BottomPlayer } from "@/components/BottomPlayer";
import { NotFound } from "@/components/NotFound";
import { ErrorState } from "@/components/ErrorState";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CONTENT } from "@/data/content";
import { siteUrl } from "@/lib/site-url";

function NotFoundComponent() {
  return <NotFound />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <ErrorState
      title="Something did not resolve"
      message="An unexpected error occurred. Please try again or return home."
      action={{
        label: "Try again",
        to: "/",
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stillpoint — Listen. Read. Question." },
      {
        name: "description",
        content:
          "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry.",
      },
      {
        name: "keywords",
        content:
          "consciousness, philosophy, non-duality, Advaita, Kashmir Shaivism, Vedanta, meditation, contemplation, wisdom, inquiry",
      },
      { name: "author", content: "Stillpoint" },
      { property: "og:site_name", content: "Stillpoint" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Stillpoint — Listen. Read. Question." },
      {
        property: "og:description",
        content:
          "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom.",
      },
      { property: "og:url", content: siteUrl("/") },
      { property: "og:image", content: siteUrl("/og-image.png") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Stillpoint — Listen. Read. Question." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Stillpoint — Listen. Read. Question." },
      {
        name: "twitter:description",
        content:
          "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom.",
      },
      { name: "twitter:image", content: siteUrl("/og-image.png") },
      { name: "twitter:image:alt", content: "Stillpoint — Listen. Read. Question." },
      {
        name: "robots",
        content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow",
      },
      {
        name: "googlebot",
        content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "canonical", href: siteUrl("/") },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Stillpoint",
          url: siteUrl("/"),
          description:
            "An independent, open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry.",
          potentialAction: {
            "@type": "SearchAction",
            target: siteUrl("/search?q={search_term_string}"),
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Stillpoint",
          url: siteUrl("/"),
          description:
            "An independent, open-source project for listening, inquiry, and the exploration of consciousness.",
          sameAs: ["https://github.com/0xneox"],
          foundingDate: "2026",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var s = localStorage.getItem('sp-theme');
                var d = s ? s === 'dark' : true;
                if (d) document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = d ? 'dark' : 'light';
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [lastPlayedId] = useLocalStorage<string>("stillpoint-last-played", "");
  const currentItem = CONTENT.find((c) => c.id === lastPlayedId);

  return (
    <QueryClientProvider client={queryClient}>
      <StillpointNav />
      <main className="min-h-[60vh] pb-32">
        <Outlet />
      </main>
      <SiteFooter />
      {currentItem && <BottomPlayer currentItem={currentItem} />}
    </QueryClientProvider>
  );
}
