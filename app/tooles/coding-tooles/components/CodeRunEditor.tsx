// src/components/editor/CodeRunEditor.tsx
"use client";

import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useEditorStore } from "../lib/useEditorStore";
import Toolbar from "./Toolbar";
import OutputPanel from "./OutputPanel";
import StatusBar from "./StatusBar";

// Dynamic import — CodeMirror is browser-only
const CodeEditor = dynamic(() => import("./CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-editor-bg">
      <div className="flex flex-col items-center gap-3">
        <svg className="w-6 h-6 animate-spin text-editor-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
        </svg>
        <span className="font-sans text-sm text-editor-muted">Loading editor…</span>
      </div>
    </div>
  ),
});

interface CodeRunEditorProps {
  /** Initial language (default: "python") */
  defaultLang?: string;
  /** Initial code override */
  defaultCode?: string;
  /** Fixed height for the entire editor (default: "600px") */
  height?: string;
  /** Show/hide the status bar (default: true) */
  showStatusBar?: boolean;
  /** Callback when code changes */
  onCodeChange?: (code: string, langId: string) => void;
}

export default function CodeRunEditor({
  defaultLang = "python",
  defaultCode,
  height = "600px",
  showStatusBar = true,
  onCodeChange,
}: CodeRunEditorProps) {
  const store = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Draggable split
  const [splitPercent, setSplitPercent] = useState(58);
  const dragging = useRef(false);

  const handleMouseDown = () => { dragging.current = true; };
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(75, Math.max(30, ((e.clientX - rect.left) / rect.width) * 100));
    setSplitPercent(pct);
  }, []);
  const handleMouseUp = () => { dragging.current = false; };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(store.code).catch(() => {});
  }, [store.code]);

  const handleCodeChange = useCallback((value: string) => {
    store.handleCodeChange(value);
    onCodeChange?.(value, store.currentLangId);
  }, [store, onCodeChange]);

  // Apply defaultLang on first render if different
  React.useEffect(() => {
    if (defaultLang !== "python") store.changeLang(defaultLang);
    if (defaultCode) store.handleCodeChange(defaultCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden border border-editor-border bg-editor-bg shadow-2xl"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Toolbar */}
      <Toolbar
        currentLangId={store.currentLangId}
        themeId={store.themeId}
        fontSize={store.fontSize}
        runStatus={store.runStatus}
        code={store.code}
        onLangChange={store.changeLang}
        onThemeChange={store.setThemeId}
        onFontSizeChange={store.setFontSize}
        onRun={store.runCode}
        onReset={store.resetCode}
        onCopy={handleCopy}
      />

      {/* Main editor area */}
      <div ref={containerRef} className="flex flex-1 min-h-0">
        {/* Editor pane */}
        <div style={{ width: `${splitPercent}%` }} className="flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center px-3 py-1 bg-editor-surface border-b border-editor-border">
            <span className="text-[10px] font-semibold text-editor-muted uppercase tracking-wider">
              Editor
            </span>
            <span className="ml-auto font-mono text-[10px] text-editor-muted/50">
              Ctrl+Enter to run
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              code={store.code}
              langId={store.currentLangId}
              themeId={store.themeId}
              fontSize={store.fontSize}
              onChange={handleCodeChange}
              onRun={store.runCode}
              onStatsChange={(partial) =>
                store.setStats((prev) => ({ ...prev, ...partial }))
              }
            />
          </div>
        </div>

        {/* Drag handle */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1 cursor-col-resize bg-editor-border hover:bg-editor-accent/50 transition-colors active:bg-editor-accent"
        />

        {/* Output pane */}
        <div style={{ width: `${100 - splitPercent}%` }} className="flex flex-col min-h-0 overflow-hidden">
          <OutputPanel
            output={store.output}
            isError={store.outputIsError}
            runStatus={store.runStatus}
            execTime={store.execTime}
            execMemory={store.execMemory}
            statusLabel={store.statusLabel}
            activeTab={store.activeOutputTab}
            currentLangId={store.currentLangId}
            stdin={store.stdin}
            onTabChange={store.setActiveOutputTab}
            onStdinChange={store.setStdin}
            onClear={store.clearOutput}
          />
        </div>
      </div>

      {/* Status bar */}
      {showStatusBar && (
        <StatusBar
          stats={store.stats}
          runStatus={store.runStatus}
          currentLangId={store.currentLangId}
          themeId={store.themeId}
        />
      )}
    </div>
  );
}
