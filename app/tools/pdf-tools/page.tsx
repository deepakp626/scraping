import Link from "next/link";
import { FileText, Unlock, Lock, Merge, Split, FilePlus, FileMinus, RotateCw, RotateCcw, FileImage, FileSignature, FileCheck, FileSearch, FileCode, FileDigit, FileUp, FileDown, FileX, ShieldCheck, Eye } from "lucide-react";


export  function PdfToolsSection() {
  const tools = [
  { name: "Merge PDF", icon: Merge, link: "/tools/pdf-tools/merge-pdf" },
  { name: "Split PDF", icon: Split, link: "/tools/pdf-tools/split-pdf" },
  { name: "Compress PDF", icon: FileMinus, link: "/tools/pdf-tools/compress-pdf" },
  { name: "PDF to Word", icon: FileText, link: "/tools/pdf-tools/pdf-to-word" },
  { name: "Word to PDF", icon: FilePlus, link: "/tools/pdf-tools/word-to-pdf" },
  { name: "PDF to Image", icon: FileImage, link: "/tools/pdf-tools/pdf-to-image" },
  { name: "Image to PDF", icon: FileImage, link: "/tools/pdf-tools/image-to-pdf" },
  { name: "Unlock PDF", icon: Unlock, link: "/tools/pdf-tools/unlock-pdf" },
  { name: "Lock PDF", icon: Lock, link: "/tools/pdf-tools/lock-pdf" },
  { name: "Rotate PDF", icon: RotateCw, link: "/tools/pdf-tools/rotate-pdf" },
  { name: "Rotate Left", icon: RotateCcw, link: "/tools/pdf-tools/rotate-left" },
  { name: "Add Watermark", icon: FileSignature, link: "/tools/pdf-tools/add-watermark" },
  { name: "Remove Pages", icon: FileX, link: "/tools/pdf-tools/remove-pages" },
  { name: "Extract Pages", icon: FileDown, link: "/tools/pdf-tools/extract-pages" },
  { name: "Add Page Numbers", icon: FileDigit, link: "/tools/pdf-tools/page-numbers" },
  { name: "OCR PDF", icon: Eye, link: "/tools/pdf-tools/ocr-pdf" },
  { name: "Sign PDF", icon: FileSignature, link: "/tools/pdf-tools/sign-pdf" },
  // { name: "Protect PDF", icon: ShieldCheck, link: "/tools/pdf-tools/protect-pdf" },
  { name: "PDF to HTML", icon: FileCode, link: "/tools/pdf-tools/pdf-to-html" },
  { name: "Search in PDF", icon: FileSearch, link: "/tools/pdf-tools/search-pdf" },
  { name: "Extract Images from PDF", icon: FileImage, link: "/tools/pdf-tools/extract-images-from-pdf"},
];
  return (
    <section className="py-12 px-4  md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
          Explore Our PDF Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={index}
                href={tool.link}
                className="group flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-primary-theme transition">
                  <Icon className="w-8 h-8 text-primary-theme group-hover:text-black" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-primary-theme transition">
                  {tool.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PdfToolsSection;