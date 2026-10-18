import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CONTENT } from "@/data/content";

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
  const [isDismissed, setIsDismissed] = useState(false);

  if (!currentItem || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom shadow-2xl">
      <div className="container-editorial">
        <div className="flex items-center justify-between py-3.5 gap-4">
          {/* Track details & Link to sanctuary */}
          <Link
            to="/listen/$id"
            params={{ id: currentItem.id }}
            className="flex items-center gap-3.5 flex-1 min-w-0 group"
          >
            {/* Track artwork thumbnail */}
            <div className="w-11 h-11 rounded-sm bg-surface overflow-hidden border border-border/80 shrink-0 group-hover:border-accent transition-colors flex items-center justify-center">
              <img
                src={`https://img.youtube.com/vi/${currentItem.youtube_video_id}/default.jpg`}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-medium">
                  Now Playing
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                  · Pure Audio
                </span>
              </div>
              <p className="font-display text-sm truncate group-hover:text-accent transition-colors">
                {currentItem.title}
              </p>
              <p className="font-mono text-[10px] opacity-60 truncate">
                {currentItem.artist_or_speaker} · {currentItem.channel}
              </p>
            </div>
          </Link>

          {/* Quick actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/listen/$id"
              params={{ id: currentItem.id }}
              className="px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:bg-accent transition-colors"
            >
              Open Deck ↗
            </Link>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1.5 font-mono text-xs opacity-40 hover:opacity-100 transition-opacity"
              title="Dismiss player bar"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
