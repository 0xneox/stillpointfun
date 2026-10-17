import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { ALL_TOPICS, sortedPosts, type Topic } from "@/data/posts";

const searchSchema = z.object({
  topic: z
    .enum([
      "Non-Duality",
      "Philosophy",
      "Technology",
      "AI",
      "God & Shiva",
      "Life",
      "Truth",
    ])
    .optional(),
});

export const Route = createFileRoute("/teachings/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Teachings — The Still Point" },
      {
        name: "description",
        content:
          "A continuously unfolding library of writings, recordings, and pointers on non-dual wisdom.",
      },
      { property: "og:title", content: "Teachings — The Still Point" },
      {
        property: "og:description",
        content: "A continuously unfolding library of writings, recordings, and pointers.",
      },
      { property: "og:url", content: "/teachings" },
    ],
    links: [{ rel: "canonical", href: "/teachings" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { topic } = Route.useSearch();
  const posts = useMemo(() => {
    const all = sortedPosts();
    return topic ? all.filter((p) => p.topic === topic) : all;
  }, [topic]);

  return (
    <div>
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
          The Living Teachings
        </span>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance">
          A Continuously Unfolding Library
        </h1>
        <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed">
          Writings, recordings, and pointers on non-dual wisdom drawn from Advaita Vedanta, Kashmir
          Shaivism, and the direct path of Recognition.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          <FilterPill to="all" active={!topic} label="All" />
          {ALL_TOPICS.map((t) => (
            <FilterPill key={t} to={t} active={topic === t} label={t} />
          ))}
        </div>
      </header>

      <div className="container-editorial py-12 divide-y divide-border">
        {posts.length === 0 && (
          <p className="py-16 text-center opacity-50 font-mono text-xs uppercase tracking-widest">
            No teachings under this topic yet.
          </p>
        )}
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/teachings/$slug"
            params={{ slug: p.slug }}
            className="group grid grid-cols-12 gap-6 py-10 items-baseline"
          >
            <div className="col-span-12 md:col-span-2 font-mono text-[10px] tracking-widest uppercase opacity-50">
              {new Date(p.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-display text-3xl md:text-4xl group-hover:text-accent transition-colors leading-tight text-balance">
                {p.title}
              </h2>
              <p className="mt-3 opacity-70 max-w-2xl leading-relaxed">{p.excerpt}</p>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right font-mono text-[10px] tracking-widest uppercase opacity-50">
              {p.topic} · {p.readMinutes} min
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterPill({ to, active, label }: { to: Topic | "all"; active: boolean; label: string }) {
  return (
    <Link
      to="/teachings"
      search={to === "all" ? {} : { topic: to }}
      className={`px-4 py-2 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "border-border hover:bg-foreground hover:text-background"
      }`}
    >
      {label}
    </Link>
  );
}
