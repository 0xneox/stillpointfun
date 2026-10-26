import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useActiveAudioTrack, type ActiveAudioTrack } from "@/lib/audio-player-state";

interface BottomPlayerProps {
  track?: ActiveAudioTrack | null;
}

export function BottomPlayer({ track: propTrack }: BottomPlayerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const activeTrack = useActiveAudioTrack();
  const current = propTrack ?? activeTrack;

  // Only display if there is a currently playing or active track, and not dismissed
  if (!current || !current.isPlaying || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom shadow-2xl">
      <div className="container-editorial">
        <div className="flex items-center justify-between py-3.5 gap-4">
          {/* Track details & Link to deck */}
          <Link
            to={current.route}
            className="flex items-center gap-3.5 flex-1 min-w-0 group"
          >
            {/* Track artwork thumbnail */}
            <div className="w-11 h-11 rounded-sm bg-surface overflow-hidden border border-border/80 shrink-0 group-hover:border-accent transition-colors flex items-center justify-center text-accent">
              <span className="font-mono text-xs">◈</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] uppercase tracking-widest text-accent font-medium">
                  Now Playing
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest opacity-40">
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

          {/* Quick actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to={current.route}
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
