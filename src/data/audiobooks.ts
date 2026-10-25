import collectionsData from "./audiobooks_data.json";
import type { RightsStatus } from "./rights";

export interface AudiobookTrack {
  id: string;
  index: number;
  title: string;
  fileName: string;
  relPath: string;
  rightsStatus: RightsStatus;
  sizeBytes: number;
  sizeFormatted: string;
  duration?: string;
}

export interface AudiobookCollection {
  id: string;
  title: string;
  tradition: string;
  author: string;
  narrator: string;
  description: string;
  tags: string[];
  folderName: string;
  trackCount: number;
  totalSizeBytes: number;
  tracks: AudiobookTrack[];
}

export const SACRED_AUDIOBOOKS: AudiobookCollection[] = collectionsData as AudiobookCollection[];

/**
 * Returns the fully resolved audio stream URL for a given track.
 * Supports:
 * 1. MEDIA_BASE_URL for an object-storage origin containing an '/audiobook' prefix
 * 2. User-customized or legacy base URLs
 * 3. Default local path '/audiobook'
 */
export function getAudiobookTrackUrl(relPath: string): string {
  let base = "/audiobook";
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("stillpoint_audiobook_base_url");
    if (saved && saved.trim()) {
      base = saved.trim();
    }
  }
  if (import.meta.env.VITE_AUDIOBOOK_BASE_URL) {
    base = import.meta.env.VITE_AUDIOBOOK_BASE_URL;
  }
  if (__MEDIA_BASE_URL__) {
    base = `${__MEDIA_BASE_URL__.replace(/\/$/, "")}/audiobook`;
  }

  // Correctly encode URI components for spaces, parentheses, etc.
  const encodedRel = relPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${base.replace(/\/$/, "")}/${encodedRel}`;
}

export function getTotalAudiobookStats() {
  const totalCollections = SACRED_AUDIOBOOKS.length;
  const totalTracks = SACRED_AUDIOBOOKS.reduce(
    (sum, collection) => sum + collection.tracks.length,
    0,
  );
  const totalBytes = SACRED_AUDIOBOOKS.reduce((sum, c) => sum + c.totalSizeBytes, 0);
  const totalGigabytes = (totalBytes / (1024 * 1024 * 1024)).toFixed(1);
  return {
    totalCollections,
    totalTracks,
    totalBytes,
    totalGigabytes,
  };
}
