import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CONTENT } from "@/data/content";
import { POSTS } from "@/data/posts";
import {
  SACRED_LIBRARY,
  LIBRARY_CATEGORIES,
  getLibraryPdfUrl,
  getTotalLibraryStats,
  type LibraryDocument,
} from "@/data/library";

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  translator?: string;
  tradition?: string;
  language?: string;
  format: "book" | "pdf" | "audiobook" | "lecture" | "paper";
  category?: string;
  description?: string;
  sourceUrl?: string;
  downloadUrl?: string;
  fileName?: string;
  sizeBytes?: number;
  sizeFormatted?: string;
  tags: string[];
  relatedAudio?: string[];
  relatedArticles?: string[];
}

export const FOUNDATIONAL_BOOKS: LibraryItem[] = [
  {
    id: "tantraloka",
    title: "Tantrāloka",
    author: "Abhinavagupta",
    translator: "Various",
    tradition: "Kashmir Śaivism",
    category: "Kashmir Shaivism & Tantra",
    language: "Sanskrit / English",
    format: "book",
    description:
      "Abhinavagupta's magnum opus on Kashmir Śaivism. 12 volumes covering the entire non-dual tantric tradition.",
    tags: ["abhinavagupta", "kashmir-shaivism", "tantra", "philosophy"],
    sourceUrl: "https://archive.org/details/tantraloka",
  },
  {
    id: "upanishads",
    title: "Principal Upaniṣads",
    author: "Traditional",
    translator: "Eknath Easwaran",
    tradition: "Vedanta",
    category: "Vedas & Upanishads",
    language: "Sanskrit / English",
    format: "book",
    description: "The principal Upaniṣads with accessible translations into luminous English.",
    tags: ["upanishads", "vedanta", "advaita", "scripture"],
    sourceUrl: "https://archive.org/details/in.ernet.dli.2015.148291",
  },
  {
    id: "ashtavakra-gita",
    title: "Aṣṭāvakra Gītā",
    author: "Traditional",
    translator: "Bart Marshall",
    tradition: "Advaita",
    category: "Advaita Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description: "The unsparing dialogue between King Janaka and sage Aṣṭāvakra on the instantaneous nature of reality.",
    tags: ["advaita", "non-duality", "ashtavakra", "dialogue"],
    sourceUrl: "https://archive.org/details/AshtavakraGitaEbook",
  },
  {
    id: "spanda-karikas",
    title: "Spanda-Kārikās",
    author: "Vasugupta",
    translator: "Jaideva Singh",
    tradition: "Kashmir Śaivism",
    category: "Kashmir Shaivism & Tantra",
    language: "Sanskrit / English",
    format: "book",
    description: "The sacred tremor. Understanding Spanda as the living throb and pulse of pure consciousness.",
    tags: ["spanda", "kashmir-shaivism", "vasugupta", "consciousness"],
    sourceUrl: "https://ia803100.us.archive.org/35/items/spandakarikasthedivinecreativepulsation/Spanda%20karikas%20the%20divine%20creative%20pulsation.pdf",
  },
  {
    id: "vivekachudamani",
    title: "Vivekacūḍāmaṇi",
    author: "Adi Shankaracharya",
    translator: "Swami Madhavananda",
    tradition: "Advaita Vedanta",
    category: "Advaita Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description: "The Crest Jewel of Discrimination. A quintessential foundation of self-inquiry and discernment.",
    tags: ["advaita", "shankara", "self-inquiry", "discrimination"],
    sourceUrl: "https://archive.org/details/shankarascrestje0000sank",
  },
  {
    id: "tripura-rahasya",
    title: "Tripura Rahasya",
    author: "Traditional",
    translator: "Swami Sri Ramanananda Saraswathi",
    tradition: "Advaita / Shaktism",
    category: "Kashmir Shaivism & Tantra",
    language: "Sanskrit / English",
    format: "book",
    description:
      "The Secret of the Three Cities. A profound dialogue revealing all phenomena as reflections in the mirror of Pure Awareness.",
    tags: ["advaita", "tripura", "non-duality", "practice"],
    sourceUrl: "https://archive.org/details/tripurarahasyaramanandasaraswathi_202004_485_z",
  },
  {
    id: "yoga-vasistha",
    title: "Yoga Vāsiṣṭha",
    author: "Valmiki",
    translator: "Swami Venkatesananda",
    tradition: "Advaita Vedanta",
    category: "Advaita Vedanta",
    language: "Sanskrit / English",
    format: "book",
    description:
      "The monumental dialogue between Rama and sage Vasistha illustrating that the world is mind-born and freedom is self-knowledge.",
    tags: ["advaita", "vasistha", "non-duality", "dialogue"],
    sourceUrl: "https://dn760106.eu.archive.org/0/items/YogaVasishtaOfValmikiValmiki/Yoga%20Vasishta%20of%20Valmiki%20-%20Valmiki.pdf",
  },
];

// Convert the 88 archival PDFs into standard LibraryItems
export const ARCHIVAL_PDF_ITEMS: LibraryItem[] = SACRED_LIBRARY.map((doc: LibraryDocument) => {
  const resolvedUrl = getLibraryPdfUrl(doc.fileName);
  return {
    id: doc.id,
    title: doc.title,
    author: doc.author,
    tradition: doc.tradition,
    language: doc.language,
    format: "pdf",
    category: doc.category,
    description: doc.description,
    sourceUrl: resolvedUrl,
    downloadUrl: resolvedUrl,
    fileName: doc.fileName,
    sizeBytes: doc.sizeBytes,
    sizeFormatted: doc.sizeFormatted,
    tags: doc.tags || [],
  };
});

// Complete combined catalog exported for global search, teachings, and listening pages
export const LIBRARY_ITEMS: LibraryItem[] = [...FOUNDATIONAL_BOOKS, ...ARCHIVAL_PDF_ITEMS];

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Sacred Archival Library & Manuscripts — Stillpoint" },
      {
        name: "description",
        content:
          "Search and study 88 preserved manuscripts, rare translations, and sacred treatises across Advaita Vedanta, Kashmir Shaivism, Vedas & Upanishads, and Direct Inquiry.",
      },
      { property: "og:title", content: "Sacred Archival Library & Manuscripts — Stillpoint" },
      {
        property: "og:description",
        content:
          "Preserved digital collection of 88 sacred manuscripts and treatises available for immediate study, in-browser reading, and download.",
      },
      { property: "og:url", content: "/library" },
    ],
    links: [{ rel: "canonical", href: "/library" }],
  }),
  component: Library,
});

function Library() {
  const stats = useMemo(() => getTotalLibraryStats(), []);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeFormat, setActiveFormat] = useState<"all" | "pdf" | "book">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [readingDoc, setReadingDoc] = useState<LibraryItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [customBaseUrl, setCustomBaseUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("stillpoint_library_base_url") || "";
    }
    return "";
  });

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: LIBRARY_ITEMS.length };
    LIBRARY_ITEMS.forEach((item) => {
      const cat = item.category || "General";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LIBRARY_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }
      // Format filter
      if (activeFormat !== "all") {
        if (activeFormat === "pdf" && item.format !== "pdf") return false;
        if (activeFormat === "book" && item.format !== "book") return false;
      }
      // Search query
      if (q) {
        const titleMatch = item.title.toLowerCase().includes(q);
        const authorMatch = item.author.toLowerCase().includes(q);
        const traditionMatch = item.tradition?.toLowerCase().includes(q) || false;
        const categoryMatch = item.category?.toLowerCase().includes(q) || false;
        const descriptionMatch = item.description?.toLowerCase().includes(q) || false;
        const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(q));
        const fileMatch = item.fileName?.toLowerCase().includes(q) || false;

        return (
          titleMatch ||
          authorMatch ||
          traditionMatch ||
          categoryMatch ||
          descriptionMatch ||
          tagsMatch ||
          fileMatch
        );
      }
      return true;
    });
  }, [activeCategory, activeFormat, searchQuery]);

  // Handle Copy Link
  const handleCopyLink = (item: LibraryItem) => {
    const url = item.downloadUrl || item.sourceUrl || window.location.href;
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Close reader on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setReadingDoc(null);
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save custom base URL
  const handleSaveStorage = (url: string) => {
    const cleaned = url.trim().replace(/\/$/, "");
    setCustomBaseUrl(cleaned);
    if (typeof window !== "undefined") {
      if (cleaned) {
        localStorage.setItem("stillpoint_library_base_url", cleaned);
      } else {
        localStorage.removeItem("stillpoint_library_base_url");
      }
    }
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Breadcrumbs items={[{ label: "Library" }]} />

        {/* Hero Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface/80 border border-border rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-75">
              Sacred Repository · {stats.totalDocuments} Archival Manuscripts
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Archival Library & Treatises
          </h1>

          <p className="font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, digital collection of primary Sanskrit, Vedantic, Tantric, and
            contemplative texts preserved for direct inquiry, in-browser study, and archival research.
          </p>

          {/* Repository Meta Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border">
              {stats.totalDocuments} Manuscripts
            </span>
            <span className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border">
              {stats.totalMegabytes} MB Total Archive
            </span>
            <span className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border">
              6 Philosophical Traditions
            </span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase border border-dashed border-border hover:border-foreground/60 transition-colors flex items-center gap-1.5"
            >
              <span>⚙ Storage Settings</span>
              {customBaseUrl && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
            </button>
          </div>
        </div>

        {/* Audiobooks Featured Banner */}
        <div className="mb-12 p-6 bg-surface/40 border border-border rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent font-medium">
              Audio Sanctuary
            </span>
            <h3 className="font-display text-xl">Sacred Audiobooks & Direct Pointings</h3>
            <p className="font-sans text-xs opacity-75">
              Listen to 236 spoken chapters across 16 traditions (Ramana Maharshi, Nisargadatta,
              Longchenpa, Zen, Sufi, Christian Mystics).
            </p>
          </div>
          <Link
            to="/audiobooks"
            className="px-5 py-2.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Enter Audiobooks →
          </Link>
        </div>

        {/* Search & Layout Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search across all 88 manuscripts, authors, traditions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 font-mono text-xs bg-surface/30 border border-border rounded-none focus:outline-none focus:border-foreground transition-colors"
            />
            <span className="absolute left-3 top-2.5 opacity-40 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 font-mono text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end">
            <div className="border border-border flex items-center">
              <button
                type="button"
                onClick={() => setActiveFormat("all")}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "all" ? "bg-foreground text-background" : "hover:bg-surface"
                  }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFormat("pdf")}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "pdf" ? "bg-foreground text-background" : "hover:bg-surface"
                  }`}
              >
                PDFs ({ARCHIVAL_PDF_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFormat("book")}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFormat === "book" ? "bg-foreground text-background" : "hover:bg-surface"
                  }`}
              >
                Books ({FOUNDATIONAL_BOOKS.length})
              </button>
            </div>

            <div className="border border-border hidden sm:flex items-center">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 text-xs transition-colors ${viewMode === "grid" ? "bg-foreground text-background" : "hover:bg-surface"
                  }`}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 text-xs transition-colors ${viewMode === "list" ? "bg-foreground text-background" : "hover:bg-surface"
                  }`}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Filter */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {LIBRARY_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase border transition-all ${isActive
                  ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                  : "border-border bg-background/50 hover:bg-surface text-foreground/80 hover:text-foreground"
                  }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 opacity-50">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Summary */}
        <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">
            Showing {filteredItems.length} of {LIBRARY_ITEMS.length} documents
            {activeCategory !== "All" && ` · ${activeCategory}`}
            {searchQuery && ` · Matching "${searchQuery}"`}
          </p>
          {(activeCategory !== "All" || activeFormat !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveFormat("all");
                setSearchQuery("");
              }}
              className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="p-16 text-center border border-dashed border-border rounded-sm space-y-4 my-8">
            <p className="font-mono text-xs uppercase tracking-widest opacity-40">No manuscripts found</p>
            <h3 className="font-display text-2xl">No texts matched your criteria</h3>
            <p className="font-sans text-sm opacity-60 max-w-md mx-auto">
              Try adjusting your search terms, changing the tradition filter, or resetting all
              filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveFormat("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest border border-border hover:border-foreground"
            >
              Clear Search & Show All
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const isPdf = item.format === "pdf" || Boolean(item.fileName);
              const resolvedUrl = item.fileName ? getLibraryPdfUrl(item.fileName) : item.sourceUrl;

              return (
                <div
                  key={item.id}
                  className="p-6 bg-surface/20 border border-border rounded-sm flex flex-col justify-between hover:border-foreground/40 transition-colors group"
                >
                  <div className="space-y-3">
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent font-mono text-[9px] tracking-widest uppercase rounded">
                        {item.format}
                      </span>
                      {item.category && (
                        <span className="px-2 py-0.5 bg-surface text-foreground/70 font-mono text-[9px] tracking-wider uppercase border border-border">
                          {item.category}
                        </span>
                      )}
                      {item.sizeFormatted && (
                        <span className="font-mono text-[9px] opacity-40 ml-auto">
                          {item.sizeFormatted}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl group-hover:text-accent transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Author & Tradition */}
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs opacity-75 font-medium">{item.author}</p>
                      {item.translator && (
                        <p className="font-mono text-[11px] opacity-50">
                          Translated by {item.translator}
                        </p>
                      )}
                      {item.tradition && (
                        <p className="font-mono text-[10px] opacity-45">{item.tradition}</p>
                      )}
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="font-sans text-xs opacity-70 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            className="font-mono text-[9px] opacity-40 hover:opacity-90 hover:text-accent transition-all"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {isPdf ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setReadingDoc(item)}
                            className="px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity"
                          >
                            Read Online
                          </button>
                          <a
                            href={resolvedUrl}
                            download={item.fileName || true}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground transition-colors"
                            title="Direct download PDF"
                          >
                            Download
                          </a>
                        </>
                      ) : item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-all"
                        >
                          Access Work →
                        </a>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(item)}
                      className="font-mono text-[10px] tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1"
                      title="Copy link"
                    >
                      {copiedId === item.id ? (
                        <span className="text-accent font-semibold">✓ Copied</span>
                      ) : (
                        <span>🔗 Share</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && filteredItems.length > 0 && (
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const isPdf = item.format === "pdf" || Boolean(item.fileName);
              const resolvedUrl = item.fileName ? getLibraryPdfUrl(item.fileName) : item.sourceUrl;

              return (
                <div
                  key={item.id}
                  className="p-5 bg-surface/20 border border-border rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-foreground/40 transition-colors group"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-accent/10 text-accent font-mono text-[9px] tracking-widest uppercase rounded">
                        {item.format}
                      </span>
                      {item.category && (
                        <span className="font-mono text-[10px] opacity-50">{item.category}</span>
                      )}
                      {item.sizeFormatted && (
                        <span className="font-mono text-[9px] opacity-40">· {item.sizeFormatted}</span>
                      )}
                    </div>
                    <h3 className="font-display text-xl group-hover:text-accent transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs opacity-70">
                      {item.author}
                      {item.translator && ` · Translated by ${item.translator}`}
                      {item.tradition && ` · ${item.tradition}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {isPdf ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setReadingDoc(item)}
                          className="px-3.5 py-1.5 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity"
                        >
                          Read Online
                        </button>
                        <a
                          href={resolvedUrl}
                          download={item.fileName || true}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:border-foreground transition-colors"
                        >
                          Download
                        </a>
                      </>
                    ) : item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-all"
                      >
                        Access →
                      </a>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => handleCopyLink(item)}
                      className="px-2 py-1.5 font-mono text-[10px] opacity-50 hover:opacity-100"
                      title="Copy link"
                    >
                      {copiedId === item.id ? "✓" : "🔗"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note on Rights */}
        <section className="mt-24 pt-12 border-t border-border">
          <div className="space-y-4 text-sm opacity-60 leading-relaxed max-w-3xl">
            <p className="font-mono text-[10px] tracking-widest uppercase">
              On Archival Preservation and Rights
            </p>
            <p>
              This repository is maintained for direct spiritual inquiry, contemplation, scholarly
              research, and non-commercial preservation of wisdom traditions. Wherever
              redistribution is authorized, texts are presented in high-fidelity PDF format with
              instant in-browser reading capability.
            </p>
            <p>
              The collection grows through careful curation, respecting both the essential need for
              open wisdom access and the rights of translators, authors, and publishers.
            </p>
          </div>
        </section>
      </section>

      {/* In-Browser PDF Reader Modal */}
      {readingDoc && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          {/* Reader Top Bar */}
          <div className="px-6 py-3 border-b border-border bg-surface/50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="px-2 py-0.5 bg-accent/20 text-accent font-mono text-[9px] uppercase tracking-widest">
                PDF Reader
              </span>
              <div className="min-w-0">
                <h4 className="font-display text-sm md:text-base truncate">{readingDoc.title}</h4>
                <p className="font-mono text-[10px] opacity-60 truncate">
                  {readingDoc.author} {readingDoc.sizeFormatted && `· ${readingDoc.sizeFormatted}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {readingDoc.fileName && (
                <a
                  href={getLibraryPdfUrl(readingDoc.fileName)}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:border-foreground transition-colors"
                >
                  New Window ↗
                </a>
              )}
              {readingDoc.fileName && (
                <a
                  href={getLibraryPdfUrl(readingDoc.fileName)}
                  download={readingDoc.fileName}
                  className="px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:opacity-90 transition-opacity"
                >
                  Download
                </a>
              )}
              <button
                onClick={() => setReadingDoc(null)}
                className="px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:bg-surface transition-colors"
                title="Close viewer (Esc)"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Reader Embed */}
          <div className="flex-1 w-full h-full p-2 md:p-4 bg-background flex flex-col">
            {readingDoc.fileName ? (
              <iframe
                src={`${getLibraryPdfUrl(readingDoc.fileName)}#toolbar=1&navpanes=0`}
                title={readingDoc.title}
                className="w-full flex-1 border border-border/60 rounded-sm bg-neutral-950"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div className="space-y-4 max-w-md">
                  <p className="font-mono text-xs uppercase tracking-widest opacity-50">
                    External Resource
                  </p>
                  <h3 className="font-display text-2xl">{readingDoc.title}</h3>
                  <p className="text-sm opacity-70">
                    This item is hosted through an authorized archive. Open the external reading portal
                    to view.
                  </p>
                  {readingDoc.sourceUrl && (
                    <a
                      href={readingDoc.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-5 py-2.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background"
                    >
                      Open in External Archive →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Storage Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border p-6 md:p-8 max-w-md w-full rounded-sm shadow-xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-lg">Library Storage Configuration</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="font-mono text-xs opacity-50 hover:opacity-100"
              >
                ✕
              </button>
            </div>

            <p className="font-sans text-xs opacity-75 leading-relaxed">
              By default, PDFs are served locally from the workspace{" "}
              <code className="px-1 py-0.5 bg-surface text-accent font-mono text-[10px]">/Library</code>{" "}
              folder. If deploying to Vercel, Cloudflare, or an external CDN, provide your base URL below.
            </p>

            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-widest uppercase opacity-70 block">
                Custom Storage Base URL
              </label>
              <input
                type="text"
                placeholder="https://pub-xxx.r2.dev/Library or https://your-bucket.s3.amazonaws.com"
                defaultValue={customBaseUrl}
                id="library-base-url-input"
                className="w-full px-3 py-2 font-mono text-xs bg-surface/50 border border-border rounded-none focus:outline-none focus:border-foreground"
              />
              <p className="font-mono text-[9px] opacity-50">
                Leave blank to use default local path (<code className="text-accent">/Library</code>).
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleSaveStorage("")}
                className="font-mono text-[10px] uppercase tracking-wider opacity-60 hover:opacity-100"
              >
                Reset Default
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase border border-border hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(
                      "library-base-url-input"
                    ) as HTMLInputElement;
                    handleSaveStorage(el ? el.value : "");
                  }}
                  className="px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase bg-foreground text-background hover:opacity-90"
                >
                  Save URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
