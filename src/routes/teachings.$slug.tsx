import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { adjacentPosts, getPost, type Post } from "@/data/posts";
import { CONTENT } from "@/data/content";
import { LIBRARY_ITEMS } from "@/data/library";
import { useMemo } from "react";
import { siteUrl } from "@/lib/site-url";

export const Route = createFileRoute("/teachings/$slug")({
  loader: ({ params }): Post => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — The Still Point` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: siteUrl(`/teachings/${params.slug}`) },
      ],
      links: [{ rel: "canonical", href: siteUrl(`/teachings/${params.slug}`) }],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-32 text-center">
      <h1 className="font-display italic text-5xl">Teaching not found</h1>
      <Link
        to="/teachings"
        className="mt-6 inline-block font-mono text-[11px] tracking-widest uppercase text-accent link-underline"
      >
        Return to the archive
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-editorial py-32 text-center">
      <h1 className="font-display italic text-4xl">Could not open this teaching</h1>
      <p className="mt-4 opacity-70 text-sm">
        {error instanceof Error ? error.message : "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="mt-6 font-mono text-[11px] tracking-widest uppercase text-accent"
      >
        Try again
      </button>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData() as Post;
  const { prev, next } = useMemo(() => adjacentPosts(post.slug), [post.slug]);
  const toc = post.body.filter((b: Post["body"][number]) => b.type === "h2");

  // Find related audio based on tags
  const relatedAudio = useMemo(() => {
    if (!post.tags) return [];
    return CONTENT.filter((audio) =>
      post.tags?.some((tag: string) => audio.tags.includes(tag.toLowerCase())),
    ).slice(0, 3);
  }, [post.tags]);

  // Find related books based on tags
  const relatedBooks = useMemo(() => {
    if (!post.tags) return [];
    return LIBRARY_ITEMS.filter((book) =>
      post.tags?.some((tag: string) => book.tags.includes(tag.toLowerCase())),
    ).slice(0, 3);
  }, [post.tags]);

  return (
    <article>
      {/* Header */}
      <header className="container-editorial pt-24 pb-16 max-w-3xl border-b border-border">
        <Link
          to="/teachings"
          search={{ topic: post.topic }}
          className="font-mono text-[10px] tracking-widest uppercase text-accent link-underline"
        >
          {post.topic}
        </Link>
        <h1 className="font-display italic text-5xl md:text-7xl mt-6 leading-[1.05] text-balance">
          {post.title}
        </h1>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-[10px] tracking-widest uppercase opacity-60">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span>{post.readMinutes} min read</span>
        </div>
      </header>

      <div className="container-editorial py-16 grid grid-cols-12 gap-8">
        {/* TOC */}
        {toc.length > 1 && (
          <aside className="hidden lg:block col-span-3 sticky top-24 self-start">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Contents
            </span>
            <ul className="mt-6 space-y-3 text-sm">
              {toc.map((b: Post["body"][number], i: number) => (
                <li key={i}>
                  <a
                    href={`#h-${i}`}
                    className="opacity-70 hover:text-accent hover:opacity-100 transition-colors"
                  >
                    {b.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div
          className={`col-span-12 ${toc.length > 1 ? "lg:col-span-8 lg:col-start-4" : "lg:col-span-8 lg:col-start-3"}`}
        >
          <div className="prose-editorial">
            {post.body.map((block: Post["body"][number], i: number) => {
              const h2Index =
                post.body.slice(0, i + 1).filter((b: Post["body"][number]) => b.type === "h2")
                  .length - 1;
              switch (block.type) {
                case "h2":
                  return (
                    <h2
                      key={i}
                      id={`h-${h2Index}`}
                      className="font-display italic text-3xl md:text-4xl mt-16 mb-6 text-balance"
                    >
                      {block.text}
                    </h2>
                  );
                case "p":
                  return (
                    <p key={i} className="text-lg md:text-xl leading-[1.7] mb-6 text-pretty">
                      {block.text}
                    </p>
                  );
                case "quote":
                  return (
                    <blockquote key={i} className="my-12 border-l-2 border-accent pl-8">
                      <p className="font-display italic text-2xl md:text-3xl leading-[1.35]">
                        "{block.text}"
                      </p>
                      {block.cite && (
                        <footer className="mt-4 font-mono text-[10px] tracking-widest uppercase opacity-60">
                          — {block.cite}
                        </footer>
                      )}
                    </blockquote>
                  );
                case "code":
                  return (
                    <pre
                      key={i}
                      className="my-8 bg-muted p-6 rounded overflow-x-auto text-sm font-mono leading-relaxed"
                    >
                      <code>{block.text}</code>
                    </pre>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Share */}
          <div className="mt-24 pt-8 border-t border-border flex flex-wrap items-center gap-6">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Share
            </span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase link-underline hover:text-accent"
            >
              Twitter / X
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt)}`}
              className="font-mono text-[10px] tracking-widest uppercase link-underline hover:text-accent"
            >
              Email
            </a>
          </div>

          {/* Related Audio */}
          {relatedAudio.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-6">
                Related Audio
              </p>
              <div className="space-y-4">
                {relatedAudio.map((audio) => (
                  <Link
                    key={audio.id}
                    to="/listen/$id"
                    params={{ id: audio.id }}
                    className="block group"
                  >
                    <div className="border-b border-border py-4 group-hover:border-accent transition-colors">
                      <p className="font-display text-lg group-hover:text-accent transition-colors">
                        {audio.title}
                      </p>
                      <p className="font-mono text-xs opacity-60 mt-1">
                        {audio.artist_or_speaker} · {audio.channel}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-6">
                Related Books
              </p>
              <div className="space-y-4">
                {relatedBooks.map((book) => (
                  <div key={book.id} className="border-b border-border py-4">
                    <p className="font-display text-lg">{book.title}</p>
                    <p className="font-mono text-xs opacity-60 mt-1">
                      {book.author} · {book.tradition}
                    </p>
                    {book.sourceUrl && (
                      <a
                        href={book.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 font-mono text-[10px] tracking-widest uppercase text-accent link-underline"
                      >
                        View source
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next */}
      <nav className="container-editorial py-16 border-t border-border grid grid-cols-2 gap-6">
        <div>
          {prev && (
            <Link to="/teachings/$slug" params={{ slug: prev.slug }} className="group block">
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-2">
                ← Previous
              </div>
              <div className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">
                {prev.title}
              </div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link to="/teachings/$slug" params={{ slug: next.slug }} className="group block">
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-2">
                Next →
              </div>
              <div className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors">
                {next.title}
              </div>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
