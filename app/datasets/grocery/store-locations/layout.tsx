import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildGroceryDatasetSchema,
  getGroceryDatasetMetadata,
} from "../seo/groceryMetadata";

export const metadata: Metadata =
  getGroceryDatasetMetadata("store-locations");

export default function StoreLocationsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildGroceryDatasetSchema("store-locations")} />
      {children}
    </>
  );
}
