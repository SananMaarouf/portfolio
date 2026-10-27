/**
 * Single source of truth for the theme list. Imported by the pre-paint
 * inline script in Layout.astro (server side, via define:vars) and by the
 * client-side store — keep it free of DOM and React.
 */
export const THEMES = ["light", "dark", "nerd", "terminal", "retro95"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

export const THEME_LABELS: Record<Theme, { en: string; nb: string }> = {
  light: { en: "Light", nb: "Lyst" },
  dark: { en: "Dark", nb: "Mørkt" },
  nerd: { en: "Nerd", nb: "Nerd" },
  terminal: { en: "Terminal", nb: "Terminal" },
  retro95: { en: "Retro '95", nb: "Retro '95" },
};

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}
