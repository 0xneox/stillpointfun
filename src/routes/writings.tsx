import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/data/posts";
import { CONTENT } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-url";

import { useState, useMemo } from "react";

export const Route = createFileRoute("/writings")({
  head: () => ({
    meta: [
      { title: "Writings & Philosophical Essays — Stillpoint" },
      {
        name: "description",
        content:
          "Original essays, contemplative reflections, and exploratory writings on consciousness, philosophy, Advaita, Kashmir Shaivism, and the modern mind.",
      },
      { property: "og:title", content: "Writings & Philosophical Essays — Stillpoint" },
      {
        property: "og:description",
        content:
          "Original essays and reflections on consciousness, philosophy, tradition, and the encounter between the ancient and the contemporary.",
      },
      { property: "og:url", content: siteUrl("/writings") },
      { property: "og:type", content: "website" },
      { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: siteUrl("/writings") }],
  }),
  component: Writings,
});

function Writings() {
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    if (selectedTopic === "All") return POSTS;
    return POSTS.filter((post) => post.topic === selectedTopic);
  }, [selectedTopic]);

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <Breadcrumbs items={[{ label: "Writings" }]} />
        <div className="text-center space-y-6 mb-16 pt-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">WRITINGS</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Original Writings
          </h1>
          <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto">
            Essays and reflections on consciousness, philosophy, tradition, and the encounter
            between the ancient and the contemporary.
          </p>
        </div>

        {/* Topics Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {[
            "All",
            "Non-Duality",
            "Philosophy",
            "Technology",
            "AI",
            "God & Shiva",
            "Life",
            "Truth",
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 border font-mono text-[10px] tracking-widest uppercase transition-all ${
                selectedTopic === topic
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground hover:bg-foreground/5"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-16">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              to="/teachings/$slug"
              params={{ slug: post.slug }}
              className="block group"
            >
              <article className="border-b border-border pb-12 group-hover:border-accent transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded">
                    {post.topic}
                  </span>
                  <span className="font-mono text-xs opacity-50">{post.date}</span>
                  <span className="font-mono text-xs opacity-50">{post.readMinutes} min read</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="font-sans text-base opacity-70 leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>
                <div className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                  Read →
                </div>

                {/* Related Audio */}
                {post.tags &&
                  post.tags.some((tag: string) =>
                    CONTENT.some((c) => c.tags.includes(tag.toLowerCase())),
                  ) && (
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4">
                        Related Audio
                      </p>
                      <div className="space-y-2">
                        {CONTENT.filter((c) =>
                          post.tags?.some((tag: string) => c.tags.includes(tag.toLowerCase())),
                        )
                          .slice(0, 2)
                          .map((audio) => (
                            <Link
                              key={audio.id}
                              to="/listen/$id"
                              params={{ id: audio.id }}
                              className="block text-sm opacity-60 hover:opacity-100 hover:text-accent transition-all"
                            >
                              {audio.title} · {audio.artist_or_speaker}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
              </article>
            </Link>
          ))}
        </div>

        {/* Note on Sources */}
        <section className="mt-24 pt-12 border-t border-border">
          <div className="space-y-4 text-sm opacity-60 leading-relaxed">
            <p className="font-mono text-[10px] tracking-widest uppercase">
              On Sources and Inquiry
            </p>
            <p>
              These essays emerge from direct contemplation and cross-traditional inquiry. They are
              not academic papers, nor dogmatic assertions, but pointers toward understanding.
            </p>
            <p>
              Primary sources and traditional translations are linked where relevant. Readers are
              encouraged to investigate primary texts directly.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
