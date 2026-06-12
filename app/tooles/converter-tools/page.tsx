import Link from "next/link";
import {
  FileSpreadsheet,
  FileText,
  Split,
  FileCode,
  FileJson,
  BookOpen,
  ArrowRightLeft,
  FileUp,
  FileDown,
  RefreshCw,
  Binary,
  Globe,
  Link2,
  FileType,
  Sigma,
  QrCode,
  Music,
  Video,
  Image as ImageIcon,
  Table2,
  Archive,
  Hash,
  Palette,
  Repeat2,
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
  // ── Spreadsheet / Data ──────────────────────────────────────────
  {
    name: "Excel to PDF",
    category: "Converter Tools",
    desc: "Convert Excel to PDF",
    icon: FileSpreadsheet,
    link: "/tooles/converter-tools/excel-to-pdf",
  },
  {
    name: "CSV to Excel",
    category: "Converter Tools",
    desc: "Convert CSV to Excel",
    icon: Table2,
    link: "/tooles/converter-tools/csv-to-excel",
  },
  {
    name: "Split Excel",
    category: "Converter Tools",
    desc: "Split into one or multiple Excel files",
    icon: Split,
    link: "/tooles/converter-tools/split-excel",
  },
  {
    name: "XML to Excel",
    category: "Converter Tools",
    desc: "Convert XML to Excel",
    icon: FileCode,
    link: "/tooles/converter-tools/xml-to-excel",
  },
  {
    name: "Split CSV",
    category: "Converter Tools",
    desc: "Split into one or multiple CSV files",
    icon: Split,
    link: "/tooles/converter-tools/split-csv",
  },
  {
    name: "Excel to CSV",
    category: "Converter Tools",
    desc: "Convert Excel to CSV",
    icon: FileSpreadsheet,
    link: "/tooles/converter-tools/excel-to-csv",
  },
  {
    name: "XML to CSV",
    category: "Converter Tools",
    desc: "Convert XML to CSV",
    icon: FileCode,
    link: "/tooles/converter-tools/xml-to-csv",
  },
  {
    name: "CSV to JSON",
    category: "Converter Tools",
    desc: "Convert CSV to JSON",
    icon: FileJson,
    link: "/tooles/converter-tools/csv-to-json",
  },
  {
    name: "Excel to XML",
    category: "Converter Tools",
    desc: "Convert Excel to XML",
    icon: FileSpreadsheet,
    link: "/tooles/converter-tools/excel-to-xml",
  },
  {
    name: "JSON to XML",
    category: "Converter Tools",
    desc: "Convert JSON to XML",
    icon: FileJson,
    link: "/tooles/converter-tools/json-to-xml",
  },
  {
    name: "JSON to CSV",
    category: "Converter Tools",
    desc: "Convert JSON to CSV",
    icon: FileJson,
    link: "/tooles/converter-tools/json-to-csv",
  },
  {
    name: "JSON to Excel",
    category: "Converter Tools",
    desc: "Convert JSON to Excel",
    icon: FileJson,
    link: "/tooles/converter-tools/json-to-excel",
  },

  // ── eBook ────────────────────────────────────────────────────────
  {
    name: "EPUB to MOBI",
    category: "Converter Tools",
    desc: "Convert EPUB file to MOBI file",
    icon: BookOpen,
    link: "/tooles/converter-tools/epub-to-mobi",
  },
  {
    name: "EPUB to AZW3",
    category: "Converter Tools",
    desc: "Convert EPUB file to AZW3 file",
    icon: BookOpen,
    link: "/tooles/converter-tools/epub-to-azw3",
  },
  {
    name: "EPUB to PDF",
    category: "Converter Tools",
    desc: "Convert EPUB file to PDF",
    icon: BookOpen,
    link: "/tooles/converter-tools/epub-to-pdf",
  },
  {
    name: "MOBI to EPUB",
    category: "Converter Tools",
    desc: "Convert MOBI file to EPUB",
    icon: BookOpen,
    link: "/tooles/converter-tools/mobi-to-epub",
  },

  // ── Text & Encoding ──────────────────────────────────────────────
  {
    name: "Base64 Encode/Decode",
    category: "Converter Tools",
    desc: "Encode or decode Base64 strings",
    icon: Binary,
    link: "/tooles/converter-tools/base64",
  },
  {
    name: "URL Encoder / Decoder",
    category: "Converter Tools",
    desc: "Encode or decode URL strings",
    icon: Link2,
    link: "/tooles/converter-tools/url-encoder",
  },
  {
    name: "HTML Encoder / Decoder",
    category: "Converter Tools",
    desc: "Encode or decode HTML entities",
    icon: Globe,
    link: "/tooles/converter-tools/html-encoder",
  },
  {
    name: "Case Converter",
    category: "Converter Tools",
    desc: "Convert text case (upper, lower, title…)",
    icon: Sigma,
    link: "/tooles/converter-tools/case-converter",
  },

  // ── Media ────────────────────────────────────────────────────────
  {
    name: "Image Format Converter",
    category: "Converter Tools",
    desc: "Convert between JPG, PNG, WebP, GIF…",
    icon: ImageIcon,
    link: "/tooles/converter-tools/image-converter",
  },
  {
    name: "Audio Converter",
    category: "Converter Tools",
    desc: "Convert MP3, WAV, OGG, FLAC and more",
    icon: Music,
    link: "/tooles/converter-tools/audio-converter",
  },
  {
    name: "Video Converter",
    category: "Converter Tools",
    desc: "Convert MP4, AVI, MKV and more",
    icon: Video,
    link: "/tooles/converter-tools/video-converter",
  },

  // ── Utility ──────────────────────────────────────────────────────
  {
    name: "QR Code Generator",
    category: "Converter Tools",
    desc: "Generate QR codes from any text or URL",
    icon: QrCode,
    link: "/tooles/converter-tools/qr-code",
  },
  {
    name: "Unit Converter",
    category: "Converter Tools",
    desc: "Convert length, weight, temperature…",
    icon: Repeat2,
    link: "/tooles/converter-tools/unit-converter",
  },
  {
    name: "Color Converter",
    category: "Converter Tools",
    desc: "Convert HEX, RGB, HSL, CMYK",
    icon: Palette,
    link: "/tooles/converter-tools/color-converter",
  },
  {
    name: "Number Base Converter",
    category: "Converter Tools",
    desc: "Convert binary, octal, decimal, hex",
    icon: Hash,
    link: "/tooles/converter-tools/base-converter",
  },
  {
    name: "Archive Converter",
    category: "Converter Tools",
    desc: "Convert ZIP, RAR, TAR, 7Z archives",
    icon: Archive,
    link: "/tooles/converter-tools/archive-converter",
  },
];

// ─────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────
export function ConverterToolsSection() {
  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-theme/10 text-primary-theme mb-3 tracking-wide uppercase">
            Converter Tools
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Explore Our Converter Tools
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Convert files between formats instantly — spreadsheets, eBooks,
            media, data formats, and more.
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
