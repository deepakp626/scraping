// app/tooles/coding-tooles/monaco-components/MonacoToolbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Settings2,
  ChevronDown,
  Maximize2,
  Minimize2,
  Download,
  Upload,
  Wand2,
  GitCompare,
  Sliders,
  FileCode2,
} from "lucide-react";
import { LANGUAGE_LIST } from "../lib/languages";
import { MONACO_THEMES } from "./monaco-loader";
import MonacoLanguageModal, { DEFAULT_LANGUAGE_IMAGE, LANGUAGE_IMAGE_MAP } from "./MonacoLanguageModal";
import type { RunStatus } from "../types/editor";

export interface MonacoToolbarProps {
  currentLangId: string;
  themeId: string;
  fontSize: number;
  fontFamily: string;
  minimap: boolean;
  wordWrap: "on" | "off";
  lineNumbers: "on" | "off";
  isDiffMode: boolean;
  isFullscreen: boolean;
  runStatus: RunStatus;
  code: string;
  onLangChange: (id: string) => void;
  onThemeChange: (id: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
  onMinimapChange: (val: boolean) => void;
  onWordWrapChange: (val: "on" | "off") => void;
  onLineNumbersChange: (val: "on" | "off") => void;
  onDiffToggle: () => void;
  onFullscreenToggle: () => void;
  onFormat: () => void;
  onRun: () => void;
  onReset: () => void;
  onCopy: () => void;
  onFileImport?: (content: string, filename?: string) => void;
}

const FONT_FAMILIES = [
  { label: "Fira Code", value: "'Fira Code', monospace" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
  { label: "Cascadia Code", value: "'Cascadia Code', Consolas, monospace" },
  { label: "Consolas", value: "Consolas, 'Courier New', monospace" },
  { label: "Source Code Pro", value: "'Source Code Pro', monospace" },
];

export default function MonacoToolbar({
  currentLangId,
  themeId,
  fontSize,
  fontFamily,
  minimap,
  wordWrap,
  lineNumbers,
  isDiffMode,
  isFullscreen,
  runStatus,
  code,
  onLangChange,
  onThemeChange,
  onFontSizeChange,
  onFontFamilyChange,
  onMinimapChange,
  onWordWrapChange,
  onLineNumbersChange,
  onDiffToggle,
  onFullscreenToggle,
  onFormat,
  onRun,
  onReset,
  onCopy,
  onFileImport,
}: MonacoToolbarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentLang = LANGUAGE_LIST.find((l) => l.id === currentLangId);

  // Close settings popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download code as file
  const handleDownload = () => {
    const ext = currentLang?.extension || "txt";
    const filename = `script.${ext}`;
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Upload file to editor
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && onFileImport) {
        onFileImport(content, file.name);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex-wrap select-none relative z-20 transition-colors">
      {/* Hidden File Input for uploading */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".txt,.js,.ts,.py,.cpp,.c,.cs,.java,.go,.rs,.php,.rb,.sql,.html,.css,.json,.xml,.yaml,.yml,.md,.sh"
      />

      {/* Left side: Brand + Language Selector + Theme */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Monaco Brand Tag */}
        <div className="flex items-center gap-2 mr-1">
          <div className="w-7 h-7 rounded-lg bg-primary-theme flex items-center justify-center text-white shadow-xs">
            <FileCode2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-white tracking-tight hidden md:inline-block">
            Monaco
          </span>
        </div>

        {/* Language Selector Trigger Button */}
        <button
          type="button"
          onClick={() => setIsLangModalOpen(true)}
          className="
            flex items-center gap-2 text-xs sm:text-sm font-medium
            bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 
            text-slate-800 dark:text-slate-100 rounded-lg px-2.5 sm:px-3 py-1.5 cursor-pointer outline-none
            hover:border-primary-theme hover:bg-slate-100 dark:hover:bg-slate-700/60
            transition-all shadow-2xs focus:border-primary-theme focus:ring-1 focus:ring-primary-theme/30 group
          "
          title="Choose Programming Language"
        >
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            <img
              src={currentLang?.image || LANGUAGE_IMAGE_MAP[currentLangId] || DEFAULT_LANGUAGE_IMAGE}
              alt={currentLang?.name || "Language"}
              className="w-4 h-4 object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="font-semibold text-xs sm:text-sm">{currentLang?.name || "Select Language"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
        </button>

        {/* Lang Extension Badge */}
        {currentLang && (
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
            style={{ backgroundColor: `${currentLang.color}15`, color: currentLang.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentLang.color }} />
            .{currentLang.extension}
          </div>
        )}

        {/* Theme Selector */}
        <div className="relative hidden lg:block">
          <select
            value={themeId}
            onChange={(e) => onThemeChange(e.target.value)}
            className="
              appearance-none text-xs font-medium
              bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 
              text-slate-700 dark:text-slate-200 rounded-lg px-2.5 py-1.5 pr-6 cursor-pointer outline-none
              hover:border-primary-theme transition-colors shadow-2xs focus:border-primary-theme
            "
          >
            {MONACO_THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
        </div>

        {/* Settings Toggle Button */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setShowSettings((v) => !v)}
            className={`p-1.5 rounded-lg border transition-colors ${
              showSettings
                ? "border-primary-theme bg-primary-theme/10 text-primary-theme"
                : "border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-300"
            }`}
            title="Editor Settings & Preferences"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Settings Dropdown Popover */}
          {showSettings && (
            <div className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 w-72 text-xs space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Sliders className="w-4 h-4 text-primary-theme" />
                <span className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
                  Editor Preferences
                </span>
              </div>

              {/* Theme (Visible for mobile too) */}
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Theme</label>
                <select
                  value={themeId}
                  onChange={(e) => onThemeChange(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-slate-800 dark:text-slate-100 outline-none focus:border-primary-theme"
                >
                  {MONACO_THEMES.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Font Size</span>
                  <span className="font-mono font-bold text-primary-theme">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={11}
                  max={24}
                  step={1}
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(Number(e.target.value))}
                  className="w-full accent-primary-theme cursor-pointer"
                />
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => onFontFamilyChange(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-slate-800 dark:text-slate-100 outline-none focus:border-primary-theme font-mono"
                >
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.label} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Minimap */}
                <button
                  onClick={() => onMinimapChange(!minimap)}
                  className={`px-2.5 py-1.5 rounded-md border text-center font-medium transition ${
                    minimap
                      ? "border-primary-theme/50 bg-primary-theme/10 text-primary-theme"
                      : "border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
                >
                  Minimap: {minimap ? "ON" : "OFF"}
                </button>

                {/* Word Wrap */}
                <button
                  onClick={() => onWordWrapChange(wordWrap === "on" ? "off" : "on")}
                  className={`px-2.5 py-1.5 rounded-md border text-center font-medium transition ${
                    wordWrap === "on"
                      ? "border-primary-theme/50 bg-primary-theme/10 text-primary-theme"
                      : "border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
                >
                  Wrap: {wordWrap === "on" ? "ON" : "OFF"}
                </button>

                {/* Line Numbers */}
                <button
                  onClick={() => onLineNumbersChange(lineNumbers === "on" ? "off" : "on")}
                  className={`px-2.5 py-1.5 rounded-md border text-center font-medium transition col-span-2 ${
                    lineNumbers === "on"
                      ? "border-primary-theme/50 bg-primary-theme/10 text-primary-theme"
                      : "border-slate-200 dark:border-slate-700 text-slate-500"
                  }`}
                >
                  Line Numbers: {lineNumbers === "on" ? "Visible" : "Hidden"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Productivity Actions & Run Button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Diff Mode Toggle */}
        <button
          onClick={onDiffToggle}
          className={`p-1.5 rounded-lg border transition-colors ${
            isDiffMode
              ? "border-primary-theme bg-primary-theme/15 text-primary-theme font-semibold"
              : "border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
          }`}
          title={isDiffMode ? "Return to Editor" : "Compare with Starter (Diff View)"}
        >
          <GitCompare className="w-4 h-4" />
        </button>

        {/* Format Code */}
        <button
          onClick={onFormat}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors"
          title="Format Code (Beautify)"
        >
          <Wand2 className="w-4 h-4" />
        </button>

        {/* Import / Upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors"
          title="Upload / Open File"
        >
          <Upload className="w-4 h-4" />
        </button>

        {/* Export / Download */}
        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors"
          title="Download Code File"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors relative"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>

        {/* Reset Code */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors"
          title="Reset to Starter Code"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onFullscreenToggle}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Run Button */}
        <button
          onClick={onRun}
          disabled={runStatus === "running"}
          className={`
            flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg font-bold text-xs sm:text-sm text-white shadow-xs
            transition-all duration-150 active:scale-95
            ${
              runStatus === "running"
                ? "bg-emerald-600/70 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
            }
          `}
          title="Run Code (Ctrl+Enter)"
        >
          {runStatus === "running" ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 11-6.22-8.56" strokeLinecap="round" />
              </svg>
              <span>Running…</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run</span>
            </>
          )}
        </button>
      </div>

      {/* Programming Language Selection Modal */}
      <MonacoLanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLangId={currentLangId}
        onSelect={(langId) => onLangChange(langId)}
      />
    </div>
  );
}
