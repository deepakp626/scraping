import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildRestaurantDatasetSchema,
  getRestaurantDatasetMetadata,
} from "../seo/restaurantMetadata";

export const metadata: Metadata = getRestaurantDatasetMetadata("menu-data");

export default function MenuDataLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildRestaurantDatasetSchema("menu-data")} />
      {children}
    </>
  );
}
