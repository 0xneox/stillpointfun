import { createFileRoute, Link } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";
import { PUBLISHED_PATH_STEPS, contentVersionLabel } from "@/data/content-registry";

export const Route = createFileRoute("/path/")({
  head: () => ({
    meta: [
      { title: "The Path — Stillpoint" },
      { name: "description", content: "Published steps in the Stillpoint Path." },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/path") }],
  }),
  component: PathIndex,
});

function PathIndex() {
  return (
    <section className="container-editorial py-24">
      <header className="border-b border-border pb-10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          The Path
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6">A field guide</h1>
      </header>
      {PUBLISHED_PATH_STEPS.length === 0 ? (
        <p className="py-16 text-muted-foreground">No Path steps are published yet.</p>
      ) : (
        <ol className="divide-y divide-border">
          {PUBLISHED_PATH_STEPS.map((step) => (
            <li key={step.id} className="py-8">
              <Link
                to="/path/$slug"
                params={{ slug: step.id }}
                className="group block hover:text-accent transition-colors"
              >
                <span className="font-mono text-xs opacity-50">
                  {String(step.order).padStart(2, "0")}
                </span>
                <h2 className="font-display text-3xl mt-2">{step.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {step.summary}
                </p>
                <p className="mt-3 text-xs">Epistemic label: {step.epistemic_label}</p>
                {step.ai_assisted && (
                  <p className="mt-2 inline-block border border-border px-3 py-1 text-xs">
                    {String(step.ai_assisted_label ?? "AI-assisted content")}
                  </p>
                )}
              </Link>
              <p className="mt-3 font-mono text-[10px] tracking-widest uppercase opacity-50">
                {contentVersionLabel(step)}
              </p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
