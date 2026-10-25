import publicContent from "virtual:stillpoint-content-registry";

export interface ContentChangelogEntry {
  version: number;
  date: string;
  note: string;
}

export interface ContentEditorNote {
  what: string;
  who_it_is_for: string;
  read_with: string;
  skip_if: string;
  caveat: string;
}

export interface ContentEntry {
  id: string;
  type: string;
  title: string;
  summary: string;
  status: "draft" | "published";
  version: number;
  created_at: string;
  updated_at: string;
  author: string;
  ai_assisted: boolean;
  rights_status: string;
  source_url: string | null;
  license: string | null;
  linked_steps: string[];
  tags: string[];
  epistemic_label: string;
  changelog: ContentChangelogEntry[];
  editor_note: ContentEditorNote;
  body: string;
  source_path: string;
  [key: string]: unknown;
}

export interface ContentNavSection {
  id: "path" | "practice" | "log";
  label: string;
  count: number;
}

interface PublicContent {
  items: ContentEntry[];
  pathSteps: ContentEntry[];
  navSections: ContentNavSection[];
}

export const CONTENT_REGISTRY = publicContent as PublicContent;
export const PUBLISHED_CONTENT = CONTENT_REGISTRY.items;
export const PUBLISHED_PATH_STEPS = CONTENT_REGISTRY.pathSteps;
export const CONTENT_NAV_SECTIONS = CONTENT_REGISTRY.navSections;

const sectionRoutes = {
  path: "/path",
  practice: "/practice",
  log: "/log",
} as const;

export const CONTENT_NAV_LINKS: Array<{
  to: (typeof sectionRoutes)[keyof typeof sectionRoutes];
  label: string;
}> = CONTENT_NAV_SECTIONS.map((section) => ({
  to: sectionRoutes[section.id],
  label: section.label,
}));

export function formatContentDate(value: string): string {
  return value;
}

export function contentVersionLabel(item: Pick<ContentEntry, "version" | "updated_at">): string {
  return `v${item.version}, updated ${formatContentDate(item.updated_at)}`;
}
