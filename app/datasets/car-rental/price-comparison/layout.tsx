import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildCarRentalDatasetSchema, getCarRentalDatasetMetadata } from "../seo/carRentalMetadata";

export const metadata: Metadata = getCarRentalDatasetMetadata("price-comparison");

export default function PriceComparisonLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildCarRentalDatasetSchema("price-comparison")} />
      {children}
    </>
  );
}
