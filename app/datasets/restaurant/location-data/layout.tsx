import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildRestaurantDatasetSchema,
  getRestaurantDatasetMetadata,
} from "../seo/restaurantMetadata";

export const metadata: Metadata = getRestaurantDatasetMetadata("location-data");

export default function LocationDataLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildRestaurantDatasetSchema("location-data")} />
      {children}
    </>
  );
}
