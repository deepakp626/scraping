import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildFoodDeliveryDatasetSchema, getFoodDeliveryDatasetMetadata } from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("delivery-fees");

export default function DeliveryFeesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("delivery-fees")} />
      {children}
    </>
  );
}
