import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getTotalAudiobookStats, SACRED_AUDIOBOOKS } from "@/data/audiobooks";
import { siteUrl } from "@/lib/site-url";
import {
  LIBRARY_ITEMS,
  LIBRARY_SHELVES,
  canHostLibraryItem,
  getLibraryPdfUrl,
  getTotalLibraryStats,
  type LibraryItem,
} from "@/data/library";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library & Reading Links — Stillpoint" },
      {
        name: "description",
        content: `Browse ${LIBRARY_ITEMS.length} reviewed library records, with hosted texts and external source links clearly separated.`,
      },
      { property: "og:title", content: "Library & Reading Links — Stillpoint" },
      {
        property: "og:description",
        content: `A curated library of ${LIBRARY_ITEMS.length} reviewed records, with hosting limited to cleared items.`,
      },
      { property: "og:url", content: siteUrl("/library") },
    ],
    links: [{ rel: "canonical", href: siteUrl("/library") }],
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

  const [customBaseUrl, setCustomBaseUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("stillpoint_library_base_url") || "";
    }
    return "";
  });

  const shelfCounts = useMemo(() => {
    return Object.fromEntries([
      ["All", LIBRARY_ITEMS.length],
      ...LIBRARY_SHELVES.map((shelf) => [
        shelf,
        LIBRARY_ITEMS.filter((item) => item.shelf === shelf).length,
      ]),
    ]);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LIBRARY_ITEMS.filter((item) => {
      // Shelf filter
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
              Public Library · {stats.totalDocuments} Available Records
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Library & Reading Links
          </h1>

          <p className="font-sans text-base md:text-lg opacity-70 max-w-2xl mx-auto leading-relaxed">
            A browsable selection of cleared texts and links to external sources. Materials pending
            rights or source review are not listed.
          </p>

          {/* Repository Meta Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border">
              {stats.totalDocuments} Records
            </span>
            <span className="px-3 py-1 font-mono text-[10px] tracking-widest uppercase bg-surface/60 border border-border">
              {stats.categoriesCount} Shelves
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
              Listen to {getTotalAudiobookStats().totalTracks} chapters across{" "}
              {SACRED_AUDIOBOOKS.length} audio collections.
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
              placeholder={`Search ${LIBRARY_ITEMS.length} public records, authors, shelves, or tags...`}
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
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                  activeFormat === "all" ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFormat("pdf")}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                  activeFormat === "pdf" ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
              >
                PDFs ({LIBRARY_ITEMS.filter((item) => item.format === "pdf").length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFormat("book")}
                className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                  activeFormat === "book" ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
              >
                Books ({LIBRARY_ITEMS.filter((item) => item.format === "book").length})
              </button>
            </div>

            <div className="border border-border hidden sm:flex items-center">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 text-xs transition-colors ${
                  viewMode === "grid" ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 text-xs transition-colors ${
                  viewMode === "list" ? "bg-foreground text-background" : "hover:bg-surface"
                }`}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Shelf Filter */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {["All", ...LIBRARY_SHELVES].map((cat) => {
            const count = shelfCounts[cat] || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase border transition-all ${
                  isActive
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
            <p className="font-mono text-xs uppercase tracking-widest opacity-40">
              No library records found
            </p>
            <h3 className="font-display text-2xl">No texts matched your criteria</h3>
            <p className="font-sans text-sm opacity-60 max-w-md mx-auto">
              Try adjusting your search terms, changing the shelf filter, or resetting all filters.
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
              const isHostable = canHostLibraryItem(item);
              const resolvedUrl =
                isHostable && item.fileName ? getLibraryPdfUrl(item.fileName) : undefined;

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
                    <LibraryEditorNote item={item} />

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
                      {isHostable && resolvedUrl ? (
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
                      ) : item.action === "link_out" && item.sourceUrl ? (
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
              const isHostable = canHostLibraryItem(item);
              const resolvedUrl =
                isHostable && item.fileName ? getLibraryPdfUrl(item.fileName) : undefined;

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
                        <span className="font-mono text-[9px] opacity-40">
                          · {item.sizeFormatted}
                        </span>
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
                    <LibraryEditorNote item={item} />
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {isHostable && resolvedUrl ? (
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
                    ) : item.action === "link_out" && item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 border border-border font-mono text-[10px] tracking-widest uppercase hover:bg-foreground hover:text-background transition-all"
                      >
                        Access →
                      </a>
                    ) : null}
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
              Only manifest entries explicitly marked for hosting and cleared by their rights status
              receive local read or download controls. Pending review and removal items are not
              listed. External-source entries link out without a local copy.
            </p>
            <p>
              A rights label is not itself a license. Source and license details remain subject to
              verification in the library manifest.
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
                <LibraryEditorNote item={readingDoc} />
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
                    This item is marked for hosting but has no local file attached.
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
              Cleared PDF files can be served from the workspace{" "}
              <code className="px-1 py-0.5 bg-surface text-accent font-mono text-[10px]">
                /Library
              </code>{" "}
              folder. If deploying to Vercel, Cloudflare, or an external CDN, provide the storage
              base URL below.
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
                Leave blank to use default local path (<code className="text-accent">/Library</code>
                ).
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
                      "library-base-url-input",
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

function LibraryEditorNote({ item }: { item: LibraryItem }) {
  const fields: Array<[keyof LibraryItem["editor_note"], string]> = [
    ["what", "What it is"],
    ["who_it_is_for", "Who it is for"],
    ["read_with", "Read with"],
    ["skip_if", "Skip if"],
    ["caveat", "Caveat"],
  ];
  const populated = fields.filter(([key]) => item.editor_note[key].trim());

  if (populated.length === 0) return null;

  return (
    <section className="space-y-2 border-l border-accent/50 pl-3" aria-label="Editor's note">
      <p className="font-mono text-[9px] tracking-widest uppercase opacity-60">Editor’s note</p>
      {populated.map(([key, label]) => (
        <p key={key} className="font-sans text-xs leading-relaxed opacity-75">
          <span className="font-medium">{label}: </span>
          {item.editor_note[key]}
        </p>
      ))}
    </section>
  );
}
