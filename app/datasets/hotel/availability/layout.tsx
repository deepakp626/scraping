import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildHotelDatasetSchema, getHotelDatasetMetadata } from "../seo/hotelMetadata";

export const metadata: Metadata = getHotelDatasetMetadata("availability");

export default function AvailabilityLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildHotelDatasetSchema("availability")} />
      {children}
    </>
  );
}
