// app/tooles/coding-tooles/monaco-components/MonacoOutputPanel.tsx
"use client";

import React, { useState } from "react";
import {
  Terminal,
  Info,
  Keyboard,
  Trash2,
  Copy,
  Check,
  Download,
  Clock,
  Cpu,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  CornerDownLeft,
} from "lucide-react";
import { LANGUAGES } from "../lib/languages";
import type { OutputTab, RunStatus } from "../types/editor";

export interface MonacoOutputPanelProps {
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
  onStdinChange: (val: string) => void;
  onClear: () => void;
}

const MONACO_SHORTCUTS = [
  { key: "Ctrl + Enter", action: "Run Code", tag: "Runner" },
  { key: "Ctrl + S", action: "Format Code", tag: "Formatting" },
  { key: "F1", action: "Command Palette", tag: "Monaco" },
  { key: "Ctrl + F", action: "Find / Search", tag: "Editor" },
  { key: "Ctrl + H", action: "Find and Replace", tag: "Editor" },
  { key: "Ctrl + /", action: "Toggle Line Comment", tag: "Editing" },
  { key: "Alt + Up / Down", action: "Move Line Up / Down", tag: "Editing" },
  { key: "Shift + Alt + Up/Down", action: "Duplicate Line", tag: "Editing" },
  { key: "Ctrl + D", action: "Select Next Occurrence", tag: "Multi-cursor" },
  { key: "Alt + Click", action: "Insert Multi-cursor", tag: "Multi-cursor" },
  { key: "Ctrl + Space", action: "Trigger Autocomplete", tag: "IntelliSense" },
  { key: "Ctrl + G", action: "Go to Line", tag: "Navigation" },
];

export default function MonacoOutputPanel({
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
}: MonacoOutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const lang = LANGUAGES[currentLangId];

  const handleCopyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output_${currentLangId}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-l border-slate-800 select-text overflow-hidden font-sans">
      {/* Panel Tab Navigation Bar */}
      <div className="flex items-center justify-between px-2 bg-slate-900 border-b border-slate-800 shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => onTabChange("output")}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "output"
                ? "border-primary-theme text-white bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-primary-theme" />
            <span>Terminal</span>
            {output && <span className="w-1.5 h-1.5 rounded-full bg-primary-theme ml-0.5" />}
          </button>

          <button
            onClick={() => onTabChange("info")}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "info"
                ? "border-primary-theme text-white bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Docs</span>
          </button>

          <button
            onClick={() => onTabChange("shortcuts")}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "shortcuts"
                ? "border-primary-theme text-white bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>
        </div>

        {/* Action icons on the tab bar */}
        {activeTab === "output" && output && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyOutput}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition"
              title="Copy Output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleDownloadOutput}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition"
              title="Download Output Log"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClear}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition"
              title="Clear Terminal Output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 overflow-auto">
        {/* 1. Terminal / Output Tab */}
        {activeTab === "output" && (
          <div className="flex flex-col h-full">
            {/* Interactive Stdin input drawer */}
            <div className="bg-slate-900/60 border-b border-slate-800 p-2.5 shrink-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                  <CornerDownLeft className="w-3 h-3 text-primary-theme" />
                  <span>Standard Input (stdin)</span>
                </div>
                {stdin && (
                  <button
                    onClick={() => onStdinChange("")}
                    className="text-[10px] text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={stdin}
                onChange={(e) => onStdinChange(e.target.value)}
                placeholder="Enter arguments or input passed into your program..."
                rows={2}
                className="w-full bg-slate-950 text-slate-200 font-mono text-xs rounded-md p-2 border border-slate-800 outline-none focus:border-primary-theme resize-none placeholder:text-slate-600"
              />
            </div>

            {/* Output view */}
            <div className="flex-1 p-3 overflow-auto">
              {runStatus === "running" && (
                <div className="flex items-center gap-3 text-amber-400 py-6 justify-center">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono text-xs font-semibold tracking-wide">
                    Executing {lang?.name || "code"}…
                  </span>
                </div>
              )}

              {runStatus === "idle" && !output && (
                <div className="flex flex-col items-center justify-center h-full min-h-[140px] text-slate-500 gap-2 select-none">
                  <Terminal className="w-8 h-8 opacity-25" />
                  <span className="text-xs font-medium">Ready to execute</span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    <span>Press Run or</span>
                    <kbd className="text-primary-theme font-bold">Ctrl + Enter</kbd>
                  </div>
                </div>
              )}

              {output && (
                <div className="space-y-3">
                  <pre
                    className={`font-mono text-xs leading-relaxed whitespace-pre-wrap break-words ${
                      isError ? "text-red-400" : "text-emerald-300"
                    }`}
                  >
                    {output}
                  </pre>

                  {/* Execution Metrics Bar */}
                  {(execTime || execMemory || statusLabel) && (
                    <div className="pt-2.5 mt-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
                      {statusLabel && (
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded ${
                            isError
                              ? "bg-red-950/80 text-red-400 border border-red-800/40"
                              : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40"
                          }`}
                        >
                          {isError ? (
                            <AlertCircle className="w-3 h-3" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          <span>{statusLabel}</span>
                        </div>
                      )}

                      {execTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{execTime}s</span>
                        </div>
                      )}

                      {execMemory && (
                        <div className="flex items-center gap-1">
                          <Cpu className="w-3 h-3 text-slate-500" />
                          <span>{execMemory} KB</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Docs / Lang Info Tab */}
        {activeTab === "info" && lang && (
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-sm"
                style={{ backgroundColor: `${lang.color}25`, color: lang.color }}
              >
                .{lang.extension}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {lang.name}
                  {lang.info?.version && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                      v{lang.info.version}
                    </span>
                  )}
                </h3>
                <span className="text-[11px] text-slate-400">Environment & Syntax Spec</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                About {lang.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang.info?.description || "High-performance versatile programming language."}
              </p>
            </div>

            {lang.info?.tip && (
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-xs font-semibold text-primary-theme mb-1">Recommended Practice</div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">{lang.info.tip}</p>
              </div>
            )}

            {lang.info?.website && (
              <a
                href={lang.info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-theme hover:underline font-medium"
              >
                <span>Visit Official {lang.name} Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* 3. Shortcuts Cheat Sheet Tab */}
        {activeTab === "shortcuts" && (
          <div className="p-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Monaco Editor Keybindings
            </div>
            <div className="space-y-1.5">
              {MONACO_SHORTCUTS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs"
                >
                  <span className="text-slate-300">{item.action}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{item.tag}</span>
                    <kbd className="font-mono text-[11px] bg-slate-800 text-primary-theme px-2 py-0.5 rounded border border-slate-700 shadow-2xs font-semibold">
                      {item.key}
                    </kbd>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
