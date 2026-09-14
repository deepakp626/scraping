// app/tooles/coding-tooles/monaco-components/MonacoEditor.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type * as MonacoType from "monaco-editor";
import { loadMonaco, normalizeMonacoLanguage } from "./monaco-loader";

export interface MonacoEditorStats {
  lines: number;
  chars: number;
  words: number;
  cursorLine: number;
  cursorCol: number;
  selectedChars?: number;
}

export interface MonacoEditorProps {
  code: string;
  langId: string;
  themeId: string;
  fontSize: number;
  fontFamily?: string;
  minimap?: boolean;
  wordWrap?: "on" | "off";
  lineNumbers?: "on" | "off" | "relative";
  readOnly?: boolean;
  onChange: (value: string) => void;
  onRun?: () => void;
  onStatsChange?: (stats: MonacoEditorStats) => void;
  onMount?: (editor: MonacoType.editor.IStandaloneCodeEditor, monaco: typeof MonacoType) => void;
  className?: string;
  height?: string;
}

export default function MonacoEditor({
  code,
  langId,
  themeId,
  fontSize,
  fontFamily = "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
  minimap = false,
  wordWrap = "on",
  lineNumbers = "on",
  readOnly = false,
  onChange,
  onRun,
  onStatsChange,
  onMount,
  className = "",
  height = "100%",
}: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<MonacoType.editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<typeof MonacoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Keep references to latest callbacks to avoid stale closures
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;
  const onStatsChangeRef = useRef(onStatsChange);
  onStatsChangeRef.current = onStatsChange;

  const calculateStats = useCallback((editor: MonacoType.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;

    const val = model.getValue();
    const pos = editor.getPosition() || { lineNumber: 1, column: 1 };
    const selection = editor.getSelection();

    let selectedChars = 0;
    if (selection && !selection.isEmpty()) {
      selectedChars = model.getValueInRange(selection).length;
    }

    const lines = model.getLineCount();
    const chars = val.length;
    const words = val.trim() ? val.trim().split(/\s+/).length : 0;

    onStatsChangeRef.current?.({
      lines,
      chars,
      words,
      cursorLine: pos.lineNumber,
      cursorCol: pos.column,
      selectedChars,
    });
  }, []);

  // 1. Initialize Monaco Editor
  useEffect(() => {
    let isCancelled = false;

    async function init() {
      if (!containerRef.current) return;

      try {
        const monaco = await loadMonaco();
        if (isCancelled || !containerRef.current) return;

        monacoRef.current = monaco;

        // Create editor
        const editor = monaco.editor.create(containerRef.current, {
          value: code,
          language: normalizeMonacoLanguage(langId),
          theme: themeId,
          fontSize,
          fontFamily,
          fontLigatures: true,
          minimap: { enabled: minimap, renderCharacters: false },
          wordWrap,
          lineNumbers,
          automaticLayout: true,
          readOnly,
          tabSize: 2,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "all",
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          overviewRulerBorder: false,
          formatOnPaste: true,
        });

        editorRef.current = editor;
        setIsLoading(false);

        // Run Callback on mount
        if (onMount) {
          onMount(editor, monaco);
        }

        // Trigger initial stats
        calculateStats(editor);

        // Content change listener
        const contentDisposable = editor.onDidChangeModelContent(() => {
          const val = editor.getValue();
          onChangeRef.current(val);
          calculateStats(editor);
        });

        // Cursor change listener
        const cursorDisposable = editor.onDidChangeCursorPosition(() => {
          calculateStats(editor);
        });

        // Selection change listener
        const selectionDisposable = editor.onDidChangeCursorSelection(() => {
          calculateStats(editor);
        });

        // Shortcut: Ctrl+Enter / Cmd+Enter to Run
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
          onRunRef.current?.();
        });

        // Shortcut: Ctrl+S / Cmd+S to Format
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
          editor.getAction("editor.action.formatDocument")?.run();
        });

        // Responsive Resize Observer
        const resizeObserver = new ResizeObserver(() => {
          editor.layout();
        });
        resizeObserver.observe(containerRef.current);

        return () => {
          contentDisposable.dispose();
          cursorDisposable.dispose();
          selectionDisposable.dispose();
          resizeObserver.disconnect();
        };
      } catch (err) {
        console.error("Failed to initialize Monaco Editor:", err);
      }
    }

    const cleanupPromise = init();

    return () => {
      isCancelled = true;
      cleanupPromise.then((cleanup) => cleanup && cleanup());
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []); // Run once on mount

  // 2. Synchronize external code changes (without resetting cursor or history if identical)
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.getValue() !== code) {
      const position = editor.getPosition();
      editor.setValue(code);
      if (position) {
        editor.setPosition(position);
      }
      calculateStats(editor);
    }
  }, [code, calculateStats]);

  // 3. Update language
  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (editor && monaco) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, normalizeMonacoLanguage(langId));
      }
    }
  }, [langId]);

  // 4. Update theme
  useEffect(() => {
    const monaco = monacoRef.current;
    if (monaco) {
      monaco.editor.setTheme(themeId);
    }
  }, [themeId]);

  // 5. Update font options, wrap, minimap, etc.
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.updateOptions({
        fontSize,
        fontFamily,
        minimap: { enabled: minimap, renderCharacters: false },
        wordWrap,
        lineNumbers,
        readOnly,
      });
    }
  }, [fontSize, fontFamily, minimap, wordWrap, lineNumbers, readOnly]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={{ height }}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-300 z-10 gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary-theme/30 border-t-primary-theme animate-spin" />
          </div>
          <span className="font-sans text-xs tracking-wider uppercase font-semibold text-slate-400">
            Initializing Monaco Engine…
          </span>
        </div>
      )}

      {/* Editor Mount Node */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
