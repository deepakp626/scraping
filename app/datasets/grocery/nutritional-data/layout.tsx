import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildGroceryDatasetSchema,
  getGroceryDatasetMetadata,
} from "../seo/groceryMetadata";

export const metadata: Metadata =
  getGroceryDatasetMetadata("nutritional-data");

export default function NutritionalDataLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildGroceryDatasetSchema("nutritional-data")} />
      {children}
    </>
  );
}
