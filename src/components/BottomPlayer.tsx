import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  useActiveAudioTrack,
  setGlobalAudioTrack,
  notifyAudioStarted,
  type ActiveAudioTrack,
} from "@/lib/audio-player-state";
import { getContentAudioUrls } from "@/lib/media";
import { CONTENT } from "@/data/content";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

interface BottomPlayerProps {
  track?: ActiveAudioTrack | null;
}

export function BottomPlayer({ track: propTrack }: BottomPlayerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const activeTrack = useActiveAudioTrack();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Resolved current item: activeTrack or propTrack or default to first transmission
  const current: ActiveAudioTrack = useMemo(() => {
    if (propTrack) return propTrack;
    if (activeTrack) return activeTrack;
    const defaultItem = CONTENT[0];
    return {
      id: defaultItem.id,
      title: defaultItem.title,
      artist: defaultItem.artist_or_speaker,
      channel: defaultItem.channel,
      sourceType: "transmission",
      route: `/listen/${defaultItem.id}`,
      streamUrl: getContentAudioUrls({ id: defaultItem.id, youtube_video_id: defaultItem.youtube_video_id })[0],
      isPlaying: false,
    };
  }, [propTrack, activeTrack]);

  // Resolve stream URL for current track
  const streamUrl = useMemo(() => {
    if (current.streamUrl) return current.streamUrl;
    if (current.id) {
      return getContentAudioUrls({ id: current.id, youtube_video_id: current.id })[0] || "";
    }
    return "";
  }, [current]);

  // Sync isPlaying state with activeTrack
  useEffect(() => {
    if (activeTrack) {
      setIsPlaying(activeTrack.isPlaying);
    }
  }, [activeTrack]);

  // Pause when another audio player starts playing elsewhere
  useEffect(() => {
    const handleOtherAudio = (e: Event) => {
      const detail = (e as CustomEvent<{ sourceType: string; id?: string }>).detail;
      if (detail && detail.sourceType !== "bottom-player") {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("stillpoint-audio-started", handleOtherAudio);
    return () => window.removeEventListener("stillpoint-audio-started", handleOtherAudio);
  }, []);

  // Update audio source when streamUrl changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    const wasPlaying = isPlaying;
    if (audio.src !== streamUrl) {
      audio.src = streamUrl;
      audio.load();
      if (wasPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [streamUrl]);

  // Toggle play/pause directly inside bottom player
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setGlobalAudioTrack({ ...current, isPlaying: false });
    } else {
      notifyAudioStarted("bottom-player", current.id);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setGlobalAudioTrack({ ...current, streamUrl, isPlaying: true });
        })
        .catch((err) => {
          console.warn("Playback error in bottom player:", err);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, current, streamUrl]);

  // Skip to next transmission
  const handleNext = useCallback(() => {
    const currentIndex = CONTENT.findIndex((c) => c.id === current.id);
    const nextIndex = (currentIndex + 1) % CONTENT.length;
    const nextItem = CONTENT[nextIndex];
    const nextUrl = getContentAudioUrls({
      id: nextItem.id,
      youtube_video_id: nextItem.youtube_video_id,
    })[0];

    const newTrack: ActiveAudioTrack = {
      id: nextItem.id,
      title: nextItem.title,
      artist: nextItem.artist_or_speaker,
      channel: nextItem.channel,
      sourceType: "transmission",
      route: `/listen/${nextItem.id}`,
      streamUrl: nextUrl,
      isPlaying: true,
    };

    setGlobalAudioTrack(newTrack);
    notifyAudioStarted("bottom-player", nextItem.id);

    if (audioRef.current) {
      audioRef.current.src = nextUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [current]);

  // Skip to previous transmission
  const handlePrev = useCallback(() => {
    const currentIndex = CONTENT.findIndex((c) => c.id === current.id);
    const prevIndex = (currentIndex - 1 + CONTENT.length) % CONTENT.length;
    const prevItem = CONTENT[prevIndex];
    const prevUrl = getContentAudioUrls({
      id: prevItem.id,
      youtube_video_id: prevItem.youtube_video_id,
    })[0];

    const newTrack: ActiveAudioTrack = {
      id: prevItem.id,
      title: prevItem.title,
      artist: prevItem.artist_or_speaker,
      channel: prevItem.channel,
      sourceType: "transmission",
      route: `/listen/${prevItem.id}`,
      streamUrl: prevUrl,
      isPlaying: true,
    };

    setGlobalAudioTrack(newTrack);
    notifyAudioStarted("bottom-player", prevItem.id);

    if (audioRef.current) {
      audioRef.current.src = prevUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [current]);

  // Handle timeline scrubber click
  const handleScrub = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pos * audio.duration;
    setCurrentTime(audio.currentTime);
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  if (isDismissed) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom shadow-2xl transition-all">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration || 0);
        }}
        onEnded={handleNext}
        onError={() => setIsPlaying(false)}
      />

      {/* Mini Scrubber Bar on top border */}
      <div
        className="w-full h-1 bg-surface cursor-pointer relative group overflow-hidden"
        onClick={handleScrub}
        title="Seek position"
      >
        <div
          className="absolute top-0 bottom-0 left-0 bg-accent group-hover:bg-foreground transition-all duration-100"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="container-editorial py-2.5 md:py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Track Information & Link */}
          <Link
            to={current.route}
            className="flex items-center gap-3 flex-1 min-w-0 group"
            title="Open sanctuary deck"
          >
            {/* Animated Audio Icon */}
            <div
              className={`w-10 h-10 rounded-sm bg-surface overflow-hidden border border-border/80 shrink-0 group-hover:border-accent transition-all flex items-center justify-center text-accent ${
                isPlaying ? "border-accent shadow-sm" : ""
              }`}
            >
              <span className={`font-mono text-xs ${isPlaying ? "animate-pulse" : "opacity-60"}`}>
                {isPlaying ? "◉" : "◈"}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-medium">
                  {isPlaying ? "Now Playing" : "Deck Standby"}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest opacity-40 hidden sm:inline">
                  · {current.sourceType === "audiobook" ? "Audiobook" : current.sourceType === "discourse" ? "Discourse" : "Pure Audio"}
                </span>
              </div>
              <p className="font-display text-sm truncate group-hover:text-accent transition-colors">
                {current.title}
              </p>
              <p className="font-mono text-[10px] opacity-60 truncate">
                {current.artist} {current.channel ? `· ${current.channel}` : ""}
              </p>
            </div>
          </Link>

          {/* Center: Play / Pause & Skip Controls for Readers */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 font-mono text-xs opacity-60 hover:opacity-100 transition-opacity hidden sm:inline-flex"
              title="Previous Track"
              aria-label="Previous Track"
            >
              ⏮
            </button>

            {/* Direct Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs md:text-sm hover:scale-105 transition-transform shadow-md hover:bg-accent"
              title={isPlaying ? "Pause audio" : "Play contemplative audio while reading"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 font-mono text-xs opacity-60 hover:opacity-100 transition-opacity hidden sm:inline-flex"
              title="Next Track"
              aria-label="Next Track"
            >
              ⏭
            </button>

            {/* Time Indicator */}
            <div className="font-mono text-[10px] opacity-60 hidden md:block w-20 text-center">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity hidden sm:inline-flex"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            {/* Open Deck Link */}
            <Link
              to={current.route}
              className="px-3 py-1.5 bg-surface border border-border/80 font-mono text-[9px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              title="Open full sanctuary player"
            >
              Open Deck ↗
            </Link>

            {/* Dismiss Player */}
            <button
              type="button"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlaying(false);
                setIsDismissed(true);
              }}
              className="p-1.5 font-mono text-xs opacity-40 hover:opacity-100 transition-opacity"
              title="Dismiss player bar"
              aria-label="Dismiss player bar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
