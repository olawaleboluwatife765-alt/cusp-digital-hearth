/** Simulated wallet session persisted in the browser. No real keys are stored. */
export type GoogleAccount = { name: string; email: string; initials: string };

export type CuspSession = {
  walletExists: boolean;
  firstLaunchDone: boolean;
  walletName: string;
  googleAccount: GoogleAccount | null;
  authMethod: "google" | "phrase" | null;
  pin: string | null;
  fingerprint: boolean;
  pattern: boolean;
};

export const DEFAULT_SESSION: CuspSession = {
  walletExists: false,
  firstLaunchDone: false,
  walletName: "My Wallet",
  googleAccount: null,
  authMethod: null,
  pin: null,
  fingerprint: false,
  pattern: false,
};

const KEY = "cusp.session.v2";

export function loadSession(): CuspSession {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SESSION;
    return { ...DEFAULT_SESSION, ...(JSON.parse(raw) as Partial<CuspSession>) };
  } catch {
    return DEFAULT_SESSION;
  }
}

export function saveSession(s: CuspSession) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
