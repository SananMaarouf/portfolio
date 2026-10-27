import { THEME_STORAGE_KEY, isTheme, type Theme } from "./theme";

/**
 * Module-level store consumed via useSyncExternalStore.
 *
 * Ownership split: the inline script in Layout.astro resolves the initial
 * theme (localStorage → prefers-color-scheme) and stamps <html data-theme>
 * before paint and after every view-transition swap. This store owns
 * user-initiated changes only, and reads its initial value from the DOM
 * attribute the script already set — one resolver, one writer.
 *
 * A module store (not React context) so any island on the page can read
 * the theme; Astro islands are separate React roots.
 */
let current: Theme | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function readFromDom(): Theme | null {
  if (typeof document === "undefined") return null;
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : null;
}

if (typeof document !== "undefined") {
  current = readFromDom();
  // Cross-tab sync
  window.addEventListener("storage", (event) => {
    if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
      current = event.newValue;
      document.documentElement.dataset.theme = event.newValue;
      notify();
    }
  });
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Theme | null {
  return current;
}

/** Static HTML renders no active theme; hydration fills it in without a flash. */
export function getServerSnapshot(): Theme | null {
  return null;
}

export function setTheme(next: Theme) {
  if (!isTheme(next) || next === current) return;
  current = next;
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Safari private mode etc. — theme still applies for this page view
  }
  notify();
}
