// app/tooles/coding-tooles/monaco-components/monaco-loader.ts
"use client";

import type * as MonacoType from "monaco-editor";

let monacoPromise: Promise<typeof MonacoType> | null = null;
let themesRegistered = false;

export interface MonacoThemeItem {
  id: string;
  name: string;
  dark: boolean;
  monacoBase: "vs" | "vs-dark" | "hc-black" | "hc-light";
}

export const MONACO_THEMES: MonacoThemeItem[] = [
  { id: "vs-dark", name: "VS Code Dark", dark: true, monacoBase: "vs-dark" },
  { id: "vs", name: "VS Code Light", dark: false, monacoBase: "vs" },
  { id: "dracula", name: "Dracula", dark: true, monacoBase: "vs-dark" },
  { id: "monokai", name: "Monokai", dark: true, monacoBase: "vs-dark" },
  { id: "githubDark", name: "GitHub Dark", dark: true, monacoBase: "vs-dark" },
  { id: "githubLight", name: "GitHub Light", dark: false, monacoBase: "vs" },
  { id: "nord", name: "Nord", dark: true, monacoBase: "vs-dark" },
  { id: "tokyoNight", name: "Tokyo Night", dark: true, monacoBase: "vs-dark" },
  { id: "oneDark", name: "One Dark Pro", dark: true, monacoBase: "vs-dark" },
  { id: "hc-black", name: "High Contrast Dark", dark: true, monacoBase: "hc-black" },
];

/**
 * Configure Monaco Worker Environment using inline Blobs with CDN fallback.
 * This guarantees zero webpack worker bundling issues in Next.js.
 */
function setupMonacoEnvironment() {
  if (typeof window === "undefined") return;

  const w = window as any;
  if (!w.MonacoEnvironment) {
    w.MonacoEnvironment = {
      getWorkerUrl: function (_moduleId: string, label: string) {
        const monacoVersion = "0.56.0";
        const cdnBase = `https://cdn.jsdelivr.net/npm/monaco-editor@${monacoVersion}/min/`;

        let workerPath = "vs/base/worker/workerMain.js";
        if (label === "json") {
          workerPath = "vs/language/json/json.worker.js";
        } else if (label === "css" || label === "scss" || label === "less") {
          workerPath = "vs/language/css/css.worker.js";
        } else if (label === "html" || label === "handlebars" || label === "razor") {
          workerPath = "vs/language/html/html.worker.js";
        } else if (label === "typescript" || label === "javascript") {
          workerPath = "vs/language/typescript/ts.worker.js";
        }

        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = { baseUrl: '${cdnBase}' };
          try {
            importScripts('${cdnBase}${workerPath}');
          } catch(e) {
            console.warn('Monaco worker load fallback:', e);
          }
        `)}`;
      },
    };
  }
}

/**
 * Registers popular high-quality themes to Monaco Editor
 */
function registerMonacoThemes(monaco: typeof MonacoType) {
  if (themesRegistered) return;
  themesRegistered = true;

  // 1. Dracula Theme
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "F8F8F2", background: "282A36" },
      { token: "comment", foreground: "6272A4", fontStyle: "italic" },
      { token: "string", foreground: "F1FA8C" },
      { token: "constant.numeric", foreground: "BD93F9" },
      { token: "keyword", foreground: "FF79C6" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "type", foreground: "8BE9FD", fontStyle: "italic" },
      { token: "function", foreground: "50FA7B" },
      { token: "tag", foreground: "FF79C6" },
      { token: "delimiter", foreground: "FF79C6" },
    ],
    colors: {
      "editor.background": "#282A36",
      "editor.foreground": "#F8F8F2",
      "editor.selectionBackground": "#44475A",
      "editor.lineHighlightBackground": "#44475A55",
      "editorCursor.foreground": "#AEAFAD",
      "editorWhitespace.foreground": "#6272A440",
      "editorIndentGuide.background": "#6272A430",
      "editorIndentGuide.activeBackground": "#6272A480",
    },
  });

  // 2. Monokai Theme
  monaco.editor.defineTheme("monokai", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "F8F8F2", background: "272822" },
      { token: "comment", foreground: "75715E", fontStyle: "italic" },
      { token: "string", foreground: "E6DB74" },
      { token: "constant.numeric", foreground: "AE81FF" },
      { token: "keyword", foreground: "F92672" },
      { token: "function", foreground: "A6E22E" },
      { token: "type", foreground: "66D9EF", fontStyle: "italic" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F0",
    },
  });

  // 3. GitHub Dark Theme
  monaco.editor.defineTheme("githubDark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "C9D1D9", background: "0D1117" },
      { token: "comment", foreground: "8B949E", fontStyle: "italic" },
      { token: "string", foreground: "A5D6FF" },
      { token: "constant.numeric", foreground: "79C0FF" },
      { token: "keyword", foreground: "FF7B72" },
      { token: "function", foreground: "D2A8FF" },
      { token: "type", foreground: "FFA657" },
    ],
    colors: {
      "editor.background": "#0D1117",
      "editor.foreground": "#C9D1D9",
      "editor.selectionBackground": "#3b5070",
      "editor.lineHighlightBackground": "#161B22",
      "editorCursor.foreground": "#58A6FF",
    },
  });

  // 4. GitHub Light Theme
  monaco.editor.defineTheme("githubLight", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "", foreground: "24292F", background: "FFFFFF" },
      { token: "comment", foreground: "6E7781", fontStyle: "italic" },
      { token: "string", foreground: "0A3069" },
      { token: "constant.numeric", foreground: "0550AE" },
      { token: "keyword", foreground: "CF222E" },
      { token: "function", foreground: "8250DF" },
      { token: "type", foreground: "953800" },
    ],
    colors: {
      "editor.background": "#FFFFFF",
      "editor.foreground": "#24292F",
      "editor.selectionBackground": "#B6E3FF80",
      "editor.lineHighlightBackground": "#F6F8FA",
      "editorCursor.foreground": "#0969DA",
    },
  });

  // 5. Nord Theme
  monaco.editor.defineTheme("nord", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "D8DEE9", background: "2E3440" },
      { token: "comment", foreground: "4C566A", fontStyle: "italic" },
      { token: "string", foreground: "A3BE8C" },
      { token: "constant.numeric", foreground: "B48EAD" },
      { token: "keyword", foreground: "81A1C1" },
      { token: "function", foreground: "88C0D0" },
      { token: "type", foreground: "8FBCBB" },
    ],
    colors: {
      "editor.background": "#2E3440",
      "editor.foreground": "#D8DEE9",
      "editor.selectionBackground": "#434C5E",
      "editor.lineHighlightBackground": "#3B4252",
      "editorCursor.foreground": "#D8DEE9",
    },
  });

  // 6. Tokyo Night
  monaco.editor.defineTheme("tokyoNight", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "C0CAF5", background: "1A1B26" },
      { token: "comment", foreground: "565F89", fontStyle: "italic" },
      { token: "string", foreground: "9ECE6A" },
      { token: "constant.numeric", foreground: "FF9E64" },
      { token: "keyword", foreground: "BB9AF7" },
      { token: "function", foreground: "7AA2F7" },
      { token: "type", foreground: "2AC3DE" },
    ],
    colors: {
      "editor.background": "#1A1B26",
      "editor.foreground": "#C0CAF5",
      "editor.selectionBackground": "#33467C",
      "editor.lineHighlightBackground": "#1F2335",
      "editorCursor.foreground": "#C0CAF5",
    },
  });

  // 7. One Dark Pro
  monaco.editor.defineTheme("oneDark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "ABB2BF", background: "282C34" },
      { token: "comment", foreground: "5C6370", fontStyle: "italic" },
      { token: "string", foreground: "98C379" },
      { token: "constant.numeric", foreground: "D19A66" },
      { token: "keyword", foreground: "C678DD" },
      { token: "function", foreground: "61AFEF" },
      { token: "type", foreground: "E5C07B" },
    ],
    colors: {
      "editor.background": "#282C34",
      "editor.foreground": "#ABB2BF",
      "editor.selectionBackground": "#3E4451",
      "editor.lineHighlightBackground": "#2C313A",
      "editorCursor.foreground": "#528BFF",
    },
  });
}

/**
 * Singleton loader for Monaco editor instance.
 * Safe for Next.js SSR / client hydration.
 */
export async function loadMonaco(): Promise<typeof MonacoType> {
  if (typeof window === "undefined") {
    throw new Error("Monaco editor can only be loaded in the browser environment.");
  }

  if (!monacoPromise) {
    monacoPromise = (async () => {
      setupMonacoEnvironment();
      const monaco = await import("monaco-editor");
      registerMonacoThemes(monaco);
      return monaco;
    })();
  }

  return monacoPromise;
}

/**
 * Translates application language IDs into Monaco's native language IDs
 */
export function normalizeMonacoLanguage(langId: string): string {
  const map: Record<string, string> = {
    python: "python",
    javascript: "javascript",
    typescript: "typescript",
    html: "html",
    css: "css",
    json: "json",
    xml: "xml",
    yaml: "yaml",
    markdown: "markdown",
    cpp: "cpp",
    c: "c",
    csharp: "csharp",
    java: "java",
    go: "go",
    rust: "rust",
    php: "php",
    ruby: "ruby",
    sql: "sql",
    swift: "swift",
    kotlin: "kotlin",
    r: "r",
    bash: "shell",
    shell: "shell",
    lua: "lua",
    scala: "scala",
    perl: "perl",
    dart: "dart",
  };
  return map[langId.toLowerCase()] || langId.toLowerCase();
}
