import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildQuickCommerceDatasetSchema,
  getQuickCommerceDatasetMetadata,
} from "../seo/quickCommerceMetadata";

export const metadata: Metadata = getQuickCommerceDatasetMetadata("demand-index");

export default function DemandIndexLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildQuickCommerceDatasetSchema("demand-index")} />
      {children}
    </>
  );
}
