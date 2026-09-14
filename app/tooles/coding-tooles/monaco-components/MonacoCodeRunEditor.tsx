// app/tooles/coding-tooles/monaco-components/MonacoCodeRunEditor.tsx
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type * as MonacoType from "monaco-editor";
import { LANGUAGES, getLanguage } from "../lib/languages";
import { executeCode, formatOutput, Judge0Error } from "../lib/judge0";
import type { RunStatus, OutputTab } from "../types/editor";
import MonacoToolbar from "./MonacoToolbar";
import MonacoOutputPanel from "./MonacoOutputPanel";
import MonacoStatusBar from "./MonacoStatusBar";
import MonacoFileExplorer, { EditorFile } from "./MonacoFileExplorer";
import type { MonacoEditorStats } from "./MonacoEditor";
import { X, FileCode } from "lucide-react";

// Dynamically import browser-only Monaco components
const MonacoEditor = dynamic(() => import("./MonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 w-full h-full flex items-center justify-center bg-slate-950 text-slate-400">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-theme border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-xs text-slate-400 tracking-wide">Loading Monaco Core…</span>
      </div>
    </div>
  ),
});

const MonacoDiffEditor = dynamic(() => import("./MonacoDiffEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 w-full h-full flex items-center justify-center bg-slate-950 text-slate-400">
      <div className="flex items-center gap-2 text-xs">
        <div className="w-4 h-4 border-2 border-primary-theme border-t-transparent rounded-full animate-spin" />
        <span>Loading Diff View…</span>
      </div>
    </div>
  ),
});

export interface MonacoCodeRunEditorProps {
  /** Initial language ID (default: "python") */
  defaultLang?: string;
  /** Initial source code override */
  defaultCode?: string;
  /** Overall container height (default: "650px") */
  height?: string;
  /** Whether to show the bottom status bar */
  showStatusBar?: boolean;
  /** Callback fired whenever source code changes */
  onCodeChange?: (code: string, langId: string) => void;
  /** Custom wrapper CSS class */
  className?: string;
}

function detectLangFromFilename(filename: string, fallback: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const matched = Object.values(LANGUAGES).find((l) => l.extension === ext);
  return matched ? matched.id : fallback;
}

export default function MonacoCodeRunEditor({
  defaultLang = "python",
  defaultCode,
  height = "650px",
  showStatusBar = true,
  onCodeChange,
  className = "",
}: MonacoCodeRunEditorProps) {
  // 1. Language State
  const initialLang = LANGUAGES[defaultLang] ? defaultLang : "python";
  const [currentLangId, setCurrentLangId] = useState(initialLang);

  // 2. Multi-File Explorer State (VS Code File Menu)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [files, setFiles] = useState<EditorFile[]>(() => {
    const mainExt = LANGUAGES[initialLang]?.extension || "py";
    const initialContent = defaultCode ?? (LANGUAGES[initialLang]?.starter || "");
    return [
      {
        id: "file-main",
        name: `main.${mainExt}`,
        content: initialContent,
        language: initialLang,
      },
    ];
  });
  const [activeFileId, setActiveFileId] = useState("file-main");

  // Active file derived state
  const activeFile = files.find((f) => f.id === activeFileId) || files[0];
  const code = activeFile?.content || "";

  // 3. Editor Display Preferences
  const [themeId, setThemeId] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("'Fira Code', 'Cascadia Code', monospace");
  const [minimap, setMinimap] = useState(false);
  const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
  const [lineNumbers, setLineNumbers] = useState<"on" | "off">("on");

  // 4. Modes: Fullscreen & Diff View
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDiffMode, setIsDiffMode] = useState(false);

  // 5. Execution State
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [outputIsError, setOutputIsError] = useState(false);
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");
  const [execTime, setExecTime] = useState<string | null>(null);
  const [execMemory, setExecMemory] = useState<number | null>(null);
  const [statusLabel, setStatusLabel] = useState<string>("");
  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("output");

  // 6. Cursor & Document Statistics
  const [stats, setStats] = useState<MonacoEditorStats>({
    lines: 1,
    chars: 0,
    words: 0,
    cursorLine: 1,
    cursorCol: 1,
  });

  // 7. Split Pane Resizing
  const [splitPercent, setSplitPercent] = useState(58);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<MonacoType.editor.IStandaloneCodeEditor | null>(null);
  const startTimeRef = useRef<number>(0);

  // Synchronize language if defaultLang changes from parent route
  useEffect(() => {
    if (defaultLang && defaultLang !== currentLangId && LANGUAGES[defaultLang]) {
      setCurrentLangId(defaultLang);
      const ext = LANGUAGES[defaultLang]?.extension || "txt";
      const starter = LANGUAGES[defaultLang]?.starter || "";

      setFiles((prev) => {
        // If only 1 file exists, update its name and starter
        if (prev.length <= 1) {
          return [
            {
              id: "file-main",
              name: `main.${ext}`,
              content: starter,
              language: defaultLang,
            },
          ];
        }
        return prev;
      });

      setOutput("");
      setRunStatus("idle");
    }
  }, [defaultLang]);

  // Synchronize code if defaultCode explicitly changes
  useEffect(() => {
    if (defaultCode !== undefined && activeFile && activeFile.content !== defaultCode) {
      setFiles((prev) =>
        prev.map((f) => (f.id === activeFileId ? { ...f, content: defaultCode } : f))
      );
    }
  }, [defaultCode, activeFileId]);

  // Handle Dragging Splitter
  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(80, Math.max(25, ((e.clientX - rect.left) / rect.width) * 100));
    setSplitPercent(pct);
  }, []);

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Language Change handler from Toolbar
  const handleLangChange = useCallback((langId: string) => {
    const lang = LANGUAGES[langId];
    if (!lang) return;
    setCurrentLangId(langId);

    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === activeFileId) {
          const parts = f.name.split(".");
          parts[parts.length - 1] = lang.extension;
          return {
            ...f,
            name: parts.join("."),
            content: lang.starter,
            language: langId,
          };
        }
        return f;
      })
    );

    setOutput("");
    setRunStatus("idle");
    setExecTime(null);
    setExecMemory(null);
    setStatusLabel("");
    onCodeChange?.(lang.starter, langId);
  }, [activeFileId, onCodeChange]);

  // Code Change handler
  const handleCodeChange = useCallback((newCode: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === activeFileId ? { ...f, content: newCode } : f))
    );
    onCodeChange?.(newCode, currentLangId);
  }, [activeFileId, currentLangId, onCodeChange]);

  // Format code action
  const handleFormatCode = useCallback(() => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.getAction("editor.action.formatDocument")?.run();
    } else if (currentLangId === "json") {
      try {
        const formatted = JSON.stringify(JSON.parse(code), null, 2);
        handleCodeChange(formatted);
      } catch {
        // syntax error
      }
    }
  }, [code, currentLangId, handleCodeChange]);

  // Reset to starter code
  const handleResetCode = useCallback(() => {
    const starter = LANGUAGES[currentLangId]?.starter || "";
    handleCodeChange(starter);
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setValue(starter);
    }
  }, [currentLangId, handleCodeChange]);

  // File Explorer Actions
  const handleSelectFile = useCallback((fileId: string) => {
    setActiveFileId(fileId);
    const target = files.find((f) => f.id === fileId);
    if (target) {
      const detected = detectLangFromFilename(target.name, target.language);
      setCurrentLangId(detected);
    }
  }, [files]);

  const handleCreateFile = useCallback((fileName: string) => {
    const detectedLang = detectLangFromFilename(fileName, currentLangId);
    const newFile: EditorFile = {
      id: `file-${Date.now()}`,
      name: fileName,
      content: LANGUAGES[detectedLang]?.starter || "// Start typing code...\n",
      language: detectedLang,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newFile.id);
    setCurrentLangId(detectedLang);
  }, [currentLangId]);

  const handleDeleteFile = useCallback((fileId: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== fileId);
      if (activeFileId === fileId && filtered.length > 0) {
        setActiveFileId(filtered[0].id);
        setCurrentLangId(filtered[0].language);
      }
      return filtered;
    });
  }, [activeFileId]);

  const handleRenameFile = useCallback((fileId: string, newName: string) => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          const detected = detectLangFromFilename(newName, f.language);
          if (fileId === activeFileId) {
            setCurrentLangId(detected);
          }
          return { ...f, name: newName, language: detected };
        }
        return f;
      })
    );
  }, [activeFileId]);

  // File import handler (with language auto-detection)
  const handleFileImport = useCallback((content: string, filename?: string) => {
    const name = filename || `imported_${Date.now()}.${LANGUAGES[currentLangId]?.extension || "txt"}`;
    const detected = detectLangFromFilename(name, currentLangId);
    const importedFile: EditorFile = {
      id: `file-${Date.now()}`,
      name,
      content,
      language: detected,
    };
    setFiles((prev) => [...prev, importedFile]);
    setActiveFileId(importedFile.id);
    setCurrentLangId(detected);
  }, [currentLangId]);

  // Run Code Execution Handler
  const handleRunCode = useCallback(async () => {
    if (runStatus === "running") return;
    const lang = getLanguage(currentLangId);
    if (!lang) return;

    setRunStatus("running");
    setOutput("");
    setOutputIsError(false);
    setExecTime(null);
    setExecMemory(null);
    setActiveOutputTab("output");
    startTimeRef.current = Date.now();

    try {
      const result = await executeCode({
        source_code: code,
        language_id: lang.judge0Id,
        stdin: stdin || undefined,
      });

      const { text, isError, statusLabel: label } = formatOutput(result);
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(3);

      setOutput(text);
      setOutputIsError(isError);
      setRunStatus(isError ? "error" : "success");
      setExecTime(result.time || elapsed);
      setExecMemory(result.memory || null);
      setStatusLabel(label);
    } catch (err) {
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(3);
      if (err instanceof Judge0Error) {
        setOutput(
          `⚠️  Execution Note:\n\n${err.message}\n\nTo enable remote Judge0 execution, provide NEXT_PUBLIC_JUDGE0_API_KEY in your environment.`
        );
      } else {
        setOutput(`Execution Error: ${String(err)}`);
      }
      setOutputIsError(true);
      setRunStatus("error");
      setExecTime(elapsed);
    }
  }, [runStatus, currentLangId, code, stdin]);

  // Fullscreen toggle
  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const starterCode = LANGUAGES[currentLangId]?.starter || "";

  return (
    <div
      className={`
        flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 
        bg-white dark:bg-slate-950 shadow-xl transition-all
        ${isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""}
        ${className}
      `}
      style={{ height: isFullscreen ? "100vh" : height }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 1. Header Toolbar */}
      <MonacoToolbar
        currentLangId={currentLangId}
        themeId={themeId}
        fontSize={fontSize}
        fontFamily={fontFamily}
        minimap={minimap}
        wordWrap={wordWrap}
        lineNumbers={lineNumbers}
        isDiffMode={isDiffMode}
        isFullscreen={isFullscreen}
        runStatus={runStatus}
        code={code}
        onLangChange={handleLangChange}
        onThemeChange={setThemeId}
        onFontSizeChange={setFontSize}
        onFontFamilyChange={setFontFamily}
        onMinimapChange={setMinimap}
        onWordWrapChange={setWordWrap}
        onLineNumbersChange={setLineNumbers}
        onDiffToggle={() => setIsDiffMode((v) => !v)}
        onFullscreenToggle={handleFullscreenToggle}
        onFormat={handleFormatCode}
        onRun={handleRunCode}
        onReset={handleResetCode}
        onCopy={() => {}}
        onFileImport={handleFileImport}
      />

      {/* 2. Main Workspace Split: Left File Explorer + Center Editor + Right Output */}
      <div ref={containerRef} className="flex flex-1 min-h-0 relative">
        {/* Left Side: VS Code File Explorer & Activity Bar */}
        <MonacoFileExplorer
          files={files}
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
          onCreateFile={handleCreateFile}
          onDeleteFile={handleDeleteFile}
          onRenameFile={handleRenameFile}
          isOpen={isSidebarOpen}
          onToggleOpen={() => setIsSidebarOpen((v) => !v)}
        />

        {/* Center: Editor Pane (or Diff Pane) */}
        <div
          style={{ width: `${splitPercent}%` }}
          className="flex flex-col min-h-0 overflow-hidden bg-slate-950 flex-1"
        >
          {/* Top File Tabs Bar (VS Code Tab Bar) */}
          <div className="flex items-center bg-slate-900 border-b border-slate-800 shrink-0 overflow-x-auto select-none">
            {files.map((file) => {
              const isActive = file.id === activeFileId;
              return (
                <div
                  key={file.id}
                  onClick={() => handleSelectFile(file.id)}
                  className={`group flex items-center gap-2 px-3 py-1.5 text-xs font-mono cursor-pointer border-r border-slate-800 transition-colors ${
                    isActive
                      ? "bg-slate-950 text-white font-semibold border-t-2 border-t-primary-theme"
                      : "bg-slate-900/70 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-primary-theme shrink-0" />
                  <span className="truncate max-w-[120px]">{file.name}</span>

                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="p-0.5 rounded text-slate-500 hover:text-white hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition"
                      title="Close file"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}

            <div className="flex-1" />

            <span className="text-[10px] text-slate-500 font-mono px-3 hidden lg:inline">
              Ctrl+Enter to run • F1 for commands
            </span>
          </div>

          <div className="flex-1 relative min-h-0 overflow-hidden">
            {isDiffMode ? (
              <MonacoDiffEditor
                originalCode={starterCode}
                modifiedCode={code}
                langId={currentLangId}
                themeId={themeId}
                fontSize={fontSize}
                fontFamily={fontFamily}
                onModifiedChange={handleCodeChange}
              />
            ) : (
              <MonacoEditor
                code={code}
                langId={currentLangId}
                themeId={themeId}
                fontSize={fontSize}
                fontFamily={fontFamily}
                minimap={minimap}
                wordWrap={wordWrap}
                lineNumbers={lineNumbers}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                onStatsChange={setStats}
                onMount={(editor) => {
                  editorInstanceRef.current = editor;
                }}
              />
            )}
          </div>
        </div>

        {/* Draggable Resizer Splitter */}
        <div
          onMouseDown={handleMouseDown}
          className="w-1.5 cursor-col-resize bg-slate-800 hover:bg-primary-theme active:bg-primary-theme transition-colors shrink-0 select-none relative group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-8 rounded-full bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Output Console Pane */}
        <div
          style={{ width: `${100 - splitPercent}%` }}
          className="flex flex-col min-h-0 overflow-hidden"
        >
          <MonacoOutputPanel
            output={output}
            isError={outputIsError}
            runStatus={runStatus}
            execTime={execTime}
            execMemory={execMemory}
            statusLabel={statusLabel}
            activeTab={activeOutputTab}
            currentLangId={currentLangId}
            stdin={stdin}
            onTabChange={setActiveOutputTab}
            onStdinChange={setStdin}
            onClear={() => {
              setOutput("");
              setRunStatus("idle");
              setExecTime(null);
              setExecMemory(null);
              setStatusLabel("");
            }}
          />
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      {showStatusBar && (
        <MonacoStatusBar
          stats={stats}
          runStatus={runStatus}
          currentLangId={currentLangId}
          themeId={themeId}
        />
      )}
    </div>
  );
}
