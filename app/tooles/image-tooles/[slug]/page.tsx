import React from "react";
import dynamic from "next/dynamic";
import { imageTools, ImageTool } from "../data/imageTools";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* -----------------------------------
   Dynamic Component Imports
----------------------------------- */

const componentsMap: Record<string, any> = {
  CompressImage: dynamic(() => import("../components/CompressImage")),
  ResizeImage: dynamic(() => import("../components/ResizeImage")),
  CropImage: dynamic(() => import("../components/CropImage")),
  ConvertImages: dynamic(() => import("../components/ConvertImages")),
  ConvertJpg: dynamic(() => import("../components/ConvertJpg")),
  ConvertPng: dynamic(() => import("../components/ConvertPng")),
  ConvertWebp: dynamic(() => import("../components/ConvertWebp")),
  RotateImage: dynamic(() => import("../components/RotateImage")),
  FlipHorizontal: dynamic(() => import("../components/FlipHorizontal")),
  FlipVertical: dynamic(() => import("../components/FlipVertical")),
  ImageToPdf: dynamic(() => import("../components/ImageToPdf")),
  RemoveBg: dynamic(() => import("../components/RemoveBg")),
  EnhanceImage: dynamic(() => import("../components/EnhanceImage")),
  AddWatermark: dynamic(() => import("../components/AddWatermark")),
  BlurImage: dynamic(() => import("../components/BlurImage")),
  SharpenImage: dynamic(() => import("../components/SharpenImage")),
  ChangeFormat: dynamic(() => import("../components/ChangeFormat")),
  ColorAdjust: dynamic(() => import("../components/ColorAdjust")),
  MergeImages: dynamic(() => import("../components/MergeImages")),
  SplitImage: dynamic(() => import("../components/SplitImage")),
  AddText: dynamic(() => import("../components/AddText")),
  PdfToImages: dynamic(() => import("../components/PdfToImages")),
};


/* -----------------------------------
   UI Component
----------------------------------- */

function ImageToolDetails({
  tool,
  DynamicComponent,
}: {
  tool: ImageTool;
  DynamicComponent: React.ComponentType<any>;
}) {

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 py-16 px-6">

      <div className="mx-auto max-w-6xl rounded-4xl border border-slate-200 bg-white p-10 shadow-xl">

        {/* Header */}
        <div className="space-y-6">

          <div className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            Image Tool
          </div>

          <h1 className="text-5xl font-bold">
            {tool.title}
          </h1>

          <p className="text-lg text-slate-600">
            {tool.subtitle}
          </p>

          {/* <p className="max-w-3xl text-base leading-8 text-slate-700">
            {tool.description}
          </p> */}

        </div>

        {/* Features */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {tool.features.map((feature) => (
            <div
              key={feature}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-2"
            >
              <p className="font-semibold text-slate-900">
                {feature}
              </p>
            </div>
          ))}

        </div>

        {/* Dynamic Component */}
        <div className="mt-12">
          <DynamicComponent />
        </div>

      </div>

    </section>
  );
}

/* -----------------------------------
   Main Page
----------------------------------- */

export default async function ImageToolPage({
  params,
}: PageProps) {

  const { slug } = await params;

  /* -----------------------------------
     Find Tool
  ----------------------------------- */

  const tool =
    imageTools[slug] ||
    imageTools["resize-image"];

  /* -----------------------------------
     Load Dynamic Component
  ----------------------------------- */

  const DynamicComponent =
    componentsMap[tool.component];

  return (
    <ImageToolDetails
      tool={tool}
      DynamicComponent={DynamicComponent}
    />
  );
}