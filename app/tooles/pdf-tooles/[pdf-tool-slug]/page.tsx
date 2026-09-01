import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    "pdf-tool-slug": string;
  }>;
}

interface ToolConfig {
  title: string;
  subtitle: string;
  category?: string;
  component: React.ComponentType<any>;
}

const componentsMap: Record<string, ToolConfig> = {
  "merge-pdf": {
    title: "Merge PDF",
    subtitle: "Combine multiple PDF files into a single, organized document.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/MergePDF")),
  },
  "split-pdf": {
    title: "Split PDF",
    subtitle: "Split a PDF into separate files by page ranges or extract all pages.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/SplitPDF")),
  },
  "compress-pdf": {
    title: "Compress PDF",
    subtitle: "Reduce PDF file size while maintaining the highest visual quality.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/CompressPDF")),
  },
  "pdf-to-word": {
    title: "PDF to Word",
    subtitle: "Convert PDF documents into editable Microsoft Word (.doc) format.",
    category: "PDF Converter",
    component: dynamic(() => import("../components/PdfToWord")),
  },
  "word-to-pdf": {
    title: "Word to PDF",
    subtitle: "Convert Microsoft Word documents and text to standard PDF format.",
    category: "PDF Converter",
    component: dynamic(() => import("../components/WordToPdf")),
  },
  "pdf-to-image": {
    title: "PDF to Image",
    subtitle: "Extract and convert PDF pages into high-resolution PNG or JPG images.",
    category: "PDF Converter",
    component: dynamic(() => import("../components/PdfToImage")),
  },
  "image-to-pdf": {
    title: "Image to PDF",
    subtitle: "Convert and compile JPG, PNG, and WebP images into a single PDF document.",
    category: "PDF Converter",
    component: dynamic(() => import("../components/ImageToPdf")),
  },
  "unlock-pdf": {
    title: "Unlock PDF",
    subtitle: "Remove passwords, permissions, and encryption restrictions from PDF files.",
    category: "PDF Security",
    component: dynamic(() => import("../components/UnlockPDF")),
  },
  "lock-pdf": {
    title: "Lock PDF",
    subtitle: "Encrypt and protect PDF documents with robust password security.",
    category: "PDF Security",
    component: dynamic(() => import("../components/LockPDF")),
  },
  "rotate-pdf": {
    title: "Rotate PDF",
    subtitle: "Rotate PDF pages clockwise by 90°, 180°, or 270°.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/RotatePDF")),
  },
  "rotate-left": {
    title: "Rotate PDF Left",
    subtitle: "Rotate PDF pages 90° counter-clockwise in one click.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/RotateLeft")),
  },
  "add-watermark": {
    title: "Add Watermark to PDF",
    subtitle: "Stamp customized text watermarks with opacity and rotation controls.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/AddWatermark")),
  },
  "remove-pages": {
    title: "Remove PDF Pages",
    subtitle: "Delete unwanted pages or specific page ranges from your PDF.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/RemovePages")),
  },
  "extract-pages": {
    title: "Extract PDF Pages",
    subtitle: "Select and extract specific page numbers into a standalone PDF.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/ExtractPages")),
  },
  "page-numbers": {
    title: "Add Page Numbers to PDF",
    subtitle: "Insert customizable header or footer page numbers across your PDF.",
    category: "PDF Utility",
    component: dynamic(() => import("../components/PageNumbers")),
  },
  "ocr-pdf": {
    title: "OCR PDF & Text Extraction",
    subtitle: "Extract characters, readable text, and structured data from your PDF.",
    category: "PDF Intelligence",
    component: dynamic(() => import("../components/OcrPDF")),
  },
  "sign-pdf": {
    title: "Sign PDF Document",
    subtitle: "Draw your digital signature and stamp it directly onto your PDF pages.",
    category: "PDF Security",
    component: dynamic(() => import("../components/SignPDF")),
  },
  // "protect-pdf": {
  //   title: "Protect PDF & Metadata",
  //   subtitle: "Apply document integrity seals, author metadata, and restriction policies.",
  //   category: "PDF Security",
  //   component: dynamic(() => import("../components/ProtectPDF")),
  // },
  "pdf-to-html": {
    title: "PDF to HTML",
    subtitle: "Convert PDF documents into clean, responsive HTML web pages.",
    category: "PDF Converter",
    component: dynamic(() => import("../components/PdfToHtml")),
  },
  "search-pdf": {
    title: "Search in PDF",
    subtitle: "Instantly find keywords, phrases, numbers, and references in PDF files.",
    category: "PDF Intelligence",
    component: dynamic(() => import("../components/SearchPDF")),
  },
  "extract-images-from-pdf": {
    title: "Extract Images from PDF",
    subtitle: "Extract images from PDF files",
    category: "PDF Intelligence",
    component: dynamic(() => import("../components/ExtractImagesFromPDF")),
  },
};

export default async function PdfToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams["pdf-tool-slug"];
  const tool = componentsMap[slug];

  if (!tool) {
    return (
      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">404 - Tool Not Found</h1>
          <p className="text-slate-600">
            The PDF tool you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/tooles/pdf-tooles"
            className="inline-block bg-primary-theme hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl transition-all"
          >
            Back to PDF Tools
          </Link>
        </div>
      </section>
    );
  }

  const DynamicComponent = tool.component;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-12 md:py-16 px-4 md:px-6 pt-6">
      <div className="mx-auto max-w-7xl bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-sm relative mt-12">
        {/* Back navigation */}
        <Link
          href="/tooles/pdf-tooles"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-theme font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all PDF tools
        </Link>

        {/* Header section */}
        {/* <div className="space-y-3 mb-8">
          <div className="inline-flex rounded-full bg-primary-theme/10 px-4 py-1.5 text-xs font-bold text-primary-theme uppercase tracking-wider">
            {tool.category || "PDF Tool"}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            {tool.title}
          </h1>
          <p className="text-base text-slate-500">
            {tool.subtitle}
          </p>
        </div> */}

        {/* Dynamic Tool Component */}
        <div>
          <DynamicComponent />
        </div>
      </div>
    </section>
  );
}
