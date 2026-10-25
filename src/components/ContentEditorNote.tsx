import type { ContentEditorNote as ContentEditorNoteData } from "@/data/content-registry";

const fields: Array<[keyof ContentEditorNoteData, string]> = [
  ["what", "What it is"],
  ["who_it_is_for", "Who it is for"],
  ["read_with", "Read with"],
  ["skip_if", "Skip if"],
  ["caveat", "Caveat"],
];

export function ContentEditorNote({ note }: { note: ContentEditorNoteData }) {
  const populated = fields.filter(([key]) => note[key].trim());
  if (populated.length === 0) return null;

  return (
    <aside className="mt-8 space-y-2 border-l border-accent/50 pl-4" aria-label="Editor's note">
      <p className="font-mono text-[10px] tracking-widest uppercase opacity-60">Editor's note</p>
      {populated.map(([key, label]) => (
        <p key={key} className="text-sm leading-relaxed opacity-75">
          <span className="font-medium">{label}: </span>
          {note[key]}
        </p>
      ))}
    </aside>
  );
}
