import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildFoodDeliveryDatasetSchema, getFoodDeliveryDatasetMetadata } from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("eta-data");

export default function EtaDataLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("eta-data")} />
      {children}
    </>
  );
}
