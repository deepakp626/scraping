import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildCarRentalDatasetSchema, getCarRentalDatasetMetadata } from "../seo/carRentalMetadata";

export const metadata: Metadata = getCarRentalDatasetMetadata("vehicle-specs");

export default function VehicleSpecsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildCarRentalDatasetSchema("vehicle-specs")} />
      {children}
    </>
  );
}
