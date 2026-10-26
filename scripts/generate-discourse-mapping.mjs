import fs from "node:fs";
import path from "node:path";
import { CURATED_PLAYLISTS } from "../src/data/playlists.ts";

const root = "D:\\BODHI\\Opus_Library\\Discourse";
const folders = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory());
const allFiles = [];

for (const f of folders) {
  const dirFiles = fs.readdirSync(path.join(root, f.name)).map((x) => ({
    folder: f.name,
    file: x,
    key: `Discourse/${f.name}/${x}`,
    clean: x.toLowerCase().replace(/[^a-z0-9]/g, ""),
  }));
  allFiles.push(...dirFiles);
}

const mapping = {};
let matched = 0;
let total = 0;

for (const p of CURATED_PLAYLISTS) {
  for (const t of p.tracks) {
    total++;
    const tClean = t.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const pad = String(t.index).padStart(3, "0");

    // Match 1: Exact index & folder if matching category
    // Match 2: Fuzzy title match
    const found =
      allFiles.find((f) => {
        const fBase = f.clean.replace(/^[0-9]+/, "");
        return (
          f.clean.includes(tClean.slice(0, 20)) ||
          tClean.includes(fBase.slice(0, 20)) ||
          (tClean.length > 10 && f.clean.includes(tClean.slice(5, 25)))
        );
      }) ||
      allFiles.find((f) => f.file.startsWith(pad));

    if (found) {
      matched++;
      mapping[`${p.id}:${t.index}`] = found.key;
      if (t.videoId) {
        mapping[t.videoId] = found.key;
      }
    }
  }
}

const outputPath = path.resolve(process.cwd(), "src/data/discourses_mapping.json");
fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2), "utf8");
console.log(`Discourse mapping generated: ${matched}/${total} tracks mapped to R2 keys.`);
