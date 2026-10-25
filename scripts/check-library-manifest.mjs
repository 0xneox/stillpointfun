import { readFile } from "node:fs/promises";

const manifestUrl = new URL("../content/library/manifest.json", import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, "utf8"));
const allowedRights = new Set([
  "public_domain_likely",
  "in_copyright_likely",
  "unknown",
  "open_access_possible",
  "verified_cleared",
]);
const allowedActions = new Set(["host", "link_out", "remove", "verify"]);
const allowedRoles = new Set(["orientation", "pointer", "argument", "source", "practice"]);
const expectedShelves = [
  "A Trika/Pratyabhijna/Spanda",
  "B Shakta/Srividya",
  "C Kubjika and Shaiva scholarship",
  "D Tantra general and ritual",
  "E Advaita Vedanta",
  "F Brahma Sutra",
  "G Upanisads and Vedas",
  "H Epics, Gita and dialogues",
  "I Modern masters and direct path",
  "J Buddhism",
  "K Mysticism and consciousness studies",
  "L Esoteric/self-help",
  "M Fiction",
];
const requiredFields = [
  "id",
  "title",
  "author",
  "translator",
  "year",
  "size_mb",
  "shelf",
  "old_filter",
  "source_url",
  "license",
  "rights_status",
  "action",
  "role",
  "reviewer",
  "notes",
  "duplicate_of",
  "editor_note",
];
const failures = [];
const ids = new Set();

if (!Array.isArray(manifest.shelves) || !Array.isArray(manifest.items)) {
  throw new Error("Library manifest must contain shelves and items arrays.");
}
if (JSON.stringify(manifest.shelves) !== JSON.stringify(expectedShelves)) {
  failures.push("Manifest shelves do not match the configured A-M shelf list.");
}

for (const item of manifest.items) {
  for (const field of requiredFields) {
    if (!(field in item)) failures.push(`${item.id ?? "(missing id)"}: missing ${field}`);
  }
  if (typeof item.id !== "string" || !item.id.trim()) {
    failures.push("An item has an empty or invalid id.");
  } else if (ids.has(item.id)) {
    failures.push(`Duplicate item id: ${item.id}`);
  } else {
    ids.add(item.id);
  }
  if (!manifest.shelves.includes(item.shelf)) {
    failures.push(`${item.id}: unknown shelf ${item.shelf}`);
  }
  if (!allowedRights.has(item.rights_status)) {
    failures.push(`${item.id}: invalid rights_status ${item.rights_status}`);
  }
  if (!allowedActions.has(item.action)) {
    failures.push(`${item.id}: invalid action ${item.action}`);
  }
  if (!allowedRoles.has(item.role)) {
    failures.push(`${item.id}: invalid role ${item.role}`);
  }
  if (
    item.duplicate_of &&
    !manifest.items.some((candidate) => candidate.id === item.duplicate_of)
  ) {
    failures.push(`${item.id}: duplicate_of points to missing item ${item.duplicate_of}`);
  }
  if (item.duplicate_of && item.action !== "remove") {
    failures.push(`${item.id}: duplicate entries must have action=remove`);
  }
  if (
    (item.shelf === "L Esoteric/self-help" || item.shelf === "M Fiction") &&
    item.action !== "remove"
  ) {
    failures.push(`${item.id}: items on shelves L and M must have action=remove`);
  }
  if (item.action === "host") {
    if (!item.source_url || !item.source_url.trim()) {
      failures.push(`${item.id}: hosted item is missing source_url`);
    }
    if (
      !item.license ||
      !item.license.trim() ||
      ["verify", "unknown", "unverified"].includes(item.license.trim().toLowerCase())
    ) {
      failures.push(`${item.id}: hosted item is missing a verified license`);
    }
    if (!item.file_name || !item.file_name.trim()) {
      failures.push(`${item.id}: hosted item is missing file_name`);
    }
    if (!item.reviewer || !item.reviewer.trim()) {
      failures.push(`${item.id}: hosted item is missing its reviewer's approval`);
    }
    if (
      item.rights_status !== "verified_cleared" &&
      item.rights_status !== "public_domain_likely"
    ) {
      failures.push(`${item.id}: hosted item is not in an allowed rights status`);
    }
  }
  const noteKeys = ["what", "who_it_is_for", "read_with", "skip_if", "caveat"];
  if (!item.editor_note || noteKeys.some((key) => typeof item.editor_note[key] !== "string")) {
    failures.push(`${item.id}: editor_note must contain all five string fields`);
  }
}

const countBy = (field, values) =>
  Object.fromEntries(
    values.map((value) => [value, manifest.items.filter((item) => item[field] === value).length]),
  );

console.log(`Library manifest: ${manifest.items.length} items`);
console.log(
  "By action:",
  JSON.stringify(countBy("action", ["host", "link_out", "remove", "verify"])),
);
console.log(
  "By rights_status:",
  JSON.stringify(
    countBy("rights_status", [
      "public_domain_likely",
      "in_copyright_likely",
      "unknown",
      "open_access_possible",
      "verified_cleared",
    ]),
  ),
);
console.log("By shelf:", JSON.stringify(countBy("shelf", manifest.shelves)));

if (failures.length > 0) {
  console.error("Library manifest validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Library manifest validation passed.");
}
