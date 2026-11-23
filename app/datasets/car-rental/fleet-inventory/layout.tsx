import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildCarRentalDatasetSchema, getCarRentalDatasetMetadata } from "../seo/carRentalMetadata";

export const metadata: Metadata = getCarRentalDatasetMetadata("fleet-inventory");

export default function FleetInventoryLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildCarRentalDatasetSchema("fleet-inventory")} />
      {children}
    </>
  );
}
