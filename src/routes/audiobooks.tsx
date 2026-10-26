import { useState, useMemo, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-url";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  SACRED_AUDIOBOOKS,
  getAudiobookTrackUrl,
  getTotalAudiobookStats,
  type AudiobookCollection,
  type AudiobookTrack,
} from "@/data/audiobooks";
import { setGlobalAudioTrack, notifyAudioStarted } from "@/lib/audio-player-state";

export const Route = createFileRoute("/audiobooks")({
  head: () => {
    const stats = getTotalAudiobookStats();
    return {
      meta: [
        { title: "Sacred Audiobooks & Direct Pointings — Stillpoint" },
        {
          name: "description",
          content:
            "High-fidelity spoken audiobooks, contemplative texts, and direct pointings from Ramana Maharshi, Nisargadatta, Longchenpa, Padmasambhava, Zen, Sufi, and Christian Mystics.",
        },
        { property: "og:title", content: "Sacred Audiobooks & Direct Pointings — Stillpoint" },
        {
          property: "og:description",
          content: `High-fidelity spoken audio across ${stats.totalCollections} collections and ${stats.totalTracks} chapters.`,
        },
        { property: "og:url", content: siteUrl("/audiobooks") },
        { property: "og:type", content: "website" },
        { name: "robots", content: __PUBLIC_LAUNCH__ ? "index, follow" : "noindex, nofollow" },
      ],
      links: [{ rel: "canonical", href: siteUrl("/audiobooks") }],
    };
  },
  component: AudiobooksPage,
});

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

interface SavedProgress {
  [trackId: string]: {
    time: number;
    duration: number;
    updatedAt: number;
  };
}

function AudiobooksPage() {
  const stats = useMemo(() => getTotalAudiobookStats(), []);
  const [activeCollectionId, setActiveCollectionId] = useState<string>(
    SACRED_AUDIOBOOKS[0]?.id || "nisargadatta-maharaj",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const activeCollection = useMemo(() => {
    return SACRED_AUDIOBOOKS.find((c) => c.id === activeCollectionId) || SACRED_AUDIOBOOKS[0];
  }, [activeCollectionId]);

  // Player State
  const [currentTrack, setCurrentTrack] = useState<AudiobookTrack | null>(
    () => activeCollection?.tracks[0] || null,
  );
  const [currentCollection, setCurrentCollection] = useState<AudiobookCollection>(
    () => activeCollection,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); // minutes
  const [sleepTimeLeft, setSleepTimeLeft] = useState<number | null>(null); // seconds
  const [audioError, setAudioError] = useState<string | null>(null);

  // Playback Progress Persistence
  const [progress, setProgress] = useState<SavedProgress>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("stillpoint_audiobook_progress");
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filtered tracks across active collection or global search
  const displayedTracks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return activeCollection?.tracks || [];
    }
    // Search across ALL collections if query exists
    const matches: (AudiobookTrack & { collectionTitle: string; collectionId: string })[] = [];
    for (const c of SACRED_AUDIOBOOKS) {
      for (const t of c.tracks) {
        if (
          t.title.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.author.toLowerCase().includes(q) ||
          c.tradition.toLowerCase().includes(q)
        ) {
          matches.push({
            ...t,
            collectionTitle: c.title,
            collectionId: c.id,
          });
        }
      }
    }
    return matches;
  }, [activeCollection, searchQuery]);

  // Handle Play Track
  const handlePlayTrack = (track: AudiobookTrack, col: AudiobookCollection) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play().catch((err) => setAudioError(err.message));
        setIsPlaying(true);
      }
      return;
    }

    setAudioError(null);
    setCurrentTrack(track);
    setCurrentCollection(col);
    setIsPlaying(true);

    // Check if there is saved progress for this track
    const saved = progress[track.id];
    const resumeAt = saved && saved.time > 10 && saved.time < saved.duration - 15 ? saved.time : 0;

    if (audioRef.current) {
      const targetUrl = getAudiobookTrackUrl(track.relPath);
      audioRef.current.src = targetUrl;
      audioRef.current.load();
      if (resumeAt > 0) {
        audioRef.current.currentTime = resumeAt;
      }
      audioRef.current.play().catch((err) => {
        setAudioError(
          `Unable to stream "${track.fileName}". If running locally, check that the file exists in /audiobook, or configure a Cloud Storage Base URL.`,
        );
        setIsPlaying(false);
      });
    }
  };

  // Skip Forward/Backward
  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      Math.min(audioRef.current.duration || 0, audioRef.current.currentTime + seconds),
    );
  };

  // Change Playback Speed
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Sleep Timer countdown
  useEffect(() => {
    if (sleepTimeLeft === null) return;
    if (sleepTimeLeft <= 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      setSleepTimer(null);
      setSleepTimeLeft(null);
      return;
    }

    const timer = setInterval(() => {
      setSleepTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [sleepTimeLeft]);

  const setTimerMinutes = (minutes: number | null) => {
    setSleepTimer(minutes);
    setSleepTimeLeft(minutes ? minutes * 60 : null);
  };

  // Save Progress periodically
  useEffect(() => {
    if (!currentTrack || currentTime <= 0 || duration <= 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const updated = {
          ...prev,
          [currentTrack.id]: {
            time: Math.floor(currentTime),
            duration: Math.floor(duration),
            updatedAt: Date.now(),
          },
        };
        try {
          localStorage.setItem("stillpoint_audiobook_progress", JSON.stringify(updated));
        } catch {
          // ignore storage quota issues
        }
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTrack, currentTime, duration]);

  // Synchronize global audio state
  useEffect(() => {
    if (isPlaying && currentTrack && currentCollection) {
      notifyAudioStarted("audiobook", currentTrack.id);
      setGlobalAudioTrack({
        id: currentTrack.id,
        title: currentTrack.title,
        artist: currentCollection.author.split(",")[0],
        channel: currentCollection.tradition,
        sourceType: "audiobook",
        route: "/audiobooks",
        streamUrl: getAudiobookTrackUrl(currentTrack.relPath),
        isPlaying: true,
      });
    }
  }, [isPlaying, currentTrack, currentCollection]);

  // Pause when other player starts
  useEffect(() => {
    const handleOtherAudio = (e: Event) => {
      const detail = (e as CustomEvent<{ sourceType: string; id?: string }>).detail;
      if (detail && detail.sourceType !== "audiobook") {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("stillpoint-audio-started", handleOtherAudio);
    return () => window.removeEventListener("stillpoint-audio-started", handleOtherAudio);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else if (currentTrack) {
          audioRef.current?.play();
          setIsPlaying(true);
        }
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handleSkip(-15);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleSkip(15);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTrack]);



  return (
    <div className="min-h-screen bg-background text-foreground pb-36">
      {/* Audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onDurationChange={() => {
          if (audioRef.current) setDuration(audioRef.current.duration || 0);
        }}
        onEnded={() => {
          setIsPlaying(false);
          // Auto-play next track in collection
          if (currentTrack && currentCollection) {
            const currentIdx = currentCollection.tracks.findIndex((t) => t.id === currentTrack.id);
            if (currentIdx >= 0 && currentIdx < currentCollection.tracks.length - 1) {
              handlePlayTrack(currentCollection.tracks[currentIdx + 1], currentCollection);
            }
          }
        }}
        onError={() => {
          setAudioError(
            `Unable to stream audio. Ensure local files are in the /audiobook directory or check your custom storage Base URL.`,
          );
          setIsPlaying(false);
        }}
      />

      <div className="container-editorial py-8">
        <Breadcrumbs items={[{ label: "Audiobooks" }]} />

        {/* Hero Section */}
        <div className="mt-8 mb-10 pb-8 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-[0.2em] uppercase bg-foreground text-background font-medium">
                  Pure Audio Sanctum
                </span>
                <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase border border-border opacity-70">
                  {stats.totalCollections} Collections · {stats.totalTracks} Chapters
                </span>
                <span className="inline-block px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-accent border border-accent/40">
                  {stats.totalGigabytes} GB Sacred Archives
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-normal tracking-tight">
                Sacred Audiobooks & Readings
              </h1>
              <p className="font-sans text-sm md:text-base opacity-75 max-w-2xl leading-relaxed">
                Direct pointers, classic texts, and unhurried contemplative readings. Pure spoken
                voice archives from Ramana Maharshi, Nisargadatta, Longchenpa, Dzogchen, Zen, and
                the Christian Mystics.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder={`Search across all ${stats.totalTracks} chapters, sages, or traditions...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 font-mono text-xs bg-surface/40 border border-border rounded-none focus:outline-none focus:border-foreground transition-colors"
            />
            <span className="absolute left-3 top-2.5 opacity-40 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 font-mono text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Audio Error Alert if any */}
        {audioError && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/30 rounded-sm text-xs font-mono">
            <div className="space-y-1">
              <p className="font-bold text-destructive">Audio Streaming Notice</p>
              <p className="opacity-80">{audioError}</p>
            </div>
          </div>
        )}

        {/* Collections Tabs (Hidden when search query is active) */}
        {!searchQuery && (
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 mr-2">
                Traditions:
              </span>
              {SACRED_AUDIOBOOKS.map((col) => {
                const isActive = col.id === activeCollectionId;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setActiveCollectionId(col.id)}
                    className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase border transition-all ${
                      isActive
                        ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                        : "border-border bg-background/50 hover:bg-surface text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <span>{col.author.split(",")[0].trim()}</span>
                    <span className="ml-2 opacity-50">({col.tracks.length})</span>
                  </button>
                );
              })}
            </div>

            {/* Active Collection Card */}
            <div className="p-6 md:p-8 bg-surface/30 border border-border rounded-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase border border-border">
                  {activeCollection.tradition}
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-surface text-foreground/70">
                  Narrated by {activeCollection.narrator}
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase text-accent border border-accent/30">
                  {activeCollection.tracks.length} Tracks ·{" "}
                  {(activeCollection.totalSizeBytes / (1024 * 1024)).toFixed(0)} MB
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{activeCollection.title}</h2>
              <p className="font-sans text-sm opacity-80 max-w-3xl leading-relaxed">
                {activeCollection.description}
              </p>
            </div>
          </div>
        )}

        {/* Search Results Header if query active */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60">
              Found {displayedTracks.length} chapters matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="font-mono text-xs underline opacity-60 hover:opacity-100"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Tracks List */}
        <div className="space-y-1">
          {displayedTracks.map((track, idx) => {
            const isThisTrackPlaying = isPlaying && currentTrack?.id === track.id;
            const isThisTrackSelected = currentTrack?.id === track.id;
            const saved = progress[track.id];
            const hasProgress = saved && saved.time > 10;
            const progressPercent =
              saved && saved.duration > 0 ? (saved.time / saved.duration) * 100 : 0;

            const parentCol =
              "collectionId" in track
                ? SACRED_AUDIOBOOKS.find(
                    (c) => c.id === (track as { collectionId?: string }).collectionId,
                  ) || activeCollection
                : activeCollection;

            return (
              <div
                key={track.id}
                onClick={() => handlePlayTrack(track, parentCol)}
                className={`group flex items-center justify-between p-3.5 md:p-4 rounded-sm border cursor-pointer transition-all ${
                  isThisTrackSelected
                    ? "bg-surface border-foreground/30 shadow-sm"
                    : "border-border/60 hover:border-border hover:bg-surface/40 bg-background/40"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Play Button Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayTrack(track, parentCol);
                    }}
                    className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
                      isThisTrackSelected
                        ? "bg-foreground text-background border-foreground font-bold"
                        : "border-border/80 group-hover:border-foreground bg-surface/50 text-foreground"
                    }`}
                    aria-label={isThisTrackPlaying ? "Pause" : "Play"}
                  >
                    {isThisTrackPlaying ? "⏸" : "▶"}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] opacity-40 w-6">
                        #{track.index.toString().padStart(2, "0")}
                      </span>
                      <h3
                        className={`font-sans text-sm md:text-base font-medium truncate ${
                          isThisTrackSelected ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {track.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 ml-8">
                      {"collectionTitle" in track && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent border border-accent/30 px-1.5 py-0.5">
                          {(track as { collectionTitle?: string }).collectionTitle?.split(":")[0]}
                        </span>
                      )}
                      <span className="font-mono text-[10px] opacity-40">
                        {track.sizeFormatted}
                      </span>

                      {hasProgress && (
                        <span className="font-mono text-[9px] text-accent/80 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                          Resume at {formatTime(saved.time)} ({progressPercent.toFixed(0)}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 ml-4">
                  <a
                    href={getAudiobookTrackUrl(track.relPath)}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-[10px] uppercase tracking-wider opacity-30 hover:opacity-100 transition-opacity p-2"
                    title="Direct Audio Stream / Download"
                  >
                    ⬇
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Persistent Audio Deck (Fixed at bottom) */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-xl">
          <div className="container-editorial py-3">
            {/* Scrubber / Progress Bar */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] opacity-60 w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                className="relative flex-1 h-1.5 bg-surface rounded-full cursor-pointer overflow-hidden group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (audioRef.current && duration > 0) {
                    audioRef.current.currentTime = pos * duration;
                  }
                }}
              >
                <div
                  className="absolute top-0 bottom-0 left-0 bg-foreground group-hover:bg-accent transition-colors"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <span className="font-mono text-[10px] opacity-60 w-12">{formatTime(duration)}</span>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Now Playing info */}
              <div className="min-w-0 flex-1 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-sans text-sm font-medium truncate">{currentTrack.title}</p>
                  <p className="font-mono text-[10px] opacity-60 truncate">
                    {currentCollection?.author.split(",")[0]} · {currentCollection?.tradition}
                  </p>
                </div>
              </div>

              {/* Player Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSkip(-15)}
                  className="px-2.5 py-1 font-mono text-[10px] tracking-wider border border-border/80 hover:border-foreground rounded-sm transition-colors"
                  title="Rewind 15 seconds (Left Arrow)"
                >
                  -15s
                </button>

                <button
                  type="button"
                  onClick={() => handlePlayTrack(currentTrack, currentCollection)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background font-bold text-sm shadow hover:scale-105 transition-transform"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  type="button"
                  onClick={() => handleSkip(15)}
                  className="px-2.5 py-1 font-mono text-[10px] tracking-wider border border-border/80 hover:border-foreground rounded-sm transition-colors"
                  title="Forward 15 seconds (Right Arrow)"
                >
                  +15s
                </button>
              </div>

              {/* Auxiliary Tools: Speed, Sleep Timer, Volume */}
              <div className="flex items-center gap-3 justify-end">
                {/* Playback Speed */}
                <div className="relative">
                  <select
                    value={playbackRate}
                    onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                    className="font-mono text-[10px] uppercase bg-surface/50 border border-border px-2 py-1 rounded-sm focus:outline-none cursor-pointer"
                    title="Playback Speed"
                  >
                    <option value="0.75">0.75×</option>
                    <option value="1">1.0×</option>
                    <option value="1.25">1.25×</option>
                    <option value="1.5">1.5×</option>
                  </select>
                </div>

                {/* Sleep Timer */}
                <div className="relative">
                  <select
                    value={sleepTimer || ""}
                    onChange={(e) =>
                      setTimerMinutes(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className={`font-mono text-[10px] uppercase bg-surface/50 border px-2 py-1 rounded-sm focus:outline-none cursor-pointer ${
                      sleepTimeLeft !== null ? "border-accent text-accent" : "border-border"
                    }`}
                    title="Sleep Timer"
                  >
                    <option value="">Timer: Off</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                  </select>
                </div>

                {sleepTimeLeft !== null && (
                  <span className="font-mono text-[9px] text-accent animate-pulse hidden md:inline">
                    ({Math.ceil(sleepTimeLeft / 60)}m left)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
