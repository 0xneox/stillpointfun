import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTENT, CHANNELS } from "@/data/content";

export const Route = createFileRoute("/discover")({
  component: Discover,
});

function Discover() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">DISCOVER</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Explore the Collection
          </h1>
          <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto">
            A curated space for listening, reading, and inquiry. Discover audio, books, articles,
            and sacred audiobooks across traditions.
          </p>
        </div>

        {/* Quick Access */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Link
            to="/"
            className="group block p-8 border border-border hover:border-accent transition-colors"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3">
              Listen
            </p>
            <h2 className="font-display text-2xl group-hover:text-accent transition-colors mb-2">
              Audio Collection
            </h2>
            <p className="font-sans text-sm opacity-60">
              Talks, lectures, music, chanting, and ambient listening.
            </p>
          </Link>
          <Link
            to="/library"
            className="group block p-8 border border-border hover:border-accent transition-colors"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3">
              Library
            </p>
            <h2 className="font-display text-2xl group-hover:text-accent transition-colors mb-2">
              Books & Documents
            </h2>
            <p className="font-sans text-sm opacity-60">
              Texts, PDFs, lectures, and reference materials.
            </p>
          </Link>
          <Link
            to="/journal"
            className="group block p-8 border border-border hover:border-accent transition-colors"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3">
              Writings
            </p>
            <h2 className="font-display text-2xl group-hover:text-accent transition-colors mb-2">
              Original Essays
            </h2>
            <p className="font-sans text-sm opacity-60">
              Philosophical reflections and exploratory writing.
            </p>
          </Link>
          <Link
            to="/audiobooks"
            className="group block p-8 border border-border hover:border-accent transition-colors"
          >
            <p className="font-mono text-[10px] tracking-widest uppercase opacity-50 mb-3">
              Audiobooks
            </p>
            <h2 className="font-display text-2xl group-hover:text-accent transition-colors mb-2">
              Sacred Audiobooks
            </h2>
            <p className="font-sans text-sm opacity-60">
              High-fidelity spoken audio across 16 contemplative traditions.
            </p>
          </Link>
        </div>

        {/* Channels */}
        <div className="space-y-16">
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-8">
              AUDIO CHANNELS
            </p>
          </div>
          {CHANNELS.map((channel) => {
            const channelContent = CONTENT.filter((c) => c.channel === channel);
            if (channelContent.length === 0) return null;

            return (
              <div key={channel}>
                <Link
                  to="/channel/$id"
                  params={{ id: channel.toLowerCase() }}
                  className="block group mb-8"
                >
                  <h2 className="font-display text-3xl md:text-4xl group-hover:text-accent transition-colors">
                    {channel}
                  </h2>
                  <p className="mt-2 font-mono text-[10px] tracking-widest uppercase opacity-50">
                    {channelContent.length} pieces
                  </p>
                </Link>

                <div className="space-y-4">
                  {channelContent.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to="/listen/$id"
                      params={{ id: item.id }}
                      className="block group py-4 border-b border-border hover:border-accent transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-display text-xl group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-1 font-mono text-xs opacity-60">
                            {item.artist_or_speaker}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
