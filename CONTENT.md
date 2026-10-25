# Content and rights

Content terms differ by item. The MIT license in [LICENSE](./LICENSE) applies to the application code only.

Original writing created for Stillpoint is licensed under [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).

Third-party texts and audio retain their own copyright and terms. They are listed in the relevant content manifest with a rights status. A status of `verify` means the status is unknown or has not been checked; it is not permission to host or redistribute the work.

Nothing is hosted unless its rights status is verified. Possessing a copy is not evidence of permission to host it.

## Content-type registry

Structured content uses Markdown files with YAML front matter. The source of truth is under `content/`; the Vite build validates its front matter and projects only `published` entries from enabled types. Drafts, including the initial Path seeds, are not bundled into the public content registry.

Shared fields are `id`, `type`, `title`, `summary`, `status` (`draft` or `published`), integer `version`, `created_at`, `updated_at`, `author`, `ai_assisted`, `rights_status`, `source_url`, `license`, `linked_steps`, `tags`, `epistemic_label`, `changelog`, and an `editor_note` object with `what`, `who_it_is_for`, `read_with`, `skip_if`, and `caveat`. Editor's-note fields remain blank until written by the author and are rendered only when populated.

Types enabled for content are `path_step`, `practice`, `mantra`, and `log`. `content/content-types.yml` keeps `chant`, `discourse`, `text`, `note`, `work`, and `stream` schema-only and disabled; they have no public routes or UI. Their schema validation remains available for drafts and future use. Work and stream entries use `release_status` (`idea`, `in_progress`, or `released`) in addition to the shared publication `status`, so the two status vocabularies do not conflict.

Path steps carry order, tradition-origin references, a structured practice, safety notes, confusions, linked manifest sources, linked mantras/practices, and an author-review flag. Practice entries include tradition, instructions, duration, posture, teacher requirement, and safety notes. Mantras include Devanagari and IAST text, translation and its source/license, tradition, initiation status, pronunciation reviewer, audio reference, and safety notes. No mantra has been seeded.

Audio and video content must have a transcript or a specific `no_transcript_reason` before publication. Audio items also record the speaker, recorder, and whether they are an own recording. Source links may reference only library manifest entries whose action is `host` or `link_out`.

The production build validates content and runs launch-only checks when `PUBLIC_LAUNCH=true`; it rejects YouTube URLs, third-party tracking scripts, and an inconsistent noindex/launch configuration. Existing pre-launch audio routes still contain legacy YouTube references, so the launch-mode gate remains intentionally closed until those references are removed or replaced.

## Epistemic labels

Every content item has an `epistemic_label`:

- `experienced` — presented as the author's experience.
- `studied` — presented as learned from study of identified sources.
- `received` — attributed to a teacher or lineage, with attribution checked.
- `uncertain` — the author is not certain.

Labels are metadata rendered visibly on Path, Practice, and Log content pages. They are not a substitute for citations, attribution, safety review, or rights verification. A draft may use a TODO placeholder; a published item must use one of the four labels.
