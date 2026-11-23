import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildGroceryDatasetSchema,
  getGroceryDatasetMetadata,
} from "../seo/groceryMetadata";

export const metadata: Metadata =
  getGroceryDatasetMetadata("category-trends");

export default function CategoryTrendsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildGroceryDatasetSchema("category-trends")} />
      {children}
    </>
  );
}
