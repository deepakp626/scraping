// src/components/editor/Toolbar.tsx
"use client";

import React from "react";
import { Play, RotateCcw, Copy, Settings2, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { LANGUAGE_LIST } from "../lib/languages";
import { THEMES } from "../lib/themes";
import type { RunStatus } from "../types/editor";

interface ToolbarProps {
  currentLangId: string;
  themeId: string;
  fontSize: number;
  runStatus: RunStatus;
  code: string;
  onLangChange: (id: string) => void;
  onThemeChange: (id: string) => void;
  onFontSizeChange: (size: number) => void;
  onRun: () => void;
  onReset: () => void;
  onCopy: () => void;
}

export default function Toolbar({
  currentLangId,
  themeId,
  fontSize,
  runStatus,
  code,
  onLangChange,
  onThemeChange,
  onFontSizeChange,
  onRun,
  onReset,
  onCopy,
}: ToolbarProps) {
  const [showSettings, setShowSettings] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const currentLang = LANGUAGE_LIST.find((l) => l.id === currentLangId);

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-editor-surface border-b border-editor-border flex-wrap relative z-10">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-1">
        <div className="w-7 h-7 rounded-lg bg-editor-accent flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>
        <span className="font-sans font-bold text-sm text-editor-text tracking-tight hidden sm:block">
          CodeRun
        </span>
      </div>

      {/* Language Selector */}
      <div className="relative">
        <select
          value={currentLangId}
          onChange={(e) => onLangChange(e.target.value)}
          className="
            appearance-none font-sans text-sm font-medium
            bg-editor-bg border border-editor-border text-editor-text
            rounded-lg px-3 py-1.5 pr-7 cursor-pointer outline-none
            hover:border-editor-accent/50 transition-colors
            focus:border-editor-accent focus:ring-1 focus:ring-editor-accent/30
          "
        >
          {LANGUAGE_LIST.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-editor-muted pointer-events-none" />
      </div>

      {/* Lang color badge */}
      {currentLang && (
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
          style={{ backgroundColor: currentLang.color + "22", color: currentLang.color }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentLang.color }} />
          .{currentLang.extension}
        </div>
      )}

      {/* Settings toggle */}
      <div className="relative">
        <button
          onClick={() => setShowSettings((v) => !v)}
          className={clsx(
            "p-1.5 rounded-lg border transition-colors",
            showSettings
              ? "border-editor-accent/50 bg-editor-accent/10 text-editor-accent"
              : "border-editor-border text-editor-muted hover:text-editor-text hover:border-editor-accent/30"
          )}
          title="Settings"
        >
          <Settings2 className="w-4 h-4" />
        </button>

        {showSettings && (
          <div className="absolute top-full left-0 mt-1 p-3 bg-editor-surface border border-editor-border rounded-xl shadow-2xl z-50 min-w-[220px]">
            <p className="text-xs font-semibold text-editor-muted uppercase tracking-wider mb-2">Editor Theme</p>
            <select
              value={themeId}
              onChange={(e) => onThemeChange(e.target.value)}
              className="w-full appearance-none font-sans text-sm bg-editor-bg border border-editor-border text-editor-text rounded-lg px-2.5 py-1.5 outline-none mb-3 focus:border-editor-accent"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <p className="text-xs font-semibold text-editor-muted uppercase tracking-wider mb-2">
              Font Size: {fontSize}px
            </p>
            <input
              type="range"
              min={11}
              max={22}
              step={1}
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="w-full accent-editor-accent"
            />
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Action buttons */}
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-lg border border-editor-border text-editor-muted hover:text-editor-text hover:border-editor-accent/30 transition-colors"
        title="Copy code"
      >
        <Copy className="w-4 h-4" />
      </button>
      {copied && (
        <span className="text-xs text-editor-run font-mono">Copied!</span>
      )}

      <button
        onClick={onReset}
        className="p-1.5 rounded-lg border border-editor-border text-editor-muted hover:text-editor-text hover:border-editor-accent/30 transition-colors"
        title="Reset to starter"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <button
        onClick={onRun}
        disabled={runStatus === "running"}
        className={clsx(
          "flex items-center gap-2 px-4 py-1.5 rounded-lg font-sans font-bold text-sm transition-all",
          runStatus === "running"
            ? "bg-editor-run/30 text-editor-run cursor-not-allowed"
            : "bg-editor-run text-white hover:bg-editor-run/90 active:scale-95"
        )}
        title="Run code (Ctrl+Enter)"
      >
        {runStatus === "running" ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
            </svg>
            Running…
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-white" />
            Run
          </>
        )}
      </button>
    </div>
  );
}
