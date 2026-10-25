import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { FOUNDER_PAGE } from "@/data/content-registry";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — Stillpoint" },
      { name: "description", content: "Founder page template." },
      { property: "og:title", content: "Founder — Stillpoint" },
      { property: "og:description", content: "Founder page template." },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
      { property: "og:url", content: siteUrl("/founder") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/founder") }],
  }),
  component: Founder,
});

function Founder() {
  const pageTitle =
    typeof FOUNDER_PAGE?.data.title === "string" ? FOUNDER_PAGE.data.title : "Founder";

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          {pageTitle}
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
          {pageTitle}
        </h1>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="prose prose-invert max-w-none text-lg leading-[1.7]">
          {FOUNDER_PAGE ? <ReactMarkdown>{FOUNDER_PAGE.body}</ReactMarkdown> : null}
        </div>
      </section>
    </div>
  );
}
