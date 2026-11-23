import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildQuickCommerceDatasetSchema,
  getQuickCommerceDatasetMetadata,
} from "../seo/quickCommerceMetadata";

export const metadata: Metadata = getQuickCommerceDatasetMetadata("dark-store-data");

export default function DarkStoreDataLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildQuickCommerceDatasetSchema("dark-store-data")} />
      {children}
    </>
  );
}
