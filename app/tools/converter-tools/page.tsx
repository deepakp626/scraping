import type { Metadata } from "next";
import ConverterToolsSchema from "./components/ConverterToolsSchema";
import ConverterToolsSection from "./components/ConverterToolsSection";
import {
  buildConverterToolsLandingSchema,
  converterToolsLandingMetadata,
} from "./seo/landing";
import { converterToolsListing } from "./components/ConverterToolsSection";

export const metadata: Metadata = converterToolsLandingMetadata;

export default function ConverterToolsPage() {
  return (
    <>
      <ConverterToolsSchema
        schema={buildConverterToolsLandingSchema(converterToolsListing)}
      />
      <ConverterToolsSection />
    </>
  );
}
