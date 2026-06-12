// src/components/editor/OutputPanel.tsx
"use client";

import React from "react";
import clsx from "clsx";
import { Clock, Cpu, Terminal, Info, Keyboard, Trash2 } from "lucide-react";
import { LANGUAGES } from "../lib/languages";
import type { OutputTab, RunStatus } from "../types/editor";

interface OutputPanelProps {
  output: string;
  isError: boolean;
  runStatus: RunStatus;
  execTime: string | null;
  execMemory: number | null;
  statusLabel: string;
  activeTab: OutputTab;
  currentLangId: string;
  stdin: string;
  onTabChange: (tab: OutputTab) => void;
  onStdinChange: (value: string) => void;
  onClear: () => void;
}

const TABS: { id: OutputTab; label: string; icon: React.ReactNode }[] = [
  { id: "output", label: "Output", icon: <Terminal className="w-3.5 h-3.5" /> },
  { id: "info", label: "Lang Info", icon: <Info className="w-3.5 h-3.5" /> },
  { id: "shortcuts", label: "Shortcuts", icon: <Keyboard className="w-3.5 h-3.5" /> },
];

const SHORTCUTS = [
  { key: "Ctrl+Enter", action: "Run code" },
  { key: "Tab", action: "Indent (2 spaces)" },
  { key: "Ctrl+/", action: "Toggle comment" },
  { key: "Ctrl+Z", action: "Undo" },
  { key: "Ctrl+Y", action: "Redo" },
  { key: "Ctrl+A", action: "Select all" },
  { key: "Ctrl+F", action: "Find in editor" },
  { key: "Ctrl+D", action: "Select next match" },
  { key: "Alt+↑/↓", action: "Move line up/down" },
  { key: "Ctrl+Shift+K", action: "Delete line" },
];

export default function OutputPanel({
  output,
  isError,
  runStatus,
  execTime,
  execMemory,
  statusLabel,
  activeTab,
  currentLangId,
  stdin,
  onTabChange,
  onStdinChange,
  onClear,
}: OutputPanelProps) {
  const lang = LANGUAGES[currentLangId];

  return (
    <div className="flex flex-col h-full bg-editor-bg">
      {/* Tabs */}
      <div className="flex items-center bg-editor-surface border-b border-editor-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-2 text-xs font-sans font-semibold uppercase tracking-wider transition-colors border-b-2",
              activeTab === tab.id
                ? "text-editor-accent border-editor-accent"
                : "text-editor-muted border-transparent hover:text-editor-text"
            )}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}

        <div className="flex-1" />

        {activeTab === "output" && output && (
          <button
            onClick={onClear}
            className="p-1.5 mr-2 text-editor-muted hover:text-editor-text transition-colors"
            title="Clear output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-auto">
        {/* ── OUTPUT TAB ── */}
        {activeTab === "output" && (
          <div className="h-full flex flex-col">
            {/* stdin */}
            <div className="border-b border-editor-border">
              <div className="px-3 py-1.5 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-editor-muted uppercase tracking-wider">Stdin</span>
              </div>
              <textarea
                value={stdin}
                onChange={(e) => onStdinChange(e.target.value)}
                placeholder="Optional input for your program..."
                rows={2}
                className="
                  w-full bg-transparent font-mono text-xs text-editor-text
                  px-3 pb-2 resize-none outline-none
                  placeholder:text-editor-muted/40
                "
              />
            </div>

            {/* output area */}
            <div className="flex-1 p-3 overflow-auto">
              {runStatus === "running" && (
                <div className="flex items-center gap-3 text-editor-muted">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
                  </svg>
                  <span className="font-sans text-sm">Executing {lang?.name}…</span>
                </div>
              )}

              {runStatus === "idle" && !output && (
                <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-editor-muted gap-2">
                  <Terminal className="w-8 h-8 opacity-20" />
                  <span className="font-sans text-sm">Press Run to execute</span>
                  <span className="font-mono text-xs opacity-60">Ctrl+Enter</span>
                </div>
              )}

              {output && (
                <div>
                  <pre
                    className={clsx(
                      "font-mono text-xs leading-relaxed whitespace-pre-wrap break-words",
                      isError ? "text-red-400" : "text-green-400"
                    )}
                  >
                    {output}
                  </pre>

                  {/* Execution metadata */}
                  {(execTime || execMemory || statusLabel) && (
                    <div className="mt-3 pt-3 border-t border-editor-border flex flex-wrap gap-3 text-[11px] text-editor-muted font-mono">
                      {statusLabel && (
                        <span className={clsx(
                          "flex items-center gap-1",
                          isError ? "text-red-400" : "text-green-400"
                        )}>
                          <span className={clsx("w-1.5 h-1.5 rounded-full", isError ? "bg-red-400" : "bg-green-400")} />
                          {statusLabel}
                        </span>
                      )}
                      {execTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {execTime}s
                        </span>
                      )}
                      {execMemory && (
                        <span className="flex items-center gap-1">
                          <Cpu className="w-3 h-3" /> {execMemory} KB
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── INFO TAB ── */}
        {activeTab === "info" && lang && (
          <div className="p-4 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <h3 className="font-sans font-bold text-editor-text text-base">{lang.name}</h3>
              <span className="ml-auto font-mono text-xs text-editor-muted bg-editor-surface px-2 py-0.5 rounded-md">
                v{lang.info.version}
              </span>
            </div>

            <p className="font-sans text-sm text-editor-text-dim leading-relaxed">
              {lang.info.description}
            </p>

            <div className="bg-editor-surface rounded-xl p-3 border border-editor-border">
              <p className="text-[11px] font-semibold text-editor-muted uppercase tracking-wider mb-2">
                💡 Pro Tip
              </p>
              <p className="font-mono text-xs text-editor-accent leading-relaxed">
                {lang.info.tip}
              </p>
            </div>

            <div className="bg-editor-surface rounded-xl p-3 border border-editor-border">
              <p className="text-[11px] font-semibold text-editor-muted uppercase tracking-wider mb-2">
                File Extension
              </p>
              <code className="font-mono text-sm text-editor-text">.{lang.extension}</code>
            </div>

            <a
              href={lang.info.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans text-editor-accent hover:underline"
            >
              Official Documentation →
            </a>
          </div>
        )}

        {/* ── SHORTCUTS TAB ── */}
        {activeTab === "shortcuts" && (
          <div className="p-4 animate-fade-in">
            <h3 className="font-sans font-bold text-editor-text text-sm mb-3 uppercase tracking-wider">
              Keyboard Shortcuts
            </h3>
            <div className="space-y-0.5">
              {SHORTCUTS.map(({ key, action }) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-editor-border/50 last:border-0"
                >
                  <span className="font-sans text-sm text-editor-text-dim">{action}</span>
                  <kbd className="font-mono text-[11px] bg-editor-surface border border-editor-border text-editor-muted px-2 py-0.5 rounded-md">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
