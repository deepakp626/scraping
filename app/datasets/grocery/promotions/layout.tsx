import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildGroceryDatasetSchema,
  getGroceryDatasetMetadata,
} from "../seo/groceryMetadata";

export const metadata: Metadata = getGroceryDatasetMetadata("promotions");

export default function PromotionsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildGroceryDatasetSchema("promotions")} />
      {children}
    </>
  );
}
