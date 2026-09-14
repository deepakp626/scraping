// app/tooles/coding-tooles/monaco-components/MonacoDiffEditor.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import type * as MonacoType from "monaco-editor";
import { loadMonaco, normalizeMonacoLanguage } from "./monaco-loader";

export interface MonacoDiffEditorProps {
  originalCode: string;
  modifiedCode: string;
  langId: string;
  themeId: string;
  fontSize: number;
  fontFamily?: string;
  renderSideBySide?: boolean;
  readOnly?: boolean;
  onModifiedChange?: (val: string) => void;
  className?: string;
  height?: string;
}

export default function MonacoDiffEditor({
  originalCode,
  modifiedCode,
  langId,
  themeId,
  fontSize,
  fontFamily = "'Fira Code', 'Cascadia Code', Consolas, monospace",
  renderSideBySide = true,
  readOnly = false,
  onModifiedChange,
  className = "",
  height = "100%",
}: MonacoDiffEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diffEditorRef = useRef<MonacoType.editor.IStandaloneDiffEditor | null>(null);
  const monacoRef = useRef<typeof MonacoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onModifiedChangeRef = useRef(onModifiedChange);
  onModifiedChangeRef.current = onModifiedChange;

  useEffect(() => {
    let isCancelled = false;

    async function init() {
      if (!containerRef.current) return;

      try {
        const monaco = await loadMonaco();
        if (isCancelled || !containerRef.current) return;

        monacoRef.current = monaco;

        const originalModel = monaco.editor.createModel(
          originalCode,
          normalizeMonacoLanguage(langId)
        );
        const modifiedModel = monaco.editor.createModel(
          modifiedCode,
          normalizeMonacoLanguage(langId)
        );

        const diffEditor = monaco.editor.createDiffEditor(containerRef.current, {
          theme: themeId,
          fontSize,
          fontFamily,
          renderSideBySide,
          readOnly,
          automaticLayout: true,
          originalEditable: false,
          enableSplitViewResizing: true,
          diffWordWrap: "on",
          padding: { top: 12, bottom: 12 },
        });

        diffEditor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });

        diffEditorRef.current = diffEditor;
        setIsLoading(false);

        // Listen for changes on modified model
        const disposable = modifiedModel.onDidChangeContent(() => {
          onModifiedChangeRef.current?.(modifiedModel.getValue());
        });

        const resizeObserver = new ResizeObserver(() => {
          diffEditor.layout();
        });
        resizeObserver.observe(containerRef.current);

        return () => {
          disposable.dispose();
          resizeObserver.disconnect();
          originalModel.dispose();
          modifiedModel.dispose();
        };
      } catch (err) {
        console.error("Failed to initialize Monaco Diff Editor:", err);
      }
    }

    const cleanupPromise = init();

    return () => {
      isCancelled = true;
      cleanupPromise.then((cleanup) => cleanup && cleanup());
      if (diffEditorRef.current) {
        diffEditorRef.current.dispose();
        diffEditorRef.current = null;
      }
    };
  }, []);

  // Update theme
  useEffect(() => {
    const monaco = monacoRef.current;
    if (monaco) {
      monaco.editor.setTheme(themeId);
    }
  }, [themeId]);

  // Update font & sideBySide options
  useEffect(() => {
    const diffEditor = diffEditorRef.current;
    if (diffEditor) {
      diffEditor.updateOptions({
        fontSize,
        fontFamily,
        renderSideBySide,
      });
    }
  }, [fontSize, fontFamily, renderSideBySide]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-400 z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <div className="w-4 h-4 border-2 border-primary-theme border-t-transparent rounded-full animate-spin" />
            <span>Loading Diff Viewer…</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
