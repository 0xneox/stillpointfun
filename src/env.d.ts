declare const __PUBLIC_LAUNCH__: boolean;
declare const __MEDIA_BASE_URL__: string;
declare const __SITE_URL__: string;

declare module "virtual:stillpoint-public-library" {
  import type { LibraryDocument } from "./data/library";

  const manifest: {
    shelves: string[];
    items: LibraryDocument[];
  };

  export default manifest;
}

declare module "virtual:stillpoint-content-registry" {
  import type { ContentEntry, ContentNavSection } from "./data/content-registry";

  const content: {
    items: ContentEntry[];
    pathSteps: ContentEntry[];
    navSections: ContentNavSection[];
    founderPage: { data: Record<string, unknown>; body: string } | null;
  };

  export default content;
}
