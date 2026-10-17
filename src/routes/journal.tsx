import { createFileRoute, Link } from "@tanstack/react-router";
import { POSTS } from "@/data/posts";
import { CONTENT } from "@/data/content";

export const Route = createFileRoute("/journal")({
  component: Journal,
});

function Journal() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">JOURNAL</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Original Writing
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
              className="px-4 py-2 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-16">
          {POSTS.map((post) => (
            <Link key={post.slug} to="/teachings/$slug" params={{ slug: post.slug }} className="block group">
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
                  post.tags.some((tag) =>
                    CONTENT.some((c) => c.tags.includes(tag.toLowerCase())),
                  ) && (
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-4">
                      Related Audio
                    </p>
                    <div className="space-y-2">
                      {CONTENT.filter((c) =>
                        post.tags?.some((tag) => c.tags.includes(tag.toLowerCase())),
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
              On Sources and Attribution
            </p>
            <p>
              Original essays are distinguished from curated materials. Quotations, translations,
              and historical references are sourced where possible. This is not a project of
              fabrication — it is a project of honest inquiry and proper attribution.
            </p>
            <p>
              Philosophical positions are presented as such, not as absolute truth. Different
              traditions offer different perspectives. The reader is invited to explore, question,
              and discover for themselves.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
