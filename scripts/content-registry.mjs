import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const contentTypes = [
  "path_step",
  "practice",
  "mantra",
  "log",
  "chant",
  "discourse",
  "text",
  "note",
  "work",
  "stream",
];
const enabledTypes = new Set(["path_step", "practice", "mantra", "log"]);
const publicationStatuses = new Set(["draft", "published"]);
const epistemicLabels = new Set(["experienced", "studied", "received", "uncertain"]);
const sensitivePracticeText =
  /\b(?:breath[-\s]+retention|kumbhaka|pranayama|kundalini|intense\s+visuali[sz]ation|trataka|fasting)\b|\bsit(?:ting)?\b.{0,30}\b(?:over|more\s+than)\s+(?:45|4[6-9]|[5-9]\d|[1-9]\d{2,})\s*(?:minutes?|mins?)\b/i;
const outcomePromises =
  /\bguaranteed\b|\byou will attain\b|\bwill awaken\b|\bcures\b|\benlightenment in\b|\bpermanent liberation\b/i;
const requiredBaseFields = [
  "id",
  "type",
  "title",
  "summary",
  "status",
  "version",
  "created_at",
  "updated_at",
  "author",
  "ai_assisted",
  "rights_status",
  "source_url",
  "license",
  "linked_steps",
  "tags",
  "epistemic_label",
  "changelog",
  "editor_note",
];
const editorNoteFields = ["what", "who_it_is_for", "read_with", "skip_if", "caveat"];

function parseMarkdownFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filePath}: expected YAML front matter followed by Markdown.`);
  }
  const data = parse(match[1]);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${filePath}: front matter must be a YAML mapping.`);
  }
  return { data, body: match[2].trim(), sourcePath: filePath };
}

function markdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(entryPath);
      return entry.isFile() &&
        entry.name.endsWith(".md") &&
        entry.name !== "template.md" &&
        !entry.name.endsWith(".template.md")
        ? [entryPath]
        : [];
    })
    .sort();
}

function isNonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function words(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function hasSensitivePracticeText(body, item, practice = item.practice) {
  if (sensitivePracticeText.test(`${body}\n${JSON.stringify(practice ?? {})}`)) return true;
  const posture = String(practice?.posture ?? item.posture ?? "");
  const duration = String(practice?.duration ?? item.duration ?? "");
  if (!/\b(?:sit|sitting|seated)\b/i.test(posture)) return false;
  const minuteValue = duration.match(/\b(\d+)\s*(?:minutes?|mins?)\b/i);
  const hourValue = duration.match(/\b(\d+(?:\.\d+)?)\s*hours?\b/i);
  return Boolean(
    (minuteValue && Number(minuteValue[1]) > 45) || (hourValue && Number(hourValue[1]) * 60 > 45),
  );
}

function addIssue(issues, file, message) {
  issues.push(`${file}: ${message}`);
}

function validateBase(item, body, file, issues, warnings) {
  for (const field of requiredBaseFields) {
    if (!(field in item)) addIssue(issues, file, `missing shared field "${field}"`);
  }
  if (!contentTypes.includes(item.type)) {
    addIssue(issues, file, `unknown content type "${item.type}"`);
  }
  if (!isNonEmpty(item.id)) addIssue(issues, file, "id must be a non-empty string");
  if (!isNonEmpty(item.title)) addIssue(issues, file, "title must be a non-empty string");
  if (typeof item.summary !== "string") addIssue(issues, file, "summary must be a string");
  if (item.status === "published" && !isNonEmpty(item.summary)) {
    addIssue(issues, file, "a published page must have a summary");
  }
  if (!isNonEmpty(item.author)) addIssue(issues, file, "author must be a non-empty string");
  if (!publicationStatuses.has(item.status)) {
    addIssue(issues, file, `invalid publication status "${item.status}"`);
  }
  if (!Number.isInteger(item.version) || item.version < 1) {
    addIssue(issues, file, "version must be a positive integer");
  }
  if (!isIsoDate(item.created_at)) addIssue(issues, file, "created_at must use YYYY-MM-DD");
  if (item.status === "published" && !isIsoDate(item.updated_at)) {
    addIssue(issues, file, "a published page must have updated_at in YYYY-MM-DD format");
  }
  if (item.status === "published" && JSON.stringify(item).includes("TODO")) {
    addIssue(issues, file, "published content cannot contain unresolved TODO placeholders");
  }
  if (typeof item.ai_assisted !== "boolean") {
    addIssue(issues, file, "ai_assisted must be a boolean");
  }
  if (item.status === "published" && !epistemicLabels.has(item.epistemic_label)) {
    addIssue(issues, file, "a published page must have a valid epistemic_label");
  } else if (!epistemicLabels.has(item.epistemic_label)) {
    warnings.push(`${file}: epistemic_label needs author review.`);
  }
  if (!Array.isArray(item.linked_steps) || item.linked_steps.some((id) => typeof id !== "string")) {
    addIssue(issues, file, "linked_steps must be an array of strings");
  }
  if (!Array.isArray(item.tags) || item.tags.some((tag) => typeof tag !== "string")) {
    addIssue(issues, file, "tags must be an array of strings");
  }
  if (!Array.isArray(item.changelog)) addIssue(issues, file, "changelog must be an array");
  if (Array.isArray(item.changelog)) {
    item.changelog.forEach((entry, index) => {
      if (
        !Number.isInteger(entry?.version) ||
        !isIsoDate(entry?.date) ||
        !isNonEmpty(entry?.note)
      ) {
        addIssue(issues, file, `changelog[${index}] requires version, date, and note`);
      }
      if (
        !item.editor_note ||
        typeof item.editor_note !== "object" ||
        Array.isArray(item.editor_note)
      ) {
        addIssue(issues, file, "editor_note must be a mapping");
      } else {
        for (const field of editorNoteFields) {
          if (typeof item.editor_note[field] !== "string") {
            addIssue(issues, file, `editor_note.${field} must be a string`);
          }
        }
      }
    });
  }
  if (!isNonEmpty(item.rights_status)) addIssue(issues, file, "rights_status is required");
  if (item.source_url !== null && typeof item.source_url !== "string") {
    addIssue(issues, file, "source_url must be a string or null");
  }
  if (item.license !== null && typeof item.license !== "string") {
    addIssue(issues, file, "license must be a string or null");
  }
  if (
    item.ai_assisted === true &&
    item.status === "published" &&
    !isNonEmpty(item.ai_assisted_label)
  ) {
    addIssue(issues, file, "AI-assisted published content requires a visible ai_assisted_label");
  }
  if (outcomePromises.test(body)) {
    warnings.push(`${file}: review possible outcome promise language.`);
  }
  if (/^#{1,6}\s+(?:claim|claims)\b/im.test(body) && !epistemicLabels.has(item.epistemic_label)) {
    warnings.push(`${file}: a claims section has no epistemic_label.`);
  }

  if (item.quotes !== undefined && !Array.isArray(item.quotes)) {
    addIssue(issues, file, "quotes must be an array");
  }
  for (const [index, quote] of (Array.isArray(item.quotes) ? item.quotes : []).entries()) {
    if (!isNonEmpty(quote.text)) {
      addIssue(issues, file, `quote ${index + 1} is missing text`);
      continue;
    }
    if (words(quote.text) > 25) {
      addIssue(issues, file, `quote ${index + 1} exceeds 25 words`);
    }
    if (!isNonEmpty(quote.location)) {
      addIssue(issues, file, `quote ${index + 1} is missing a location`);
    }
    if (!["checked", "unchecked"].includes(quote.quote_status)) {
      addIssue(issues, file, `quote ${index + 1} quote_status must be checked or unchecked`);
    }
    if (item.status === "published" && quote.quote_status !== "checked") {
      addIssue(issues, file, `published quote ${index + 1} is not checked`);
    }
  }
  const markdownQuotes = body.match(/^(?:>[ \t]?.*(?:\r?\n|$))+/gm) ?? [];
  if (markdownQuotes.length > (Array.isArray(item.quotes) ? item.quotes.length : 0)) {
    addIssue(issues, file, "each Markdown block quote requires quote metadata with a location");
  }
  for (const [index, quote] of markdownQuotes.entries()) {
    const text = quote
      .split(/\r?\n/)
      .map((line) => line.replace(/^>[ \t]?/, ""))
      .join(" ");
    if (words(text) > 25) addIssue(issues, file, `Markdown quote ${index + 1} exceeds 25 words`);
  }
}

function validatePathStep(item, body, file, issues, warnings) {
  for (const field of [
    "order",
    "tradition_origin",
    "practice",
    "safety_notes",
    "common_confusions",
    "linked_sources",
    "linked_mantras",
    "linked_practices",
    "needs_author_review",
  ]) {
    if (!(field in item)) addIssue(issues, file, `path_step is missing "${field}"`);
  }
  if (!Number.isInteger(item.order) || item.order < 1) {
    addIssue(issues, file, "path_step order must be a positive integer");
  }
  if (!Array.isArray(item.tradition_origin)) {
    addIssue(issues, file, "tradition_origin must be an array");
  } else {
    item.tradition_origin.forEach((origin, index) => {
      for (const field of ["tradition", "school", "source_work", "location"]) {
        if (typeof origin?.[field] !== "string") {
          addIssue(issues, file, `tradition_origin[${index}] is missing string field "${field}"`);
        }
      }
    });
  }
  for (const field of ["linked_sources", "linked_mantras", "linked_practices"]) {
    if (!Array.isArray(item[field]) || item[field].some((id) => typeof id !== "string")) {
      addIssue(issues, file, `${field} must be an array of strings`);
    }
  }
  if (typeof item.safety_notes !== "string")
    addIssue(issues, file, "safety_notes must be a string");
  if (!Array.isArray(item.common_confusions)) {
    addIssue(issues, file, "common_confusions must be an array");
  } else if (item.common_confusions.some((value) => typeof value !== "string")) {
    addIssue(issues, file, "common_confusions must contain strings");
  }
  if (typeof item.needs_author_review !== "boolean") {
    addIssue(issues, file, "needs_author_review must be a boolean");
  }

  const hasPractice = item.practice !== null && item.practice !== undefined;
  if (hasPractice) {
    for (const field of ["name", "instructions", "duration", "posture"]) {
      if (typeof item.practice?.[field] !== "string") {
        addIssue(issues, file, `practice.${field} must be a string`);
      }
    }
    if (
      item.practice?.requires_teacher !== null &&
      typeof item.practice?.requires_teacher !== "boolean"
    ) {
      addIssue(issues, file, "practice.requires_teacher must be a boolean or null");
    }
  }
  const safetyText = item.safety_notes;
  if (item.status === "published" && hasPractice && !isNonEmpty(safetyText)) {
    addIssue(issues, file, "a published path step with a practice requires safety_notes");
  }
  if (
    item.status === "published" &&
    hasPractice &&
    typeof item.practice?.requires_teacher !== "boolean"
  ) {
    addIssue(issues, file, "a published practice must state whether it requires a teacher");
  }
  if (hasSensitivePracticeText(body, item) && !isNonEmpty(safetyText)) {
    addIssue(issues, file, "safety_notes are required for this potentially sensitive practice");
  }
  if (item.status === "published" && item.needs_author_review) {
    addIssue(issues, file, "a published path step cannot still need author review");
  }
  for (const linkedId of [...(item.linked_mantras ?? []), ...(item.linked_practices ?? [])]) {
    if (typeof linkedId !== "string") addIssue(issues, file, "linked item ids must be strings");
  }
}

function validatePractice(item, body, file, issues) {
  for (const field of ["tradition", "instructions", "duration", "posture"]) {
    if (typeof item[field] !== "string")
      addIssue(issues, file, `practice ${field} must be a string`);
  }
  if (typeof item.requires_teacher !== "boolean" && item.requires_teacher !== null) {
    addIssue(issues, file, "requires_teacher must be a boolean or null");
  }
  if (typeof item.safety_notes !== "string") {
    addIssue(issues, file, "practice safety_notes must be a string");
  }
  if (item.status === "published" && typeof item.requires_teacher !== "boolean") {
    addIssue(issues, file, "a published practice must state whether it requires a teacher");
  }
  if (item.status === "published" && !isNonEmpty(item.safety_notes)) {
    addIssue(issues, file, "a published practice requires safety_notes");
  }
  if (hasSensitivePracticeText(body, item, item) && !isNonEmpty(item.safety_notes)) {
    addIssue(issues, file, "safety_notes are required for this potentially sensitive practice");
  }
}

function validateMantra(item, file, issues) {
  for (const field of [
    "sanskrit_devanagari",
    "sanskrit_iast",
    "translation",
    "translation_source",
    "translation_license",
    "tradition",
    "initiation_status",
    "audio_ref",
    "safety_notes",
  ]) {
    if (typeof item[field] !== "string" && item[field] !== null) {
      addIssue(issues, file, `mantra ${field} must be a string or null`);
    }
  }
  if (!["open", "initiatory", "unknown"].includes(item.initiation_status)) {
    addIssue(issues, file, `invalid initiation_status "${item.initiation_status}"`);
  }
  if (
    item.pronunciation_reviewed_by !== null &&
    typeof item.pronunciation_reviewed_by !== "string"
  ) {
    addIssue(issues, file, "pronunciation_reviewed_by must be a string or null");
  }
  if (item.status === "published" && !isNonEmpty(item.translation_source)) {
    addIssue(issues, file, "a published mantra requires translation_source");
  }
  if (item.audio_ref !== null && item.audio_ref !== "none" && item.audio_ref !== "own_recording") {
    addIssue(issues, file, "mantra audio_ref must be a manifest id, own_recording, none, or null");
  }
}

function validateAudio(item, file, issues) {
  for (const field of ["audio_ref", "transcript_ref", "speaker", "recorded_by"]) {
    if (typeof item[field] !== "string" && item[field] !== null) {
      addIssue(issues, file, `${item.type} ${field} must be a string or null`);
    }
  }
  if (typeof item.own_recording !== "boolean") {
    addIssue(issues, file, `${item.type} own_recording must be a boolean`);
  }
  if (item.status === "published" && !isNonEmpty(item.audio_ref)) {
    addIssue(issues, file, "published audio requires audio_ref");
  }
  if (
    item.status === "published" &&
    !isNonEmpty(item.transcript_ref) &&
    !isNonEmpty(item.no_transcript_reason)
  ) {
    addIssue(
      issues,
      file,
      "published audio/video requires a transcript_ref or no_transcript_reason",
    );
  }
}

function validateStream(item, file, issues) {
  validateWork(item, file, issues);
  if (typeof item.transcript_ref !== "string" && item.transcript_ref !== null) {
    addIssue(issues, file, "stream transcript_ref must be a string or null");
  }
  if (typeof item.no_transcript_reason !== "string" && item.no_transcript_reason !== null) {
    addIssue(issues, file, "stream no_transcript_reason must be a string or null");
  }
  if (
    item.status === "published" &&
    !isNonEmpty(item.transcript_ref) &&
    !isNonEmpty(item.no_transcript_reason)
  ) {
    addIssue(
      issues,
      file,
      "published audio/video requires a transcript_ref or no_transcript_reason",
    );
  }
}

function validateWork(item, file, issues) {
  if (!["idea", "in_progress", "released"].includes(item.release_status)) {
    addIssue(issues, file, `invalid release_status "${item.release_status}"`);
  }
  if (typeof item.media_ref !== "string" && item.media_ref !== null) {
    addIssue(issues, file, "media_ref must be a string or null");
  }
  if (typeof item.rights !== "string" && item.rights !== null) {
    addIssue(issues, file, "rights must be a string or null");
  }
}

function validateFounderPage(filePath, issues) {
  const parsed = parseMarkdownFile(filePath);
  const required = [
    "my practice",
    "my teachers and lineage/initiation status",
    "what i do not claim",
    "how ai is used on this site",
    "no token / no sales / no ads / no tracking",
  ];
  const headings = new Set(
    parsed.body
      .split(/\r?\n/)
      .filter((line) => line.startsWith("#"))
      .map((line) =>
        line
          .replace(/^#+\s*/, "")
          .trim()
          .toLowerCase(),
      ),
  );
  for (const heading of required) {
    if (!headings.has(heading)) {
      addIssue(issues, "content/pages/founder.md", `missing required section "${heading}"`);
    }
  }
  if (!/TODO/i.test(parsed.body)) {
    addIssue(issues, "content/pages/founder.md", "personal fields must remain TODO placeholders");
  }
  return parsed;
}

function sourceFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(entryPath);
    return entry.isFile() && /\.(?:ts|tsx|js|jsx|html|md|json)$/i.test(entry.name)
      ? [entryPath]
      : [];
  });
}

function validateLaunchSource(root, issues) {
  for (const sourceRoot of ["src", "public", "content"]) {
    for (const filePath of sourceFiles(path.join(root, sourceRoot))) {
      const text = fs.readFileSync(filePath, "utf8");
      const relative = path.relative(root, filePath).replaceAll(path.sep, "/");
      if (/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\b/i.test(text)) {
        addIssue(issues, relative, "YouTube URLs are prohibited in launch builds");
      }
      if (
        /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\/[^"']*(?:google-analytics|googletagmanager|gtag|plausible|fathom|hotjar|segment|mixpanel|posthog|clarity|facebook\.net|connect\.facebook|\/pixel)[^"']*["']/i.test(
          text,
        ) ||
        /\b(?:gtag|ga|fbq|plausible|fathom|hj)\s*\(/i.test(text)
      ) {
        addIssue(issues, relative, "third-party tracking scripts are prohibited in launch builds");
      }
    }
    for (const file of ["index.html", "vite.config.ts"]) {
      const filePath = path.join(root, file);
      if (!fs.existsSync(filePath)) continue;
      const text = fs.readFileSync(filePath, "utf8");
      if (/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\b/i.test(text)) {
        addIssue(issues, file, "YouTube URLs are prohibited in launch builds");
      }
      if (
        /<script\b[^>]*\bsrc\s*=\s*["']https?:\/\/[^"']*(?:google-analytics|googletagmanager|gtag|plausible|fathom|hotjar|segment|mixpanel|posthog|clarity|facebook\.net|connect\.facebook|\/pixel)[^"']*["']/i.test(
          text,
        ) ||
        /\b(?:gtag|ga|fbq|plausible|fathom|hj)\s*\(/i.test(text)
      ) {
        addIssue(issues, file, "third-party tracking scripts are prohibited in launch builds");
      }
    }
  }
}

export function validateContentRegistry(root, { publicLaunch = false } = {}) {
  const contentRoot = path.join(root, "content");
  const configPath = path.join(contentRoot, "content-types.yml");
  const config = parse(fs.readFileSync(configPath, "utf8"));
  const configuredEnabled = new Set(
    Object.entries(config?.content_types_enabled ?? {})
      .filter(([, enabled]) => enabled === true)
      .map(([type]) => type),
  );
  const issues = [];
  const warnings = [];
  const all = [];
  const ids = new Set();
  for (const type of contentTypes) {
    if (typeof config?.content_types_enabled?.[type] !== "boolean") {
      addIssue(
        issues,
        "content/content-types.yml",
        `content_types_enabled.${type} must be a boolean`,
      );
    }
    if (!enabledTypes.has(type) && config?.content_types_enabled?.[type] !== false) {
      addIssue(
        issues,
        "content/content-types.yml",
        `schema-only type "${type}" must remain disabled`,
      );
    }
  }
  for (const type of contentTypes) {
    const directory = path.join(contentRoot, type === "path_step" ? "path" : `${type}s`);
    for (const filePath of markdownFiles(directory)) {
      const parsed = parseMarkdownFile(filePath);
      const item = parsed.data;
      const relativePath = path.relative(root, filePath).replaceAll(path.sep, "/");
      if (item.type !== type) addIssue(issues, relativePath, `type must be "${type}"`);
      if (ids.has(item.id)) addIssue(issues, relativePath, `duplicate content id "${item.id}"`);
      ids.add(item.id);
      validateBase(item, parsed.body, relativePath, issues, warnings);
      if (item.type === "path_step")
        validatePathStep(item, parsed.body, relativePath, issues, warnings);
      if (item.type === "practice") validatePractice(item, parsed.body, relativePath, issues);
      if (item.type === "mantra") validateMantra(item, relativePath, issues);
      if (["chant", "discourse"].includes(item.type)) validateAudio(item, relativePath, issues);
      if (item.type === "stream") validateStream(item, relativePath, issues);
      if (item.type === "work") validateWork(item, relativePath, issues);
      if (item.type === "log" && !["Now", "Next", "Not yet"].includes(item.stage)) {
        addIssue(issues, relativePath, `log stage must be Now, Next, or Not yet`);
      }
      if (!enabledTypes.has(item.type) && item.status === "published") {
        addIssue(issues, relativePath, `${item.type} is schema-only and disabled`);
      }
      if (!configuredEnabled.has(item.type) && item.status === "published") {
        addIssue(issues, relativePath, `${item.type} is not enabled in content_types_enabled`);
      }
      all.push({ ...item, body: parsed.body, source_path: relativePath });
    }
  }

  let founderPage = null;
  const founderPath = path.join(contentRoot, "pages", "founder.md");
  if (fs.existsSync(founderPath)) founderPage = validateFounderPage(founderPath, issues);
  else addIssue(issues, "content/pages/founder.md", "founder template is required");

  const pathOrders = new Set();
  for (const step of all.filter((item) => item.type === "path_step")) {
    if (pathOrders.has(step.order))
      addIssue(issues, step.source_path, `duplicate path order ${step.order}`);
    pathOrders.add(step.order);
  }
  const byId = new Map(all.map((item) => [item.id, item]));
  const manifestPath = path.join(contentRoot, "library", "manifest.json");
  const manifestItems = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8")).items
    : [];
  const permittedManifestIds = new Set(
    manifestItems
      .filter((entry) => ["host", "link_out"].includes(entry.action))
      .map((entry) => entry.id),
  );
  for (const item of all) {
    for (const [field, expectedType] of [
      ["linked_steps", "path_step"],
      ["linked_mantras", "mantra"],
      ["linked_practices", "practice"],
    ]) {
      for (const linked of item[field] ?? []) {
        const target = byId.get(linked);
        if (!target || target.type !== expectedType) {
          addIssue(
            issues,
            item.source_path,
            `${field} references missing ${expectedType} "${linked}"`,
          );
        } else if (
          item.status === "published" &&
          (target.status !== "published" || !configuredEnabled.has(target.type))
        ) {
          addIssue(
            issues,
            item.source_path,
            `${field} must not expose unpublished or disabled content "${linked}"`,
          );
        }
      }
    }
    if (item.type === "path_step") {
      for (const id of item.linked_sources ?? []) {
        if (!permittedManifestIds.has(id)) {
          addIssue(
            issues,
            item.source_path,
            `linked_sources may only reference host/link_out manifest items; rejected "${id}"`,
          );
        }
      }
    }
    if (
      item.type === "mantra" &&
      isNonEmpty(item.audio_ref) &&
      !["none", "own_recording"].includes(item.audio_ref)
    ) {
      if (!permittedManifestIds.has(item.audio_ref)) {
        addIssue(
          issues,
          item.source_path,
          `mantra audio_ref may only reference host/link_out manifest items; rejected "${item.audio_ref}"`,
        );
      }
    }
    if (["chant", "discourse", "stream"].includes(item.type) && item.status === "published") {
      if (isNonEmpty(item.transcript_ref)) {
        const transcriptPath = path.resolve(root, item.transcript_ref);
        const rootPrefix = `${path.resolve(root)}${path.sep}`;
        if (!transcriptPath.startsWith(rootPrefix) || !fs.existsSync(transcriptPath)) {
          addIssue(
            issues,
            item.source_path,
            `transcript_ref does not resolve to a file: ${item.transcript_ref}`,
          );
        } else if (/TODO|transcript placeholder/i.test(fs.readFileSync(transcriptPath, "utf8"))) {
          addIssue(issues, item.source_path, "published transcript still contains a placeholder");
        }
      }
    }
  }

  if (publicLaunch) validateLaunchSource(root, issues);

  const published = all.filter(
    (item) => item.status === "published" && configuredEnabled.has(item.type),
  );
  const navSections = [
    {
      id: "path",
      label: "PATH",
      count: published.filter((item) => item.type === "path_step").length,
    },
    {
      id: "practice",
      label: "PRACTICE",
      count: published.filter((item) => ["practice", "mantra"].includes(item.type)).length,
    },
    { id: "log", label: "LOG", count: published.filter((item) => item.type === "log").length },
  ].filter((section) => section.count > 0);

  if (navSections.some((section) => section.count < 1)) {
    addIssue(issues, "navigation", "a nav item points to an empty content section");
  }

  return {
    config,
    all,
    published,
    navSections,
    founderPage,
    issues,
    warnings,
  };
}

export function assertLaunchMetadata(publicLaunch, noindexOn) {
  if (publicLaunch && noindexOn) {
    throw new Error("PUBLIC_LAUNCH=true cannot be combined with noindex being enabled.");
  }
}

export { enabledTypes };
