import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildRestaurantDatasetSchema,
  getRestaurantDatasetMetadata,
} from "../seo/restaurantMetadata";

export const metadata: Metadata = getRestaurantDatasetMetadata("delivery-partners");

export default function DeliveryPartnersLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildRestaurantDatasetSchema("delivery-partners")} />
      {children}
    </>
  );
}
