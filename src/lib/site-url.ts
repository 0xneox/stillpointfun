export const SITE_URL = __SITE_URL__.replace(/\/+$/, "");

export function siteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
