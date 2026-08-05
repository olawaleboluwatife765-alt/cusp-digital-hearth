/** Cusp appearance system — Paper (light), Graphite (dark), System. */
export type ThemeMode = "paper" | "graphite" | "system";

const KEY = "cusp.theme.v1";

export function loadTheme(): ThemeMode {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === "paper" || raw === "graphite" || raw === "system") return raw;
  } catch {
    /* ignore */
  }
  return "paper";
}

export function saveTheme(mode: ThemeMode) {
  try {
    window.localStorage.setItem(KEY, mode);
  } catch {
    /* ignore */
  }
}

export function systemPrefersDark() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(mode: ThemeMode): "paper" | "graphite" {
  if (mode === "system") return systemPrefersDark() ? "graphite" : "paper";
  return mode;
}

/** Applies the resolved theme to <html> with a short cross-fade. */
export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = resolveTheme(mode);
  root.classList.add("theme-shifting");
  root.classList.toggle("dark", resolved === "graphite");
  root.dataset["theme"] = resolved;
  root.style.colorScheme = resolved === "graphite" ? "dark" : "light";
  window.setTimeout(() => root.classList.remove("theme-shifting"), 420);
}

export const THEME_OPTIONS: { key: ThemeMode; label: string; desc: string }[] = [
  { key: "paper", label: "Paper", desc: "Cusp's premium light theme." },
  { key: "graphite", label: "Graphite", desc: "Deep graphite dark theme with champagne highlights." },
  { key: "system", label: "Match system", desc: "Follow your device appearance automatically." },
];
