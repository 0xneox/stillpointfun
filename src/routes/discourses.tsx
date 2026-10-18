import { useState, useMemo, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTENT, CURATED_PLAYLISTS, type CuratedPlaylistTrack } from "@/data/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/discourses")({
  head: () => ({
    meta: [
      { title: "Discourses & Audio Archives — The Still Point" },
      {
        name: "description",
        content:
          "Curated public discourses, spoken audio archives, talks, and philosophical lectures including Alan Watts, Ram Dass, Neem Karoli Baba, Ramana Maharshi, Samadhi, Advaita, and Zen.",
      },
      { property: "og:title", content: "Discourses & Audio Archives — The Still Point" },
      {
        property: "og:description",
        content:
          "Curated public discourses, spoken audio archives, talks, and philosophical lectures including Alan Watts, Ram Dass, Neem Karoli Baba, Ramana Maharshi, Samadhi, Advaita, and Zen.",
      },
      { property: "og:url", content: "/discourses" },
    ],
    links: [{ rel: "canonical", href: "/discourses" }],
  }),
  component: Discourses,
});

function Discourses() {
  const [activePlaylistId, setActivePlaylistId] = useState<string>(
    CURATED_PLAYLISTS[0]?.id || "alan-watts-discourses",
  );

  const activePlaylist = useMemo(() => {
    return (
      CURATED_PLAYLISTS.find((p) => p.id === activePlaylistId) ||
      CURATED_PLAYLISTS[0]
    );
  }, [activePlaylistId]);

  const [selectedTrack, setSelectedTrack] = useState<CuratedPlaylistTrack>(
    CURATED_PLAYLISTS[0]?.tracks[0],
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [trackSearch, setTrackSearch] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Group content by tradition/subject for discourse organization
  // Only include items that are actual talks/lectures/discourses, not music
  const discoursesBySubject = {
    "Consciousness & Reality": CONTENT.filter(
      (c) =>
        ["REALITY", "COSMOS", "PSYCHEDELIC"].includes(c.channel) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Upanishads & Vedic Wisdom": CONTENT.filter(
      (c) =>
        (c.channel === "VEDA" ||
          c.tags.includes("upanishad") ||
          c.tags.includes("veda") ||
          c.tags.includes("dayananda") ||
          c.tags.includes("shankara") ||
          c.tags.includes("bhagavad-gita")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Kashmir Shaivism & Non-Duality": CONTENT.filter(
      (c) =>
        (c.tradition?.toLowerCase().includes("shaivism") ||
          c.tags.includes("kashmir-shaivism") ||
          c.tags.includes("abhinavagupta")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Samadhi & Non-Duality": CONTENT.filter(
      (c) =>
        (c.tags.includes("samadhi") ||
          c.tags.includes("maya") ||
          c.tags.includes("kundalini") ||
          c.tradition?.toLowerCase().includes("samadhi")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Zen & Taoism": CONTENT.filter(
      (c) =>
        (c.tradition?.toLowerCase().includes("zen") ||
          c.tradition?.toLowerCase().includes("taoism") ||
          c.tags.includes("zen") ||
          c.tags.includes("wu-wei")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Advaita & Self-Inquiry": CONTENT.filter(
      (c) =>
        ["REALITY"].includes(c.channel) &&
        (c.tradition?.toLowerCase().includes("advaita") ||
          c.tags.includes("ramana-maharshi") ||
          c.tags.includes("self-inquiry")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Bhakti & Saints": CONTENT.filter(
      (c) =>
        (c.tradition?.toLowerCase().includes("bhakti") ||
          c.tags.includes("neem-karoli-baba") ||
          c.tags.includes("ram-dass") ||
          c.tags.includes("devotion")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Buddhist Teachings": CONTENT.filter(
      (c) =>
        c.channel === "BUDDHA" &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Depth Psychology & Mysticism": CONTENT.filter(
      (c) =>
        (c.tradition?.toLowerCase().includes("psychology") ||
          c.tags.includes("carl-jung") ||
          c.tags.includes("archetypes")) &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
    "Sufi Traditions": CONTENT.filter(
      (c) =>
        c.channel === "SUFI" &&
        c.media_type !== "music" &&
        c.media_type !== "chanting",
    ),
  };

  // Filter out empty categories
  const filteredSubjects = Object.fromEntries(
    Object.entries(discoursesBySubject).filter(([_, items]) => items.length > 0),
  );

  // Filtered tracks for the active playlist
  const filteredTracks = useMemo(() => {
    if (!activePlaylist) return [];
    if (!trackSearch.trim()) return activePlaylist.tracks;
    const query = trackSearch.toLowerCase();
    return activePlaylist.tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.duration.toLowerCase().includes(query) ||
        t.speaker.toLowerCase().includes(query) ||
        (t.description && t.description.toLowerCase().includes(query)),
    );
  }, [activePlaylist, trackSearch]);

  // Send command to the hidden YouTube player engine via postMessage
  const sendPlayerCommand = (func: string, args: unknown[] = []) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args }),
        "*",
      );
    }
  };

  // Switch playlist
  const switchPlaylist = (playlistId: string) => {
    setActivePlaylistId(playlistId);
    setTrackSearch("");
    const target = CURATED_PLAYLISTS.find((p) => p.id === playlistId);
    if (target?.tracks[0]) {
      setSelectedTrack(target.tracks[0]);
      setIsPlaying(false);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      sendPlayerCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      sendPlayerCommand("playVideo");
      setIsPlaying(true);
    }
  };

  // Play a specific track
  const playTrack = (track: CuratedPlaylistTrack) => {
    setSelectedTrack(track);
    setIsPlaying(true);
  };

  // Advance to next track
  const handleNextTrack = () => {
    if (!activePlaylist) return;
    const currentIndex = activePlaylist.tracks.findIndex(
      (t) => t.videoId === selectedTrack.videoId,
    );
    const nextIndex = (currentIndex + 1) % activePlaylist.tracks.length;
    playTrack(activePlaylist.tracks[nextIndex]);
  };

  // Previous track
  const handlePrevTrack = () => {
    if (!activePlaylist) return;
    const currentIndex = activePlaylist.tracks.findIndex(
      (t) => t.videoId === selectedTrack.videoId,
    );
    const prevIndex =
      (currentIndex - 1 + activePlaylist.tracks.length) % activePlaylist.tracks.length;
    playTrack(activePlaylist.tracks[prevIndex]);
  };

  // Volume control
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    sendPlayerCommand("setVolume", [newVolume]);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sendPlayerCommand("unMute");
      sendPlayerCommand("setVolume", [volume || 80]);
    } else {
      setIsMuted(true);
      sendPlayerCommand("mute");
    }
  };

  // Listen to postMessage events from the YouTube player to track playback state
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data && data.event === "onStateChange") {
          // 1 = playing, 2 = paused, 0 = ended
          if (data.info === 1) {
            setIsPlaying(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
          } else if (data.info === 0) {
            setIsPlaying(false);
            handleNextTrack();
          }
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [selectedTrack, activePlaylist]);

  return (
    <div className="min-h-screen">
      {/* Invisible YouTube Audio Engine (Zero Video Elements) */}
      <iframe
        ref={iframeRef}
        key={selectedTrack.videoId}
        src={`https://www.youtube.com/embed/${selectedTrack.videoId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&playsinline=1&controls=0`}
        className="absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none"
        allow="autoplay"
        title="Spoken Audio Stream"
      />

      {/* Header */}
      <header className="container-editorial pt-24 pb-16 border-b border-border">
        <Breadcrumbs items={[{ label: "Discourses" }]} />
        <div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50">
            Spoken Discourses & Audio Archives
          </span>
          <h1 className="font-display italic text-5xl md:text-7xl mt-6 text-balance max-w-3xl">
            Discourses
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-70 leading-relaxed font-sans">
            Curated spoken lectures, satsangs, and contemplative dialogues from teachers across
            traditions. Pure audio archives designed for focused listening, stillness, and deep study.
          </p>
        </div>
      </header>

      {/* Featured Pure Audio Archive Deck */}
      {activePlaylist && (
        <section className="border-b border-border bg-surface/30">
          <div className="max-w-5xl mx-auto px-6 py-20">
            {/* Playlist Selection Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 mr-2">
                Archives:
              </span>
              {CURATED_PLAYLISTS.map((pl) => {
                const isActive = pl.id === activePlaylistId;
                return (
                  <button
                    key={pl.id}
                    type="button"
                    onClick={() => switchPlaylist(pl.id)}
                    className={`px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm border transition-all ${
                      isActive
                        ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                        : "border-border bg-background/50 hover:bg-surface text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <span>{pl.title.split(":")[0]}</span>
                    <span className="ml-2 opacity-50">({pl.tracks.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Archive Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-[0.2em] uppercase bg-foreground text-background">
                    Spoken Audio Archive
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-border opacity-70">
                    {activePlaylist.tracks.length} Spoken Lectures & Talks
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-accent border border-accent/40">
                    Pure Audio
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl mt-2">
                  {activePlaylist.title}
                </h2>
                <p className="font-mono text-xs opacity-60">
                  {activePlaylist.speaker} · {activePlaylist.traditions.join(" · ")}
                </p>
                <p className="font-sans text-sm md:text-base opacity-75 max-w-2xl leading-relaxed">
                  {activePlaylist.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={activePlaylist.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-border hover:border-foreground font-mono text-[10px] tracking-[0.2em] uppercase transition-colors inline-flex items-center gap-2"
                >
                  <span>Original Playlist</span>
                  <span className="opacity-50">↗</span>
                </a>
              </div>
            </div>

            {/* Pure Audio Console (Zero Video) */}
            <div className="rounded-sm border border-border bg-background shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 bg-surface/40">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Contemplative Sound Disc Visualizer */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div
                      className={`w-36 h-36 md:w-44 md:h-44 rounded-full border border-border/80 flex items-center justify-center transition-transform duration-1000 ${
                        isPlaying ? "animate-[spin_18s_linear_infinite]" : ""
                      }`}
                      style={{
                        background:
                          "radial-gradient(circle, var(--color-surface) 0%, var(--color-background) 70%, var(--color-surface) 100%)",
                      }}
                    >
                      {/* Vinyl Groove Rings */}
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-border/40 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-border/30 flex items-center justify-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-accent/50 bg-accent/10 flex items-center justify-center text-accent">
                            <span className="font-mono text-[9px] tracking-widest uppercase">
                              {isPlaying ? "ON AIR" : "STILL"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Track Details & Audio Controls */}
                  <div className="flex-1 min-w-0 text-center md:text-left space-y-4">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-mono tracking-[0.2em] uppercase bg-accent text-accent-foreground rounded-full">
                        <span
                          className={`w-1.5 h-1.5 rounded-full bg-current ${
                            isPlaying ? "animate-ping" : "opacity-40"
                          }`}
                        />
                        {isPlaying ? "Streaming Spoken Audio" : "Audio Deck Standby"}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest uppercase opacity-50">
                        Discourse #{selectedTrack.index} of {activePlaylist.tracks.length}
                      </span>
                    </div>

                    <h3 className="font-display italic text-3xl md:text-5xl leading-tight text-balance">
                      {selectedTrack.title}
                    </h3>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 font-mono text-xs opacity-70">
                      <span>Speaker: {selectedTrack.speaker}</span>
                      <span>·</span>
                      <span>Duration: {selectedTrack.duration}</span>
                      <span>·</span>
                      <span>Spoken Word</span>
                    </div>

                    {/* Primary Audio Controls Bar */}
                    <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-5">
                      {/* Prev */}
                      <button
                        type="button"
                        onClick={handlePrevTrack}
                        className="p-3 rounded-full border border-border hover:border-foreground hover:bg-surface transition-colors"
                        title="Previous Discourse"
                        aria-label="Previous Discourse"
                      >
                        <span className="text-sm font-mono">⏮</span>
                      </button>

                      {/* Large Play/Pause */}
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="px-8 py-3.5 rounded-full bg-foreground text-background hover:bg-accent transition-colors flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase shadow-md"
                        aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
                      >
                        <span className="text-base">{isPlaying ? "❚❚" : "▶"}</span>
                        <span>{isPlaying ? "Pause Audio" : "Play Audio"}</span>
                      </button>

                      {/* Next */}
                      <button
                        type="button"
                        onClick={handleNextTrack}
                        className="p-3 rounded-full border border-border hover:border-foreground hover:bg-surface transition-colors"
                        title="Next Discourse"
                        aria-label="Next Discourse"
                      >
                        <span className="text-sm font-mono">⏭</span>
                      </button>

                      {/* Soundwave Animation */}
                      <div className="flex items-end gap-1 h-8 px-3.5 py-1.5 bg-background border border-border rounded-md shadow-inner">
                        <span
                          className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "animate-[pulse_1.1s_ease-in-out_infinite] h-5"
                              : "h-2 opacity-30"
                          }`}
                        />
                        <span
                          className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-7"
                              : "h-2 opacity-30"
                          }`}
                        />
                        <span
                          className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "animate-[pulse_1.4s_ease-in-out_infinite_0.3s] h-4"
                              : "h-2 opacity-30"
                          }`}
                        />
                        <span
                          className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "animate-[pulse_1.0s_ease-in-out_infinite_0.2s] h-6"
                              : "h-2 opacity-30"
                          }`}
                        />
                        <span
                          className={`w-1 bg-accent rounded-full transition-all duration-300 ${
                            isPlaying
                              ? "animate-[pulse_1.3s_ease-in-out_infinite_0.4s] h-3"
                              : "h-2 opacity-30"
                          }`}
                        />
                      </div>

                      {/* Mute/Volume Toggle */}
                      <div className="flex items-center gap-2 pl-2">
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="font-mono text-xs opacity-60 hover:opacity-100 transition-opacity"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? "🔇" : "🔊"}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-20 h-1 bg-border accent-accent cursor-pointer"
                          title="Volume"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-toolbar */}
                <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs opacity-60">
                    Direct spoken audio streaming · Zero video distraction · Contemplative sanctuary
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedTrack?.id && (
                      <Link
                        to="/listen/$id"
                        params={{ id: selectedTrack.id }}
                        className="px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:bg-accent transition-colors"
                      >
                        Stillpoint Contemplation View →
                      </Link>
                    )}
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedTrack.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <span>YouTube Source</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Playlist Tracklist Navigator */}
              <div className="border-t border-border p-6 bg-surface/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-display text-xl">
                      {activePlaylist.title.split(":")[0]} Audio Index
                    </h4>
                    <p className="font-mono text-xs opacity-50 mt-0.5">
                      Select any lecture below to listen directly in the audio deck
                    </p>
                  </div>
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      placeholder={`Search ${activePlaylist.tracks.length} talks...`}
                      value={trackSearch}
                      onChange={(e) => setTrackSearch(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-border focus:border-foreground focus:outline-none placeholder:opacity-40"
                    />
                  </div>
                </div>

                {/* Scrollable Lecture List */}
                <div className="max-h-96 overflow-y-auto divide-y divide-border border border-border bg-background rounded-sm">
                  {filteredTracks.length === 0 ? (
                    <div className="p-6 text-center font-mono text-xs opacity-50">
                      No talks found matching "{trackSearch}"
                    </div>
                  ) : (
                    filteredTracks.map((track) => {
                      const isCurrent = selectedTrack.videoId === track.videoId;
                      return (
                        <div
                          key={track.videoId}
                          className={`p-3.5 flex items-center justify-between gap-4 transition-colors ${
                            isCurrent
                              ? "bg-accent/10 border-l-2 border-l-accent"
                              : "hover:bg-surface/50"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => playTrack(track)}
                            className="flex-1 text-left flex items-start gap-3 min-w-0"
                          >
                            <span className="font-mono text-[11px] opacity-40 shrink-0 mt-0.5 w-6 text-right">
                              {String(track.index).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-sans truncate ${
                                  isCurrent ? "font-medium text-accent" : ""
                                }`}
                              >
                                {track.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[10px] opacity-60">
                                  {track.speaker}
                                </span>
                                <span className="font-mono text-[10px] opacity-30">·</span>
                                <span className="font-mono text-[10px] opacity-50">
                                  {track.duration}
                                </span>
                              </div>
                            </div>
                          </button>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (isCurrent) {
                                  togglePlay();
                                } else {
                                  playTrack(track);
                                }
                              }}
                              className={`px-3 py-1 font-mono text-[9px] tracking-widest uppercase transition-colors flex items-center gap-1.5 ${
                                isCurrent && isPlaying
                                  ? "bg-accent text-accent-foreground"
                                  : "border border-border hover:border-foreground"
                              }`}
                            >
                              <span>{isCurrent && isPlaying ? "❚❚ Pause" : "▶ Play"}</span>
                            </button>
                            {track.id && (
                              <Link
                                to="/listen/$id"
                                params={{ id: track.id }}
                                title="Open in Stillpoint listening view"
                                className="px-2 py-1 font-mono text-[9px] tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-accent transition-opacity"
                              >
                                Detail →
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Curated Categorized Collections */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-50 block">
            Traditions & Paths
          </span>
          <h2 className="font-display italic text-3xl md:text-4xl mt-2">
            Cataloged Discourses by Tradition
          </h2>
        </div>

        <div className="space-y-16">
          {Object.entries(filteredSubjects).map(([subject, items]) => (
            <div key={subject}>
              <div className="flex items-baseline justify-between border-b border-border pb-3 mb-6">
                <h3 className="font-display text-2xl md:text-3xl">{subject}</h3>
                <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest">
                  {items.length} {items.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <div className="space-y-4">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    to="/listen/$id"
                    params={{ id: item.id }}
                    className="block group py-4 border-b border-border hover:border-accent transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-display text-xl group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-mono text-sm opacity-60 mt-1">
                          {item.artist_or_speaker}
                          {item.tradition && ` · ${item.tradition}`}
                          {item.duration && (
                            <span className="opacity-40">
                              {" "}
                              · {item.duration.replace("PT", "").toLowerCase()}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-opacity">
                        Listen →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Information */}
      <section className="bg-surface text-surface-foreground py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 block mb-6">
            About These Discourses
          </span>
          <div className="space-y-6 text-lg leading-[1.7] opacity-90">
            <p>
              These discourses are curated from publicly available archives including radio
              broadcasts, authorized foundation channels, and historical recordings. Each entry
              identifies the original speaker, tradition, and source.
            </p>
            <p>
              The collection focuses on authentic spoken teachings from Zen Buddhism, Taoism,
              Advaita Vedanta, Kashmir Śaivism, depth psychology, Sufism, and philosophical
              explorations of consciousness and non-duality.
            </p>
            <p className="italic opacity-80">
              Stillpoint is a quiet sanctuary for discovering meaningful spoken discourses
              already available in the public domain—curated for pure acoustic focus, stillness,
              and contemplation.
            </p>
          </div>
        </div>
      </section>

      {/* Browse Related */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-border">
        <div className="text-center space-y-8">
          <h2 className="font-display italic text-4xl md:text-5xl text-balance">
            Explore Further
          </h2>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-foreground text-background font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Browse All Listening
            </Link>
            <Link
              to="/library"
              className="px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Archival Library
            </Link>
            <Link
              to="/journal"
              className="px-8 py-4 border border-foreground text-foreground font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              Read Writings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
