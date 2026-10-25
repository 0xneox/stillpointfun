import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { assertLaunchMetadata, validateContentRegistry } from "./content-registry.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");

function writeFixture(content, { enabled = ["path_step"] } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "stillpoint-content-"));
  fs.mkdirSync(path.join(root, "content", "pages"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "content", "content-types.yml"),
    `content_types_enabled:\n${[
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
    ]
      .map((type) => `  ${type}: ${enabled.includes(type)}`)
      .join("\n")}\n`,
  );
  fs.writeFileSync(
    path.join(root, "content", "pages", "founder.md"),
    `---\ntitle: Founder\n---\n${[
      "My practice",
      "My teachers and lineage/initiation status",
      "What I do not claim",
      "How AI is used on this site",
      "No token / no sales / no ads / no tracking",
    ]
      .map((heading) => `## ${heading}\n\nTODO`)
      .join("\n\n")}\n`,
  );
  fs.mkdirSync(path.join(root, "content", "path"), { recursive: true });
  if (content) fs.writeFileSync(path.join(root, "content", "path", "fixture.md"), content);
  return root;
}

const basePathStep = ({
  status = "published",
  safety_notes = "Reviewed safety note.",
  quotes = [],
} = {}) => `---
id: fixture-step
type: path_step
title: Fixture step
summary: Fixture summary.
status: ${status}
version: 1
created_at: 2026-10-19
updated_at: 2026-10-19
author: Fixture
ai_assisted: false
rights_status: original_cc_by_sa_4_0
source_url: null
license: CC BY-SA 4.0
linked_steps: []
tags: []
epistemic_label: experienced
changelog: []
order: 1
tradition_origin: []
practice:
  name: Practice
  instructions: Kumbhaka is mentioned here.
  duration: 1 minute
  posture: seated
  requires_teacher: false
safety_notes: ${JSON.stringify(safety_notes)}
common_confusions: []
linked_sources: []
linked_mantras: []
linked_practices: []
needs_author_review: false
quotes: ${JSON.stringify(quotes)}
---
Fixture body.
`;

test("seeded path notes remain drafts and are excluded from the public projection", () => {
  const registry = validateContentRegistry(repoRoot);
  const steps = registry.all.filter((item) => item.type === "path_step");

  assert.equal(steps.length, 7);
  assert.deepEqual(
    steps.map((item) => item.order),
    [1, 2, 3, 4, 5, 6, 7],
  );
  assert.ok(steps.every((item) => item.status === "draft" && item.needs_author_review));
  assert.ok(steps.every((item) => item.epistemic_label === "TODO"));
  assert.ok(steps.every((item) => item.safety_notes.includes("TODO")));
  assert.equal(registry.published.length, 0);
  assert.deepEqual(registry.navSections, []);
  assert.deepEqual(registry.issues, []);
});

test("a sensitive published practice without safety notes fails validation", () => {
  const root = writeFixture(basePathStep({ safety_notes: "" }));
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("safety_notes are required")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("a seated practice over 45 minutes requires safety notes", () => {
  const content = basePathStep({ safety_notes: "" }).replace(
    "duration: 1 minute",
    "duration: 50 minutes",
  );
  const root = writeFixture(content);
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("safety_notes are required")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("AI-assisted published content requires an explicit visible label", () => {
  const content = basePathStep().replace("ai_assisted: false", "ai_assisted: true");
  const root = writeFixture(content);
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("ai_assisted_label")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("long quotes without locations and checked status fail validation", () => {
  const root = writeFixture(
    basePathStep({
      quotes: [
        {
          text: "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty twenty-one twenty-two twenty-three twenty-four twenty-five twenty-six",
          location: "",
          quote_status: "unchecked",
        },
      ],
    }),
  );
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("exceeds 25 words")));
    assert.ok(registry.issues.some((issue) => issue.includes("missing a location")));
    assert.ok(registry.issues.some((issue) => issue.includes("is not checked")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("public launch cannot be combined with noindex", () => {
  assert.throws(() => assertLaunchMetadata(true, true), /noindex being enabled/);
  assert.doesNotThrow(() => assertLaunchMetadata(false, true));
  assert.doesNotThrow(() => assertLaunchMetadata(true, false));
});

test("launch validation rejects YouTube URLs and third-party tracking scripts", () => {
  const root = writeFixture(null);
  const sourceDirectory = path.join(root, "src");
  fs.mkdirSync(sourceDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(sourceDirectory, "legacy.tsx"),
    `const video = "https://www.youtube.com/watch?v=example";\n` +
      `<script src="https://www.googletagmanager.com/gtag/js"></script>\n` +
      `gtag("config", "example");\n`,
  );
  try {
    const registry = validateContentRegistry(root, { publicLaunch: true });
    assert.ok(registry.issues.some((issue) => issue.includes("YouTube URLs")));
    assert.ok(registry.issues.some((issue) => issue.includes("third-party tracking scripts")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("a published mantra requires a translation source", () => {
  const root = writeFixture(null, { enabled: ["mantra"] });
  const mantrasDirectory = path.join(root, "content", "mantras");
  fs.mkdirSync(mantrasDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(mantrasDirectory, "fixture.md"),
    `---
id: fixture-mantra
type: mantra
title: Fixture mantra
summary: Fixture summary.
status: published
version: 1
created_at: 2026-10-19
updated_at: 2026-10-19
author: Fixture
ai_assisted: false
rights_status: unknown
source_url: null
license: null
linked_steps: []
tags: []
epistemic_label: studied
changelog: []
sanskrit_devanagari: ""
sanskrit_iast: ""
translation: ""
translation_source: ""
translation_license: ""
tradition: Fixture
initiation_status: open
pronunciation_reviewed_by: null
audio_ref: none
safety_notes: ""
---
`,
  );
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("requires translation_source")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("published audio without a transcript or explicit reason fails validation", () => {
  const root = writeFixture(null, { enabled: ["discourse"] });
  const discoursesDirectory = path.join(root, "content", "discourses");
  fs.mkdirSync(discoursesDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(discoursesDirectory, "fixture.md"),
    `---
id: fixture-discourse
type: discourse
title: Fixture discourse
summary: Fixture summary.
status: published
version: 1
created_at: 2026-10-19
updated_at: 2026-10-19
author: Fixture
ai_assisted: false
rights_status: original_recording
source_url: null
license: CC BY-SA 4.0
linked_steps: []
tags: []
epistemic_label: experienced
changelog: []
audio_ref: fixture.opus
transcript_ref: null
speaker: Fixture
recorded_by: Fixture
own_recording: true
---
Recorded text.
`,
  );
  try {
    const registry = validateContentRegistry(root);
    assert.ok(registry.issues.some((issue) => issue.includes("requires a transcript_ref")));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
