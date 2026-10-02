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
      <div className="z-10 flex flex-col items-center bg-slate-50 dark:bg-slate-950 py-2 border-slate-200 dark:border-slate-800 border-r w-12 select-none shrink-0">
        {/* File Explorer Toggle Button */}
        <div className="group relative mb-1">
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
          <div className="hidden top-1/2 left-full z-50 absolute group-hover:flex items-center ml-2 -translate-y-1/2 pointer-events-none">
            <div className="bg-slate-900 shadow-lg px-2 py-1 border border-slate-800 rounded font-sans text-[11px] text-white whitespace-nowrap">
              File Explorer
            </div>
          </div>
        </div>

        {/* Search Toggle Button */}
        <div className="group relative mb-1">
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
          <div className="hidden top-1/2 left-full z-50 absolute group-hover:flex items-center ml-2 -translate-y-1/2 pointer-events-none">
            <div className="bg-slate-900 shadow-lg px-2 py-1 border border-slate-800 rounded font-sans text-[11px] text-white whitespace-nowrap">
              Search in Files
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Toggle Collapse at Bottom */}
        <button
          onClick={onToggleOpen}
          className="flex justify-center items-center hover:bg-slate-200/50 dark:hover:bg-slate-900 rounded-lg w-8 h-8 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
        </button>
      </div>

      {/* ── 2. VS Code File Explorer Drawer ── */}
      {isOpen && (
        <div className="flex flex-col bg-white dark:bg-slate-900 w-48 sm:w-56 h-full overflow-hidden animate-in duration-150 shrink-0 fade-in">
          {/* Header Bar */}
          <div className="flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 px-3 py-2 border-slate-200 dark:border-slate-800 border-b">
            <span className="font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              {activeTab === "files" ? "Files" : "Search"}
            </span>

            {activeTab === "files" && (
              <div className="flex items-center gap-1">
                {/* New File */}
                <button
                  onClick={() => setIsCreatingFile(true)}
                  className="hover:bg-slate-200/50 dark:hover:bg-slate-800 p-1 rounded text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
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
                  className="hover:bg-slate-200/50 dark:hover:bg-slate-800 p-1 rounded text-slate-400 hover:text-slate-800 dark:hover:text-white transition"
                  title="New Folder"
                >
                  <FolderPlus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Search Box if Search Tab */}
          {activeTab === "search" && (
            <div className="p-2 border-slate-200 dark:border-slate-800 border-b">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1.5 pl-7 border border-slate-200 focus:border-primary-theme dark:border-slate-800 rounded-md outline-none w-full text-slate-800 dark:text-slate-200 text-xs"
                />
                <Search className="top-1/2 left-2 absolute w-3.5 h-3.5 text-slate-400 -translate-y-1/2" />
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="flex-1 space-y-0.5 p-1.5 overflow-y-auto">
            {/* Inline New File Input */}
            {isCreatingFile && (
              <form onSubmit={handleCreateSubmit} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
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
                  className="bg-transparent outline-none w-full font-mono text-slate-800 dark:text-slate-100 text-xs"
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
                  <div className="flex flex-1 items-center gap-2 min-w-0">
                    {/* File Icon / Emoji */}
                    <span className="text-xs select-none shrink-0">{badge.emoji}</span>

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
                          className="bg-white dark:bg-slate-950 px-1 py-0.5 border border-primary-theme rounded outline-none w-full font-mono text-slate-800 dark:text-slate-100 text-xs"
                        />
                      </form>
                    ) : (
                      <span className="text-[12px] truncate">{file.name}</span>
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
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
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
                          className="p-1 rounded text-slate-400 hover:text-red-500"
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
              <div className="p-4 text-slate-400 text-xs text-center select-none">
                No matching files
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
