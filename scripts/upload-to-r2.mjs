import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// Default settings
const BUCKET = process.env.R2_BUCKET || "stillpoint-audio";
const sourceFolder = process.argv[2] || "D:\\Opus_Library";
const prefix = process.argv[3] || "";

if (!fs.existsSync(sourceFolder)) {
  console.error(`ERROR: Source directory not found: ${sourceFolder}`);
  console.log("Usage: node scripts/upload-to-r2.mjs <LOCAL_FOLDER> [R2_PREFIX]");
  process.exit(1);
}

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getFilesRecursively(sourceFolder);
console.log(`\n======================================================`);
console.log(` Cloudflare R2 Folder Sync: ${sourceFolder}`);
console.log(` Target Bucket: ${BUCKET}`);
console.log(` Prefix: ${prefix || "(root)"}`);
console.log(` Total files detected: ${allFiles.length}`);
console.log(`======================================================\n`);

let successCount = 0;
let failCount = 0;

for (let i = 0; i < allFiles.length; i++) {
  let file = allFiles[i];

  // If local file contains double quotes, rename it to avoid shell/URL issues
  if (file.includes('"')) {
    const cleanFileName = path.basename(file).replace(/"/g, "");
    const cleanFilePath = path.join(path.dirname(file), cleanFileName);
    try {
      if (!fs.existsSync(cleanFilePath)) {
        fs.renameSync(file, cleanFilePath);
      }
      file = cleanFilePath;
    } catch {
      // ignore rename failure and continue
    }
  }

  const relPath = path
    .relative(sourceFolder, file)
    .replace(/\\/g, "/")
    .replace(/"/g, "")
    .replace(/\.{2,}/g, "");
  const key = prefix ? `${prefix.replace(/\/$/, "")}/${relPath}` : relPath;

  const ext = path.extname(file).toLowerCase();
  let contentType = "application/octet-stream";
  if (ext === ".opus") contentType = "audio/ogg; codecs=opus";
  else if (ext === ".mp3") contentType = "audio/mpeg";
  else if (ext === ".m4a") contentType = "audio/mp4";
  else if (ext === ".wav") contentType = "audio/wav";
  else if (ext === ".json") contentType = "application/json";
  else if (ext === ".pdf") contentType = "application/pdf";

  console.log(`[${i + 1}/${allFiles.length}] Uploading -> ${key}`);

  try {
    const cmd = `npx wrangler r2 object put "${BUCKET}/${key}" --file "${file}" --content-type "${contentType}" --remote`;
    execSync(cmd, { stdio: "inherit" });
    successCount++;
  } catch (err) {
    console.error(`FAILED: ${key}`, err.message);
    failCount++;
  }
}

console.log(`\n------------------------------------------------------`);
console.log(`Upload complete! Successfully uploaded: ${successCount}, Failed: ${failCount}`);
console.log(`------------------------------------------------------\n`);
