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
import { LANGUAGE_LIST, getLanguage } from "../lib/languages";
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

  const currentLang = getLanguage(currentLangId) || LANGUAGE_LIST.find((l) => l.id === currentLangId);

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
    <div className="z-20 relative flex flex-wrap justify-between items-center gap-2 bg-white dark:bg-slate-900 px-3 sm:px-4 py-2 border-slate-200 dark:border-slate-800 border-b text-slate-700 dark:text-slate-200 transition-colors select-none">
      {/* Hidden File Input for uploading */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".txt,.js,.ts,.py,.cpp,.c,.cs,.java,.go,.rs,.php,.rb,.sql,.html,.css,.json,.xml,.yaml,.yml,.md,.sh"
      />

      {/* Left side: Brand + Language Selector + Theme */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Monaco Brand Tag */}
        <div className="flex items-center gap-2 mr-1">
          <div className="flex justify-center items-center bg-primary-theme shadow-xs rounded-lg w-7 h-7 text-white">
            <FileCode2 className="w-4 h-4" />
          </div>
          <span className="hidden md:inline-block font-bold text-slate-800 dark:text-white text-xs sm:text-sm tracking-tight">
            Monaco
          </span>
        </div>

        {/* Language Selector Trigger Button */}
        <button
          type="button"
          onClick={() => setIsLangModalOpen(true)}
          className="group flex items-center gap-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700/60 shadow-2xs px-2.5 sm:px-3 py-1.5 border border-slate-200 hover:border-primary-theme focus:border-primary-theme dark:border-slate-700 rounded-lg outline-none focus:ring-1 focus:ring-primary-theme/30 font-medium text-slate-800 dark:text-slate-100 text-xs sm:text-sm transition-all cursor-pointer"
          title="Choose Programming Language"
        >
          <div className="flex justify-center items-center w-4 h-4 shrink-0">
            <img
              src={currentLang?.image || LANGUAGE_IMAGE_MAP[currentLangId] || DEFAULT_LANGUAGE_IMAGE}
              alt={currentLang?.name || "Language"}
              className="w-4 h-4 object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="font-semibold text-xs sm:text-sm">{currentLang?.name || "Select Language"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:group-hover:text-slate-200 group-hover:text-slate-600 transition-colors" />
        </button>

        {/* Lang Extension Badge */}
        {currentLang && (
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono font-semibold text-xs"
            style={{ backgroundColor: `${currentLang.color}15`, color: currentLang.color }}
          >
            <span className="rounded-full w-1.5 h-1.5" style={{ backgroundColor: currentLang.color }} />
            .{currentLang.extension}
          </div>
        )}

        {/* Theme Selector */}
        <div className="hidden lg:block relative">
          <select
            value={themeId}
            onChange={(e) => onThemeChange(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800/80 shadow-2xs px-2.5 py-1.5 pr-6 border border-slate-200 hover:border-primary-theme focus:border-primary-theme dark:border-slate-700 rounded-lg outline-none font-medium text-slate-700 dark:text-slate-200 text-xs transition-colors appearance-none cursor-pointer"
          >
            {MONACO_THEMES.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <ChevronDown className="top-1/2 right-2 absolute w-3 h-3 text-slate-400 -translate-y-1/2 pointer-events-none" />
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
            <div className="top-full left-0 z-50 absolute space-y-3.5 bg-white dark:bg-slate-900 shadow-xl mt-2 p-4 border border-slate-200 dark:border-slate-700 rounded-xl w-72 text-xs">
              <div className="flex items-center gap-2 pb-2 border-slate-100 dark:border-slate-800 border-b">
                <Sliders className="w-4 h-4 text-primary-theme" />
                <span className="font-bold text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider">
                  Editor Preferences
                </span>
              </div>

              {/* Theme (Visible for mobile too) */}
              <div>
                <label className="block mb-1 font-medium text-slate-500 dark:text-slate-400">Theme</label>
                <select
                  value={themeId}
                  onChange={(e) => onThemeChange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 px-2 py-1 border border-slate-200 focus:border-primary-theme dark:border-slate-700 rounded-md outline-none w-full text-slate-800 dark:text-slate-100"
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
                  <span className="font-medium text-slate-500 dark:text-slate-400">Font Size</span>
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
                <label className="block mb-1 font-medium text-slate-500 dark:text-slate-400">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => onFontFamilyChange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 px-2 py-1 border border-slate-200 focus:border-primary-theme dark:border-slate-700 rounded-md outline-none w-full font-mono text-slate-800 dark:text-slate-100"
                >
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.label} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggles Grid */}
              <div className="gap-2 grid grid-cols-2 pt-2 border-slate-100 dark:border-slate-800 border-t">
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
        

        {/* Format Code */}
        <button
          onClick={onFormat}
          className="p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Format Code (Beautify)"
        >
          <Wand2 className="w-4 h-4" />
        </button>

        {/* Import / Upload */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Upload / Open File"
        >
          <Upload className="w-4 h-4" />
        </button>

        {/* Export / Download */}
        <button
          onClick={handleDownload}
          className="p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Download Code File"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Copy Code */}
        <button
          onClick={handleCopy}
          className="relative p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Copy Code"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>

        {/* Reset Code */}
        <button
          onClick={onReset}
          className="p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Reset to Starter Code"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onFullscreenToggle}
          className="p-1.5 border border-slate-200 hover:border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
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
              <Play className="fill-white w-3.5 h-3.5" />
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
