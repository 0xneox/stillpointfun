import { CHANNELS, CONTENT } from "./content";
import { CURATED_PLAYLISTS } from "./playlists";
import { getTotalAudiobookStats, SACRED_AUDIOBOOKS } from "./audiobooks";

export const SITE_CONTENT_COUNTS = {
  audioTransmissions: CONTENT.length,
  discoursePlaylists: CURATED_PLAYLISTS.length,
  discourseTrackEntries: CURATED_PLAYLISTS.reduce(
    (total, playlist) => total + playlist.tracks.length,
    0,
  ),
  channels: CHANNELS.length,
  audiobookCollections: SACRED_AUDIOBOOKS.length,
  audiobookTracks: getTotalAudiobookStats().totalTracks,
};
