import Link from "next/link";
import { FileText, Unlock, Lock, Merge, Split, FilePlus, FileMinus, RotateCw, RotateCcw, FileImage, FileSignature, FileCheck, FileSearch, FileCode, FileDigit, FileUp, FileDown, FileX, ShieldCheck, Eye } from "lucide-react";


export  function PdfToolsSection() {
  const tools = [
  { name: "Merge PDF", icon: Merge, link: "/tooles/pdf-tooles/merge-pdf" },
  { name: "Split PDF", icon: Split, link: "/tooles/pdf-tooles/split-pdf" },
  { name: "Compress PDF", icon: FileMinus, link: "/tooles/pdf-tooles/compress-pdf" },
  { name: "PDF to Word", icon: FileText, link: "/tooles/pdf-tooles/pdf-to-word" },
  { name: "Word to PDF", icon: FilePlus, link: "/tooles/pdf-tooles/word-to-pdf" },
  { name: "PDF to Image", icon: FileImage, link: "/tooles/pdf-tooles/pdf-to-image" },
  { name: "Image to PDF", icon: FileImage, link: "/tooles/pdf-tooles/image-to-pdf" },
  { name: "Unlock PDF", icon: Unlock, link: "/tooles/pdf-tooles/unlock-pdf" },
  { name: "Lock PDF", icon: Lock, link: "/tooles/pdf-tooles/lock-pdf" },
  { name: "Rotate PDF", icon: RotateCw, link: "/tooles/pdf-tooles/rotate-pdf" },
  { name: "Rotate Left", icon: RotateCcw, link: "/tooles/pdf-tooles/rotate-left" },
  { name: "Add Watermark", icon: FileSignature, link: "/tooles/pdf-tooles/add-watermark" },
  { name: "Remove Pages", icon: FileX, link: "/tooles/pdf-tooles/remove-pages" },
  { name: "Extract Pages", icon: FileDown, link: "/tooles/pdf-tooles/extract-pages" },
  { name: "Add Page Numbers", icon: FileDigit, link: "/tooles/pdf-tooles/page-numbers" },
  { name: "OCR PDF", icon: Eye, link: "/tooles/pdf-tooles/ocr-pdf" },
  { name: "Sign PDF", icon: FileSignature, link: "/tooles/pdf-tooles/sign-pdf" },
  // { name: "Protect PDF", icon: ShieldCheck, link: "/tooles/pdf-tooles/protect-pdf" },
  { name: "PDF to HTML", icon: FileCode, link: "/tooles/pdf-tooles/pdf-to-html" },
  { name: "Search in PDF", icon: FileSearch, link: "/tooles/pdf-tooles/search-pdf" },
  { name: "Extract Images from PDF", icon: FileImage, link: "/tooles/pdf-tooles/extract-images-from-pdf"},
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