import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildFoodDeliveryDatasetSchema, getFoodDeliveryDatasetMetadata } from "../seo/foodDeliveryMetadata";

export const metadata: Metadata = getFoodDeliveryDatasetMetadata("restaurant-rank");

export default function RestaurantRankLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildFoodDeliveryDatasetSchema("restaurant-rank")} />
      {children}
    </>
  );
}
