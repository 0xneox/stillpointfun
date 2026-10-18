import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";
import { LIBRARY_ITEMS } from "@/routes/library";
import { EnhancedPlayer } from "@/components/EnhancedPlayer";
import { ShareButton } from "@/components/ShareButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/listen/$id")({
  head: ({ params }) => {
    const item = CONTENT.find((c) => c.id === params.id);
    if (!item) return { meta: [] };

    return {
      meta: [
        { title: `Stillpoint — ${item.title}` },
        {
          name: "description",
          content: `${item.title} by ${item.artist_or_speaker}. ${item.description || ""} Listen on Stillpoint.`,
        },
        { property: "og:title", content: `Stillpoint — ${item.title}` },
        {
          property: "og:description",
          content: `${item.artist_or_speaker} · ${item.channel}. For curious minds in a noisy world.`,
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Stillpoint" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `Stillpoint — ${item.title}` },
        { name: "twitter:description", content: `${item.artist_or_speaker} · ${item.channel}` },
      ],
    };
  },
  component: Listen,
});

function Listen() {
  const { id } = Route.useParams();
  const currentItem = CONTENT.find((c) => c.id === id);

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display italic text-4xl">Not found</h1>
          <p className="mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60">
            This listening moment is not here.
          </p>
        </div>
      </div>
    );
  }

  const navigate = useNavigate();
  const currentIndex = CONTENT.findIndex((c) => c.id === currentItem.id);
  const handleNext = () => {
    const nextItem = CONTENT[(currentIndex + 1) % CONTENT.length];
    navigate({ to: "/listen/$id", params: { id: nextItem.id } });
  };
  const handlePrev = () => {
    const prevItem = CONTENT[(currentIndex - 1 + CONTENT.length) % CONTENT.length];
    navigate({ to: "/listen/$id", params: { id: prevItem.id } });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Find related articles
  const relatedArticles = currentItem.related_articles
    ?.map((slug) => POSTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Find related books
  const relatedBooks = currentItem.related_books
    ?.map((bookId) => LIBRARY_ITEMS.find((b) => b.id === bookId))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto space-y-8 w-full">
        <Breadcrumbs
          items={[
            { label: "Listen", to: "/" },
            { label: currentItem.title },
          ]}
        />
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">NOW PLAYING</p>

        <div className="max-w-3xl mx-auto">
          <EnhancedPlayer
            videoId={currentItem.youtube_video_id}
            title={currentItem.title}
            artist={currentItem.artist_or_speaker}
            channel={currentItem.channel}
            autoplay={true}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={true}
            hasNext={true}
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            {currentItem.title}
          </h1>
          <p className="font-mono text-sm opacity-60">
            {currentItem.artist_or_speaker} · {currentItem.channel}
          </p>
          {currentItem.description && (
            <p className="font-sans text-base opacity-80 max-w-2xl">{currentItem.description}</p>
          )}
        </div>

        <div className="flex justify-center">
          <ShareButton
            title={currentItem.title}
            url={shareUrl}
            description={`${currentItem.artist_or_speaker} · ${currentItem.channel}`}
          />
        </div>

        {/* Related Content */}
        {(relatedArticles?.length || relatedBooks?.length) && (
          <section className="pt-12 border-t border-border">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8">
              Related
            </p>
            <div className="space-y-6">
              {relatedArticles?.map((article) => (
                <Link
                  key={article.slug}
                  to="/teachings/$slug"
                  params={{ slug: article.slug }}
                  className="block group py-4 border-b border-border hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded mb-2 inline-block">
                        Article
                      </span>
                      <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="font-mono text-xs opacity-60 mt-1">
                        {article.topic} · {article.readMinutes} min read
                      </p>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                      →
                    </span>
                  </div>
                </Link>
              ))}
              {relatedBooks?.map((book) => (
                <Link
                  key={book.id}
                  to="/library"
                  className="block group py-4 border-b border-border hover:border-accent transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded mb-2 inline-block">
                        Book
                      </span>
                      <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                        {book.title}
                      </h3>
                      <p className="font-mono text-xs opacity-60 mt-1">
                        {book.author} · {book.tradition}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Source and Attribution */}
        <section className="pt-12 border-t border-border">
          <div className="space-y-4 text-sm opacity-60">
            <p className="font-mono text-[10px] tracking-widest uppercase">Source</p>
            <p>
              {currentItem.source}
              {currentItem.rights_status && ` · ${currentItem.rights_status}`}
            </p>
            {currentItem.attribution_notes && (
              <p className="mt-2">{currentItem.attribution_notes}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
