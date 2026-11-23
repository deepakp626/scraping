import Link from "next/link";
import {
  Binary,
  FileText,
  Link2,
  Merge,
  Minimize2,
  Palette,
  QrCode,
  Repeat2,
  Split,
  type LucideIcon,
} from "lucide-react";

export type ConverterTool = {
  name: string;
  category: string;
  desc: string;
  icon: LucideIcon;
  link: string;
};

export const converterToolsListing: ConverterTool[] = [
  {
    name: "PDF to Word",
    category: "PDF Tools",
    desc: "Convert PDF documents to editable Word files",
    icon: FileText,
    link: "/tools/pdf-tools/pdf-to-word",
  },
  {
    name: "Word to PDF",
    category: "PDF Tools",
    desc: "Convert Word DOC/DOCX documents to PDF",
    icon: FileText,
    link: "/tools/pdf-tools/word-to-pdf",
  },
  {
    name: "PDF Compressor",
    category: "PDF Tools",
    desc: "Compress PDF file size without quality loss",
    icon: Minimize2,
    link: "/tools/pdf-tools/compress-pdf",
  },
  {
    name: "Merge PDF",
    category: "PDF Tools",
    desc: "Combine multiple PDF files into one document",
    icon: Merge,
    link: "/tools/pdf-tools/merge-pdf",
  },
  {
    name: "Split PDF",
    category: "PDF Tools",
    desc: "Split a PDF into separate pages or ranges",
    icon: Split,
    link: "/tools/pdf-tools/split-pdf",
  },
  {
    name: "Base64 Encoder / Decoder",
    category: "Encoding",
    desc: "Encode or decode Base64 strings safely",
    icon: Binary,
    link: "/tools/converter-tools/base64",
  },
  {
    name: "URL Encoder / Decoder",
    category: "Encoding",
    desc: "Encode or decode URL query parameters",
    icon: Link2,
    link: "/tools/converter-tools/url-encoder",
  },
  {
    name: "QR Code Generator",
    category: "Utility",
    desc: "Generate QR codes from any text or URL",
    icon: QrCode,
    link: "/tools/converter-tools/qr-code",
  },
  {
    name: "Unit Converter",
    category: "Utility",
    desc: "Convert length, weight, temperature, and area",
    icon: Repeat2,
    link: "/tools/converter-tools/unit-converter",
  },
  {
    name: "Color Converter",
    category: "Utility",
    desc: "Convert HEX, RGB, HSL, and CMYK colors",
    icon: Palette,
    link: "/tools/converter-tools/color-converter",
  },
];

export function ConverterToolsSection() {
  return (
    <section className="bg-gray-50 px-4 py-12 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Free Online File Converters
          </h1>
          <p className="mx-auto max-w-xl text-base text-gray-500">
            Convert files online with CompilePilot. Explore free online
            converters for common file formats and transform supported files
            with simple tools for everyday workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {converterToolsListing.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.link}
                href={tool.link}
                className="group flex items-start gap-4 rounded-2xl border border-transparent bg-white p-5 shadow-sm transition-all duration-300 hover:border-primary-theme/30 hover:shadow-md"
              >
                <div className="mt-0.5 shrink-0 rounded-xl bg-primary-theme/5 p-3 transition-colors group-hover:bg-primary-theme/10">
                  <Icon className="h-6 w-6 text-primary-theme transition-colors" />
                </div>

                <div className="min-w-0">
                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-theme">
                    {tool.category}
                  </p>
                  <p className="text-sm font-bold leading-snug text-slate-800 transition-colors group-hover:text-primary-theme">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-gray-400">
                    {tool.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          {converterToolsListing.length} tools available · More coming soon
        </p>
      </div>
    </section>
  );
}

export default ConverterToolsSection;
