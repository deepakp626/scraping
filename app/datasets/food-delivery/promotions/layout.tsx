import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildFoodDeliveryDatasetSchema, getFoodDeliveryDatasetMetadata } from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("promotions");

export default function PromotionsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("promotions")} />
      {children}
    </>
  );
}
