import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTENT, CHANNELS, CHANNEL_DESCRIPTIONS, type Channel } from "@/data/content";

export const Route = createFileRoute("/channel/$id")({
  component: ChannelDetail,
});

function ChannelDetail() {
  const { id } = Route.useParams();
  const channel = id.toUpperCase() as Channel;

  if (!CHANNELS.includes(channel)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display italic text-4xl">Not found</h1>
          <p className="mt-4 font-mono text-[11px] tracking-widest uppercase opacity-60">
            This channel is not here.
          </p>
        </div>
      </div>
    );
  }

  const channelContent = CONTENT.filter((c) => c.channel === channel);

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">CHANNEL</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{channel}</h1>
          <p className="font-sans text-lg opacity-70 max-w-2xl mx-auto">
            {CHANNEL_DESCRIPTIONS[channel]}
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase opacity-50">
            {channelContent.length} pieces
          </p>
        </div>

        <div className="space-y-4">
          {channelContent.map((item) => (
            <Link
              key={item.id}
              to={`/listen/${item.id}`}
              className="block group py-6 border-b border-border hover:border-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="font-display text-2xl group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 font-mono text-sm opacity-60">{item.artist_or_speaker}</p>
                  {item.duration && (
                    <p className="mt-1 font-mono text-xs opacity-40">{item.duration}</p>
                  )}
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
