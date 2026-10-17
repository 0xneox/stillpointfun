import { createFileRoute, Link } from "@tanstack/react-router";
import { CHANNELS, CHANNEL_DESCRIPTIONS, CONTENT } from "@/data/content";
import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Route = createFileRoute("/")({
  component: Home,
  meta: () => [
    { title: "Stillpoint — Listen. Read. Question." },
    {
      name: "description",
      content:
        "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry. Discover curated discourses, sacred music, philosophical talks, and contemplative journeys.",
    },
    { property: "og:title", content: "Stillpoint — Listen. Read. Question." },
    {
      property: "og:description",
      content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom. Curated discourses, sacred music, and philosophical exploration.",
    },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Stillpoint" },
    { property: "og:url", content: "https://stillpoint.com/" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Stillpoint — Listen. Read. Question." },
    {
      name: "twitter:description",
      content: "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom.",
    },
  ],
});

function Home() {
  const [currentItem, setCurrentItem] = useState(CONTENT[0]);
  const [lastPlayedId, setLastPlayedId] = useLocalStorage<string>(
    "stillpoint-last-played",
    CONTENT[0].id,
  );
  const playRandomRef = useRef<(() => void) | null>(null);

  const playRandom = () => {
    const randomIndex = Math.floor(Math.random() * CONTENT.length);
    const newItem = CONTENT[randomIndex];
    setCurrentItem(newItem);
    setLastPlayedId(newItem.id);
  };

  const playItem = (item: (typeof CONTENT)[0]) => {
    setCurrentItem(item);
    setLastPlayedId(item.id);
  };

  playRandomRef.current = playRandom;

  const dailySelection = CONTENT.find((c) => c.daily_selection) || CONTENT[0];

  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [featuredRef, featuredVisible] = useScrollAnimation(0.1);
  const [channelsRef, channelsVisible] = useScrollAnimation(0.1);
  const [discoverRef, discoverVisible] = useScrollAnimation(0.1);
  const [journeyRef, journeyVisible] = useScrollAnimation(0.1);

  return (
    <div className="min-h-screen">
      {/* Hero - Identity First */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 w-full fade-in">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 stagger-1">
            AN INDEPENDENT SPACE FOR INQUIRY
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight stagger-2">
            Stillpoint
          </h1>

          <p className="font-display text-2xl md:text-3xl lg:text-4xl italic opacity-90 max-w-2xl mx-auto stagger-3">
            Listen. Read. Question the nature of reality.
          </p>

          <p className="font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed stagger-4">
            An open-source space for exploring consciousness, philosophy and the world's
            contemplative traditions through sound, writing, primary texts and direct inquiry.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 stagger-5">
            <Link
              to="/"
              className="px-10 py-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-colors w-full sm:w-auto hover-lift press-scale"
            >
              Begin Exploring
            </Link>
            <button
              onClick={playRandom}
              className="px-10 py-4 border border-foreground text-foreground font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto hover-lift press-scale"
            >
              I Don't Know
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="pt-12 flex flex-wrap justify-center gap-6 font-mono text-[10px] tracking-widest uppercase opacity-60">
            <Link to="/" className="hover:opacity-100 hover:text-accent transition-all link-underline">
              Listen
            </Link>
            <span className="opacity-30">·</span>
            <Link to="/library" className="hover:opacity-100 hover:text-accent transition-all link-underline">
              Library
            </Link>
            <span className="opacity-30">·</span>
            <Link to="/journal" className="hover:opacity-100 hover:text-accent transition-all link-underline">
              Journal
            </Link>
            <span className="opacity-30">·</span>
            <Link to="/discourses" className="hover:opacity-100 hover:text-accent transition-all link-underline">
              Discourses
            </Link>
            <span className="opacity-30">·</span>
            <Link to="/journeys" className="hover:opacity-100 hover:text-accent transition-all link-underline">
              Journeys
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listening */}
      <section ref={featuredRef as any} className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${featuredVisible ? 'is-visible' : ''}`}>
        <div className="text-center space-y-8 mb-16">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            FEATURED
          </p>
          <h2 className="font-display text-3xl md:text-4xl">Now Playing</h2>
        </div>

        <div className="space-y-4">
          <div className="border-b border-border pb-8 hover-lift">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl mb-2">{currentItem.title}</h3>
                <p className="font-mono text-sm opacity-60 mb-4">
                  {currentItem.artist_or_speaker} · {currentItem.channel}
                </p>
                {currentItem.description && (
                  <p className="font-sans text-sm opacity-70 max-w-2xl">{currentItem.description}</p>
                )}
              </div>
              <Link
                to="/listen/$id"
                params={{ id: currentItem.id }}
                className="px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all press-scale"
              >
                Play
              </Link>
            </div>
          </div>

          <button
            onClick={playRandom}
            className="w-full py-4 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all hover-lift press-scale"
          >
            Discover Something Random
          </button>
        </div>
      </section>

      {/* Channels - Featured Selection */}
      <section ref={channelsRef as any} className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${channelsVisible ? 'is-visible' : ''}`}>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          CHANNELS
        </p>

        <div className="space-y-6">
          {CHANNELS.slice(0, 6).map((channel, index) => {
            const channelContent = CONTENT.filter((c) => c.channel === channel);
            return (
              <Link
                key={channel}
                to={`/channel/${channel.toLowerCase()}`}
                className="block group"
              >
                <div className={`w-full text-left py-6 border-b border-border hover:border-accent transition-colors hover-lift stagger-${Math.min(index + 1, 5)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">
                      {channel}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                      {channelContent.length} pieces
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-sm opacity-60 max-w-xl">
                    {CHANNEL_DESCRIPTIONS[channel]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all link-underline"
          >
            View All Channels →
          </Link>
        </div>
      </section>

      {/* Small Discovery */}
      <section ref={discoverRef as any} className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${discoverVisible ? 'is-visible' : ''}`}>
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          DISCOVER
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {["UNDERSTANDING", "WONDER", "DEVOTION", "SILENCE"].map((mood, index) => (
            <button
              key={mood}
              onClick={playRandom}
              className={`px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all hover-lift press-scale stagger-${Math.min(index + 1, 5)}`}
            >
              {mood}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Journey */}
      <section ref={journeyRef as any} className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${journeyVisible ? 'is-visible' : ''}`}>
        <div className="text-center space-y-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            CURATED JOURNEY
          </p>
          <h2 className="font-display text-3xl md:text-4xl italic">Into the Unknown</h2>
          <p className="font-sans text-base opacity-70 max-w-xl mx-auto">
            Explore the boundaries of understanding across science, mysticism, and direct experience.
          </p>
          <Link
            to="/journey/into-the-unknown"
            className="inline-block px-10 py-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-colors hover-lift press-scale"
          >
            Begin Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
