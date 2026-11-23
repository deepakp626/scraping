import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildHotelDatasetSchema, getHotelDatasetMetadata } from "../seo/hotelMetadata";

export const metadata: Metadata = getHotelDatasetMetadata("guest-reviews");

export default function GuestReviewsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildHotelDatasetSchema("guest-reviews")} />
      {children}
    </>
  );
}
