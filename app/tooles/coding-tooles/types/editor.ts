import type React from "react";

export type ThemeName =
  | "vscodeDark"
  | "dracula"
  | "githubDark"
  | "githubLight"
  | "monokai"
  | "nord"
  | "okaidia"
  | "tokyoNight";

export interface LanguageConfig {
  id: string;
  name: string;
  judge0Id: number;
  extension: string;
  monacoLang: string;
  color: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  image?: string;
  starter: string;
  info: {
    description: string;
    version: string;
    tip: string;
    website: string;
  };
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

export interface EditorStats {
  lines: number;
  chars: number;
  words: number;
  cursorLine: number;
  cursorCol: number;
}

export type OutputTab = "output" | "info" | "shortcuts";
export type RunStatus = "idle" | "running" | "success" | "error";
