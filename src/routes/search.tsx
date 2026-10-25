import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";
import { LIBRARY_ITEMS } from "@/data/library";
import { siteUrl } from "@/lib/site-url";

interface SearchParams {
  q?: string;
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      q: typeof search.q === "string" ? search.q : "",
    };
  },
  head: () => ({
    meta: [
      { title: "Search — Stillpoint" },
      { name: "description", content: "Search audio recordings, texts, writings, and discourses on Stillpoint." },
      { property: "og:title", content: "Search — Stillpoint" },
      { property: "og:description", content: "Search audio recordings, texts, writings, and discourses on Stillpoint." },
      { property: "og:url", content: siteUrl("/search") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/search") }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ = "" } = Route.useSearch();
  const [query, setQuery] = useState(initialQ);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return { audio: [], posts: [], books: [] };

    const audio = CONTENT.filter(
      (item) =>
        item.title.toLowerCase().includes(trimmed) ||
        item.artist_or_speaker.toLowerCase().includes(trimmed) ||
        item.channel.toLowerCase().includes(trimmed) ||
        item.tags.some((tag) => tag.toLowerCase().includes(trimmed)),
    ).slice(0, 15);

    const posts = POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(trimmed) ||
        post.excerpt.toLowerCase().includes(trimmed) ||
        post.topic.toLowerCase().includes(trimmed) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(trimmed)),
    ).slice(0, 15);

    const books = LIBRARY_ITEMS.filter(
      (book) =>
        book.title.toLowerCase().includes(trimmed) ||
        book.author.toLowerCase().includes(trimmed) ||
        book.category?.toLowerCase().includes(trimmed) ||
        book.description?.toLowerCase().includes(trimmed),
    ).slice(0, 15);

    return { audio, posts, books };
  }, [trimmed]);

  const totalResults = results.audio.length + results.posts.length + results.books.length;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Breadcrumbs items={[{ label: "Search" }]} />

        <div className="text-center space-y-6 mb-12 pt-4">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">ARCHIVES</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Search Stillpoint
          </h1>
          <p className="font-sans text-lg opacity-70 max-w-xl mx-auto">
            Find talks, written teachings, and library texts across all collections.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, teacher, tradition, or topic..."
              className="w-full px-5 py-4 bg-surface border border-border focus:border-accent outline-none font-sans text-base placeholder:text-muted-foreground/60 transition-colors"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs opacity-50 hover:opacity-100"
              >
                Clear
              </button>
            )}
          </div>
          {trimmed && (
            <p className="mt-3 font-mono text-xs opacity-50 text-right">
              {totalResults} {totalResults === 1 ? "result" : "results"} found
            </p>
          )}
        </div>

        {/* Results */}
        {trimmed && totalResults === 0 && (
          <div className="text-center py-16 opacity-60 font-sans">
            No entries found for &ldquo;{query}&rdquo;. Try another word or view the{" "}
            <Link to="/library" className="underline hover:text-accent">
              Library
            </Link>{" "}
            or{" "}
            <Link to="/discourses" className="underline hover:text-accent">
              Discourses
            </Link>
            .
          </div>
        )}

        <div className="space-y-16">
          {/* Audio */}
          {results.audio.length > 0 && (
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase opacity-50 mb-6 border-b border-border pb-2">
                Audio & Spoken Discourses ({results.audio.length})
              </h2>
              <div className="divide-y divide-border">
                {results.audio.map((item) => (
                  <Link
                    key={item.id}
                    to="/listen/$id"
                    params={{ id: item.id }}
                    className="group block py-4 hover:text-accent transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs opacity-60 mt-1 font-mono">
                          {item.artist_or_speaker} · {item.channel}
                        </p>
                      </div>
                      <span className="font-mono text-xs opacity-40 group-hover:opacity-100">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Writings */}
          {results.posts.length > 0 && (
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase opacity-50 mb-6 border-b border-border pb-2">
                Writings & Articles ({results.posts.length})
              </h2>
              <div className="divide-y divide-border">
                {results.posts.map((post) => (
                  <Link
                    key={post.slug}
                    to="/teachings/$slug"
                    params={{ slug: post.slug }}
                    className="group block py-4 hover:text-accent transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs opacity-60 mt-1 font-sans line-clamp-2">
                          {post.excerpt}
                        </p>
                        <p className="text-[10px] font-mono opacity-40 mt-1 tracking-widest uppercase">
                          {post.topic} · {post.readMinutes} min read
                        </p>
                      </div>
                      <span className="font-mono text-xs opacity-40 group-hover:opacity-100">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Library Books */}
          {results.books.length > 0 && (
            <div>
              <h2 className="font-mono text-xs tracking-widest uppercase opacity-50 mb-6 border-b border-border pb-2">
                Library Texts ({results.books.length})
              </h2>
              <div className="divide-y divide-border">
                {results.books.map((book) => (
                  <div key={book.id} className="py-4">
                    <h3 className="font-display text-xl">{book.title}</h3>
                    <p className="text-xs opacity-60 mt-1 font-mono">
                      {book.author} {book.category ? `· ${book.category}` : ""}
                    </p>
                    {book.description && (
                      <p className="text-xs opacity-70 mt-1 font-sans line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
