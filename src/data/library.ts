import libraryData from "./library_data.json";
import type { RightsStatus } from "./rights";

export interface LibraryDocument {
  id: string;
  title: string;
  author: string;
  tradition: string;
  language: string;
  format: "pdf" | "book";
  category: string;
  description: string;
  tags: string[];
  fileName: string;
  sizeBytes: number;
  sizeFormatted: string;
  downloadUrl: string;
  rightsStatus: RightsStatus;
  translator?: string;
  sourceUrl?: string;
}

export const SACRED_LIBRARY: LibraryDocument[] = libraryData as LibraryDocument[];

export const LIBRARY_CATEGORIES = [
  "All",
  "Advaita Vedanta",
  "Kashmir Shaivism & Tantra",
  "Vedas & Upanishads",
  "Masters & Direct Path",
  "Mysticism & Consciousness",
  "Buddhism",
] as const;

export type LibraryCategory = (typeof LIBRARY_CATEGORIES)[number];

/**
 * Returns the fully resolved URL for viewing or downloading a Library PDF.
 * Supports:
 * 1. MEDIA_BASE_URL for an object-storage origin containing a '/Library' prefix
 * 2. User-customized or legacy base URLs
 * 3. Default local dev path '/Library'
 */
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

  const encodedFileName = encodeURIComponent(fileName);
  return `${base.replace(/\/$/, "")}/${encodedFileName}`;
}

export function getTotalLibraryStats() {
  const totalDocuments = SACRED_LIBRARY.length;
  const totalBytes = SACRED_LIBRARY.reduce((sum, item) => sum + (item.sizeBytes || 0), 0);
  const totalMegabytes = (totalBytes / (1024 * 1024)).toFixed(1);
  const categoriesCount = new Set(SACRED_LIBRARY.map((item) => item.category)).size;
  return {
    totalDocuments,
    totalBytes,
    totalMegabytes,
    categoriesCount,
  };
}
