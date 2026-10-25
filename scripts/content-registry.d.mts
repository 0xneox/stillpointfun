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
  changelog: Array<{ version: number; date: string; note: string }>;
  body: string;
  source_path: string;
  [key: string]: unknown;
}

export interface ContentRegistry {
  config: { content_types_enabled: Record<string, boolean> };
  all: ContentEntry[];
  published: ContentEntry[];
  navSections: Array<{ id: "path" | "practice" | "log"; label: string; count: number }>;
  issues: string[];
  warnings: string[];
}

export function validateContentRegistry(
  root: string,
  options?: { publicLaunch?: boolean },
): ContentRegistry;
export function assertLaunchMetadata(publicLaunch: boolean, noindexOn: boolean): void;
