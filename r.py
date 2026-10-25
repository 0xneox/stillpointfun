
from pathlib import Path
import re

# Change this to your music folder path
FOLDER = Path(r"D:\BODHI\Music-Nada mp3")

# Set to True to preview changes without renaming
DRY_RUN = False

for file in FOLDER.iterdir():
    if not file.is_file() or file.suffix.lower() != ".mp3":
        continue

    # Remove prefix such as "001 - " or "002 - "
    new_name = re.sub(r"^\d+\s*-\s*", "", file.name)

    if new_name == file.name:
        continue

    new_path = file.with_name(new_name)

    # Avoid overwriting an existing file
    if new_path.exists():
        print(f"SKIPPED (already exists): {new_name}")
        continue

    print(f"{'[PREVIEW]' if DRY_RUN else '[RENAMED]'} {file.name} -> {new_name}")

    if not DRY_RUN:
        file.rename(new_path)

print("\nFinished.")
