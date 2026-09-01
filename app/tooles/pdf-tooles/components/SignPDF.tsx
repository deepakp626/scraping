"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PDFDocument } from "pdf-lib";
import {
  UploadCloud,
  FileSignature,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  PenTool,
  Type,
  ImageIcon,
  Sparkles,
  Sliders,
  Eye,
  Lock,
  ArrowRight,
  ShieldAlert,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Move,
  Maximize2,
  Info,
} from "lucide-react";

// Dynamically import SignatureCanvas with ssr: false for Next.js
const SignatureCanvas = dynamic(() => import("react-signature-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-44 bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
      Loading signature pad...
    </div>
  ),
}) as any;

type SignatureMode = "draw" | "type" | "upload";
type PositionPreset =
  | "custom"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "center";

export default function SignPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [targetPage, setTargetPage] = useState<number>(1);
  const [signatureMode, setSignatureMode] = useState<SignatureMode>("draw");

  // Draw Mode States
  const [penColor, setPenColor] = useState<string>("#0f172a");
  const [penWidth, setPenWidth] = useState<number>(2.5);

  // Type Mode States
  const [typedName, setTypedName] = useState<string>("");
  const [typedFont, setTypedFont] = useState<"cursive" | "serif" | "script">("cursive");

  // Upload Mode States
  const [uploadedSigUrl, setUploadedSigUrl] = useState<string | null>(null);

  // Free Drag-and-Drop Coordinates (Percentage 0 to 100 relative to sheet)
  const [sigPosition, setSigPosition] = useState<{ xPercent: number; yPercent: number }>({
    xPercent: 62,
    yPercent: 78,
  });
  const [positionPreset, setPositionPreset] = useState<PositionPreset>("bottom-right");
  const [sigScale, setSigScale] = useState<number>(1); // Scale multiplier: 0.7x to 1.5x
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Page Simulation Thumbnails
  const [pageThumbnails, setPageThumbnails] = useState<Record<number, string>>({});
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState<boolean>(false);

  // Status & URLs
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [signedBlobUrl, setSignedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);

  const sigCanvasRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sigFileInputRef = useRef<HTMLInputElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startXPercent: number; startYPercent: number }>({
    mouseX: 0,
    mouseY: 0,
    startXPercent: 62,
    startYPercent: 78,
  });

  // Generate thumbnail for the selected target page using pdfjs-dist
  const generatePageThumbnail = async (arrayBuffer: ArrayBuffer, pageNum: number) => {
    try {
      setIsLoadingThumbnail(true);
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
      const pdfDoc = await loadingTask.promise;
      const validPage = Math.min(Math.max(1, pageNum), pdfDoc.numPages);
      const page = await pdfDoc.getPage(validPage);
      const viewport = page.getViewport({ scale: 0.75 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport } as any).promise;
        const thumbUrl = canvas.toDataURL("image/jpeg", 0.85);
        setPageThumbnails((prev) => ({ ...prev, [validPage]: thumbUrl }));
      }
    } catch (err) {
      console.warn("PDF.js thumbnail extraction fallback", err);
    } finally {
      setIsLoadingThumbnail(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      setIsPasswordProtected(false);
      return;
    }

    try {
      setError(null);
      setIsPasswordProtected(false);
      if (signedBlobUrl) URL.revokeObjectURL(signedBlobUrl);
      setSignedBlobUrl(null);
      setPageThumbnails({});

      const arrayBuffer = await uploadedFile.arrayBuffer();
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } catch (loadErr: any) {
        const errMsg = loadErr?.message?.toLowerCase() || "";
        if (
          errMsg.includes("encrypt") ||
          errMsg.includes("password") ||
          loadErr?.name === "EncryptedPDFError"
        ) {
          setIsPasswordProtected(true);
          setFile(uploadedFile);
          setError("This PDF is encrypted with password protection. Please unlock it before signing.");
          return;
        }
        throw loadErr;
      }

      const count = pdfDoc.getPageCount();
      setFile(uploadedFile);
      setTotalPages(count);
      setTargetPage(count); // Default to signing the last page

      generatePageThumbnail(arrayBuffer, count);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load PDF. The file may be damaged or invalid.");
    }
  };

  // Change target page and generate its thumbnail if needed
  const handlePageChange = async (newPage: number) => {
    setTargetPage(newPage);
    if (signedBlobUrl) {
      URL.revokeObjectURL(signedBlobUrl);
      setSignedBlobUrl(null);
    }
    if (file && !pageThumbnails[newPage]) {
      const buffer = await file.arrayBuffer();
      generatePageThumbnail(buffer, newPage);
    }
  };

  // Preset location handler
  const handleApplyPreset = (preset: PositionPreset) => {
    setPositionPreset(preset);
    if (signedBlobUrl) {
      URL.revokeObjectURL(signedBlobUrl);
      setSignedBlobUrl(null);
    }

    switch (preset) {
      case "bottom-right":
        setSigPosition({ xPercent: 62, yPercent: 78 });
        break;
      case "bottom-left":
        setSigPosition({ xPercent: 8, yPercent: 78 });
        break;
      case "bottom-center":
        setSigPosition({ xPercent: 35, yPercent: 78 });
        break;
      case "top-right":
        setSigPosition({ xPercent: 62, yPercent: 8 });
        break;
      case "top-left":
        setSigPosition({ xPercent: 8, yPercent: 8 });
        break;
      case "center":
        setSigPosition({ xPercent: 35, yPercent: 45 });
        break;
      default:
        break;
    }
  };

  // Handle direct click on PDF preview sheet to relocate signature
  const handleSheetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sheetRef.current || isDragging) return;
    const rect = sheetRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Center the signature at clicked point
    const xPct = Math.max(2, Math.min(78, (clickX / rect.width) * 100 - 15));
    const yPct = Math.max(2, Math.min(85, (clickY / rect.height) * 100 - 8));

    setSigPosition({ xPercent: Math.round(xPct), yPercent: Math.round(yPct) });
    setPositionPreset("custom");

    if (signedBlobUrl) {
      URL.revokeObjectURL(signedBlobUrl);
      setSignedBlobUrl(null);
    }
  };

  // Mouse & Touch Dragging Handlers for arbitrary signature placement
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startXPercent: sigPosition.xPercent,
      startYPercent: sigPosition.yPercent,
    };
  };

  const onDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !sheetRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = sheetRef.current.getBoundingClientRect();

      const deltaX = clientX - dragStartRef.current.mouseX;
      const deltaY = clientY - dragStartRef.current.mouseY;

      const deltaXPct = (deltaX / rect.width) * 100;
      const deltaYPct = (deltaY / rect.height) * 100;

      const newXPct = Math.max(0, Math.min(80, dragStartRef.current.startXPercent + deltaXPct));
      const newYPct = Math.max(0, Math.min(88, dragStartRef.current.startYPercent + deltaYPct));

      setSigPosition({ xPercent: Math.round(newXPct), yPercent: Math.round(newYPct) });
      setPositionPreset("custom");
    },
    [isDragging]
  );

  const stopDrag = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (signedBlobUrl) {
        URL.revokeObjectURL(signedBlobUrl);
        setSignedBlobUrl(null);
      }
    }
  }, [isDragging, signedBlobUrl]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchmove", onDrag);
      window.addEventListener("touchend", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [isDragging, onDrag, stopDrag]);

  // Handle uploaded image signature
  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedSig = e.target.files?.[0];
    if (!uploadedSig) return;

    if (!uploadedSig.type.startsWith("image/")) {
      setError("Please upload a valid image file (PNG, JPG, or WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedSigUrl(event.target?.result as string);
    };
    reader.readAsDataURL(uploadedSig);
  };

  const clearDrawCanvas = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  };

  /**
   * Helper: Generate a high-resolution PNG data URL from typed text
   */
  const generateTypedSignatureDataUrl = (text: string): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = penColor;

    let fontName = "cursive, 'Brush Script MT', 'Segoe Script'";
    if (typedFont === "serif") fontName = "italic serif, 'Times New Roman', Georgia";
    if (typedFont === "script") fontName = "'Great Vibes', 'Dancing Script', cursive";

    ctx.font = `italic 42px ${fontName}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text.trim() || "Signature", canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
  };

  /**
   * Returns current active signature as PNG data URL
   */
  const getActiveSignatureDataUrl = (): string | null => {
    if (signatureMode === "draw") {
      if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
        return null;
      }
      return sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
    }

    if (signatureMode === "type") {
      if (!typedName.trim()) return null;
      return generateTypedSignatureDataUrl(typedName);
    }

    if (signatureMode === "upload") {
      return uploadedSigUrl;
    }

    return null;
  };

  /**
   * Main PDF Stamping with accurate coordinate calculations
   */
  const handleSignPDF = async () => {
    if (!file) return;

    const signatureDataUrl = getActiveSignatureDataUrl();
    if (!signatureDataUrl) {
      setError("Please provide a signature (draw, type, or upload) before signing.");
      return;
    }

    try {
      setIsSigning(true);
      setError(null);

      const signatureImageBytes = await fetch(signatureDataUrl).then((res) => res.arrayBuffer());

      const arrayBuffer = await file.arrayBuffer();
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } catch (loadErr: any) {
        setIsPasswordProtected(true);
        throw new Error("This PDF is password-protected and cannot be signed without unlocking.");
      }

      const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

      const pages = pdfDoc.getPages();
      const pageIndex = Math.min(Math.max(1, targetPage), pages.length) - 1;
      const page = pages[pageIndex];

      const { width: pageWidth, height: pageHeight } = page.getSize();
      const sigWidth = 140 * sigScale;
      const sigHeight = 60 * sigScale;

      // Convert Screen Percent Coordinates to PDF Coordinate Space (where 0,0 is bottom-left)
      const xPos = (sigPosition.xPercent / 100) * pageWidth;
      // Invert Y axis: PDF Y starts from bottom
      const yPos = pageHeight - ((sigPosition.yPercent / 100) * pageHeight + sigHeight);

      // Clamp coordinates so signature never clips out of the page bounds
      const clampedX = Math.max(10, Math.min(pageWidth - sigWidth - 10, xPos));
      const clampedY = Math.max(10, Math.min(pageHeight - sigHeight - 10, yPos));

      page.drawImage(signatureImage, {
        x: clampedX,
        y: clampedY,
        width: sigWidth,
        height: sigHeight,
      });

      const signedBytes = await pdfDoc.save();
      const blob = new Blob([signedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setSignedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign PDF document.");
    } finally {
      setIsSigning(false);
    }
  };

  const handleDownload = () => {
    if (!signedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = signedBlobUrl;
    a.download = `signed_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (signedBlobUrl) URL.revokeObjectURL(signedBlobUrl);
    setFile(null);
    setTotalPages(0);
    setTargetPage(1);
    setSignedBlobUrl(null);
    setPageThumbnails({});
    setUploadedSigUrl(null);
    setTypedName("");
    setSigPosition({ xPercent: 62, yPercent: 78 });
    setPositionPreset("bottom-right");
    setError(null);
    setIsPasswordProtected(false);
    clearDrawCanvas();
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (sigFileInputRef.current) sigFileInputRef.current.value = "";
  };

  const colorOptions = [
    { label: "Dark Slate", hex: "#0f172a" },
    { label: "Royal Blue", hex: "#1d4ed8" },
    { label: "Classic Black", hex: "#000000" },
    { label: "Crimson", hex: "#b91c1c" },
    { label: "Emerald", hex: "#047857" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-theme/10 text-primary-theme text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Digital Document Signing
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Sign PDF Document in Any Location
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Draw, type, or upload your signature and freely drag & drop it anywhere onto any page of your PDF with live visual simulation.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all bg-slate-50 hover:bg-slate-50/70 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 md:p-5 bg-white rounded-2xl shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-9 h-9 md:w-10 md:h-10" />
          </div>
          <p className="mt-4 text-base md:text-lg font-bold text-slate-800">
            Click to upload or drag & drop a PDF
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Sign anywhere on any page • Drag-and-drop placement
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Password-Protected Security Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with password encryption. Please unlock the file before signing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/tooles/pdf-tooles/unlock-pdf"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-primary-theme/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Unlock PDF First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-xs md:text-sm transition cursor-pointer"
            >
              Upload Another PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* File Information Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-primary-theme/10 text-primary-theme rounded-xl shrink-0">
                <FileText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-xs md:max-w-md">
                  {file.name}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                  <span className="font-semibold text-slate-700">{totalPages}</span> {totalPages === 1 ? "page" : "pages"} • {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors"
            >
              Change File
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Signature Creation & Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Signature Mode Switcher Tabs */}
              <div className="p-1 bg-slate-100/80 border border-slate-200 rounded-2xl grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setSignatureMode("draw")}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    signatureMode === "draw"
                      ? "bg-white text-slate-800 shadow-xs"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <PenTool className="w-4 h-4 text-primary-theme" />
                  <span>Draw</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode("type")}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    signatureMode === "type"
                      ? "bg-white text-slate-800 shadow-xs"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Type className="w-4 h-4 text-primary-theme" />
                  <span>Type</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode("upload")}
                  className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    signatureMode === "upload"
                      ? "bg-white text-slate-800 shadow-xs"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-primary-theme" />
                  <span>Upload</span>
                </button>
              </div>

              {/* Mode 1: Draw Signature with react-signature-canvas */}
              {signatureMode === "draw" && (
                <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-primary-theme" />
                      Draw Your Signature
                    </label>
                    <button
                      type="button"
                      onClick={clearDrawCanvas}
                      className="text-xs font-semibold text-red-500 hover:text-red-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>

                  {/* Canvas Container */}
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-white shadow-xs relative touch-none">
                    <SignatureCanvas
                      ref={sigCanvasRef}
                      penColor={penColor}
                      minWidth={penWidth}
                      maxWidth={penWidth + 1}
                      canvasProps={{
                        className: "w-full h-44 bg-white cursor-crosshair",
                        style: { width: "100%", height: "180px" },
                      }}
                    />
                    <span className="absolute bottom-2.5 right-3 text-[11px] text-slate-400 pointer-events-none select-none">
                      Sign inside the box
                    </span>
                    <div className="absolute left-6 right-6 bottom-8 border-b border-slate-200 border-dashed pointer-events-none" />
                  </div>

                  {/* Pen Controls: Color & Stroke Width */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Ink:</span>
                      {colorOptions.map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => setPenColor(c.hex)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            penColor === c.hex
                              ? "scale-115 border-primary-theme ring-2 ring-primary-theme/30"
                              : "border-white hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.label}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Width:</span>
                      <button
                        type="button"
                        onClick={() => setPenWidth(1.5)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          penWidth === 1.5
                            ? "bg-primary-theme text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Fine
                      </button>
                      <button
                        type="button"
                        onClick={() => setPenWidth(2.5)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          penWidth === 2.5
                            ? "bg-primary-theme text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        onClick={() => setPenWidth(4.0)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          penWidth === 4.0
                            ? "bg-primary-theme text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Bold
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Type Signature */}
              {signatureMode === "type" && (
                <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary-theme" />
                    Type Your Name
                  </label>

                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    placeholder="Enter your full name or initials..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs"
                  />

                  {/* Font Styling Options */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-600 block">Select Signature Font:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTypedFont("cursive")}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          typedFont === "cursive"
                            ? "border-primary-theme bg-primary-theme/5 text-slate-900 ring-1 ring-primary-theme"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="font-serif italic text-lg block truncate">
                          {typedName || "Cursive"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans block mt-1">Cursive Script</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTypedFont("serif")}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          typedFont === "serif"
                            ? "border-primary-theme bg-primary-theme/5 text-slate-900 ring-1 ring-primary-theme"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="font-serif italic font-bold text-lg block truncate">
                          {typedName || "Formal"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans block mt-1">Formal Serif</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTypedFont("script")}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          typedFont === "script"
                            ? "border-primary-theme bg-primary-theme/5 text-slate-900 ring-1 ring-primary-theme"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <span className="font-mono italic text-lg block truncate">
                          {typedName || "Modern"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans block mt-1">Modern Script</span>
                      </button>
                    </div>
                  </div>

                  {/* Ink color for typed signature */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-slate-600">Ink:</span>
                    {colorOptions.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setPenColor(c.hex)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          penColor === c.hex
                            ? "scale-115 border-primary-theme ring-2 ring-primary-theme/30"
                            : "border-white hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mode 3: Upload Image Signature */}
              {signatureMode === "upload" && (
                <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary-theme" />
                    Upload Signature Image
                  </label>

                  <input
                    ref={sigFileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={handleSignatureUpload}
                  />

                  {!uploadedSigUrl ? (
                    <div
                      onClick={() => sigFileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white flex flex-col items-center justify-center group"
                    >
                      <div className="p-3 bg-primary-theme/10 text-primary-theme rounded-xl group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <p className="mt-3 text-xs md:text-sm font-bold text-slate-800">
                        Click to upload signature image
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        PNG with transparent background recommended
                      </p>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-2xl p-4 bg-white flex items-center justify-between gap-4">
                      <div className="relative w-36 h-16 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
                        <Image
                          src={uploadedSigUrl}
                          alt="Signature Preview"
                          fill
                          sizes="150px"
                          className="object-contain p-1"
                          unoptimized
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedSigUrl(null);
                          if (sigFileInputRef.current) sigFileInputRef.current.value = "";
                        }}
                        className="text-xs font-semibold text-red-500 hover:underline px-2 py-1 cursor-pointer"
                      >
                        Remove & Re-upload
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Target Page & Location Controls */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary-theme" />
                  Target Page & Placement Options
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Target Page Selector */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Sign On Page
                    </span>
                    <select
                      value={targetPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs cursor-pointer"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <option key={p} value={p}>
                          Page {p} {p === totalPages ? "(Last Page - Recommended)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stamp Size Scale */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <span>Signature Size</span>
                      <span className="text-primary-theme font-bold">{Math.round(sigScale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.7"
                      max="1.5"
                      step="0.05"
                      value={sigScale}
                      onChange={(e) => setSigScale(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme mt-3"
                    />
                  </div>
                </div>

                {/* Preset Quick Positioning Buttons */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Quick Location Presets:
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Or drag the signature directly on the preview
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("top-left")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "top-left"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                      Top Left
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("top-right")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "top-right"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                      Top Right
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("center")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "center"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                      Center
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("bottom-left")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "bottom-left"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                      Bot Left
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("bottom-center")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "bottom-center"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                      Bot Center
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset("bottom-right")}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                        positionPreset === "bottom-right"
                          ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                      Bot Right
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Draggable PDF Page Simulator */}
            <div className="lg:col-span-5 border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary-theme" />
                    Interactive PDF Placement
                  </h5>
                  <span className="text-[11px] font-bold text-primary-theme bg-primary-theme/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Move className="w-3 h-3" />
                    Drag Anywhere
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Click or drag the signature box anywhere on Page {targetPage}
                </p>
              </div>

              {/* Interactive Simulated Sheet */}
              <div className="py-2 flex flex-col items-center justify-center">
                <div
                  ref={sheetRef}
                  onClick={handleSheetClick}
                  className="relative w-52 h-72 md:w-60 md:h-84 bg-white border-2 border-slate-300 rounded-xl shadow-lg p-3 overflow-hidden select-none cursor-crosshair group/sheet"
                  title="Click anywhere on this page to place signature"
                >
                  {/* Background thumbnail */}
                  {pageThumbnails[targetPage] ? (
                    <Image
                      src={pageThumbnails[targetPage]}
                      alt="PDF Page Preview"
                      fill
                      sizes="(max-width: 768px) 60vw, 30vw"
                      className="object-contain p-2 opacity-35 pointer-events-none"
                      unoptimized
                    />
                  ) : (
                    <div className="space-y-2 opacity-20 my-auto pointer-events-none">
                      <div className="w-full h-1.5 bg-slate-300 rounded" />
                      <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
                      <div className="w-full h-1.5 bg-slate-300 rounded" />
                      <div className="w-3/4 h-1.5 bg-slate-300 rounded" />
                      <div className="w-5/6 h-1.5 bg-slate-300 rounded" />
                    </div>
                  )}

                  {/* Freely Draggable Signature Badge */}
                  <div
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                    className="absolute z-20 touch-none cursor-grab active:cursor-grabbing transition-transform"
                    style={{
                      left: `${sigPosition.xPercent}%`,
                      top: `${sigPosition.yPercent}%`,
                    }}
                  >
                    <div
                      className="p-1.5 rounded-lg bg-white/95 border-2 border-primary-theme shadow-md flex items-center justify-center gap-1 group ring-2 ring-primary-theme/20 select-none animate-in fade-in"
                      style={{
                        transform: `scale(${Math.min(1.25, sigScale)})`,
                        transformOrigin: "top left",
                      }}
                    >
                      {signatureMode === "type" && typedName ? (
                        <span
                          className="font-serif italic text-xs font-bold truncate max-w-[100px] px-1"
                          style={{ color: penColor }}
                        >
                          {typedName}
                        </span>
                      ) : signatureMode === "upload" && uploadedSigUrl ? (
                        <div className="relative w-14 h-6">
                          <Image
                            src={uploadedSigUrl}
                            alt="Signature"
                            fill
                            sizes="70px"
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-primary-theme flex items-center gap-1 px-1">
                          <FileSignature className="w-3.5 h-3.5" />
                          <span>[Sign Here]</span>
                        </span>
                      )}

                      <div className="p-0.5 rounded bg-primary-theme text-white text-[9px] shadow-xs">
                        <Move className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Helper crosshair indicator on hover */}
                  <div className="absolute inset-0 border border-primary-theme/0 group-hover/sheet:border-primary-theme/30 pointer-events-none transition-colors" />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
                    Page {targetPage} • Pos: X {sigPosition.xPercent}%, Y {sigPosition.yPercent}%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-[11px] text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Free Placement:</strong> Drag the signature directly on the sheet above, or click on any line/box on the page to stamp it there.
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button & Signed Download Results */}
          {!signedBlobUrl ? (
            <button
              onClick={handleSignPDF}
              disabled={isSigning}
              className="w-full py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isSigning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Applying Signature & Encoding PDF...</span>
                </>
              ) : (
                <>
                  <FileSignature className="w-5 h-5" />
                  <span>Sign & Save PDF Document</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-base md:text-lg">PDF Document Signed Successfully!</h5>
                  <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                    Your digital signature has been permanently embedded at (X: {sigPosition.xPercent}%, Y: {sigPosition.yPercent}%) on Page {targetPage}.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Signed PDF</span>
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm md:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Sign Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
