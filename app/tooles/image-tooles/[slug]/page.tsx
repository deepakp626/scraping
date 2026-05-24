import React from "react";
import dynamic from "next/dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type ImageTool = {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  actionLabel: string;
  component: string;
};

/* -----------------------------------
   Dynamic Component Imports
----------------------------------- */

const componentsMap: Record<string, any> = {
  ResizeImage: dynamic(
    () => import("../components/ResizeImage")
  ),

  CompressImage: dynamic(
    () => import("../components/CompressImage")
  ),
};

/* -----------------------------------
   Tool Config
----------------------------------- */

const imageTools: Record<string, ImageTool> = {
  "resize-image": {
    title: "Resize Image",
    subtitle: "Scale images easily",
    description: "Resize images dynamically.",
    features: [
      "Custom width",
      "Custom height",
      "Maintain ratio",
    ],
    actionLabel: "Resize Now",
    component: "ResizeImage",
  },

  "compress-image": {
    title: "Compress Image",
    subtitle: "Reduce image size",
    description: "Compress image without quality loss.",
    features: [
      "Fast compression",
      "High quality",
      "Download instantly",
    ],
    actionLabel: "Compress Now",
    component: "CompressImage",
  },
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

          <p className="max-w-3xl text-base leading-8 text-slate-700">
            {tool.description}
          </p>

        </div>

        {/* Features */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {tool.features.map((feature) => (
            <div
              key={feature}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
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