import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ContentEditorNote } from "@/components/ContentEditorNote";
import { LIBRARY_ITEMS } from "@/data/library";
import {
  PUBLISHED_CONTENT,
  PUBLISHED_PATH_STEPS,
  contentVersionLabel,
  type ContentEntry,
} from "@/data/content-registry";
import { siteUrl } from "@/lib/site-url";

interface StepPractice {
  name: string;
  instructions: string;
  duration: string;
  posture: string;
  requires_teacher: boolean | null;
}

interface PathStep extends ContentEntry {
  order: number;
  practice: StepPractice | null;
  safety_notes: string;
  common_confusions: string[];
  linked_sources: string[];
  linked_mantras: string[];
  linked_practices: string[];
  needs_author_review: boolean;
}

export const Route = createFileRoute("/path/$slug")({
  loader: ({ params }): PathStep => {
    const step = PUBLISHED_PATH_STEPS.find((entry) => entry.id === params.slug);
    if (!step) throw notFound();
    return step as PathStep;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Path step"} — Stillpoint` },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
    links: [{ rel: "canonical", href: siteUrl(`/path/${loaderData?.id ?? ""}`) }],
  }),
  notFoundComponent: () => (
    <section className="container-editorial py-32">
      <h1 className="font-display italic text-5xl">Path step not found</h1>
      <Link to="/path" className="mt-8 inline-block text-accent underline">
        Return to the Path
      </Link>
    </section>
  ),
  component: PathStepPage,
});

function PathStepPage() {
  const step = Route.useLoaderData();
  const confusion = Array.isArray(step.common_confusions) ? step.common_confusions : [];
  const linkedSources = step.linked_sources.flatMap((id) => {
    const item = LIBRARY_ITEMS.find((candidate) => candidate.id === id);
    return item && (item.action === "host" || item.action === "link_out") ? [item] : [];
  });
  const relatedContent = [...step.linked_practices, ...step.linked_mantras]
    .map((id) => PUBLISHED_CONTENT.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <article className="container-editorial py-20">
      <header className="max-w-3xl mx-auto border-b border-border pb-10">
        <Link to="/path" className="font-mono text-[10px] tracking-widest uppercase opacity-50">
          The Path
        </Link>
        <p className="mt-8 font-mono text-xs opacity-50">
          STEP {String(step.order).padStart(2, "0")}
        </p>
        <h1 className="font-display italic text-5xl md:text-7xl mt-3">{step.title}</h1>
        <p className="mt-5 text-sm text-muted-foreground">{step.summary}</p>
        <p className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-50">
          {contentVersionLabel(step)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Epistemic label: {step.epistemic_label}
        </p>
        {step.ai_assisted && (
          <p className="mt-3 inline-block border border-border px-3 py-1 text-xs">
            {String(step.ai_assisted_label ?? "AI-assisted content")}
          </p>
        )}
      </header>

      <div className="max-w-3xl mx-auto py-12">
        <div className="prose prose-invert max-w-none leading-relaxed">
          <ReactMarkdown>{step.body}</ReactMarkdown>
        </div>
        <ContentEditorNote note={step.editor_note} />

        {step.practice && (
          <>
            <aside
              className="my-10 border border-amber-500/40 bg-amber-500/5 p-6"
              aria-label="Safety notes"
            >
              <h2 className="font-mono text-xs tracking-widest uppercase">Safety notes</h2>
              <p className="mt-3 text-sm leading-relaxed">{step.safety_notes}</p>
            </aside>
            <section className="border-t border-border pt-8">
              <h2 className="font-display text-3xl">Practice</h2>
              <h3 className="mt-5 font-medium">{step.practice.name}</h3>
              <div className="prose prose-invert max-w-none mt-4">
                <ReactMarkdown>{step.practice.instructions}</ReactMarkdown>
              </div>
              <dl className="mt-6 grid gap-3 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase opacity-50">Duration</dt>
                  <dd>{step.practice.duration}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase opacity-50">Posture</dt>
                  <dd>{step.practice.posture}</dd>
                </div>
                {step.practice.requires_teacher !== null && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase opacity-50">Teacher</dt>
                    <dd>{step.practice.requires_teacher ? "Required" : "Not required"}</dd>
                  </div>
                )}
              </dl>
            </section>
          </>
        )}

        {confusion.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-3xl">Common confusions</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {confusion.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {linkedSources.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-3xl">Linked sources</h2>
            <ul className="mt-4 space-y-3">
              {linkedSources.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.action === "host" ? source.downloadUrl : source.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-accent"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedContent.length > 0 && (
          <section className="mt-12 border-t border-border pt-8">
            <h2 className="font-display text-3xl">Related practice and mantras</h2>
            <ul className="mt-4 space-y-3">
              {relatedContent.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/practice#${encodeURIComponent(item.id)}`}
                    className="underline underline-offset-4 hover:text-accent"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Version history</h2>
          <ol className="mt-4 space-y-3">
            {step.changelog.map((entry) => (
              <li key={`${entry.version}-${entry.date}`} className="text-sm">
                <span className="font-mono">
                  v{entry.version} · {entry.date}
                </span>
                <p className="mt-1 text-muted-foreground">{entry.note}</p>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-12 flex flex-wrap gap-6 border-t border-border pt-8 text-sm">
          <a
            href={`https://github.com/0xneox/beyond-the-veil-dev/edit/main/${step.source_path}`}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Edit this page
          </a>
          <a
            href={`mailto:TODO@example.com?subject=${encodeURIComponent(`Error report: ${step.title}`)}`}
            className="underline underline-offset-4"
          >
            Report an error
          </a>
        </footer>
      </div>
    </article>
  );
}
