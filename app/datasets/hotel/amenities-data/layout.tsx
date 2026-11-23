import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildHotelDatasetSchema, getHotelDatasetMetadata } from "../seo/hotelMetadata";

export const metadata: Metadata = getHotelDatasetMetadata("amenities-data");

export default function AmenitiesDataLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildHotelDatasetSchema("amenities-data")} />
      {children}
    </>
  );
}
