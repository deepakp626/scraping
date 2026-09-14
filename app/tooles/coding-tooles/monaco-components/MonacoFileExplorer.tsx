// app/tooles/coding-tooles/monaco-components/MonacoFileExplorer.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Files,
  Search,
  FilePlus,
  FolderPlus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  FileCode,
  FileText,
  Check,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { normalizeMonacoLanguage } from "./monaco-loader";

export interface EditorFile {
  id: string;
  name: string;
  content: string;
  language: string;
  isFolder?: boolean;
  parentId?: string | null;
}

export interface MonacoFileExplorerProps {
  files: EditorFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (fileName: string) => void;
  onDeleteFile: (fileId: string) => void;
  onRenameFile: (fileId: string, newName: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  className?: string;
}

// File icon helper based on extension
function getFileBadge(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "py":
      return { label: "py", color: "#3b82f6", emoji: "🐍" };
    case "js":
    case "jsx":
      return { label: "js", color: "#eab308", emoji: "⚡" };
    case "ts":
    case "tsx":
      return { label: "ts", color: "#3178c6", emoji: "🔷" };
    case "html":
      return { label: "html", color: "#f97316", emoji: "🌐" };
    case "css":
      return { label: "css", color: "#06b6d4", emoji: "🎨" };
    case "json":
      return { label: "json", color: "#a855f7", emoji: "{}" };
    case "cpp":
    case "c":
      return { label: "c++", color: "#0284c7", emoji: "⚙️" };
    case "java":
      return { label: "java", color: "#ea580c", emoji: "☕" };
    case "rs":
      return { label: "rs", color: "#f59e0b", emoji: "🦀" };
    case "go":
      return { label: "go", color: "#00add8", emoji: "🐹" };
    case "sql":
      return { label: "sql", color: "#6366f1", emoji: "🗄️" };
    case "md":
      return { label: "md", color: "#64748b", emoji: "📝" };
    default:
      return { label: ext || "txt", color: "#94a3b8", emoji: "📄" };
  }
}

export default function MonacoFileExplorer({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  isOpen,
  onToggleOpen,
  className = "",
}: MonacoFileExplorerProps) {
  const [activeTab, setActiveTab] = useState<"files" | "search">("files");
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const newFileInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCreatingFile) {
      newFileInputRef.current?.focus();
    }
  }, [isCreatingFile]);

  useEffect(() => {
    if (renamingFileId) {
      renameInputRef.current?.focus();
    }
  }, [renamingFileId]);

  const handleCreateSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = newFileName.trim();
    if (trimmed) {
      onCreateFile(trimmed);
      setNewFileName("");
      setIsCreatingFile(false);
    } else {
      setIsCreatingFile(false);
    }
  };

  const handleRenameSubmit = (fileId: string, e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = renameValue.trim();
    if (trimmed) {
      onRenameFile(fileId, trimmed);
    }
    setRenamingFileId(null);
  };

  // Filter files by search query if in search mode
  const filteredFiles = files.filter((f) => {
    if (!searchQuery) return true;
    const matchName = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchContent = f.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchName || matchContent;
  });

  return (
    <div className={`flex h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 select-none ${className}`}>
      {/* ── 1. VS Code Activity Bar (Vertical Strip) ── */}
      <div className="w-12 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-2 shrink-0 select-none z-10">
        {/* File Explorer Toggle Button */}
        <div className="relative group mb-1">
          <button
            onClick={() => {
              if (activeTab === "files" && isOpen) {
                onToggleOpen();
              } else {
                setActiveTab("files");
                if (!isOpen) onToggleOpen();
              }
            }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              isOpen && activeTab === "files"
                ? "bg-slate-200/80 dark:bg-slate-800 text-primary-theme shadow-xs"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900"
            }`}
            title="File Explorer"
          >
            <Files className="w-5 h-5" />
          </button>

          {/* VS Code Tooltip */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center z-50 pointer-events-none">
            <div className="bg-slate-900 text-white text-[11px] font-sans px-2 py-1 rounded shadow-lg whitespace-nowrap border border-slate-800">
              File Explorer
            </div>
          </div>
        </div>

        {/* Search Toggle Button */}
        <div className="relative group mb-1">
          <button
            onClick={() => {
              if (activeTab === "search" && isOpen) {
                onToggleOpen();
              } else {
                setActiveTab("search");
                if (!isOpen) onToggleOpen();
              }
            }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              isOpen && activeTab === "search"
                ? "bg-slate-200/80 dark:bg-slate-800 text-primary-theme shadow-xs"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900"
            }`}
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Tooltip */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex items-center z-50 pointer-events-none">
            <div className="bg-slate-900 text-white text-[11px] font-sans px-2 py-1 rounded shadow-lg whitespace-nowrap border border-slate-800">
              Search in Files
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Toggle Collapse at Bottom */}
        <button
          onClick={onToggleOpen}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-900 transition"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
      </div>

      {/* ── 2. VS Code File Explorer Drawer ── */}
      {isOpen && (
        <div className="w-48 sm:w-56 bg-white dark:bg-slate-900 flex flex-col h-full overflow-hidden shrink-0 animate-in fade-in duration-150">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              {activeTab === "files" ? "Files" : "Search"}
            </span>

            {activeTab === "files" && (
              <div className="flex items-center gap-1">
                {/* New File */}
                <button
                  onClick={() => setIsCreatingFile(true)}
                  className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
                  title="New File"
                >
                  <FilePlus className="w-4 h-4" />
                </button>

                {/* New Folder (visual/sub-structure) */}
                <button
                  onClick={() => {
                    const folderName = prompt("Enter folder name:");
                    if (folderName) {
                      onCreateFile(`${folderName}/script.py`);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition"
                  title="New Folder"
                >
                  <FolderPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Search Box if Search Tab */}
          {activeTab === "search" && (
            <div className="p-2 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-full text-xs bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 outline-none focus:border-primary-theme pl-7"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {/* Inline New File Input */}
            {isCreatingFile && (
              <form onSubmit={handleCreateSubmit} className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
                <FileCode className="w-3.5 h-3.5 text-primary-theme shrink-0" />
                <input
                  ref={newFileInputRef}
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onBlur={() => handleCreateSubmit()}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setIsCreatingFile(false);
                  }}
                  placeholder="name.py, app.js..."
                  className="w-full text-xs bg-transparent text-slate-800 dark:text-slate-100 outline-none font-mono"
                />
              </form>
            )}

            {/* Existing Files */}
            {filteredFiles.map((file) => {
              const badge = getFileBadge(file.name);
              const isActive = file.id === activeFileId;
              const isRenaming = renamingFileId === file.id;

              return (
                <div
                  key={file.id}
                  onClick={() => onSelectFile(file.id)}
                  className={`group flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-mono cursor-pointer transition-colors ${
                    isActive
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {/* File Icon / Emoji */}
                    <span className="text-xs shrink-0 select-none">{badge.emoji}</span>

                    {/* File Name or Rename Input */}
                    {isRenaming ? (
                      <form
                        onSubmit={(e) => handleRenameSubmit(file.id, e)}
                        className="flex-1 mr-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          ref={renameInputRef}
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onBlur={() => handleRenameSubmit(file.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") setRenamingFileId(null);
                          }}
                          className="w-full text-xs bg-white dark:bg-slate-950 px-1 py-0.5 rounded border border-primary-theme outline-none text-slate-800 dark:text-slate-100 font-mono"
                        />
                      </form>
                    ) : (
                      <span className="truncate text-[12px]">{file.name}</span>
                    )}
                  </div>

                  {/* Actions on hover (Rename, Delete) */}
                  {!isRenaming && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenamingFileId(file.id);
                          setRenameValue(file.name);
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>

                      {files.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete ${file.name}?`)) {
                              onDeleteFile(file.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-500 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFiles.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400 select-none">
                No matching files
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
