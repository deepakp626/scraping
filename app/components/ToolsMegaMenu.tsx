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
  QrCode, Link2, Music, Video,
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
      { name: 'Merge PDF', icon: Merge, link: '/tooles/pdf-tooles/merge-pdf' },
      { name: 'Split PDF', icon: Split, link: '/tooles/pdf-tooles/split-pdf' },
      { name: 'Compress PDF', icon: FileMinus, link: '/tooles/pdf-tooles/compress-pdf' },
      { name: 'PDF to Word', icon: FileText, link: '/tooles/pdf-tooles/pdf-to-word' },
      { name: 'Word to PDF', icon: FilePlus, link: '/tooles/pdf-tooles/word-to-pdf' },
      { name: 'PDF to Image', icon: FileImage, link: '/tooles/pdf-tooles/pdf-to-image' },
      { name: 'Image to PDF', icon: FileImage, link: '/tooles/pdf-tooles/image-to-pdf' },
      { name: 'Unlock PDF', icon: Unlock, link: '/tooles/pdf-tooles/unlock-pdf' },
      { name: 'Lock PDF', icon: Lock, link: '/tooles/pdf-tooles/lock-pdf' },
      { name: 'Rotate PDF', icon: RotateCw, link: '/tooles/pdf-tooles/rotate-pdf' },
      { name: 'Rotate Left', icon: RotateCcw, link: '/tooles/pdf-tooles/rotate-left' },
      { name: 'Add Watermark', icon: FileSignature, link: '/tooles/pdf-tooles/add-watermark' },
      { name: 'Remove Pages', icon: FileX, link: '/tooles/pdf-tooles/remove-pages' },
      { name: 'Extract Pages', icon: FileDown, link: '/tooles/pdf-tooles/extract-pages' },
      { name: 'Page Numbers', icon: FileDigit, link: '/tooles/pdf-tooles/page-numbers' },
      { name: 'OCR PDF', icon: Eye, link: '/tooles/pdf-tooles/ocr-pdf' },
      { name: 'Sign PDF', icon: FileSignature, link: '/tooles/pdf-tooles/sign-pdf' },
      { name: 'Protect PDF', icon: ShieldCheck, link: '/tooles/pdf-tooles/protect-pdf' },
      { name: 'PDF to HTML', icon: FileCode, link: '/tooles/pdf-tooles/pdf-to-html' },
      { name: 'Search in PDF', icon: FileSearch, link: '/tooles/pdf-tooles/search-pdf' },
    ],
  },
  {
    id: 'image',
    label: 'Image',
    tabIcon: ImageIcon,
    tools: [
      { name: 'Compress Image', icon: Minimize, link: '/tooles/image-tooles/compress-image' },
      { name: 'Resize Image', icon: Maximize, link: '/tooles/image-tooles/resize-image' },
      { name: 'Crop Image', icon: Crop, link: '/tooles/image-tooles/crop-image' },
      { name: 'Convert to JPG', icon: FileImage, link: '/tooles/image-tooles/convert-jpg' },
      { name: 'Convert to PNG', icon: ImageIcon, link: '/tooles/image-tooles/convert-png' },
      { name: 'Convert to WebP', icon: FileImage, link: '/tooles/image-tooles/convert-webp' },
      { name: 'Rotate Image', icon: RotateCw, link: '/tooles/image-tooles/rotate-image' },
      { name: 'Flip Horizontal', icon: FlipHorizontal, link: '/tooles/image-tooles/flip-horizontal' },
      { name: 'Flip Vertical', icon: FlipVertical, link: '/tooles/image-tooles/flip-vertical' },
      { name: 'Image to PDF', icon: FileUp, link: '/tooles/image-tooles/image-to-pdf' },
      { name: 'Remove Background', icon: Eraser, link: '/tooles/image-tooles/remove-bg' },
      { name: 'Enhance Image', icon: Wand2, link: '/tooles/image-tooles/enhance-image' },
      { name: 'Add Watermark', icon: ShieldCheck, link: '/tooles/image-tooles/add-watermark' },
      { name: 'Blur Image', icon: Eye, link: '/tooles/image-tooles/blur-image' },
      { name: 'Color Adjust', icon: Palette, link: '/tooles/image-tooles/color-adjust' },
      { name: 'Change Format', icon: Replace, link: '/tooles/image-tooles/change-format' },
      { name: 'Merge Images', icon: Layers, link: '/tooles/image-tooles/merge-images' },
      { name: 'Split Image', icon: Scissors, link: '/tooles/image-tooles/split-image' },
      { name: 'Add Text', icon: FilePlus, link: '/tooles/image-tooles/add-text' },
    ],
  },
  {
    id: 'coding',
    label: 'Coding',
    tabIcon: Code,
    tools: [
      { name: 'Python Playground', icon: Terminal, link: '/tooles/coding-tooles/python' },
      { name: 'JavaScript Runner', icon: Play, link: '/tooles/coding-tooles/javascript' },
      { name: 'TypeScript Playground', icon: SquareCode, link: '/tooles/coding-tooles/typescript' },
      { name: 'HTML Beautifier', icon: Code, link: '/tooles/coding-tooles/html' },
      { name: 'CSS Formatter', icon: Palette, link: '/tooles/coding-tooles/css' },
      { name: 'SQL Formatter', icon: Database, link: '/tooles/coding-tooles/sql' },
      { name: 'JSON Formatter', icon: FileJson, link: '/tooles/coding-tooles/json' },
      { name: 'XML Parser', icon: FileCode, link: '/tooles/coding-tooles/xml' },
      { name: 'C++ Playground', icon: Cpu, link: '/tooles/coding-tooles/cpp' },
      { name: 'Java Playground', icon: Coffee, link: '/tooles/coding-tooles/java' },
      { name: 'Go Playground', icon: Zap, link: '/tooles/coding-tooles/go' },
      { name: 'Rust Compiler', icon: Hammer, link: '/tooles/coding-tooles/rust' },
      { name: 'Ruby Playground', icon: Gem, link: '/tooles/coding-tooles/ruby' },
      { name: 'Markdown Editor', icon: BookOpen, link: '/tooles/coding-tooles/markdown' },
      { name: 'Bash Runner', icon: Terminal, link: '/tooles/coding-tooles/bash' },
      { name: 'C# Playground', icon: Hash, link: '/tooles/coding-tooles/csharp' },
      { name: 'Swift Playground', icon: Feather, link: '/tooles/coding-tooles/swift' },
      { name: 'Kotlin Playground', icon: Layers, link: '/tooles/coding-tooles/kotlin' },
      { name: 'YAML Formatter', icon: Braces, link: '/tooles/coding-tooles/yaml' },
      { name: 'JSON to YAML', icon: RefreshCw, link: '/tooles/coding-tooles/json-to-yaml' },
      { name: 'YAML to JSON', icon: RefreshCw, link: '/tooles/coding-tooles/yaml-to-json' },
    ],
  },
  {
    id: 'converter',
    label: 'Converter',
    tabIcon: ArrowRightLeft,
    tools: [
      { name: 'Excel to PDF', icon: FileType, link: '/tooles/converter-tools/excel-to-pdf' },
      { name: 'CSV to Excel', icon: Sigma, link: '/tooles/converter-tools/csv-to-excel' },
      { name: 'JSON to XML', icon: Binary, link: '/tooles/converter-tools/json-to-xml' },
      { name: 'XML to CSV', icon: Globe, link: '/tooles/converter-tools/xml-to-csv' },
      { name: 'CSV to JSON', icon: Link2, link: '/tooles/converter-tools/csv-to-json' },
      { name: 'EPUB to MOBI', icon: Music, link: '/tooles/converter-tools/epub-to-mobi' },
      { name: 'Unit Converter', icon: Repeat2, link: '/tooles/converter-tools/unit-converter' },
      { name: 'Base64 Encode/Decode', icon: Binary, link: '/tooles/converter-tools/base64' },
      { name: 'URL Encoder', icon: Link2, link: '/tooles/converter-tools/url-encoder' },
      { name: 'QR Code Generator', icon: QrCode, link: '/tooles/converter-tools/qr-code' },
      { name: 'Audio Converter', icon: Music, link: '/tooles/converter-tools/audio-converter' },
      { name: 'Video Converter', icon: Video, link: '/tooles/converter-tools/video-converter' },
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
    <div style={{ minWidth: 680, maxWidth: 780 }}>
      {/* ── Horizontal tab bar ── */}
      <div className="flex items-center gap-1 border-b border-white/10 mb-4 pb-0">
        {toolCategories.map((cat) => {
          const TabIcon = cat.tabIcon;
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              onMouseEnter={() => setActiveTab(cat.id)}
              onClick={() => setActiveTab(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-orange-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TabIcon size={14} />
              {cat.label}
              {/* Animated underline indicator */}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* View all link pushed to right */}
        <Link
          href={`/tooles/${activeTab}-tooles`}
          className="ml-auto flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors px-2 py-1 shrink-0"
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
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="shrink-0 p-1.5 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <Icon size={14} className="text-orange-400 group-hover:text-orange-300 transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* More tools link */}
          {activeCategory.tools.length > 16 && (
            <Link
              href={`/tooles/${activeTab}-tooles`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 transition-colors pl-1"
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
