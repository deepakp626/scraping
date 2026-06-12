// src/components/editor/StatusBar.tsx
"use client";

import React from "react";
import clsx from "clsx";
import type { EditorStats, RunStatus } from "../types/editor";
import { LANGUAGES } from "../lib/languages";

interface StatusBarProps {
  stats: EditorStats;
  runStatus: RunStatus;
  currentLangId: string;
  themeId: string;
}

export default function StatusBar({
  stats,
  runStatus,
  currentLangId,
  themeId,
}: StatusBarProps) {
  const lang = LANGUAGES[currentLangId];

  const statusColor = {
    idle: "bg-gray-500",
    running: "bg-yellow-400 animate-pulse",
    success: "bg-green-400",
    error: "bg-red-400",
  }[runStatus];

  const statusText = {
    idle: "Ready",
    running: "Running…",
    success: "Done",
    error: "Error",
  }[runStatus];

  return (
    <div className="flex items-center gap-4 px-3 py-1 bg-editor-surface border-t border-editor-border text-[11px] font-mono text-editor-muted select-none overflow-hidden">
      {/* Status indicator */}
      <div className="flex items-center gap-1.5">
        <span className={clsx("w-1.5 h-1.5 rounded-full", statusColor)} />
        <span className={clsx(
          runStatus === "success" && "text-green-400",
          runStatus === "error" && "text-red-400",
          runStatus === "running" && "text-yellow-400",
        )}>
          {statusText}
        </span>
      </div>

      <div className="h-3 w-px bg-editor-border" />

      {/* Language */}
      <span className="hidden sm:block" style={{ color: lang?.color }}>
        {lang?.name}
      </span>

      <div className="h-3 w-px bg-editor-border hidden sm:block" />

      {/* Theme */}
      <span className="hidden md:block">{themeId}</span>

      <div className="flex-1" />

      {/* Cursor */}
      <span>Ln {stats.cursorLine}, Col {stats.cursorCol}</span>
      <div className="h-3 w-px bg-editor-border" />
      <span>{stats.lines} lines</span>
      <div className="h-3 w-px bg-editor-border" />
      <span>{stats.chars} chars</span>
      <div className="h-3 w-px bg-editor-border" />
      <span>{stats.words} words</span>
    </div>
  );
}
