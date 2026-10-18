import libraryData from "./library_data.json";

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
 * 1. User-customized Base URL stored in localStorage (e.g., Cloudflare R2, AWS S3, custom CDN)
 * 2. Environment variable VITE_LIBRARY_BASE_URL
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
