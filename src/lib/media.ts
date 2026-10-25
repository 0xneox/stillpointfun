import type { ListeningItem } from "@/data/content";
import type { CuratedPlaylistTrack } from "@/data/playlists";

/**
 * Returns the configured base media URL (e.g., https://media.stillpoint.fun or Cloudflare R2 public URL).
 */
export function getMediaBaseUrl(): string {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("stillpoint_media_base_url");
    if (saved && saved.trim()) {
      return saved.trim().replace(/\/$/, "");
    }
  }
  if (typeof __MEDIA_BASE_URL__ === "string" && __MEDIA_BASE_URL__.trim()) {
    return __MEDIA_BASE_URL__.trim().replace(/\/$/, "");
  }
  return "";
}

/**
 * Resolves the primary and candidate Opus audio URLs for a content item.
 */
export function getContentAudioUrls(item: ListeningItem): string[] {
  const base = getMediaBaseUrl();
  const urls: string[] = [];

  if (base) {
    // 1. By item id
    urls.push(`${base}/audio/${item.id}.opus`);
    // 2. By legacy source video id
    if (item.youtube_video_id) {
      urls.push(`${base}/audio/${item.youtube_video_id}.opus`);
    }
  }

  // Local fallback path
  urls.push(`/audio/${item.id}.opus`);
  if (item.youtube_video_id) {
    urls.push(`/audio/${item.youtube_video_id}.opus`);
  }

  return urls;
}

/**
 * Resolves the primary and candidate Opus audio URLs for a discourse track.
 */
export function getDiscourseAudioUrls(playlistId: string, track: CuratedPlaylistTrack): string[] {
  const base = getMediaBaseUrl();
  const padIndex = String(track.index).padStart(3, "0");
  const urls: string[] = [];

  if (base) {
    // 1. Organized folder structure: /discourses/{playlistId}/{index}.opus
    urls.push(`${base}/discourses/${playlistId}/${padIndex}.opus`);
    // 2. Flat structure by videoId: /discourses/{videoId}.opus
    if (track.videoId) {
      urls.push(`${base}/discourses/${track.videoId}.opus`);
      urls.push(`${base}/audio/${track.videoId}.opus`);
    }
  }

  // Local fallback paths
  urls.push(`/discourses/${playlistId}/${padIndex}.opus`);
  if (track.videoId) {
    urls.push(`/discourses/${track.videoId}.opus`);
  }

  return urls;
}
