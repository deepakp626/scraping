// src/lib/themes.ts
// Import all themes — these are dynamically loaded in the editor component

export const THEMES = [
  { id: "vscodeDark", name: "VS Code Dark", dark: true },
  { id: "dracula", name: "Dracula", dark: true },
  { id: "githubDark", name: "GitHub Dark", dark: true },
  { id: "githubLight", name: "GitHub Light", dark: false },
  { id: "monokai", name: "Monokai", dark: true },
  { id: "nord", name: "Nord", dark: true },
  { id: "okaidia", name: "Okaidia", dark: true },
  { id: "tokyoNight", name: "Tokyo Night", dark: true },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "vscodeDark";
