import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { CHANNELS, CHANNEL_DESCRIPTIONS, CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";
import { useState, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { EnhancedPlayer } from "@/components/EnhancedPlayer";
import { siteUrl } from "@/lib/site-url";
import { SITE_CONTENT_COUNTS } from "@/data/site-stats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stillpoint — An Independent Space for Inquiry" },
      {
        name: "description",
        content:
          "An independent, open-source space for listening, reading, and exploring consciousness, philosophy, and the contemplative traditions of the world. What if the deepest questions have no final answers?",
      },
      { property: "og:title", content: "Stillpoint — An Independent Space for Inquiry" },
      {
        property: "og:description",
        content:
          "A space to listen, read, and explore consciousness, philosophy, and the contemplative traditions of the world. What if the deepest questions have no final answers?",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Stillpoint" },
      { property: "og:url", content: siteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Stillpoint — An Independent Space for Inquiry" },
      {
        name: "twitter:description",
        content:
          "A space to listen, read, and explore consciousness, philosophy, and the contemplative traditions of the world.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const router = useRouter();
  const [currentItem, setCurrentItem] = useState(CONTENT[0]);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [lastPlayedId, setLastPlayedId] = useLocalStorage<string>(
    "stillpoint-last-played",
    CONTENT[0].id,
  );
  const playRandomRef = useRef<(() => void) | null>(null);

  const playRandom = () => {
    // Randomly choose between audio content (60%) and written posts (40%)
    const isAudio = Math.random() < 0.6;

    if (isAudio) {
      const randomIndex = Math.floor(Math.random() * CONTENT.length);
      const newItem = CONTENT[randomIndex];
      setCurrentItem(newItem);
      setLastPlayedId(newItem.id);
      setShouldAutoplay(true);
    } else {
      // Navigate to a random post (writing/essay)
      const randomPostIndex = Math.floor(Math.random() * POSTS.length);
      const randomPost = POSTS[randomPostIndex];
      router.navigate({ to: `/teachings/${randomPost.slug}` });
    }
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
  const [discoverRef, discoverVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [channelsRef, channelsVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [collectionsRef, collectionsVisible] = useScrollAnimation<HTMLElement>(0.1);
  const [closingRef, closingVisible] = useScrollAnimation<HTMLElement>(0.1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 w-full fade-in">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 stagger-1">
            AN INDEPENDENT SPACE FOR INQUIRY
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight stagger-2">
            What if the deepest questions have no final answers?
          </h1>

          <p className="font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed stagger-3">
            A space to listen, read, and explore consciousness, philosophy, and the contemplative traditions of the world.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 stagger-4">
            <Link
              to="/discourses"
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
        </div>
      </section>

      {/* Featured Transmission */}
      <section
        ref={featuredRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${
          featuredVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center space-y-4 mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            A TRANSMISSION FOR THIS MOMENT
          </p>
          <h2 className="font-display text-3xl md:text-5xl">Listen Without Rushing</h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto">
            Some questions are better approached through listening than explanation. Enter a transmission, stay with the question, and see what opens.
          </p>
        </div>

        {/* Live Audio Console */}
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

        {/* Transmission Recommendations */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Follow the Thread
            </span>
          </div>

          <p className="font-sans text-sm opacity-60 max-w-xl">
            Different voices. Different traditions. Questions that refuse to stay answered.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTENT.slice(0, 4).map((item) => {
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

          <div className="pt-6 text-center">
            <Link
              to="/discourses"
              className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all link-underline"
            >
              Explore All Transmissions →
            </Link>
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
            to="/discourses"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all link-underline"
          >
            View All Channels →
          </Link>
        </div>
      </section>

      {/* Discovery Section */}
      <section
        ref={discoverRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${discoverVisible ? "is-visible" : ""}`}
      >
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          WANDER WITHOUT A MAP
        </p>

        <div className="text-center space-y-6">
          <h2 className="font-display text-3xl md:text-5xl">You don't have to know what you're looking for.</h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto">
            Follow a question. Open a text. Listen to a voice from another time or tradition. Let curiosity lead.
          </p>
          <button
            onClick={playRandom}
            className="px-10 py-4 border border-foreground text-foreground font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors hover-lift press-scale"
          >
            Discover Something Random ↗
          </button>
        </div>
      </section>

      {/* Channels Section */}
      <section
        ref={channelsRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${channelsVisible ? "is-visible" : ""}`}
      >
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          EXPLORE BY TRADITION
        </p>

        <div className="text-center space-y-6 mb-12">
          <h2 className="font-display text-3xl md:text-5xl">Ten Ways Into the Unknown</h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto">
            No single tradition holds every answer. Explore different ways of approaching the questions of existence, consciousness, and what it means to be.
          </p>
        </div>

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
            to="/discourses"
            className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-all link-underline"
          >
            Explore All Channels →
          </Link>
        </div>
      </section>

      {/* Content Collections */}
      <section
        ref={collectionsRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border scroll-reveal ${collectionsVisible ? "is-visible" : ""}`}
      >
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 mb-12 text-center">
          READ · LISTEN · CONTEMPLATE
        </p>

        <div className="text-center space-y-6 mb-12">
          <h2 className="font-display text-3xl md:text-5xl">Stay with a question.</h2>
          <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto">
            Explore the archive at your own pace, from enduring philosophical texts to recorded talks and contemporary reflections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link to="/audiobooks" className="group block p-6 border border-border hover:border-foreground transition-colors hover-lift">
            <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">Audiobooks</h3>
            <p className="font-sans text-sm opacity-60 mb-4">Longer works for unhurried listening.</p>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Explore {SITE_CONTENT_COUNTS.audiobookTracks} Audiobook Tracks →
            </span>
          </Link>

          <Link to="/library" className="group block p-6 border border-border hover:border-foreground transition-colors hover-lift">
            <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">Library</h3>
            <p className="font-sans text-sm opacity-60 mb-4">Texts and sources worth returning to.</p>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Browse the Library →
            </span>
          </Link>

          <Link to="/writings" className="group block p-6 border border-border hover:border-foreground transition-colors hover-lift">
            <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">Writings</h3>
            <p className="font-sans text-sm opacity-60 mb-4">Ideas examined in words, without the need for a final conclusion.</p>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Read the Writings →
            </span>
          </Link>

          <Link to="/journal" className="group block p-6 border border-border hover:border-foreground transition-colors hover-lift">
            <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">Journal</h3>
            <p className="font-sans text-sm opacity-60 mb-4">Notes, observations, and questions along the way.</p>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
              Enter the Journal →
            </span>
          </Link>
        </div>
      </section>

      {/* Closing Section */}
      <section
        ref={closingRef}
        className={`max-w-4xl mx-auto px-6 py-24 border-t border-border text-center scroll-reveal ${closingVisible ? "is-visible" : ""}`}
      >
        <h2 className="font-display text-3xl md:text-5xl mb-6">The inquiry is yours.</h2>
        <p className="font-sans text-sm md:text-base opacity-70 max-w-xl mx-auto mb-8">
          There is no prescribed path through Stillpoint. Begin anywhere. Follow what interests you. Leave room for what you don't yet understand.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/discourses"
            className="px-10 py-4 bg-foreground text-background font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-accent transition-colors w-full sm:w-auto hover-lift press-scale"
          >
            Continue Exploring
          </Link>
          <button
            onClick={playRandom}
            className="px-10 py-4 border border-foreground text-foreground font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors w-full sm:w-auto hover-lift press-scale"
          >
            I Don't Know
          </button>
        </div>
      </section>
    </div>
  );
}
