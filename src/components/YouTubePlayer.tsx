// Deprecated component — Stillpoint now runs on pure native Opus audio.
interface AudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
}

export function YouTubePlayer({ src, autoPlay = false }: AudioPlayerProps) {
  return (
    <div className="w-full bg-surface p-4 border border-border">
      <audio src={src} autoPlay={autoPlay} controls className="w-full" />
    </div>
  );
}
