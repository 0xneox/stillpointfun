# Recording guide

This guide is for future Stillpoint recordings. No recording has been supplied or processed for this change.

## Recording targets

- Prefer Opus (`.opus`) or MP3 (`.mp3`); mono is fine.
- Use a 48 kHz sample rate.
- Aim for -19 LUFS integrated loudness for mono speech, with a true peak no higher than -1 dBTP.
- Record in a quiet space and keep an unprocessed original as your source.

The recording-stub script converts a supplied file to mono 48 kHz Opus and MP3 and applies loudness normalization to those targets. It requires `ffmpeg` with Opus and MP3 encoders installed.

## File naming

Use `YYYY-MM-DD_<type>_<short-topic>.<extension>`, for example `2026-10-19_discourse_morning-notes.wav`. Keep the date, type, and topic lowercase except for the date; use hyphens inside the topic.

Converted outputs are written to the ignored `media/own-recordings/` directory. Do not commit or upload them as part of preparing content.

## Add an item

1. Run `node scripts/create-recording-stub.mjs <audio-file> --type discourse` or use `--type chant`.
2. Review the generated draft in `content/discourses/` or `content/chants/`.
3. Add a verbatim transcript at the generated `transcript_ref`; do not publish an empty placeholder.
4. Check the recording and transcript, fill the speaker/recorder, rights, license, summary, tags, and any relevant linked Path steps.
5. For Sanskrit recitation, get pronunciation reviewed and record the reviewer in the relevant mantra metadata.
6. Keep `own_recording: true` only for a recording made for Stillpoint by the author. Never publish until the content type is enabled and all required fields and rights are checked.

The generated transcript pointer is relative to the repository root. A published audio/video item must have a transcript or a specific `no_transcript_reason`.

## Transcript template

```text
TODO: Add a verbatim transcript before publication.

[Speaker label, if needed]
Transcript text, with meaningful pauses or non-speech audio noted in brackets.
```
