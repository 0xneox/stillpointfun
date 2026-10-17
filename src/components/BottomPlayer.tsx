import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface BottomPlayerProps {
  currentItem?: {
    id: string;
    title: string;
    artist_or_speaker: string;
    channel: string;
    youtube_video_id: string;
  };
}

export function BottomPlayer({ currentItem }: BottomPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentItem) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="container-editorial">
        {/* Compact view */}
        {!isExpanded && (
          <div className="flex items-center justify-between py-4 gap-4">
            <Link
              to="/listen/$id"
              params={{ id: currentItem.id }}
              className="flex items-center gap-4 flex-1 min-w-0"
            >
              <div className="w-12 h-12 bg-surface rounded-sm flex items-center justify-center flex-shrink-0 touch-manipulation">
                <img
                  src={`https://img.youtube.com/vi/${currentItem.youtube_video_id}/default.jpg`}
                  alt={currentItem.title}
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm truncate">{currentItem.title}</p>
                <p className="font-mono text-[10px] opacity-60 truncate">
                  {currentItem.artist_or_speaker}
                </p>
              </div>
            </Link>
            <button
              onClick={() => setIsExpanded(true)}
              className="p-3 opacity-60 hover:opacity-100 transition-opacity touch-manipulation"
              aria-label="Expand player"
            >
              <span className="text-xl">▲</span>
            </button>
          </div>
        )}

        {/* Expanded view */}
        {isExpanded && (
          <div className="py-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <p className="font-display text-2xl truncate">{currentItem.title}</p>
                <p className="font-mono text-sm opacity-60 mt-1">
                  {currentItem.artist_or_speaker} · {currentItem.channel}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-3 opacity-60 hover:opacity-100 transition-opacity ml-4 touch-manipulation"
                aria-label="Collapse player"
              >
                <span className="text-xl">▼</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-8">
              <button className="p-4 opacity-60 hover:opacity-100 transition-opacity touch-manipulation">
                <span className="text-xl">◀</span>
              </button>
              <button className="p-6 bg-foreground text-background hover:bg-accent transition-colors touch-manipulation">
                <span className="text-2xl">▶</span>
              </button>
              <button className="p-4 opacity-60 hover:opacity-100 transition-opacity touch-manipulation">
                <span className="text-xl">▶</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
