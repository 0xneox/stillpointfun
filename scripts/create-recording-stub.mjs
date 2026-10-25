import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stringify } from "yaml";

function fail(message) {
  console.error(message);
  process.exit(1);
}

const args = process.argv.slice(2);
const inputArgument = args.find((arg) => !arg.startsWith("--"));
const typeIndex = args.indexOf("--type");
const contentType = typeIndex >= 0 ? args[typeIndex + 1] : "discourse";
if (!inputArgument)
  fail("Usage: node scripts/create-recording-stub.mjs <audio-file> [--type discourse|chant]");
if (!["discourse", "chant"].includes(contentType)) {
  fail("Recording stubs support only --type discourse or --type chant.");
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = path.resolve(inputArgument);
if (!fs.existsSync(inputPath) || !fs.statSync(inputPath).isFile()) {
  fail(`Audio input does not exist or is not a file: ${inputPath}`);
}
if (!/\.(?:wav|mp3|m4a|flac|ogg|opus|aiff?)$/i.test(inputPath)) {
  fail("Input must be a supported audio file (WAV, MP3, M4A, FLAC, OGG, OPUS, or AIFF).");
}

const date = new Date().toISOString().slice(0, 10);
const slug = path
  .basename(inputPath, path.extname(inputPath))
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
if (!slug) fail("Could not derive a safe recording name from the input filename.");

const id = `${date}-${contentType}-${slug}`;
const stem = `${id}`;
const mediaDirectory = path.join(root, "media", "own-recordings");
const contentDirectory = path.join(root, "content", `${contentType}s`);
const transcriptDirectory = path.join(root, "content", "transcripts");
const mediaFiles = [`${stem}.opus`, `${stem}.mp3`];
const documentPath = path.join(contentDirectory, `${id}.md`);
const transcriptPath = path.join(transcriptDirectory, `${id}.md`);
const mediaPaths = mediaFiles.map((file) => path.join(mediaDirectory, file));
for (const outputPath of [...mediaPaths, documentPath, transcriptPath]) {
  if (fs.existsSync(outputPath)) fail(`Refusing to overwrite existing file: ${outputPath}`);
}

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "stillpoint-recording-"));
const temporaryOpus = path.join(temporaryDirectory, `${stem}.opus`);
const temporaryMp3 = path.join(temporaryDirectory, `${stem}.mp3`);

function convert(outputPath, codecArgs) {
  const result = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-nostdin",
      "-i",
      inputPath,
      "-map",
      "0:a:0",
      "-vn",
      "-ac",
      "1",
      "-ar",
      "48000",
      "-af",
      "loudnorm=I=-19:TP=-1:LRA=11",
      ...codecArgs,
      outputPath,
    ],
    { encoding: "utf8" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr || `ffmpeg exited with status ${result.status}`);
  }
}

const movedMedia = [];
try {
  convert(temporaryOpus, ["-c:a", "libopus", "-b:a", "96k"]);
  convert(temporaryMp3, ["-c:a", "libmp3lame", "-b:a", "128k"]);
  fs.mkdirSync(mediaDirectory, { recursive: true });
  fs.mkdirSync(contentDirectory, { recursive: true });
  fs.mkdirSync(transcriptDirectory, { recursive: true });
  for (const [index, temporaryPath] of [temporaryOpus, temporaryMp3].entries()) {
    fs.renameSync(temporaryPath, mediaPaths[index]);
    movedMedia.push(mediaPaths[index]);
  }

  const frontmatter = {
    id,
    type: contentType,
    title: path.basename(inputPath, path.extname(inputPath)),
    summary: "TODO: Write a summary.",
    status: "draft",
    version: 1,
    created_at: date,
    updated_at: date,
    author: "TODO: author name",
    ai_assisted: false,
    rights_status: "original_recording",
    source_url: null,
    license: "TODO: confirm license",
    linked_steps: [],
    tags: [],
    epistemic_label: "uncertain",
    editor_note: {
      what: "",
      who_it_is_for: "",
      read_with: "",
      skip_if: "",
      caveat: "",
    },
    changelog: [
      { version: 1, date, note: "Recording stub generated; draft requires author review." },
    ],
    audio_ref: path.relative(root, mediaPaths[0]).replaceAll(path.sep, "/"),
    alternate_audio_ref: path.relative(root, mediaPaths[1]).replaceAll(path.sep, "/"),
    transcript_ref: path.relative(root, transcriptPath).replaceAll(path.sep, "/"),
    speaker: "TODO: speaker",
    recorded_by: "TODO: recorder",
    own_recording: true,
  };
  const document = `---\n${stringify(frontmatter).trimEnd()}\n---\nTODO: Add the recording description.\n`;
  fs.writeFileSync(documentPath, document, { flag: "wx" });
  fs.writeFileSync(transcriptPath, "TODO: Add a verbatim transcript before publication.\n", {
    flag: "wx",
  });
  console.log(`Created draft ${documentPath}`);
  console.log(`Created transcript placeholder ${transcriptPath}`);
  console.log(`Converted own recording to ${mediaPaths.join(" and ")}`);
} catch (error) {
  for (const outputPath of movedMedia) {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
  throw error;
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
