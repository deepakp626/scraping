import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildEcommerceDatasetSchema,
  getEcommerceDatasetMetadata,
} from "../seo/ecommerceMetaData";

export const metadata: Metadata =
  getEcommerceDatasetMetadata("brand-intelligence");

export default function BrandIntelligenceLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema
        schema={buildEcommerceDatasetSchema("brand-intelligence")}
      />
      {children}
    </>
  );
}
