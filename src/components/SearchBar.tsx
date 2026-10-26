import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";
import { LIBRARY_ITEMS } from "@/data/library";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: "audio" | "article" | "book";
  route: string;
  params: Record<string, string>;
}

interface SearchBarProps {
  onSelect?: () => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);

    if (q.length > 0) {
      const audioResults: SearchResult[] = CONTENT.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.artist_or_speaker.toLowerCase().includes(q) ||
          item.channel.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q)),
      ).map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.artist_or_speaker} · ${item.channel}`,
        type: "audio" as const,
        route: "/listen/$id",
        params: { id: item.id },
      }));

      const articleResults: SearchResult[] = POSTS.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.topic.toLowerCase().includes(q) ||
          post.tags?.some((tag: string) => tag.toLowerCase().includes(q)),
      ).map((post) => ({
        id: post.slug,
        title: post.title,
        subtitle: `${post.topic} · ${post.readMinutes} min read`,
        type: "article" as const,
        route: "/teachings/$slug",
        params: { slug: post.slug },
      }));

      const bookResults: SearchResult[] = LIBRARY_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.tradition?.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q)),
      ).map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.author} · ${item.format}`,
        type: "book" as const,
        route: "/library",
        params: {},
      }));

      const allResults = [...audioResults, ...articleResults, ...bookResults].slice(0, 15);
      setResults(allResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    if (onSelect) {
      onSelect();
    } else if (result.route === "/listen/$id") {
      navigate({ to: "/listen/$id", params: { id: result.params.id } });
    } else if (result.route === "/teachings/$slug") {
      navigate({ to: "/teachings/$slug", params: { slug: result.params.slug } });
    } else if (result.route === "/library") {
      navigate({ to: "/library" });
    }
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "audio":
        return "text-accent";
      case "article":
        return "text-blue-400";
      case "book":
        return "text-green-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search audio, articles, books..."
        className="w-full px-4 py-3 bg-surface border border-border font-mono text-sm focus:outline-none focus:border-accent transition-colors"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-surface transition-colors border-b border-border last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-display text-sm">{item.title}</p>
                  <p className="font-mono text-xs opacity-60 mt-1">{item.subtitle}</p>
                </div>
                <span
                  className={`font-mono text-[9px] tracking-widest uppercase ${getTypeColor(item.type)}`}
                >
                  {item.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
