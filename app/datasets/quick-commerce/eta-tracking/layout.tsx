import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildQuickCommerceDatasetSchema,
  getQuickCommerceDatasetMetadata,
} from "../seo/quickCommerceMetadata";

export const metadata: Metadata = getQuickCommerceDatasetMetadata("eta-tracking");

export default function EtaTrackingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildQuickCommerceDatasetSchema("eta-tracking")} />
      {children}
    </>
  );
}
