import type { Metadata } from "next";
import ImageToolSchema from "./components/ImageToolSchema";
import ImageToolsSection from "./components/ImageToolsSection";
import { imageToolsSeo } from "./seo";

export const metadata: Metadata = imageToolsSeo.metadata;

export default function ImageToolsPage() {
  return (
    <>
      <ImageToolSchema schema={imageToolsSeo.schema} />
      <ImageToolsSection />
    </>
  );
}
