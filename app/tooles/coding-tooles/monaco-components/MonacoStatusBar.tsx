// app/tooles/coding-tooles/monaco-components/MonacoStatusBar.tsx
"use client";

import React from "react";
import { LANGUAGES } from "../lib/languages";
import type { RunStatus } from "../types/editor";
import type { MonacoEditorStats } from "./MonacoEditor";

export interface MonacoStatusBarProps {
  stats: MonacoEditorStats;
  runStatus: RunStatus;
  currentLangId: string;
  themeId: string;
}

export default function MonacoStatusBar({
  stats,
  runStatus,
  currentLangId,
  themeId,
}: MonacoStatusBarProps) {
  const lang = LANGUAGES[currentLangId];

  const statusConfig = {
    idle: { color: "bg-slate-400", text: "Ready", textColor: "text-slate-400" },
    running: { color: "bg-amber-400 animate-pulse", text: "Running…", textColor: "text-amber-400 font-semibold" },
    success: { color: "bg-emerald-400", text: "Done", textColor: "text-emerald-400 font-medium" },
    error: { color: "bg-rose-400", text: "Failed", textColor: "text-rose-400 font-medium" },
  }[runStatus];

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 select-none overflow-x-auto whitespace-nowrap transition-colors">
      {/* Left items: Status & Language & Theme */}
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${statusConfig.color}`} />
          <span className={statusConfig.textColor}>{statusConfig.text}</span>
        </div>

        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

        {/* Language */}
        {lang && (
          <div className="flex items-center gap-1.5 font-medium" style={{ color: lang.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
            <span>{lang.name}</span>
          </div>
        )}

        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden md:block" />

        {/* Theme */}
        <span className="hidden md:inline-block text-slate-400">{themeId}</span>

        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden lg:block" />

        {/* Hint */}
        <span className="hidden lg:inline-block text-slate-400 text-[10px]">
          Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">F1</kbd> for Command Palette
        </span>
      </div>

      {/* Right items: Cursor position, Selection, Lines, Chars */}
      <div className="flex items-center gap-3">
        {/* Selection if active */}
        {stats.selectedChars !== undefined && stats.selectedChars > 0 && (
          <>
            <span className="text-primary-theme font-medium">({stats.selectedChars} selected)</span>
            <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
          </>
        )}

        {/* Cursor Position */}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Ln {stats.cursorLine}, Col {stats.cursorCol}
        </span>

        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

        {/* Metrics */}
        <span>{stats.lines} {stats.lines === 1 ? "line" : "lines"}</span>
        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
        <span>{stats.chars} chars</span>
        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
        <span className="hidden sm:inline">{stats.words} words</span>

        <div className="h-3 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />
        <span className="hidden sm:inline">UTF-8</span>
      </div>
    </div>
  );
}
