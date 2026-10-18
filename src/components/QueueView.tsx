import { Link } from "@tanstack/react-router";
import { CONTENT } from "@/data/content";

interface QueueViewProps {
  items: string[];
  currentIndex: number;
  onRemove?: (id: string) => void;
}

export function QueueView({ items, currentIndex, onRemove }: QueueViewProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 opacity-50">
        <p className="font-mono text-sm">Queue is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((id, index) => {
        const item = CONTENT.find((c) => c.id === id);
        if (!item) return null;

        const isCurrent = index === currentIndex;

        return (
          <div
            key={id}
            className={`flex items-center gap-4 py-3 px-4 ${
              isCurrent ? "bg-surface border-l-2 border-accent" : "border-l-2 border-transparent"
            }`}
          >
            <span className="font-mono text-xs opacity-50 w-6">{index + 1}</span>
            <div className="flex-1 min-w-0">
              <Link
                to="/listen/$id"
                params={{ id }}
                className="font-display text-sm truncate block hover:text-accent transition-colors"
              >
                {item.title}
              </Link>
              <p className="font-mono text-xs opacity-60 truncate">{item.artist_or_speaker}</p>
            </div>
            {onRemove && !isCurrent && (
              <button
                onClick={() => onRemove(id)}
                className="p-1 opacity-0 hover:opacity-100 transition-opacity"
                aria-label="Remove from queue"
              >
                <span className="text-sm">×</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
