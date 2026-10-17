import { useState, useRef, useEffect } from "react";

interface EnhancedPlayerProps {
  videoId: string;
  title: string;
  artist: string;
  autoplay?: boolean;
}

export function EnhancedPlayer({ videoId, title, artist, autoplay = false }: EnhancedPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the YouTube player API
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    // In a real implementation, this would seek the YouTube player
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 100 : 0);
  };

  return (
    <div className="space-y-4">
      {/* YouTube Embed */}
      <div className="aspect-video w-full bg-surface rounded-sm overflow-hidden">
        <iframe
          ref={playerRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&playsinline=1&rel=0&enablejsapi=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Listening to ${title} by ${artist}`}
        />
      </div>

      {/* Player Controls */}
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs opacity-60 w-12">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-border appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-accent"
          />
          <span className="font-mono text-xs opacity-60 w-12">{formatTime(duration)}</span>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-3 bg-foreground text-background hover:bg-accent transition-colors rounded-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <span className="text-xl">❚❚</span> : <span className="text-xl">▶</span>}
            </button>
            <button
              className="p-2 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Previous"
            >
              <span className="text-lg">◀</span>
            </button>
            <button
              className="p-2 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Next"
            >
              <span className="text-lg">▶</span>
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 opacity-60 hover:opacity-100 transition-opacity"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <span className="text-lg">{isMuted ? "🔇" : "🔊"}</span>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-border appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
