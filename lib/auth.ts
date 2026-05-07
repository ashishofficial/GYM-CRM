// Lightweight cookie-based mock auth for the Gym CRM.
// - Cookie is what Next.js middleware reads to gate protected routes.
// - localStorage mirrors the cookie so the client can read user info
//   for display (Topbar avatar/name) without parsing cookies.

export const AUTH_COOKIE = "gym-crm-auth";
const SESSION_KEY = "gym-crm-session";
const ONE_WEEK_SECONDS = 7 * 24 * 60 * 60;

export interface Session {
  email: string;
  name: string;
  role: "Admin" | "Owner" | "Manager" | "Operations" | "Front Desk";
  loggedInAt: string;
}

/** Persist a session in cookie + localStorage. Client only. */
export function setSession(session: Session) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(session));
  document.cookie = `${AUTH_COOKIE}=${value}; path=/; max-age=${ONE_WEEK_SECONDS}; samesite=lax`;
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage may be unavailable (private mode, SSR) — cookie is enough.
  }
}

/** Remove the session — used by logout. */
export function clearSession() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/** Read the active session from the client. SSR-safe. */
export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as Session) : null;
  } catch {
    return null;
  }
}
