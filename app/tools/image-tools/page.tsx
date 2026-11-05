import Link from "next/link";
import {
  Image,
  FileImage,
  Scissors,
  Crop,
  Wand2,
  Eraser,
  Replace,
  Maximize,
  Minimize,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  FileDown,
  FileUp,
  Palette,
  Eye,
  ShieldCheck,
  Layers,
  Sparkles,
  FilePlus
} from "lucide-react";

export function ImageToolsSection() {
  const tools = [
    { name: "Compress Image", icon: Minimize, link: "/tools/image-tools/compress-image" },
    { name: "Resize Image", icon: Maximize, link: "/tools/image-tools/resize-image" },
    { name: "Crop Image", icon: Crop, link: "/tools/image-tools/crop-image" },
    { name: "Convert to JPG", icon: FileImage, link: "/tools/image-tools/convert-jpg" },
    { name: "Convert to PNG", icon: Image, link: "/tools/image-tools/convert-png" },
    { name: "Convert to WebP", icon: FileImage, link: "/tools/image-tools/convert-webp" },
    { name: "Rotate Image", icon: RotateCw, link: "/tools/image-tools/rotate-image" },
    { name: "Flip Horizontal", icon: FlipHorizontal, link: "/tools/image-tools/flip-horizontal" },
    { name: "Flip Vertical", icon: FlipVertical, link: "/tools/image-tools/flip-vertical" },
    { name: "Image to PDF", icon: FileUp, link: "/tools/image-tools/image-to-pdf" },
    { name: "Remove Background", icon: Eraser, link: "/tools/image-tools/remove-bg" },
    { name: "Enhance Image", icon: Wand2, link: "/tools/image-tools/enhance-image" },
    { name: "Add Watermark", icon: ShieldCheck, link: "/tools/image-tools/add-watermark" },
    { name: "Blur Image", icon: Eye, link: "/tools/image-tools/blur-image" },
    { name: "Sharpen Image", icon: Sparkles, link: "/tools/image-tools/sharpen-image" },
    { name: "Change Format", icon: Replace, link: "/tools/image-tools/change-format" },
    { name: "Color Adjust", icon: Palette, link: "/tools/image-tools/color-adjust" },
    { name: "Merge Images", icon: Layers, link: "/tools/image-tools/merge-images" },
    { name: "Split Image", icon: Scissors, link: "/tools/image-tools/split-image" },
    { name: "Add Text to Image", icon: FilePlus, link: "/tools/image-tools/add-text" },
    { name:"pdf to images", icon:FileUp, link:"/tools/image-tools/pdf-to-images"}
  ];

  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
          Explore Our Image Tools
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

export default ImageToolsSection;