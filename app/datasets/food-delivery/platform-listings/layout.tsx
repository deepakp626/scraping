import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildFoodDeliveryDatasetSchema,
  getFoodDeliveryDatasetMetadata,
} from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("platform-listings");

export default function PlatformListingsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("platform-listings")} />
      {children}
    </>
  );
}
