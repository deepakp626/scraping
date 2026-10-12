"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import {
  UploadCloud,
  Download,
  AlertCircle,
  FileText,
  Eye,
  RefreshCw,
  Sliders,
  Type,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  RemoveFormatting,
  Link as LinkIcon,
  FileCode,
} from "lucide-react";

export default function WordToPdf() {
  const [title, setTitle] = useState("My Document");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<number>(12);
  const [fontFamily, setFontFamily] = useState<"helvetica" | "times" | "courier">("helvetica");
  const [lineSpacingMultiplier, setLineSpacingMultiplier] = useState<number>(1.35);
  const [pageOrientation, setPageOrientation] = useState<"portrait" | "landscape">("portrait");
  const [marginSize, setMarginSize] = useState<number>(20); // mm
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
    ],
    content: `
      <h2>Welcome to Word to PDF Converter</h2>
      <p>Type or paste your document text here, format it using the rich text tools or <strong>floating popover</strong>, or upload a Word document (.docx / .doc) above.</p>
      <p>All conversions happen instantly with high fidelity and client-side privacy.</p>
      <ul>
        <li>Full formatting support: bold, italic, headings, lists</li>
        <li>Interactive live PDF preview box updates in real-time</li>
        <li>Accurate font scaling and page metrics</li>
      </ul>
    `,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[320px] text-slate-800 text-sm leading-relaxed p-4 font-sans",
      },
    },
    onUpdate: () => {
      setContentVersion((v) => v + 1);
    },
    immediatelyRender: false,
  });

  const setLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  /**
   * Client-side DOCX / Word / Text Extractor
   */
  const extractTextFromDocx = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const bytes = new Uint8Array(arrayBuffer);
    const dataView = new DataView(arrayBuffer);

    let docXmlOffset = -1;
    let compressedSize = 0;
    let compressionMethod = 0;

    // Scan ZIP local file headers for "word/document.xml"
    for (let i = 0; i < bytes.length - 30; i++) {
      if (
        bytes[i] === 0x50 &&
        bytes[i + 1] === 0x4b &&
        bytes[i + 2] === 0x03 &&
        bytes[i + 3] === 0x04
      ) {
        const compMethod = dataView.getUint16(i + 8, true);
        const compSize = dataView.getUint32(i + 18, true);
        const fileNameLen = dataView.getUint16(i + 26, true);
        const extraFieldLen = dataView.getUint16(i + 28, true);

        if (i + 30 + fileNameLen <= bytes.length) {
          const fileNameBytes = bytes.subarray(i + 30, i + 30 + fileNameLen);
          const name = new TextDecoder().decode(fileNameBytes);

          if (name === "word/document.xml") {
            docXmlOffset = i + 30 + fileNameLen + extraFieldLen;
            compressedSize = compSize;
            compressionMethod = compMethod;
            break;
          }
        }
      }
    }

    if (docXmlOffset !== -1 && docXmlOffset + compressedSize <= bytes.length) {
      const rawData = bytes.subarray(docXmlOffset, docXmlOffset + compressedSize);
      let xmlContent = "";

      if (compressionMethod === 8 && typeof DecompressionStream !== "undefined") {
        try {
          const stream = new Response(rawData).body?.pipeThrough(
            new DecompressionStream("deflate-raw")
          );
          if (stream) {
            xmlContent = await new Response(stream).text();
          }
        } catch {
          try {
            const stream = new Response(rawData).body?.pipeThrough(
              new DecompressionStream("deflate")
            );
            if (stream) {
              xmlContent = await new Response(stream).text();
            }
          } catch (e) {
            console.warn("Decompression fallback failed", e);
          }
        }
      } else if (compressionMethod === 0) {
        xmlContent = new TextDecoder().decode(rawData);
      }

      if (xmlContent) {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
          const pElements = xmlDoc.getElementsByTagName("w:p");
          const extractedParagraphs: string[] = [];

          for (let p = 0; p < pElements.length; p++) {
            const pElem = pElements[p];
            const textNodes = pElem.getElementsByTagName("w:t");
            let paragraphText = "";
            for (let t = 0; t < textNodes.length; t++) {
              paragraphText += textNodes[t].textContent || "";
            }
            if (paragraphText.trim().length > 0) {
              extractedParagraphs.push(paragraphText.trim());
            }
          }

          if (extractedParagraphs.length > 0) {
            return extractedParagraphs.join("\n\n");
          }
        } catch (xmlErr) {
          console.warn("XML parsing fallback:", xmlErr);
        }
      }
    }

    // Fallback: extract string tokens from XML tags
    const decoder = new TextDecoder("utf-8", { fatal: false });
    const rawString = decoder.decode(bytes);
    const tagMatches = rawString.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
    if (tagMatches && tagMatches.length > 0) {
      const texts = tagMatches
        .map((t) => t.replace(/<[^>]+>/g, "").trim())
        .filter((t) => t.length > 0);
      if (texts.length > 0) {
        return texts.join(" ");
      }
    }

    // Fallback for plain text or .doc runs
    const cleanMatches = rawString.match(/[\x20-\x7E\r\n\t]{4,}/g);
    if (cleanMatches && cleanMatches.length > 0) {
      return cleanMatches
        .join("\n")
        .replace(/(\n\s*){3,}/g, "\n\n")
        .trim();
    }

    return "";
  };

  /**
   * Handle File Upload
   */
  const handleFileUpload = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setIsReadingFile(true);

    try {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setTitle(baseName);
      setFileName(file.name);
      setFileSize(file.size);

      const ext = file.name.split(".").pop()?.toLowerCase();
      let extractedText = "";

      if (ext === "txt" || ext === "md" || ext === "csv" || ext === "json") {
        extractedText = await file.text();
      } else if (ext === "docx" || ext === "doc" || ext === "rtf" || ext === "odt") {
        const buffer = await file.arrayBuffer();
        extractedText = await extractTextFromDocx(buffer);
        if (!extractedText || extractedText.trim().length === 0) {
          extractedText = await file.text();
        }
      } else {
        extractedText = await file.text();
      }

      if (editor && extractedText.trim()) {
        const formattedHtml = extractedText
          .split(/\r?\n\r?\n/)
          .filter((p) => p.trim().length > 0)
          .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
          .join("");

        editor.commands.setContent(formattedHtml || `<p>${extractedText}</p>`);
        setContentVersion((v) => v + 1);
      }
    } catch (err: any) {
      console.error("File upload error:", err);
      setError("Failed to read file contents. Please try again or paste text manually.");
    } finally {
      setIsReadingFile(false);
    }
  };

  /**
   * Core PDF Generation from TipTap Document Nodes
   */
  const generatePdfBlob = useCallback((): string | null => {
    if (!editor) return null;

    const editorText = editor.getText();
    if (!editorText.trim() && !title.trim()) return null;

    try {
      const doc = new jsPDF({
        orientation: pageOrientation,
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = marginSize;
      const maxLineWidth = pageWidth - margin * 2;

      // Font size to mm conversion: 1 pt = 0.352778 mm
      const ptToMm = 0.352778;
      const bodyFontSize = fontSize;
      const titleFontSize = Math.min(26, Math.max(16, Math.round(fontSize * 1.5)));

      const bodyLineHeightMm = bodyFontSize * lineSpacingMultiplier * ptToMm;
      const titleLineHeightMm = titleFontSize * 1.25 * ptToMm;

      let cursorY = margin + titleLineHeightMm;

      // Document Title
      if (title.trim()) {
        doc.setFont(fontFamily, "bold");
        doc.setFontSize(titleFontSize);
        doc.setTextColor(30, 41, 59); // slate-800
        const titleLines = doc.splitTextToSize(title.trim(), maxLineWidth);
        for (const tLine of titleLines) {
          if (cursorY > pageHeight - margin - 15) {
            doc.addPage();
            cursorY = margin + titleLineHeightMm;
          }
          doc.text(tLine, margin, cursorY);
          cursorY += titleLineHeightMm;
        }

        // Horizontal divider under title
        cursorY += 2;
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.3);
        doc.line(margin, cursorY, pageWidth - margin, cursorY);
        cursorY += bodyLineHeightMm * 1.2;
      }

      // Parse JSON from TipTap editor
      const json = editor.getJSON();
      const nodes = json.content || [];

      const renderTextBlock = (
        textStr: string,
        nodeFontSize: number,
        isBold: boolean,
        isItalic: boolean,
        prefix = "",
        leftIndent = 0
      ) => {
        if (!textStr.trim() && !prefix) {
          cursorY += bodyLineHeightMm * 0.5;
          return;
        }

        let fontStyle = "normal";
        if (isBold && isItalic) fontStyle = "bolditalic";
        else if (isBold) fontStyle = "bold";
        else if (isItalic) fontStyle = "italic";

        doc.setFont(fontFamily, fontStyle);
        doc.setFontSize(nodeFontSize);
        doc.setTextColor(51, 65, 85);

        const currentLineWidth = maxLineWidth - leftIndent;
        const fullText = prefix ? `${prefix}${textStr}` : textStr;
        const lines = doc.splitTextToSize(fullText, currentLineWidth);
        const nodeLineHeight = nodeFontSize * lineSpacingMultiplier * ptToMm;

        for (let lIdx = 0; lIdx < lines.length; lIdx++) {
          if (cursorY + nodeLineHeight > pageHeight - margin - 12) {
            doc.addPage();
            cursorY = margin + 10;
          }
          doc.text(lines[lIdx], margin + leftIndent, cursorY);
          cursorY += nodeLineHeight;
        }
      };

      const getNodeText = (node: any): string => {
        if (node.text) return node.text;
        if (node.content) {
          return node.content.map(getNodeText).join("");
        }
        return "";
      };

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.type === "heading") {
          const level = node.attrs?.level || 1;
          const headingFontSize =
            level === 1
              ? Math.round(fontSize * 1.35)
              : Math.round(fontSize * 1.18);
          const headingText = getNodeText(node);

          cursorY += bodyLineHeightMm * 0.3;
          renderTextBlock(headingText, headingFontSize, true, false);
          cursorY += bodyLineHeightMm * 0.3;
        } else if (node.type === "bulletList") {
          const listItems = node.content || [];
          for (let li = 0; li < listItems.length; li++) {
            const itemText = getNodeText(listItems[li]);
            renderTextBlock(itemText, bodyFontSize, false, false, "•  ", 4);
          }
          cursorY += bodyLineHeightMm * 0.2;
        } else if (node.type === "orderedList") {
          const listItems = node.content || [];
          for (let li = 0; li < listItems.length; li++) {
            const itemText = getNodeText(listItems[li]);
            renderTextBlock(itemText, bodyFontSize, false, false, `${li + 1}.  `, 4);
          }
          cursorY += bodyLineHeightMm * 0.2;
        } else if (node.type === "paragraph") {
          const pText = getNodeText(node);
          renderTextBlock(pText, bodyFontSize, false, false);
          cursorY += bodyLineHeightMm * 0.2;
        } else {
          const otherText = getNodeText(node);
          if (otherText.trim()) {
            renderTextBlock(otherText, bodyFontSize, false, false);
            cursorY += bodyLineHeightMm * 0.2;
          }
        }
      }

      // Add Page Numbers in Footer
      const totalPageCount = doc.getNumberOfPages();
      setTotalPages(totalPageCount);

      for (let i = 1; i <= totalPageCount; i++) {
        doc.setPage(i);
        doc.setFont(fontFamily, "normal");
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184); // slate-400

        const footerText = `Page ${i} of ${totalPageCount}`;
        const textWidth = doc.getTextWidth(footerText);
        doc.text(footerText, pageWidth / 2 - textWidth / 2, pageHeight - margin / 2);
      }

      const pdfBlob = doc.output("blob");
      return URL.createObjectURL(pdfBlob);
    } catch (err: any) {
      console.error("PDF generation failed:", err);
      setError(err.message || "Failed to generate PDF.");
      return null;
    }
  }, [editor, title, fontSize, fontFamily, lineSpacingMultiplier, pageOrientation, marginSize]);

  // Generate / update PDF preview
  const handleConvertToPdf = () => {
    if (!editor || !editor.getText().trim()) {
      setError("Document content cannot be empty.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    setTimeout(() => {
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
      const newUrl = generatePdfBlob();
      setPdfBlobUrl(newUrl);
      setIsGenerating(false);
    }, 100);
  };

  // Automatically update PDF preview when editor content or settings change
  useEffect(() => {
    if (editor) {
      const timer = setTimeout(() => {
        const newUrl = generatePdfBlob();
        setPdfBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return newUrl;
        });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [
    contentVersion,
    title,
    fontSize,
    fontFamily,
    lineSpacingMultiplier,
    pageOrientation,
    marginSize,
    generatePdfBlob,
    editor,
  ]);

  const handleDownload = () => {
    if (!pdfBlobUrl) {
      const url = generatePdfBlob();
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.trim() || "document"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const a = document.createElement("a");
    a.href = pdfBlobUrl;
    a.download = `${title.trim() || "document"}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyText = () => {
    if (!editor) return;
    navigator.clipboard.writeText(editor.getText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setTitle("My Document");
    setFileName(null);
    setFileSize(null);
    setError(null);
    if (editor) {
      editor.commands.clearContent();
    }
    if (pdfBlobUrl) {
      URL.revokeObjectURL(pdfBlobUrl);
      setPdfBlobUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const currentText = editor ? editor.getText() : "";
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;
  const charCount = currentText.length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Word to PDF Converter</h2>
        <p className="text-sm text-slate-500 mt-1">
          Convert Word documents (.docx, .doc) or rich text into beautifully formatted PDF files with real-time live preview.
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Bar */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col sm:flex-row items-center justify-center gap-3 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.doc,.txt,.rtf,.odt,.md"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
          />
          <div className="p-3 bg-white rounded-full shadow-xs text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="text-center sm:left">
            <p className="text-sm font-semibold text-slate-700">
              {isReadingFile ? "Extracting Word Document..." : "Import Word (.docx / .doc) or Text file"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Extracts text and automatically formats into PDF
            </p>
          </div>
        </div>

        {/* File Active Header if uploaded */}
        {fileName && (
          <div className="flex items-center justify-between p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600/10 text-primary-theme rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-xs sm:text-sm truncate max-w-xs">{fileName}</h4>
                {fileSize && (
                  <p className="text-[11px] text-slate-500">{(fileSize / 1024).toFixed(1)} KB • Word File Loaded</p>
                )}
              </div>
            </div>
            <button
              onClick={resetAll}
              className="text-xs font-semibold text-red-500 hover:underline px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* Settings Panel */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-primary-theme" />
              PDF Layout & Font Styling
            </span>
            <span className="text-xs text-slate-500 font-medium">{totalPages} Page{totalPages > 1 ? "s" : ""}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-theme outline-none"
              />
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-primary-theme outline-none cursor-pointer"
              >
                <option value="helvetica">Helvetica (Clean Sans)</option>
                <option value="times">Times (Classic Serif)</option>
                <option value="courier">Courier (Monospace)</option>
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Orientation
              </label>
              <select
                value={pageOrientation}
                onChange={(e) => setPageOrientation(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-primary-theme outline-none cursor-pointer"
              >
                <option value="portrait">Portrait (A4)</option>
                <option value="landscape">Landscape (A4)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Font Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-primary-theme" /> Font Size
                </span>
                <span className="font-bold text-primary-theme bg-white px-2 py-0.5 border border-slate-200 rounded text-[11px]">
                  {fontSize} pt
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="20"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>8pt</span>
                <span>12pt (Standard)</span>
                <span>20pt</span>
              </div>
            </div>

            {/* Line Spacing */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Line Spacing
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "1.15x", val: 1.2 },
                  { label: "1.5x", val: 1.5 },
                  { label: "2.0x", val: 2.0 },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setLineSpacingMultiplier(s.val)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      lineSpacingMultiplier === s.val
                        ? "bg-primary-theme text-white border-primary-theme"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Margins */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Margins
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: "Compact", val: 12 },
                  { label: "Normal", val: 20 },
                  { label: "Wide", val: 28 },
                ].map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMarginSize(m.val)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                      marginSize === m.val
                        ? "bg-primary-theme text-white border-primary-theme"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Split Interface: TipTap Editor on Left / Live PDF Box on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[80vh]">
          {/* Left: Word Document Content Editor with TipTap and BubbleMenu */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white relative flex flex-col h-full">
            {/* Floating TipTap Popover / BubbleMenu when text is selected */}
            {editor && (
              <BubbleMenu
                editor={editor}
                className="flex items-center gap-1 p-1 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700/60 z-50 backdrop-blur-md animate-in fade-in zoom-in-95"
              >
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("bold") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                  }`}
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={setLink}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("link") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                  }`}
                  title="Insert Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("italic") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                  }`}
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("strike") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                  }`}
                  title="Strikethrough"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("code") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                  }`}
                  title="Code"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-primary-theme text-white font-bold"
                      : "text-slate-200"
                  }`}
                  title="Heading 1"
                >
                  <Heading1 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-primary-theme text-white font-bold"
                      : "text-slate-200"
                  }`}
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${
                    editor.isActive("bulletList")
                      ? "bg-primary-theme text-white font-bold"
                      : "text-slate-200"
                  }`}
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                  className="p-1.5 rounded-lg hover:bg-slate-800 transition text-slate-300"
                  title="Clear Formatting"
                >
                  <RemoveFormatting className="w-3.5 h-3.5" />
                </button>
              </BubbleMenu>
            )}

            {/* TipTap Editor Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <span className="inline-flex items-center gap-1 bg-primary-theme text-white px-2 py-0.5 rounded font-bold text-[11px]">
                  <FileCode className="w-3 h-3" />
                  Rich Editor
                </span>
                <span className="text-slate-500">{wordCount} words</span>
                <span>•</span>
                <span className="text-slate-500">{charCount} chars</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleBold().run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("bold") ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setLink(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("link") ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Insert Link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleItalic().run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("italic") ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleHeading({ level: 1 }).run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("heading", { level: 1 }) ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Heading 1"
                >
                  <Heading1 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleHeading({ level: 2 }).run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("heading", { level: 2 }) ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Heading 2"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleBulletList().run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("bulletList") ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); editor?.chain().focus().toggleOrderedList().run(); }}
                  className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${
                    editor?.isActive("orderedList") ? "bg-slate-300 text-primary-theme font-bold" : ""
                  }`}
                  title="Numbered List"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-slate-300 mx-1" />

                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); handleCopyText(); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold transition cursor-pointer shadow-xs text-[11px]"
                  title="Copy Text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>


            {/* TipTap Document Area */}
            <div className="p-3 md:p-4 bg-slate-50/50 flex-1 flex flex-col overflow-hidden">
              <div className="bg-white border border-slate-200 rounded-xl shadow-2xs flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-100 bg-slate-50/40 text-[11px] text-slate-400">
                  <span>Document Editor</span>
                  <span className="text-primary-theme font-medium bg-blue-50 px-2 py-0.5 rounded">
                    Highlight text for Bubble Menu
                  </span>
                </div>
                <EditorContent editor={editor} className="flex-1 cursor-text overflow-y-auto" />
              </div>
            </div>
          </div>

          {/* Right: PDF Preview Box */}
          <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs h-full">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 font-bold text-emerald-700">
                <Eye className="w-4 h-4 text-emerald-600" />
                PDF Live Preview Box
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleConvertToPdf}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] font-semibold transition cursor-pointer"
                  title="Refresh PDF"
                >
                  <RefreshCw className={`w-3 h-3 ${isGenerating ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                {pdfBlobUrl && (
                  <a
                    href={pdfBlobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] font-semibold transition"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* PDF Box Viewer Container */}
            <div className="p-3 flex-1 flex flex-col bg-slate-100/60 overflow-hidden">
              {isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-500 bg-white rounded-xl border border-slate-200 h-full">
                  <div className="w-8 h-8 border-3 border-primary-theme border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-semibold text-slate-600">Rendering PDF with {fontSize}pt typography...</p>
                </div>
              ) : pdfBlobUrl ? (
                <div className="flex-1 w-full h-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                  <iframe
                    src={`${pdfBlobUrl}#toolbar=0&navpanes=0`}
                    title="PDF Live Preview"
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 h-full">
                  <FileText className="w-10 h-10 text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-600">PDF Box Ready</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter text or upload a Word document to view the rendered PDF.
                  </p>
                  <button
                    onClick={handleConvertToPdf}
                    className="mt-4 px-4 py-2 bg-primary-theme text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs hover:opacity-90"
                  >
                    Generate Preview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleDownload}
            disabled={!currentText.trim() || isGenerating}
            className="flex-1 py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Download Formatted PDF ({totalPages} page{totalPages > 1 ? "s" : ""})</span>
          </button>

          <button
            onClick={resetAll}
            className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
