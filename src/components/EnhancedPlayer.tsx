import { useState, useRef, useEffect, useCallback } from "react";
import { getMediaBaseUrl } from "@/lib/media";

interface EnhancedPlayerProps {
  videoId?: string;
  audioUrl?: string;
  itemId?: string;
  title: string;
  artist: string;
  channel?: string;
  autoplay?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function EnhancedPlayer({
  videoId,
  audioUrl,
  itemId,
  title,
  artist,
  channel,
  autoplay = false,
  onNext,
  onPrev,
  hasPrev = false,
  hasNext = false,
}: EnhancedPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Compute resolved stream URL
  const resolvedUrl = useCallback(() => {
    if (audioUrl) return audioUrl;
    const base = getMediaBaseUrl();
    if (base && itemId) {
      return `${base}/audio/${itemId}.opus`;
    }
    if (base && videoId) {
      return `${base}/audio/${videoId}.opus`;
    }
    if (itemId) {
      return `/audio/${itemId}.opus`;
    }
    if (videoId) {
      return `/audio/${videoId}.opus`;
    }
    return "";
  }, [audioUrl, itemId, videoId]);

  const currentStreamUrl = resolvedUrl();

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Sync audio source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioError(null);
    setCurrentTime(0);

    if (currentStreamUrl) {
      audio.src = currentStreamUrl;
      audio.load();
      if (autoplay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentStreamUrl, autoplay]);

  // Sync volume and speed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume / 100;
    audio.playbackRate = playbackSpeed;
    audio.loop = isLooping;
  }, [volume, isMuted, playbackSpeed, isLooping]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
        })
        .catch((err) => {
          console.warn("Autoplay / audio playback prevented:", err);
          setIsPlaying(false);
          setAudioError("Audio stream is connecting or format is loading.");
        });
    }
  };

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipSeconds = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    handleSeek(target);
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-surface border border-border rounded-sm p-6 md:p-8 space-y-6">
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          if (onNext) onNext();
        }}
        onError={() => {
          // Keep state resilient
          setAudioError("Cloudflare Opus stream not yet uploaded or offline.");
        }}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase text-accent font-semibold">
              PURE AUDIO STREAM
            </span>
            {channel && (
              <span className="font-mono text-[9px] tracking-widest uppercase opacity-40">
                · {channel}
              </span>
            )}
            <span className="font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 bg-accent/10 text-accent rounded">
              OPUS
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-balance truncate">{title}</h2>
          <p className="font-mono text-xs opacity-60 truncate">{artist}</p>
        </div>

        {/* Visualizer Disc */}
        <div className="shrink-0 flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all ${
              isPlaying ? "animate-[spin_10s_linear_infinite] border-accent" : "opacity-40"
            }`}
          >
            <div className="w-4 h-4 rounded-full border border-accent/40 bg-accent/20" />
          </div>
        </div>
      </div>

      {audioError && (
        <div className="p-3 bg-surface border border-border text-xs font-mono opacity-70 rounded flex items-center justify-between">
          <span>{audioError}</span>
          <span className="opacity-40 text-[10px]">Awaiting Cloudflare .opus upload</span>
        </div>
      )}

      {/* Scrubber Progress Bar */}
      <div className="space-y-2">
        <div
          className="relative h-2 bg-background border border-border/80 rounded-full cursor-pointer overflow-hidden touch-manipulation group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            if (duration > 0) {
              handleSeek(clickPos * duration);
            }
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 bg-accent transition-all group-hover:brightness-110"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center font-mono text-[11px] opacity-50">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Speed & Loop */}
        <div className="flex items-center gap-2">
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 text-[10px] font-mono border border-border/80 hover:border-foreground transition-colors rounded"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`px-2.5 py-1 text-[10px] font-mono border rounded transition-colors ${
              isLooping ? "border-accent text-accent bg-accent/10" : "border-border/80 opacity-60"
            }`}
            title="Loop Track"
          >
            Loop
          </button>
        </div>

        {/* Center transport buttons */}
        <div className="flex items-center gap-3">
          {hasPrev && onPrev && (
            <button
              onClick={onPrev}
              className="p-2 border border-border hover:border-foreground transition-colors rounded font-mono text-xs"
              aria-label="Previous track"
            >
              ⏮
            </button>
          )}

          <button
            onClick={() => skipSeconds(-15)}
            className="p-2 border border-border hover:border-foreground transition-colors rounded font-mono text-xs opacity-70"
            title="Rewind 15 seconds"
          >
            -15s
          </button>

          <button
            onClick={togglePlay}
            className="px-6 py-3 bg-foreground text-background font-mono text-xs tracking-widest uppercase hover:bg-accent hover:text-foreground transition-all rounded font-semibold shadow-md"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <button
            onClick={() => skipSeconds(15)}
            className="p-2 border border-border hover:border-foreground transition-colors rounded font-mono text-xs opacity-70"
            title="Forward 15 seconds"
          >
            +15s
          </button>

          {hasNext && onNext && (
            <button
              onClick={onNext}
              className="p-2 border border-border hover:border-foreground transition-colors rounded font-mono text-xs"
              aria-label="Next track"
            >
              ⏭
            </button>
          )}
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-xs font-mono opacity-60 hover:opacity-100"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 md:w-20 accent-accent cursor-pointer h-1 bg-border rounded"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
