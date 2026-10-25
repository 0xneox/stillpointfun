
from pathlib import Path
import subprocess
import shutil
import sys
import logging
from datetime import datetime

# ============================================================
# CONFIGURATION — CHANGE THESE PATHS
# ============================================================

# Add every source folder you want to convert.
SOURCE_FOLDERS = [
    r"D:\BODHI\Discourse mp3",
]

# All converted folders will be saved here.
OUTPUT_ROOT = Path(r"D:\Discourseopus")

# Audio quality: 64k is a good starting point for music.
BITRATE = "64k"

# True = keep existing .opus files and resume interrupted runs.
SKIP_EXISTING = True

# False = keep a failed conversion's partial output for diagnosis.
# Normally leave this True.
DELETE_PARTIAL_ON_ERROR = True

# ============================================================
# LOGGING
# ============================================================

LOG_FILE = OUTPUT_ROOT / "conversion.log"


def setup_logging():
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        handlers=[
            logging.FileHandler(LOG_FILE, encoding="utf-8"),
            logging.StreamHandler(sys.stdout),
        ],
    )


# ============================================================
# CHECK REQUIREMENTS
# ============================================================

def check_ffmpeg():
    if shutil.which("ffmpeg") is None:
        print(
            "ERROR: FFmpeg was not found.\n"
            "Install FFmpeg and add its bin folder to PATH."
        )
        sys.exit(1)


# ============================================================
# CONVERT ONE MP3 FILE
# ============================================================

def convert_file(source: Path, destination: Path) -> str:
    if SKIP_EXISTING and destination.exists():
        logging.info("SKIPPED (already exists): %s", source)
        return "skipped"

    destination.parent.mkdir(parents=True, exist_ok=True)

    # Write to a temporary file first, so incomplete conversions
    # do not appear as finished .opus files.
    temporary = destination.with_name(
        destination.stem + ".partial.opus"
    )

    if temporary.exists():
        temporary.unlink()

    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel", "error",
        "-nostdin",
        "-y",
        "-i", str(source),

        # Select the first audio stream and copy metadata.
        "-map", "0:a:0",
        "-map_metadata", "0",

        # Encode to Opus.
        "-c:a", "libopus",
        "-b:a", BITRATE,
        "-vbr", "on",
        "-compression_level", "10",
        "-application", "audio",

        # Opus output container.
        "-f", "opus",
        str(temporary),
    ]

    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
        )

        if result.returncode != 0:
            error = result.stderr.strip()
            raise RuntimeError(error or "FFmpeg conversion failed")

        if not temporary.exists() or temporary.stat().st_size == 0:
            raise RuntimeError("Output file is missing or empty")

        # Replace the destination only after successful conversion.
        temporary.replace(destination)

        source_mb = source.stat().st_size / (1024 * 1024)
        output_mb = destination.stat().st_size / (1024 * 1024)

        logging.info(
            "OK | %.2f MB -> %.2f MB | %s",
            source_mb,
            output_mb,
            destination,
        )

        return "converted"

    except Exception as exc:
        logging.error("FAILED | %s | %s", source, exc)

        if DELETE_PARTIAL_ON_ERROR and temporary.exists():
            temporary.unlink()

        return "failed"


# ============================================================
# PROCESS ALL FOLDERS
# ============================================================

def main():
    check_ffmpeg()
    setup_logging()

    logging.info("=" * 60)
    logging.info("MP3 TO OPUS CONVERSION STARTED")
    logging.info("Bitrate: %s", BITRATE)
    logging.info("Output: %s", OUTPUT_ROOT)
    logging.info("=" * 60)

    total = 0
    converted = 0
    skipped = 0
    failed = 0
    missing_folders = 0

    for source_root_text in SOURCE_FOLDERS:
        source_root = Path(source_root_text)

        if not source_root.is_dir():
            logging.error("SOURCE FOLDER NOT FOUND: %s", source_root)
            missing_folders += 1
            continue

        # Each source gets its own top-level output folder.
        # All nested subfolders are preserved.
        output_root = OUTPUT_ROOT / source_root.name

        logging.info("Scanning: %s", source_root)
        logging.info("Saving to: %s", output_root)

        # Gather MP3 files recursively.
        files = sorted(
            (
                p for p in source_root.rglob("*")
                if p.is_file() and p.suffix.lower() == ".mp3"
            ),
            key=lambda p: str(p).lower(),
        )

        logging.info("Found %d MP3 files", len(files))

        for index, source in enumerate(files, start=1):
            relative_path = source.relative_to(source_root)

            # Keep the same filename, replacing only .mp3 with .opus.
            destination = (
                output_root / relative_path
            ).with_suffix(".opus")

            total += 1

            logging.info(
                "[%d/%d] Processing: %s",
                index,
                len(files),
                relative_path,
            )

            status = convert_file(source, destination)

            if status == "converted":
                converted += 1
            elif status == "skipped":
                skipped += 1
            else:
                failed += 1

    logging.info("=" * 60)
    logging.info("CONVERSION SUMMARY")
    logging.info("MP3 files examined: %d", total)
    logging.info("Converted: %d", converted)
    logging.info("Skipped: %d", skipped)
    logging.info("Failed: %d", failed)
    logging.info("Missing source folders: %d", missing_folders)
    logging.info("Log file: %s", LOG_FILE)
    logging.info("=" * 60)


if __name__ == "__main__":
    main()
