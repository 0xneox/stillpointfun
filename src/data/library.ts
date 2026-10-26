import publicManifestData from "virtual:stillpoint-public-library";

export type LibraryRightsStatus =
  | "public_domain_likely"
  | "in_copyright_likely"
  | "unknown"
  | "open_access_possible"
  | "verified_cleared";

export type LibraryAction = "host" | "link_out" | "remove" | "verify";

export interface LibraryEditorNote {
  what: string;
  who_it_is_for: string;
  read_with: string;
  skip_if: string;
  caveat: string;
}

export interface LibraryDocument {
  id: string;
  title: string;
  author: string;
  translator: string | null;
  year: number | null;
  size_mb: number | null;
  shelf: string;
  old_filter: string | null;
  source_url: string | null;
  license: string | null;
  rights_status: LibraryRightsStatus;
  action: LibraryAction;
  role: "orientation" | "pointer" | "argument" | "source" | "practice";
  reviewer: string | null;
  notes: string;
  duplicate_of: string | null;
  editor_note: LibraryEditorNote;
  format: "pdf" | "book";
  language: string | null;
  tradition: string | null;
  description: string;
  tags: string[];
  file_name: string | null;
}

interface LibraryManifest {
  shelves: string[];
  items: LibraryDocument[];
}

export interface LibraryItem extends LibraryDocument {
  category: string;
  sourceUrl?: string;
  downloadUrl?: string;
  fileName?: string;
  sizeBytes?: number;
  sizeFormatted?: string;
}

export const LIBRARY_MANIFEST = publicManifestData as LibraryManifest;
export const LIBRARY_SHELVES = LIBRARY_MANIFEST.shelves;
export const ALL_LIBRARY_ITEMS = LIBRARY_MANIFEST.items;

export function canHostLibraryItem(item: LibraryDocument): boolean {
  return item.action === "host" && Boolean(item.file_name?.trim());
}

export const LIBRARY_ITEMS: LibraryItem[] = ALL_LIBRARY_ITEMS.map((item) => {
  const sizeBytes = item.size_mb === null ? undefined : Math.round(item.size_mb * 1024 * 1024);
  return {
    ...item,
    category: item.shelf,
    sourceUrl: item.source_url ?? undefined,
    downloadUrl:
      canHostLibraryItem(item) && item.file_name ? getLibraryPdfUrl(item.file_name) : undefined,
    fileName: item.file_name ?? undefined,
    sizeBytes,
    sizeFormatted: item.size_mb === null ? undefined : `${item.size_mb} MB`,
  };
});

export const SACRED_LIBRARY = ALL_LIBRARY_ITEMS.filter((item) => item.format === "pdf");

export function getLibraryPdfUrl(fileName: string): string {
  let base = "/Library";
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("stillpoint_library_base_url");
    if (saved && saved.trim()) {
      base = saved.trim();
    }
  }
  if (import.meta.env.VITE_LIBRARY_BASE_URL) {
    base = import.meta.env.VITE_LIBRARY_BASE_URL;
  }
  if (__MEDIA_BASE_URL__) {
    base = `${__MEDIA_BASE_URL__.replace(/\/$/, "")}/Library`;
  }

  return `${base.replace(/\/$/, "")}/${encodeURIComponent(fileName)}`;
}

export function getTotalLibraryStats() {
  const totalDocuments = LIBRARY_ITEMS.length;
  const hostedItems = LIBRARY_ITEMS.filter(canHostLibraryItem);
  const totalBytes = hostedItems.reduce((sum, item) => sum + (item.sizeBytes || 0), 0);
  const categoriesCount = new Set(LIBRARY_ITEMS.map((item) => item.shelf)).size;
  return {
    totalDocuments,
    totalBytes,
    totalMegabytes: (totalBytes / (1024 * 1024)).toFixed(1),
    categoriesCount,
  };
}
