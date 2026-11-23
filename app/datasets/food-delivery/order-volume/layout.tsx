import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildFoodDeliveryDatasetSchema, getFoodDeliveryDatasetMetadata } from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("order-volume");

export default function OrderVolumeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("order-volume")} />
      {children}
    </>
  );
}
