import { useState, useRef, useEffect, useCallback, useId } from "react";

// Declare YT global on window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface EnhancedPlayerProps {
  videoId: string;
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
  const [isSeeking, setIsSeeking] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const playerRef = useRef<any>(null);
  const pollIntervalRef = useRef<any>(null);
  const playerId = `yt-audio-${useId().replace(/:/g, "")}`;

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

  // Initialize YouTube IFrame API
  useEffect(() => {
    let isCancelled = false;

    const initPlayer = () => {
      if (isCancelled || !window.YT || !window.YT.Player) return;
      const targetEl = document.getElementById(playerId);
      if (!targetEl) return;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }

      try {
        playerRef.current = new window.YT.Player(playerId, {
          height: "1",
          width: "1",
          videoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 0,
            playsinline: 1,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (isCancelled) return;
              event.target.setVolume(volume);
              const dur = event.target.getDuration();
              if (dur) setDuration(dur);
              if (autoplay) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              if (isCancelled) return;
              // YT.PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering
              if (event.data === 1) {
                setIsPlaying(true);
                const dur = event.target.getDuration();
                if (dur) setDuration(dur);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                setIsPlaying(false);
                if (onNext) onNext();
              }
            },
          },
        });
      } catch (err) {
        console.error("Error creating YouTube audio engine:", err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Load script if not already added
      const existingScript = document.getElementById("yt-iframe-api-script");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      isCancelled = true;
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [playerId, videoId]);

  // Track playback time
  useEffect(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);

    if (isPlaying && !isSeeking) {
      pollIntervalRef.current = setInterval(() => {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          try {
            const time = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (typeof time === "number" && !isNaN(time)) {
              setCurrentTime(time);
            }
            if (typeof dur === "number" && !isNaN(dur) && dur > 0) {
              setDuration(dur);
            }
          } catch {}
        }
      }, 500);
    }

    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [isPlaying, isSeeking]);

  // Controls
  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.error("Play toggle error:", e);
    }
  };

  const handleSkip = (seconds: number) => {
    if (!playerRef.current) return;
    try {
      const target = Math.max(0, Math.min(duration || 0, currentTime + seconds));
      playerRef.current.seekTo(target, true);
      setCurrentTime(target);
    } catch {}
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const handleSeekCommit = () => {
    setIsSeeking(false);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      try {
        playerRef.current.seekTo(currentTime, true);
      } catch {}
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value, 10);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (playerRef.current) {
      try {
        playerRef.current.setVolume(vol);
        if (vol > 0 && playerRef.current.isMuted()) {
          playerRef.current.unMute();
        }
      } catch {}
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        setIsMuted(false);
        playerRef.current.unMute();
        playerRef.current.setVolume(volume || 80);
      } else {
        setIsMuted(true);
        playerRef.current.mute();
      }
    } catch {}
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === "function") {
      try {
        playerRef.current.setPlaybackRate(speed);
      } catch {}
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full relative">
      {/* Invisible YouTube Audio Engine (Tiny 1x1 div in DOM with zero visual footprint) */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0.001,
          pointerEvents: "none",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        <div id={playerId} />
      </div>

      {/* SEXY AUDIO PLAYER CONSOLE (ZERO VIDEO DISPLAYED) */}
      <div className="p-6 md:p-10 bg-surface/50 backdrop-blur-md border border-border rounded-xl shadow-2xl space-y-8 relative overflow-hidden group">
        {/* Ambient Glow */}
        <div
          className={`absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none transition-opacity duration-1000 ${
            isPlaying ? "opacity-100" : "opacity-30"
          }`}
        />

        {/* Top Header: Track Meta & Artwork */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8 relative z-10">
          {/* Album Artwork with Sound Aura */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border border-border/80 shadow-2xl relative group-hover:border-accent/60 transition-colors">
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Pulsing On-Air Indicator */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPlaying ? "bg-accent animate-pulse" : "bg-white/40"
                  }`}
                />
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/90">
                  {isPlaying ? "Live Audio" : "Paused"}
                </span>
              </div>
            </div>
          </div>

          {/* Track Information */}
          <div className="flex-1 min-w-0 text-center sm:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 bg-accent/15 text-accent font-mono text-[9px] tracking-widest uppercase rounded font-medium border border-accent/20">
                Pure Audio Transmission
              </span>
              {channel && (
                <span className="px-2.5 py-0.5 bg-surface text-foreground/70 font-mono text-[9px] tracking-wider uppercase border border-border rounded">
                  Channel · {channel}
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground font-normal text-balance">
              {title}
            </h2>

            <p className="font-mono text-sm opacity-70 tracking-wide">{artist}</p>

            {/* Audio Waveform / Spectrum Animation */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-1 h-6">
              {[40, 75, 55, 90, 60, 30, 85, 45, 95, 65, 35, 80, 50, 70, 40].map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-accent/60 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.8)))}%` : "15%",
                    opacity: isPlaying ? 0.85 : 0.25,
                    animation: isPlaying
                      ? `pulse ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate`
                      : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Progress Bar & Duration */}
        <div className="space-y-2 relative z-10">
          <div className="relative group/timeline flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onMouseDown={() => setIsSeeking(true)}
              onTouchStart={() => setIsSeeking(true)}
              onChange={handleSeekChange}
              onMouseUp={handleSeekCommit}
              onTouchEnd={handleSeekCommit}
              className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
              style={{
                background: `linear-gradient(to right, var(--color-accent, #c99c4e) ${progressPercent}%, var(--color-border, #e5e5e5) ${progressPercent}%)`,
              }}
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[11px] opacity-60">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>

        {/* Main Controls Console */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 relative z-10 border-t border-border/60">
          {/* Secondary Controls: Speed */}
          <div className="flex items-center gap-1.5 order-2 sm:order-1">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 mr-1">
              Speed:
            </span>
            {[0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-0.5 rounded font-mono text-[10px] transition-colors ${
                  playbackSpeed === speed
                    ? "bg-accent text-white font-medium shadow-sm"
                    : "opacity-60 hover:opacity-100 hover:bg-surface"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Central Playback Cluster */}
          <div className="flex items-center gap-3 md:gap-4 order-1 sm:order-2">
            {/* Previous Track */}
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                className="p-2.5 rounded-full border border-border hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-all hover-lift"
                title="Previous transmission"
              >
                <span className="font-mono text-xs">⏮</span>
              </button>
            )}

            {/* Skip -15s */}
            <button
              type="button"
              onClick={() => handleSkip(-15)}
              className="px-2.5 py-1.5 rounded border border-border/80 hover:border-foreground font-mono text-[10px] tracking-wider opacity-75 hover:opacity-100 transition-colors"
              title="Rewind 15 seconds"
            >
              -15s
            </button>

            {/* Big Sexy Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-foreground text-background hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center press-scale"
              aria-label={isPlaying ? "Pause transmission" : "Play transmission"}
            >
              {isPlaying ? (
                <span className="text-xl">❚❚</span>
              ) : (
                <span className="text-2xl ml-1">▶</span>
              )}
            </button>

            {/* Skip +15s */}
            <button
              type="button"
              onClick={() => handleSkip(15)}
              className="px-2.5 py-1.5 rounded border border-border/80 hover:border-foreground font-mono text-[10px] tracking-wider opacity-75 hover:opacity-100 transition-colors"
              title="Fast forward 15 seconds"
            >
              +15s
            </button>

            {/* Next Track */}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className="p-2.5 rounded-full border border-border hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-all hover-lift"
                title="Next transmission"
              >
                <span className="font-mono text-xs">⏭</span>
              </button>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2.5 order-3">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 opacity-60 hover:opacity-100 transition-opacity font-mono text-xs"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 md:w-24 h-1.5 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="font-mono text-[9px] opacity-40 w-6 text-right">
              {isMuted ? "0%" : `${volume}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
