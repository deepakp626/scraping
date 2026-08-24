import Link from "next/link";
import {
  FileSpreadsheet,
  FileText,
  Split,
  FileCode,
  FileJson,
  FileUp,
  FileDown,
  Binary,
  Link2,
  QrCode,
  Image as ImageIcon,
  Table2,
  Palette,
  Repeat2,
  Merge,
  Minimize2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export type ConverterTool = {
  name: string;
  category: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  badge?: string; // optional accent color class for badge
};

const tools: ConverterTool[] = [
  // 1. PDF to Word
  {
    name: "PDF to Word",
    category: "PDF Tools",
    desc: "Convert PDF documents to editable Word files",
    icon: FileText,
    link: "/tooles/pdf-tooles/pdf-to-word",
  },
  // 2. Word to PDF
  {
    name: "Word to PDF",
    category: "PDF Tools",
    desc: "Convert Word DOC/DOCX documents to PDF",
    icon: FileText,
    link: "/tooles/pdf-tooles/word-to-pdf",
  },
  // 3. PDF Compressor
  {
    name: "PDF Compressor",
    category: "PDF Tools",
    desc: "Compress PDF file size without quality loss",
    icon: Minimize2,
    link: "/tooles/pdf-tooles/compress-pdf",
  },
  // 4. Merge PDF
  {
    name: "Merge PDF",
    category: "PDF Tools",
    desc: "Combine multiple PDF files into one document",
    icon: Merge,
    link: "/tooles/pdf-tooles/merge-pdf",
  },
  // 5. Split PDF
  {
    name: "Split PDF",
    category: "PDF Tools",
    desc: "Split a PDF into separate pages or ranges",
    icon: Split,
    link: "/tooles/pdf-tooles/split-pdf",
  },
  // 21. Base64 Encoder/Decoder
  {
    name: "Base64 Encoder / Decoder",
    category: "Encoding",
    desc: "Encode or decode Base64 strings safely",
    icon: Binary,
    link: "/tooles/converter-tools/base64",
  },
  // 22. URL Encoder/Decoder
  {
    name: "URL Encoder / Decoder",
    category: "Encoding",
    desc: "Encode or decode URL query parameters",
    icon: Link2,
    link: "/tooles/converter-tools/url-encoder",
  },
  // 23. QR Code Generator
  {
    name: "QR Code Generator",
    category: "Utility",
    desc: "Generate QR codes from any text or URL",
    icon: QrCode,
    link: "/tooles/converter-tools/qr-code",
  },
  // 24. Unit Converter
  {
    name: "Unit Converter",
    category: "Utility",
    desc: "Convert length, weight, temperature, and area",
    icon: Repeat2,
    link: "/tooles/converter-tools/unit-converter",
  },
  // 25. Color Converter
  {
    name: "Color Converter",
    category: "Utility",
    desc: "Convert HEX, RGB, HSL, and CMYK colors",
    icon: Palette,
    link: "/tooles/converter-tools/color-converter",
  },
];

// ─────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────
export function ConverterToolsSection() {
  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Explore Our Converter Tools
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Convert files between formats instantly — spreadsheets, PDFs, images,
            data formats, and more.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={index}
                href={tool.link}
                className="group flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-primary-theme/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="shrink-0 p-3 bg-primary-theme/5 rounded-xl group-hover:bg-primary-theme/10 transition-colors mt-0.5">
                  <Icon className="w-6 h-6 text-primary-theme group-hover:text-primary-theme transition-colors" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-primary-theme uppercase tracking-wider mb-0.5">
                    {tool.category}
                  </p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-primary-theme transition-colors leading-snug">
                    {tool.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 leading-snug">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-400 mt-10">
          {tools.length} tools available · More coming soon
        </p>
      </div>
    </section>
  );
}

export default ConverterToolsSection;