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
  Hash,
} from "lucide-react";
import { LANGUAGES } from "../lib/languages";
import type { OutputTab, RunStatus } from "../types/editor";
import type { CodeRunResponse } from "./MonacoCodeRunEditor";

export interface MonacoOutputPanelProps {
  apiResponse: CodeRunResponse | null;
  runStatus: RunStatus;
  activeTab: OutputTab;
  currentLangId: string;
  stdin: string;
  fontSize?: number;
  onTabChange: (tab: OutputTab) => void;
  onStdinChange: (val: string) => void;
  onClear: () => void;
}

// Accepted = status_id 3 in Judge0
function isAccepted(r: CodeRunResponse | null): boolean {
  if (!r) return false;
  if (r.status_id === 3) return true;
  if (typeof r.status === "object" && r.status !== null) {
    return (
      r.status.id === 3 ||
      r.status.description?.toLowerCase() === "accepted"
    );
  }
  if (typeof r.status === "string") {
    return r.status.toLowerCase() === "accepted";
  }
  return false;
}

function getStatusLabel(r: CodeRunResponse | null): string {
  if (!r) return "";
  if (typeof r.status === "object" && r.status !== null) {
    return r.status.description || (r.status.id === 3 ? "Accepted" : `Status ${r.status.id ?? ""}`);
  }
  if (typeof r.status === "string" && r.status.trim()) {
    return r.status;
  }
  if (r.status_id === 3) return "Accepted";
  if (r.status_id) return `Status ${r.status_id}`;
  return "Executed";
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
  apiResponse,
  runStatus,
  activeTab,
  currentLangId,
  stdin,
  fontSize = 14,
  onTabChange,
  onStdinChange,
  onClear,
}: MonacoOutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const lang = LANGUAGES[currentLangId];
  const accepted = isAccepted(apiResponse);

  // Text used for copy / download — prefer stdout, fallback to stderr or compile_output
  const copyText = apiResponse?.stdout ?? apiResponse?.stderr ?? apiResponse?.compile_output ?? "";

  const handleCopyOutput = () => {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadOutput = () => {
    if (!copyText) return;
    const blob = new Blob([copyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output_${currentLangId}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex flex-col bg-slate-950 border-slate-800 border-l h-full overflow-hidden font-sans text-slate-200 select-text">
      {/* Panel Tab Navigation Bar */}
      <div className="flex justify-between items-center bg-slate-900 px-2 border-slate-800 border-b shrink-0">
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
            {apiResponse && <span className="bg-primary-theme ml-0.5 rounded-full w-1.5 h-1.5" />}
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
        {activeTab === "output" && apiResponse && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopyOutput}
              className="hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-white transition"
              title="Copy Output"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleDownloadOutput}
              className="hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-white transition"
              title="Download Output Log"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClear}
              className="hover:bg-slate-800 p-1.5 rounded-md text-slate-400 hover:text-red-400 transition"
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
            <div className="bg-slate-900/60 p-2.5 border-slate-800 border-b shrink-0">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-400 text-xs uppercase tracking-wider">
                  <CornerDownLeft className="w-3 h-3 text-primary-theme" />
                  <span>Standard Input (stdin)</span>
                </div>
                {stdin && (
                  <button
                    onClick={() => onStdinChange("")}
                    className="text-slate-400 hover:text-slate-200 text-xs transition-colors"
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
                style={{ fontSize: `${fontSize}px` }}
                className="bg-slate-950 p-2.5 border border-slate-800 focus:border-primary-theme rounded-md outline-none w-full font-mono text-slate-200 placeholder:text-slate-600 transition-colors resize-none"
              />
            </div>

            {/* Output view */}
            <div className="flex-1 p-3 overflow-auto">
              {runStatus === "running" && (
                <div className="flex justify-center items-center gap-3 py-6 text-amber-400">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
                  </svg>
                  <span className="font-mono font-semibold text-sm tracking-wide">
                    Executing {lang?.name || "code"}…
                  </span>
                </div>
              )}

              {/* Idle — no response yet */}
              {runStatus === "idle" && !apiResponse && (
                <div className="flex flex-col justify-center items-center gap-2.5 h-full min-h-[140px] text-slate-500 select-none">
                  <Terminal className="opacity-25 w-9 h-9" />
                  <span className="font-medium text-slate-400 text-sm">Ready to execute</span>
                  <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 border border-slate-800 rounded font-mono text-slate-400 text-xs">
                    <span>Press Run or</span>
                    <kbd className="font-bold text-primary-theme">Ctrl + Enter</kbd>
                  </div>
                </div>
              )}

              {/* API Response Output */}
              {apiResponse && runStatus !== "running" && (
                <div className="space-y-3.5">

                  {/* stdout */}
                  {apiResponse.stdout && (
                    <div>
                      <div className="mb-1.5 font-bold text-emerald-500 text-xs uppercase tracking-wider">stdout</div>
                      <pre
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-mono text-emerald-300 break-words leading-relaxed whitespace-pre-wrap"
                      >
                        {apiResponse.stdout}
                      </pre>
                    </div>
                  )}

                  {/* stderr */}
                  {apiResponse.stderr && (
                    <div>
                      <div className="mb-1.5 font-bold text-red-400 text-xs uppercase tracking-wider">stderr</div>
                      <pre
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-mono text-red-400 break-words leading-relaxed whitespace-pre-wrap"
                      >
                        {apiResponse.stderr}
                      </pre>
                    </div>
                  )}

                  {/* compile_output */}
                  {apiResponse.compile_output && (
                    <div>
                      <div className="mb-1.5 font-bold text-amber-400 text-xs uppercase tracking-wider">Compile Output</div>
                      <pre
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-mono text-amber-300 break-words leading-relaxed whitespace-pre-wrap"
                      >
                        {apiResponse.compile_output}
                      </pre>
                    </div>
                  )}

                  {/* message */}
                  {apiResponse.message && (
                    <div>
                      <div className="mb-1.5 font-bold text-sky-400 text-xs uppercase tracking-wider">Message</div>
                      <pre
                        style={{ fontSize: `${fontSize}px` }}
                        className="font-mono text-sky-300 break-words leading-relaxed whitespace-pre-wrap"
                      >
                        {apiResponse.message}
                      </pre>
                    </div>
                  )}

                  {/* No output at all */}
                  {!apiResponse.stdout && !apiResponse.stderr && !apiResponse.compile_output && !apiResponse.message && (
                    <div className="font-mono text-slate-500 text-sm italic">(no output)</div>
                  )}

                  {/* Execution Metrics Bar */}
                  <div className="flex flex-wrap items-center gap-3.5 mt-3 pt-3 border-slate-800 border-t font-mono text-slate-400 text-xs">
                    {/* Status badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded ${
                      accepted
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40"
                        : "bg-red-950/80 text-red-400 border border-red-800/40"
                    }`}>
                      {accepted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span className="font-semibold">{getStatusLabel(apiResponse)}</span>
                    </div>

                    {apiResponse.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{apiResponse.time}s</span>
                      </div>
                    )}

                    {apiResponse.memory && (
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-slate-500" />
                        <span>{apiResponse.memory} KB</span>
                      </div>
                    )}

                    {apiResponse.token && (
                      <div className="flex items-center gap-1.5 ml-auto text-slate-500" title={apiResponse.token}>
                        <Hash className="w-3.5 h-3.5" />
                        <span className="max-w-[120px] truncate">{apiResponse.token.slice(0, 8)}…</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Docs / Lang Info Tab */}
        {activeTab === "info" && lang && (
          <div className="space-y-4 p-4 text-sm">
            <div className="flex items-center gap-3 pb-3 border-slate-800 border-b">
              <div
                className="flex justify-center items-center rounded-xl w-10 h-10 font-mono font-bold text-base"
                style={{ backgroundColor: `${lang.color}25`, color: lang.color }}
              >
                .{lang.extension}
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-bold text-white text-sm">
                  {lang.name}
                  {lang.info?.version && (
                    <span className="bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300 text-xs">
                      v{lang.info.version}
                    </span>
                  )}
                </h3>
                <span className="text-slate-400 text-xs">Environment & Syntax Spec</span>
              </div>
            </div>

            <div>
              <h4 className="mb-1 font-semibold text-slate-300 text-xs uppercase tracking-wider">
                About {lang.name}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang.info?.description || "High-performance versatile programming language."}
              </p>
            </div>

            {lang.info?.tip && (
              <div className="bg-slate-900 p-3.5 border border-slate-800 rounded-lg">
                <div className="mb-1 font-semibold text-primary-theme text-xs uppercase tracking-wider">Recommended Practice</div>
                <p className="font-mono text-slate-200 text-sm leading-relaxed">{lang.info.tip}</p>
              </div>
            )}

            {lang.info?.website && (
              <a
                href={lang.info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary-theme text-sm hover:underline"
              >
                <span>Visit Official {lang.name} Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* 3. Shortcuts Cheat Sheet Tab */}
        {activeTab === "shortcuts" && (
          <div className="p-3">
            <div className="mb-3 font-bold text-slate-300 text-xs uppercase tracking-wider">
              Monaco Editor Keybindings
            </div>
            <div className="space-y-1.5">
              {MONACO_SHORTCUTS.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between items-center bg-slate-900/80 p-2.5 border border-slate-800/80 rounded-lg text-sm"
                >
                  <span className="font-medium text-slate-200">{item.action}</span>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-mono text-slate-400 text-xs">{item.tag}</span>
                    <kbd className="bg-slate-800 shadow-2xs px-2 py-0.5 border border-slate-700 rounded font-mono font-semibold text-primary-theme text-xs">
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
