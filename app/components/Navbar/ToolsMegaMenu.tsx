'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  // PDF icons
  FileText, Merge, Split, FileMinus, FilePlus, FileImage,
  Unlock, Lock, RotateCw, RotateCcw, FileSignature, FileX,
  FileDown, FileDigit, Eye, ShieldCheck, FileCode, FileSearch,
  // Image icons
  Minimize, Maximize, Crop, FlipHorizontal, FlipVertical,
  Eraser, Wand2, Palette, Layers, Scissors,
  Image as ImageIcon, FileUp, Replace,
  // Coding icons
  Terminal, Play, SquareCode, Code, Database, FileJson,
  Cpu, Coffee, Zap, Hammer, Gem, BookOpen, Hash, Feather,
  Braces, RefreshCw,
  // Converter icons
  ArrowRightLeft, Binary, Globe, FileType, Sigma, Repeat2,
  QrCode, Link2, Music, Video, Sparkles, Wrench, Printer, Edit3, Table,
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA – one source of truth per category
// ─────────────────────────────────────────────

export type Tool = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  link: string;
};

export type ToolCategory = {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tabIcon: React.ComponentType<any>;
  tools: Tool[];
};

export const toolCategories: ToolCategory[] = [
  {
    id: 'pdf',
    label: 'PDF',
    tabIcon: FileText,
    tools: [
      { name: 'Merge PDF', icon: Merge, link: '/tools/pdf-tools/merge-pdf' },
      { name: 'Split PDF', icon: Split, link: '/tools/pdf-tools/split-pdf' },
      { name: 'Compress PDF', icon: FileMinus, link: '/tools/pdf-tools/compress-pdf' },
      { name: 'PDF to Word', icon: FileText, link: '/tools/pdf-tools/pdf-to-word' },
      { name: 'Word to PDF', icon: FilePlus, link: '/tools/pdf-tools/word-to-pdf' },
      { name: 'PDF to Image', icon: FileImage, link: '/tools/pdf-tools/pdf-to-image' },
      { name: 'Image to PDF', icon: FileImage, link: '/tools/pdf-tools/image-to-pdf' },
      { name: 'Unlock PDF', icon: Unlock, link: '/tools/pdf-tools/unlock-pdf' },
      { name: 'Lock PDF', icon: Lock, link: '/tools/pdf-tools/lock-pdf' },
      { name: 'Rotate PDF', icon: RotateCw, link: '/tools/pdf-tools/rotate-pdf' },
      { name: 'Rotate Left', icon: RotateCcw, link: '/tools/pdf-tools/rotate-left' },
      { name: 'Add Watermark', icon: FileSignature, link: '/tools/pdf-tools/add-watermark' },
      { name: 'Remove Pages', icon: FileX, link: '/tools/pdf-tools/remove-pages' },
      { name: 'Extract Pages', icon: FileDown, link: '/tools/pdf-tools/extract-pages' },
      { name: 'Page Numbers', icon: FileDigit, link: '/tools/pdf-tools/page-numbers' },
      { name: 'OCR PDF', icon: Eye, link: '/tools/pdf-tools/ocr-pdf' },
      { name: 'Sign PDF', icon: FileSignature, link: '/tools/pdf-tools/sign-pdf' },
      { name: 'Protect PDF', icon: ShieldCheck, link: '/tools/pdf-tools/protect-pdf' },
      { name: 'PDF to HTML', icon: FileCode, link: '/tools/pdf-tools/pdf-to-html' },
      { name: 'Search in PDF', icon: FileSearch, link: '/tools/pdf-tools/search-pdf' },
    ],
  },
  {
    id: 'image',
    label: 'Image',
    tabIcon: ImageIcon,
    tools: [
      { name: 'Compress Image', icon: Minimize, link: '/tools/image-tools/compress-image' },
      { name: 'Resize Image', icon: Maximize, link: '/tools/image-tools/resize-image' },
      { name: 'Crop Image', icon: Crop, link: '/tools/image-tools/crop-image' },
      { name: 'Convert to JPG', icon: FileImage, link: '/tools/image-tools/convert-jpg' },
      { name: 'Convert to PNG', icon: ImageIcon, link: '/tools/image-tools/convert-png' },
      { name: 'Convert to WebP', icon: FileImage, link: '/tools/image-tools/convert-webp' },
      { name: 'Rotate Image', icon: RotateCw, link: '/tools/image-tools/rotate-image' },
      { name: 'Flip Horizontal', icon: FlipHorizontal, link: '/tools/image-tools/flip-horizontal' },
      { name: 'Flip Vertical', icon: FlipVertical, link: '/tools/image-tools/flip-vertical' },
      { name: 'Image to PDF', icon: FileUp, link: '/tools/image-tools/image-to-pdf' },
      { name: 'Remove Background', icon: Eraser, link: '/tools/image-tools/remove-bg' },
      { name: 'Enhance Image', icon: Wand2, link: '/tools/image-tools/enhance-image' },
      { name: 'Add Watermark', icon: ShieldCheck, link: '/tools/image-tools/add-watermark' },
      { name: 'Blur Image', icon: Eye, link: '/tools/image-tools/blur-image' },
      { name: 'Color Adjust', icon: Palette, link: '/tools/image-tools/color-adjust' },
      { name: 'Change Format', icon: Replace, link: '/tools/image-tools/change-format' },
      { name: 'Merge Images', icon: Layers, link: '/tools/image-tools/merge-images' },
      { name: 'Split Image', icon: Scissors, link: '/tools/image-tools/split-image' },
      { name: 'Add Text', icon: FilePlus, link: '/tools/image-tools/add-text' },
    ],
  },
  {
    id: 'coding',
    label: 'Coding',
    tabIcon: Code,
    tools: [
      { name: 'Python Playground', icon: Terminal, link: '/tools/coding-tools/python' },
      { name: 'JavaScript Runner', icon: Play, link: '/tools/coding-tools/javascript' },
      { name: 'TypeScript Playground', icon: SquareCode, link: '/tools/coding-tools/typescript' },
      { name: 'HTML Beautifier', icon: Code, link: '/tools/coding-tools/html' },
      { name: 'CSS Formatter', icon: Palette, link: '/tools/coding-tools/css' },
      { name: 'SQL Formatter', icon: Database, link: '/tools/coding-tools/sql' },
      { name: 'JSON Formatter', icon: FileJson, link: '/tools/coding-tools/json' },
      { name: 'XML Parser', icon: FileCode, link: '/tools/coding-tools/xml' },
      { name: 'C++ Playground', icon: Cpu, link: '/tools/coding-tools/cpp' },
      { name: 'Java Playground', icon: Coffee, link: '/tools/coding-tools/java' },
      { name: 'Go Playground', icon: Zap, link: '/tools/coding-tools/go' },
      { name: 'Rust Compiler', icon: Hammer, link: '/tools/coding-tools/rust' },
      { name: 'Ruby Playground', icon: Gem, link: '/tools/coding-tools/ruby' },
      { name: 'Markdown Editor', icon: BookOpen, link: '/tools/coding-tools/markdown' },
      { name: 'Bash Runner', icon: Terminal, link: '/tools/coding-tools/bash' },
      { name: 'C# Playground', icon: Hash, link: '/tools/coding-tools/csharp' },
      { name: 'Swift Playground', icon: Feather, link: '/tools/coding-tools/swift' },
      { name: 'Kotlin Playground', icon: Layers, link: '/tools/coding-tools/kotlin' },
      { name: 'YAML Formatter', icon: Braces, link: '/tools/coding-tools/yaml' },
      { name: 'JSON to YAML', icon: RefreshCw, link: '/tools/coding-tools/json-to-yaml' },
      { name: 'YAML to JSON', icon: RefreshCw, link: '/tools/coding-tools/yaml-to-json' },
    ],
  },
  {
    id: 'json',
    label: 'JSON',
    tabIcon: FileJson,
    tools: [
      { name: 'JSON Formatter', icon: FileCode, link: '/tools/json-tools/json-formatter' },
      { name: 'JSON Formatter Online', icon: Globe, link: '/tools/json-tools/json-formatter-online' },
      { name: 'JSON Validator', icon: ShieldCheck, link: '/tools/json-tools/json-validator' },
      { name: 'JSON Viewer', icon: Eye, link: '/tools/json-tools/json-viewer' },
      { name: 'JSON Beautifier', icon: Sparkles, link: '/tools/json-tools/json-beautifier' },
      { name: 'JSON Editor', icon: Edit3, link: '/tools/json-tools/json-editor' },
      { name: 'JSON Parser', icon: Code, link: '/tools/json-tools/json-parser' },
      { name: 'JSON Minifier', icon: Minimize, link: '/tools/json-tools/json-minifier' },
      { name: 'JSON to CSV', icon: Table, link: '/tools/json-tools/json-to-csv' },
      { name: 'JSON to XML', icon: Code, link: '/tools/json-tools/json-to-xml' },
      { name: 'JSON to YAML', icon: FileText, link: '/tools/json-tools/json-to-yaml' },
      { name: 'JSON Pretty Print', icon: Printer, link: '/tools/json-tools/json-pretty-print' },
      { name: 'JSON Compare', icon: RefreshCw, link: '/tools/json-tools/json-compare' },
      { name: 'JSON Diff', icon: RefreshCw, link: '/tools/json-tools/json-diff' },
      { name: 'JSON Tree Viewer', icon: Layers, link: '/tools/json-tools/json-tree-viewer' },
      { name: 'JSON Repair', icon: Wrench, link: '/tools/json-tools/json-repair' },
      { name: 'JSON to Excel', icon: FileType, link: '/tools/json-tools/json-to-excel' },
      { name: 'JSON to TypeScript', icon: SquareCode, link: '/tools/json-tools/json-to-typescript' },
      { name: 'JSON to Java POJO', icon: Coffee, link: '/tools/json-tools/json-to-java' },
      { name: 'JSON to Go Struct', icon: Zap, link: '/tools/json-tools/json-to-go' },
    ],
  },
  {
    id: 'converter',
    label: 'Converter',
    tabIcon: ArrowRightLeft,
    tools: [
      { name: 'Excel to PDF', icon: FileType, link: '/tools/converter-tools/excel-to-pdf' },
      { name: 'CSV to Excel', icon: Sigma, link: '/tools/converter-tools/csv-to-excel' },
      { name: 'JSON to XML', icon: Binary, link: '/tools/converter-tools/json-to-xml' },
      { name: 'XML to CSV', icon: Globe, link: '/tools/converter-tools/xml-to-csv' },
      { name: 'CSV to JSON', icon: Link2, link: '/tools/converter-tools/csv-to-json' },
      { name: 'EPUB to MOBI', icon: Music, link: '/tools/converter-tools/epub-to-mobi' },
      { name: 'Unit Converter', icon: Repeat2, link: '/tools/converter-tools/unit-converter' },
      { name: 'Base64 Encode/Decode', icon: Binary, link: '/tools/converter-tools/base64' },
      { name: 'URL Encoder', icon: Link2, link: '/tools/converter-tools/url-encoder' },
      { name: 'QR Code Generator', icon: QrCode, link: '/tools/converter-tools/qr-code' },
      { name: 'Audio Converter', icon: Music, link: '/tools/converter-tools/audio-converter' },
      { name: 'Video Converter', icon: Video, link: '/tools/converter-tools/video-converter' },
    ],
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

export function ToolsMegaMenu() {
  const [activeTab, setActiveTab] = useState<string>(toolCategories[0].id);

  const activeCategory = toolCategories.find((c) => c.id === activeTab)!;

  return (
    <div className="w-[820px] max-w-[calc(100vw-4rem)]">
      {/* ── Horizontal tab bar ── */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-4 pb-0">
        {toolCategories.map((cat) => {
          const TabIcon = cat.tabIcon;
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onMouseEnter={() => setActiveTab(cat.id)}
              onClick={() => setActiveTab(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                  ? 'text-orange-600'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <TabIcon size={14} />
              {cat.label}
              {/* Animated underline indicator */}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* View all link pushed to right */}
        <Link
          href={`/tools/${activeTab}-tools`}
          className="ml-auto flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors px-2 py-1 shrink-0"
        >
          View all {activeCategory.label} →
        </Link>
      </div>

      {/* ── Tools grid panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}
          >
            {activeCategory.tools.slice(0, 16).map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  href={tool.link}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all group"
                >
                  <div className="shrink-0 p-1.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                    <Icon size={14} className="text-orange-600 group-hover:text-orange-700 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-orange-600 transition-colors leading-tight truncate">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* More tools link */}
          {activeCategory.tools.length > 16 && (
            <Link
              href={`/tools/${activeTab}-tools`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 transition-colors pl-1"
            >
              +{activeCategory.tools.length - 16} more tools →
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ToolsMegaMenu;
