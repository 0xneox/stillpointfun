import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
// import { WalletProvider } from "@/components/WalletProvider"; // Temporarily disabled due to dependency issue

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display italic text-7xl">404</h1>
        <p className="mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60">
          This page is not (yet) here.
        </p>
        <a href="/" className="mt-8 inline-block font-mono text-[11px] tracking-widest uppercase text-accent link-underline">
          Return to the still point
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display italic text-4xl">Something did not resolve.</h1>
        <p className="mt-4 text-sm opacity-70">Try again, or return home.</p>
        <div className="mt-8 flex justify-center gap-6 font-mono text-[11px] tracking-widest uppercase">
          <button onClick={() => { router.invalidate(); reset(); }} className="text-accent link-underline">Try again</button>
          <a href="/" className="link-underline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Still Point — Writings on Non-Duality, AI & Consciousness" },
      { name: "description", content: "A quiet notebook at the intersection of non-duality, philosophy, technology, crypto, AI, and Shiva. Writings, photography, and work by a writer and builder." },
      { name: "author", content: "The Still Point" },
      { property: "og:site_name", content: "The Still Point" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "The Still Point" },
      { property: "og:description", content: "Writings on non-duality, philosophy, technology, and the search for truth." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
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
                var d = s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
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
  return (
    <QueryClientProvider client={queryClient}>
      {/* <WalletProvider> */}
        <SiteNav />
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
        <SiteFooter />
      {/* </WalletProvider> */}
    </QueryClientProvider>
  );
}
