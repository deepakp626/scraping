import React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const componentsMap: Record<string, { title: string; subtitle: string; component: any }> = {
  "excel-to-pdf": {
    title: "Excel to PDF Converter",
    subtitle: "Convert Excel worksheets (.xlsx, .xls) to PDF documents instantly.",
    component: dynamic(() => import("../components/ExcelToPDF")),
  },
  "csv-to-excel": {
    title: "CSV to Excel Converter",
    subtitle: "Convert CSV comma-separated data to Excel worksheets.",
    component: dynamic(() => import("../components/CSVToExcel")),
  },
  "split-excel": {
    title: "Split Excel Sheets",
    subtitle: "Split multi-sheet or large Excel spreadsheets into separate Excel files.",
    component: dynamic(() => import("../components/SplitExcel")),
  },
  "xml-to-excel": {
    title: "XML to Excel Converter",
    subtitle: "Convert structured XML data files to Excel spreadsheets.",
    component: dynamic(() => import("../components/XMLToExcel")),
  },
  "split-csv": {
    title: "Split CSV Files",
    subtitle: "Split large CSV data files into multiple smaller CSV files.",
    component: dynamic(() => import("../components/SplitCSV")),
  },
  "excel-to-csv": {
    title: "Excel to CSV Converter",
    subtitle: "Convert Excel spreadsheets (.xlsx, .xls) to comma-separated values.",
    component: dynamic(() => import("../components/ExcelToCSV")),
  },
  "xml-to-csv": {
    title: "XML to CSV Converter",
    subtitle: "Convert XML data files to comma-separated text values.",
    component: dynamic(() => import("../components/XMLToCSV")),
  },
  "csv-to-json": {
    title: "CSV to JSON Converter",
    subtitle: "Convert CSV values to JSON array of objects.",
    component: dynamic(() => import("../components/CSVToJSON")),
  },
  "excel-to-xml": {
    title: "Excel to XML Converter",
    subtitle: "Convert Excel spreadsheets into structured XML nodes.",
    component: dynamic(() => import("../components/ExcelToXML")),
  },
  "json-to-xml": {
    title: "JSON to XML Converter",
    subtitle: "Convert structured JSON files to XML files.",
    component: dynamic(() => import("../components/JSONToXML")),
  },
  "json-to-csv": {
    title: "JSON to CSV Converter",
    subtitle: "Convert JSON array files to comma-separated text values.",
    component: dynamic(() => import("../components/JSONToCSV")),
  },
  "json-to-excel": {
    title: "JSON to Excel Converter",
    subtitle: "Convert JSON structured values to Excel spreadsheets.",
    component: dynamic(() => import("../components/JSONToExcel")),
  },
  "epub-to-mobi": {
    title: "EPUB to MOBI Converter",
    subtitle: "Convert open EPUB eBook files to Amazon Kindle MOBI format.",
    component: dynamic(() => import("../components/EPUBToMOBI")),
  },
  "epub-to-azw3": {
    title: "EPUB to AZW3 Converter",
    subtitle: "Convert open EPUB eBook files to Amazon Kindle AZW3 format.",
    component: dynamic(() => import("../components/EPUBToAZW3")),
  },
  "epub-to-pdf": {
    title: "EPUB to PDF Converter",
    subtitle: "Convert open EPUB eBook files to printable PDF documents.",
    component: dynamic(() => import("../components/EPUBToPDF")),
  },
  "mobi-to-epub": {
    title: "MOBI to EPUB Converter",
    subtitle: "Convert Amazon Kindle MOBI eBook files to open EPUB format.",
    component: dynamic(() => import("../components/MOBIToEPUB")),
  },
  "base64": {
    title: "Base64 Encoder / Decoder",
    subtitle: "Encode plain text to Base64 or decode Base64 strings back.",
    component: dynamic(() => import("../components/Base64")),
  },
  "url-encoder": {
    title: "URL Encoder / Decoder",
    subtitle: "Encode regular text to safe URL-compliant string or decode URL strings.",
    component: dynamic(() => import("../components/URLEncoder")),
  },
  "html-encoder": {
    title: "HTML Entities Encoder / Decoder",
    subtitle: "Encode text characters to HTML entities or decode HTML strings back.",
    component: dynamic(() => import("../components/HTMLEncoder")),
  },
  "case-converter": {
    title: "Case Converter",
    subtitle: "Convert your text into uppercase, lowercase, title case, camelCase, etc.",
    component: dynamic(() => import("../components/CaseConverter")),
  },
  "image-converter": {
    title: "Image Format Converter",
    subtitle: "Convert image files between JPG, PNG, WebP, GIF, and BMP formats.",
    component: dynamic(() => import("../components/ImageConverter")),
  },
  "audio-converter": {
    title: "Audio Format Converter",
    subtitle: "Convert audio files between MP3, WAV, OGG, FLAC, and M4A formats.",
    component: dynamic(() => import("../components/AudioConverter")),
  },
  "video-converter": {
    title: "Video Format Converter",
    subtitle: "Convert video files between MP4, AVI, MKV, MOV, and WebM formats.",
    component: dynamic(() => import("../components/VideoConverter")),
  },
  "qr-code": {
    title: "QR Code Generator",
    subtitle: "Generate clean QR codes from any text or link instantly.",
    component: dynamic(() => import("../components/QRCode")),
  },
  "unit-converter": {
    title: "Unit Converter",
    subtitle: "Convert values between length, weight, and temperature units.",
    component: dynamic(() => import("../components/UnitConverter")),
  },
  "color-converter": {
    title: "Color Format Converter",
    subtitle: "Convert between HEX, RGB, HSL, and CMYK color codes instantly.",
    component: dynamic(() => import("../components/ColorConverter")),
  },
  "base-converter": {
    title: "Number Base Converter",
    subtitle: "Convert numeric bases between decimal, binary, octal, and hexadecimal.",
    component: dynamic(() => import("../components/BaseConverter")),
  },
  "archive-converter": {
    title: "Archive Format Converter",
    subtitle: "Convert compressed archives between ZIP, RAR, TAR, and 7Z formats.",
    component: dynamic(() => import("../components/ArchiveConverter")),
  },
  "pdf-to-excel": {
    title: "PDF to Excel Converter",
    subtitle: "Extract tabular data from PDF files directly into editable Excel spreadsheets.",
    component: dynamic(() => import("../components/PDFToExcel")),
  },
  "pdf-to-ppt": {
    title: "PDF to PowerPoint Converter",
    subtitle: "Convert PDF documents into editable PowerPoint (.pptx) presentation slides.",
    component: dynamic(() => import("../components/PDFToPPT")),
  },
  "ppt-to-pdf": {
    title: "PowerPoint to PDF Converter",
    subtitle: "Convert PowerPoint presentations (.pptx, .ppt) to PDF documents.",
    component: dynamic(() => import("../components/PPTToPDF")),
  },
  "pdf-to-text": {
    title: "PDF to Text Converter",
    subtitle: "Extract plain text content from PDF documents instantly.",
    component: dynamic(() => import("../components/PDFToText")),
  },
  "video-compressor": {
    title: "Video Compressor",
    subtitle: "Compress large video files (MP4, MKV, AVI, MOV) while maintaining high quality.",
    component: dynamic(() => import("../components/VideoCompressor")),
  },
  "mp4-converter": {
    title: "MP4 Converter",
    subtitle: "Convert any video format (AVI, MKV, MOV, FLV, WMV) to standard MP4 format.",
    component: dynamic(() => import("../components/MP4Converter")),
  },
};

export default async function ConverterToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = componentsMap[slug];

  if (!tool) {
    return (
      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">404 - Tool Not Found</h1>
          <p className="text-slate-600">The converter tool you are looking for does not exist or is under construction.</p>
          <Link href="/tooles" className="inline-block bg-primary-theme hover:opacity-90 text-white font-semibold py-2 px-6 rounded-xl transition-all">
            Back to Tools
          </Link>
        </div>
      </section>
    );
  }

  const DynamicComponent = tool.component;

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 md:px-6">
      <div className="mx-auto max-w-4xl bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-sm relative">
        {/* Back Link */}
        <Link href="/tooles" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-theme font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all tools
        </Link>

        {/* Header */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex rounded-full bg-primary-theme/10 px-4 py-1.5 text-xs font-bold text-primary-theme uppercase tracking-wider">
            Converter Tool
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            {tool.title}
          </h1>
          <p className="text-base text-slate-500">
            {tool.subtitle}
          </p>
        </div>

        {/* Dynamic Component Wrapper */}
        <div className="">
          <DynamicComponent />
        </div>
      </div>
    </section>
  );
}
