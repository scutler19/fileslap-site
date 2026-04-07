/** Canonical site origin (middleware redirects apex → www). */
export const SITE_URL = "https://www.fileslap.com" as const;

/** Shared Open Graph / Twitter image (exists in public/). */
export const DEFAULT_OG_IMAGE = "/assets/fileslap-logo-box.png" as const;

/** Absolute URL for a path (e.g. `/docs` → https://www.fileslap.com/docs). */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
