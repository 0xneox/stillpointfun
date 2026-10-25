import { createFileRoute } from "@tanstack/react-router";
import { ContentEditorNote } from "@/components/ContentEditorNote";
import { PUBLISHED_CONTENT, contentVersionLabel } from "@/data/content-registry";
import { siteUrl } from "@/lib/site-url";

const stages = ["Now", "Next", "Not yet"] as const;

export const Route = createFileRoute("/log")({
  head: () => ({
    meta: [
      { title: "Build Log — Stillpoint" },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/log") }],
  }),
  component: BuildLog,
});

function BuildLog() {
  const entries = PUBLISHED_CONTENT.filter((item) => item.type === "log");

  return (
    <section className="container-editorial py-24">
      <header className="border-b border-border pb-10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Build in public
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6">Log</h1>
      </header>
      <div className="grid gap-12 py-12 md:grid-cols-3">
        {stages.map((stage) => {
          const stageEntries = entries.filter((entry) => entry.stage === stage);
          return (
            <section
              key={stage}
              aria-labelledby={`log-${stage.toLowerCase().replaceAll(" ", "-")}`}
            >
              <h2
                id={`log-${stage.toLowerCase().replaceAll(" ", "-")}`}
                className="font-display text-3xl"
              >
                {stage}
              </h2>
              {stageEntries.length === 0 ? (
                <p className="mt-5 text-sm text-muted-foreground">No published entries.</p>
              ) : (
                <ol className="mt-5 space-y-6">
                  {stageEntries.map((entry) => (
                    <li key={entry.id} className="border-t border-border pt-4">
                      <h3 className="font-medium">{entry.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed">{entry.body}</p>
                      <ContentEditorNote note={entry.editor_note} />
                      <p className="mt-3 font-mono text-[10px] tracking-widest uppercase opacity-50">
                        {contentVersionLabel(entry)}
                      </p>
                      <p className="mt-2 text-xs">Epistemic label: {entry.epistemic_label}</p>
                      {entry.ai_assisted && (
                        <p className="mt-2 inline-block border border-border px-3 py-1 text-xs">
                          {String(entry.ai_assisted_label ?? "AI-assisted content")}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
