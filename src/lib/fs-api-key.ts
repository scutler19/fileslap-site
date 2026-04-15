/** FileSlap API key persisted after signup (localStorage or cookie). */

export function getStoredFileSlapApiKey(): string | null {
  if (typeof window === "undefined") return null;
  const ls = localStorage.getItem("fs_api_key");
  if (ls) return ls;
  const m = document.cookie.match(/(?:^|;\s*)fs_api_key=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function setStoredFileSlapApiKey(key: string): void {
  if (typeof window === "undefined") return;
  const t = key.trim();
  if (t) localStorage.setItem("fs_api_key", t);
  else localStorage.removeItem("fs_api_key");
}
