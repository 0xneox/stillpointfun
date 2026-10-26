import type { ListeningItem } from "@/data/content";
import type { CuratedPlaylistTrack } from "@/data/playlists";
import discoursesMapping from "@/data/discourses_mapping.json";
import contentAudioMapping from "@/data/content_audio_mapping.json";

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
  return "https://pub-a526649f29164cd09fb7504d66516920.r2.dev";
}

/**
 * Resolves the primary and candidate Opus audio URLs for a content item.
 */
export function getContentAudioUrls(item: { id?: string; youtube_video_id?: string }): string[] {
  const base = getMediaBaseUrl();
  const urls: string[] = [];

  const mappedPath =
    (item.id ? (contentAudioMapping as Record<string, string>)[item.id] : undefined) ||
    (item.youtube_video_id
      ? (contentAudioMapping as Record<string, string>)[item.youtube_video_id]
      : undefined) ||
    (item.youtube_video_id
      ? (discoursesMapping as Record<string, string>)[item.youtube_video_id]
      : undefined);

  if (base) {
    if (mappedPath) {
      const cleanMapped = mappedPath.replace(/"/g, "").replace(/\.{2,}/g, "");
      const encodedMapped = cleanMapped
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
      urls.push(`${base}/${encodedMapped}`);
    }
    // Candidate fallbacks
    if (item.id) urls.push(`${base}/audio/${item.id}.opus`);
    if (item.youtube_video_id) urls.push(`${base}/audio/${item.youtube_video_id}.opus`);
  }

  if (mappedPath) {
    urls.push(`/${mappedPath}`);
  }
  if (item.id) urls.push(`/audio/${item.id}.opus`);
  if (item.youtube_video_id) urls.push(`/audio/${item.youtube_video_id}.opus`);

  return urls;
}

/**
 * Resolves the primary and candidate Opus audio URLs for a discourse track.
 */
export function getDiscourseAudioUrls(playlistId: string, track: CuratedPlaylistTrack): string[] {
  const base = getMediaBaseUrl();
  const padIndex = String(track.index).padStart(3, "0");
  const urls: string[] = [];

  const mappingKey = `${playlistId}:${track.index}`;
  const mappedPath =
    (discoursesMapping as Record<string, string>)[mappingKey] ||
    (track.videoId ? (discoursesMapping as Record<string, string>)[track.videoId] : undefined);

  if (base) {
    if (mappedPath) {
      const cleanMapped = mappedPath.replace(/"/g, "").replace(/\.{2,}/g, "");
      const encodedMapped = cleanMapped
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");
      urls.push(`${base}/${encodedMapped}`);
    }
    // 1. Organized folder structure: /discourses/{playlistId}/{index}.opus
    urls.push(`${base}/discourses/${playlistId}/${padIndex}.opus`);
    urls.push(`${base}/Discourse/${playlistId}/${padIndex}.opus`);
    // 2. Flat structure by videoId: /discourses/{videoId}.opus
    if (track.videoId) {
      urls.push(`${base}/discourses/${track.videoId}.opus`);
      urls.push(`${base}/audio/${track.videoId}.opus`);
    }
  }

  if (mappedPath) {
    urls.push(`/${mappedPath}`);
  }
  // Local fallback paths
  urls.push(`/discourses/${playlistId}/${padIndex}.opus`);
  if (track.videoId) {
    urls.push(`/discourses/${track.videoId}.opus`);
  }

  return urls;
}
