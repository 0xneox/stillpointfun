import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ContentEditorNote } from "@/components/ContentEditorNote";
import { PUBLISHED_CONTENT, contentVersionLabel, type ContentEntry } from "@/data/content-registry";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Practice — Stillpoint" },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/practice") }],
  }),
  component: PracticeIndex,
});

function PracticeIndex() {
  const groups = useMemo(() => {
    const entries = PUBLISHED_CONTENT.filter((item) => ["practice", "mantra"].includes(item.type));
    const grouped = new Map<string, ContentEntry[]>();
    for (const item of entries) {
      const tradition = String(item.tradition ?? "Tradition not specified");
      grouped.set(tradition, [...(grouped.get(tradition) ?? []), item]);
    }
    return [...grouped.entries()].sort(([left], [right]) => left.localeCompare(right));
  }, []);

  return (
    <section className="container-editorial py-24">
      <header className="border-b border-border pb-10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          Practice
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6">Practices & mantras</h1>
      </header>
      {groups.length === 0 ? (
        <p className="py-16 text-muted-foreground">No practices or mantras are published yet.</p>
      ) : (
        <div className="space-y-16 py-12">
          {groups.map(([tradition, entries]) => (
            <section key={tradition}>
              <h2 className="font-display text-3xl">{tradition}</h2>
              <div className="mt-6 space-y-8">
                {entries.map((entry) => (
                  <article id={entry.id} key={entry.id} className="border-t border-border pt-6">
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                      {entry.type}
                    </p>
                    <h3 className="font-display text-2xl mt-2">{entry.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                    <p className="mt-3 font-mono text-[10px] tracking-widest uppercase opacity-50">
                      {contentVersionLabel(entry)}
                    </p>
                    <p className="mt-3 text-xs">Epistemic label: {entry.epistemic_label}</p>
                    <ContentEditorNote note={entry.editor_note} />
                    {entry.ai_assisted && (
                      <p className="mt-2 inline-block border border-border px-3 py-1 text-xs">
                        {String(entry.ai_assisted_label ?? "AI-assisted content")}
                      </p>
                    )}
                    {entry.type === "mantra" && entry.initiation_status !== "open" && (
                      <p className="mt-4 border border-border p-4 text-sm">
                        Traditionally received from a teacher.
                      </p>
                    )}
                    {entry.type === "mantra" && entry.pronunciation_reviewed_by == null && (
                      <p className="mt-3 text-sm font-medium">Unreviewed pronunciation</p>
                    )}
                    {entry.type === "mantra" && entry.translation_source ? (
                      <p className="mt-3 text-sm">
                        Translation source: {String(entry.translation_source)}
                      </p>
                    ) : null}
                    {entry.type === "practice" && (
                      <>
                        <aside className="mt-5 border border-amber-500/40 bg-amber-500/5 p-5">
                          <h4 className="font-mono text-xs tracking-widest uppercase">
                            Safety notes
                          </h4>
                          <p className="mt-2 text-sm">{String(entry.safety_notes ?? "")}</p>
                        </aside>
                        <div className="prose prose-invert max-w-none mt-5">
                          <ReactMarkdown>{String(entry.instructions ?? entry.body)}</ReactMarkdown>
                        </div>
                      </>
                    )}
                    {entry.type === "mantra" && (
                      <div className="mt-5 space-y-3">
                        {entry.sanskrit_devanagari ? (
                          <p lang="sa">{String(entry.sanskrit_devanagari)}</p>
                        ) : null}
                        {entry.sanskrit_iast ? <p>{String(entry.sanskrit_iast)}</p> : null}
                        {entry.translation ? <p>{String(entry.translation)}</p> : null}
                        {entry.safety_notes ? (
                          <p className="border border-amber-500/40 p-4 text-sm">
                            {String(entry.safety_notes)}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
