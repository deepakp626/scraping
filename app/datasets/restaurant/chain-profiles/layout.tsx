import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildRestaurantDatasetSchema,
  getRestaurantDatasetMetadata,
} from "../seo/restaurantMetadata";

export const metadata: Metadata = getRestaurantDatasetMetadata("chain-profiles");

export default function ChainProfilesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildRestaurantDatasetSchema("chain-profiles")} />
      {children}
    </>
  );
}
