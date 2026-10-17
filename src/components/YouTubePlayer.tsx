interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
}

export function YouTubePlayer({ videoId, autoplay = false }: YouTubePlayerProps) {
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&playsinline=1&rel=0`;

  return (
    <div className="aspect-video w-full bg-surface">
      <iframe
        src={src}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </div>
  );
}
