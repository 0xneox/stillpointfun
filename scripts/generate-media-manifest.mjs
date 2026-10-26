import fs from "node:fs";
import path from "node:path";
import { CONTENT } from "../src/data/content.ts";
import { CURATED_PLAYLISTS } from "../src/data/playlists.ts";

const rows = [];
rows.push([
  "Category",
  "ID",
  "Source Video ID",
  "Title",
  "Recommended Cloudflare Path",
  "Alternative Simple Path",
]);

// 1. Content items
for (const item of CONTENT) {
  rows.push([
    "Main Audio",
    item.id,
    item.youtube_video_id || "N/A",
    `"${item.title.replace(/"/g, '""')}"`,
    `audio/${item.id}.opus`,
    item.youtube_video_id ? `audio/${item.youtube_video_id}.opus` : `audio/${item.id}.opus`,
  ]);
}

// 2. Playlists / Discourses
for (const playlist of CURATED_PLAYLISTS) {
  for (const track of playlist.tracks) {
    const padIndex = String(track.index).padStart(3, "0");
    rows.push([
      `Discourse (${playlist.speaker})`,
      `${playlist.id}-${padIndex}`,
      track.videoId || "N/A",
      `"${track.title.replace(/"/g, '""')}"`,
      `discourses/${playlist.id}/${padIndex}.opus`,
      track.videoId
        ? `discourses/${track.videoId}.opus`
        : `discourses/${playlist.id}/${padIndex}.opus`,
    ]);
  }
}

const csvContent = rows.map((r) => r.join(",")).join("\n");
fs.writeFileSync(path.resolve(process.cwd(), "OPUS_MAPPING_GUIDE.csv"), csvContent, "utf8");

console.log(`Generated OPUS_MAPPING_GUIDE.csv with ${rows.length - 1} entries.`);
