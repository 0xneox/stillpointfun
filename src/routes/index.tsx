import { createFileRoute, Link } from "@tanstack/react-router";
import { CHANNELS, CHANNEL_DESCRIPTIONS, CONTENT } from "@/data/content";
import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { EnhancedPlayer } from "@/components/EnhancedPlayer";
import { siteUrl } from "@/lib/site-url";
import { SITE_CONTENT_COUNTS } from "@/data/site-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stillpoint — Listen. Read. Question." },
      {
        name: "description",
        content:
          "An open-source space for exploring consciousness, philosophy and the world's contemplative traditions through sound, writing, primary texts and direct inquiry. Discover curated discourses, sacred music, philosophical talks, and sacred audiobooks.",
      },
      { property: "og:title", content: "Stillpoint — Listen. Read. Question." },
      {
        property: "og:description",
        content:
          "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom. Curated discourses, sacred music, and philosophical exploration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Stillpoint" },
      { property: "og:url", content: siteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Stillpoint — Listen. Read. Question." },
      {
        name: "twitter:description",
        content:
          "An independent space for inquiry into consciousness, philosophy, and contemplative wisdom.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [currentItem, setCurrentItem] = useState(CONTENT[0]);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
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
    setShouldAutoplay(true);
  };

  const playItem = (item: (typeof CONTENT)[0]) => {
    setCurrentItem(item);
    setLastPlayedId(item.id);
    setShouldAutoplay(true);
  };

  const handleNext = () => {
    const currentIndex = CONTENT.findIndex((c) => c.id === currentItem.id);
    const nextIndex = (currentIndex + 1) % CONTENT.length;
    setCurrentItem(CONTENT[nextIndex]);
    setLastPlayedId(CONTENT[nextIndex].id);
    setShouldAutoplay(true);
  };

  const handlePrev = () => {
    const currentIndex = CONTENT.findIndex((c) => c.id === currentItem.id);
    const prevIndex = (currentIndex - 1 + CONTENT.length) % CONTENT.length;
    setCurrentItem(CONTENT[prevIndex]);
    setLastPlayedId(CONTENT[prevIndex].id);
    setShouldAutoplay(true);
  };

  playRandomRef.current = playRandom;

  const dailySelection = CONTENT.find((c) => c.daily_selection) || CONTENT[0];

  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [featuredRef, featuredVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [channelsRef, channelsVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [discoverRef, discoverVisible] = useScrollAnimation<HTMLElement>(0.1);

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
            <Link
              to="/"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Listen
            </Link>
            <span className="opacity-30">·</span>
            <Link
              to="/library"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Library
            </Link>
            <span className="opacity-30">·</span>
            <Link
              to="/writings"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Writings
            </Link>
            <span className="opacity-30">·</span>
            <Link
              to="/journal"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Journal
            </Link>
            <span className="opacity-30">·</span>
            <Link
              to="/discourses"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Discourses
            </Link>
            <span className="opacity-30">·</span>
            <Link
              to="/audiobooks"
              className="hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Audiobooks
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listening */}
      <section
        ref={featuredRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${
          featuredVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-75">
              Featured Transmission
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl">Now Playing</h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto">
            Curated contemplative transmissions, satsangs, and sacred audio. Select a transmission
            to enter the listening deck.
          </p>
        </div>

        {/* Live Sexy Audio Console (Zero Video) */}
        <div className="mb-10">
          <EnhancedPlayer
            key={currentItem.id}
            itemId={currentItem.id}
            videoId={currentItem.youtube_video_id}
            title={currentItem.title}
            artist={currentItem.artist_or_speaker}
            channel={currentItem.channel}
            autoplay={shouldAutoplay}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={true}
            hasNext={true}
          />
        </div>

        {/* Transmission Browser & Quick Selector */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Featured Transmissions
            </span>
            <span className="font-mono text-[10px] opacity-40">
              {SITE_CONTENT_COUNTS.audioTransmissions} Audio Transmissions Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTENT.slice(0, 6).map((item) => {
              const isSelected = item.id === currentItem.id;
              return (
                <div
                  key={item.id}
                  className={`p-3.5 border rounded-sm transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-foreground bg-foreground/5 shadow-sm"
                      : "border-border hover:border-foreground/40 bg-surface/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => playItem(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p
                      className={`font-display text-sm truncate ${
                        isSelected ? "text-accent font-medium" : ""
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="font-mono text-[10px] opacity-60 truncate">
                      {item.artist_or_speaker} · {item.channel}
                    </p>
                  </button>
                  <Link
                    to="/listen/$id"
                    params={{ id: item.id }}
                    className={`font-mono text-[10px] px-2.5 py-1 rounded transition-colors shrink-0 ${
                      isSelected
                        ? "bg-accent text-white"
                        : "border border-border opacity-70 hover:opacity-100 hover:border-foreground"
                    }`}
                  >
                    Play ↗
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={playRandom}
              className="w-full sm:w-auto px-6 py-3 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground hover:bg-foreground hover:text-background transition-all hover-lift press-scale"
            >
              🎲 Discover Something Random
            </button>
            <div className="flex items-center gap-6 text-[10px] font-mono tracking-widest uppercase opacity-70">
              <Link to="/discourses" className="hover:text-accent transition-colors">
                Browse {SITE_CONTENT_COUNTS.discourseTrackEntries} Curated Entries →
              </Link>
              <Link to="/audiobooks" className="hover:text-accent transition-colors">
                {SITE_CONTENT_COUNTS.audiobookTracks} Audiobook Tracks →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Channels - Featured Selection */}
      <section
        ref={channelsRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${channelsVisible ? "is-visible" : ""}`}
      >
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          CHANNELS · {SITE_CONTENT_COUNTS.channels} Listening Channels
        </p>

        <div className="space-y-6">
          {CHANNELS.slice(0, 6).map((channel, index) => {
            const channelContent = CONTENT.filter((c) => c.channel === channel);
            return (
              <Link
                key={channel}
                to="/channel/$id"
                params={{ id: channel.toLowerCase() }}
                className="block group"
              >
                <div
                  className={`w-full text-left py-6 border-b border-border hover:border-accent transition-colors hover-lift stagger-${Math.min(index + 1, 5)}`}
                >
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
      <section
        ref={discoverRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${discoverVisible ? "is-visible" : ""}`}
      >
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
    </div>
  );
}
