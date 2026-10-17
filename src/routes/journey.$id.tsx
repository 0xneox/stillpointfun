import { createFileRoute, Link } from "@tanstack/react-router";
import { JOURNEYS, CONTENT } from "@/data/content";
import { YouTubePlayer } from "@/components/YouTubePlayer";
import { useState } from "react";

export const Route = createFileRoute("/journey/$id")({
  component: JourneyDetail,
});

function JourneyDetail() {
  const { id } = Route.useParams();
  const journey = JOURNEYS.find((j) => j.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display italic text-4xl">Not found</h1>
          <p className="mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60">
            This journey is not here.
          </p>
        </div>
      </div>
    );
  }

  const journeyItem = journey.items[currentIndex];
  const currentItem =
    journeyItem.type === "audio" ? CONTENT.find((c) => c.id === journeyItem.source_id) : null;

  if (journeyItem.type === "audio" && !currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display italic text-4xl">Not found</h1>
          <p className="mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60">
            This content is not here.
          </p>
        </div>
      </div>
    );
  }

  const goToNext = () => {
    if (currentIndex < journey.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">JOURNEY</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{journey.title}</h1>
          {journey.introduction && (
            <p className="font-sans text-base opacity-70 max-w-2xl mx-auto">
              {journey.introduction}
            </p>
          )}
          {journey.description && (
            <p className="font-sans text-sm opacity-60 max-w-2xl mx-auto mt-2">
              {journey.description}
            </p>
          )}
        </div>

        <div className="space-y-8">
          {journeyItem.type === "audio" && currentItem && (
            <>
              <div className="max-w-3xl mx-auto">
                <YouTubePlayer videoId={currentItem.youtube_video_id} autoplay={true} />
              </div>

              <div className="text-center space-y-4">
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
                  {currentIndex + 1} / {journey.items.length}
                </p>
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  {journeyItem.title}
                </h2>
                {journeyItem.notes && (
                  <p className="font-sans text-sm opacity-60 max-w-xl mx-auto">
                    {journeyItem.notes}
                  </p>
                )}
                <p className="font-mono text-sm opacity-60">
                  {currentItem.artist_or_speaker} · {currentItem.channel}
                </p>
              </div>
            </>
          )}

          {journeyItem.type === "article" && (
            <div className="text-center space-y-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
                {currentIndex + 1} / {journey.items.length}
              </p>
              <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded">
                Article
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                {journeyItem.title}
              </h2>
              {journeyItem.notes && (
                <p className="font-sans text-sm opacity-60 max-w-xl mx-auto">{journeyItem.notes}</p>
              )}
              <Link
                to={`/teachings/${journeyItem.source_id}`}
                className="inline-block px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
              >
                Read Article
              </Link>
            </div>
          )}

          {journeyItem.type === "book" && (
            <div className="text-center space-y-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
                {currentIndex + 1} / {journey.items.length}
              </p>
              <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[10px] tracking-widest uppercase rounded">
                Book
              </span>
              <h2 className="font-display text-3xl md:text-4xl leading-tight">
                {journeyItem.title}
              </h2>
              {journeyItem.notes && (
                <p className="font-sans text-sm opacity-60 max-w-xl mx-auto">{journeyItem.notes}</p>
              )}
              <Link
                to="/library"
                className="inline-block px-8 py-3 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
              >
                View in Library
              </Link>
            </div>
          )}

          <div className="flex items-center justify-center gap-8">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="p-4 opacity-60 hover:opacity-100 transition-opacity disabled:opacity-30 disabled:hover:opacity-30"
              aria-label="Previous"
            >
              <span className="text-2xl">◀</span>
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === journey.items.length - 1}
              className="p-6 bg-foreground text-background hover:bg-accent transition-colors disabled:opacity-30 disabled:hover:bg-foreground"
              aria-label="Next"
            >
              <span className="text-3xl">▶</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
