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
    { name: "Compress Image", icon: Minimize, link: "/tooles/image-tooles/compress-image" },
    { name: "Resize Image", icon: Maximize, link: "/tooles/image-tooles/resize-image" },
    { name: "Crop Image", icon: Crop, link: "/tooles/image-tooles/crop-image" },
    { name: "Convert to JPG", icon: FileImage, link: "/tooles/image-tooles/convert-jpg" },
    { name: "Convert to PNG", icon: Image, link: "/tooles/image-tooles/convert-png" },
    { name: "Convert to WebP", icon: FileImage, link: "/tooles/image-tooles/convert-webp" },
    { name: "Rotate Image", icon: RotateCw, link: "/tooles/image-tooles/rotate-image" },
    { name: "Flip Horizontal", icon: FlipHorizontal, link: "/tooles/image-tooles/flip-horizontal" },
    { name: "Flip Vertical", icon: FlipVertical, link: "/tooles/image-tooles/flip-vertical" },
    { name: "Image to PDF", icon: FileUp, link: "/tooles/image-tooles/image-to-pdf" },
    { name: "Remove Background", icon: Eraser, link: "/tooles/image-tooles/remove-bg" },
    { name: "Enhance Image", icon: Wand2, link: "/tooles/image-tooles/enhance-image" },
    { name: "Add Watermark", icon: ShieldCheck, link: "/tooles/image-tooles/add-watermark" },
    { name: "Blur Image", icon: Eye, link: "/tooles/image-tooles/blur-image" },
    { name: "Sharpen Image", icon: Sparkles, link: "/tooles/image-tooles/sharpen-image" },
    { name: "Change Format", icon: Replace, link: "/tooles/image-tooles/change-format" },
    { name: "Color Adjust", icon: Palette, link: "/tooles/image-tooles/color-adjust" },
    { name: "Merge Images", icon: Layers, link: "/tooles/image-tooles/merge-images" },
    { name: "Split Image", icon: Scissors, link: "/tooles/image-tooles/split-image" },
    { name: "Add Text to Image", icon: FilePlus, link: "/tooles/image-tooles/add-text" },
    { name:"pdf to images", icon:FileUp, link:"/tooles/image-tooles/pdf-to-images"}
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