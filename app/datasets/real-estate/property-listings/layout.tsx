import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildRealEstateDatasetSchema, getRealEstateDatasetMetadata } from "../seo/realEstateMetadata";

export const metadata: Metadata = getRealEstateDatasetMetadata("property-listings");
export default function PropertyListingsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildRealEstateDatasetSchema("property-listings")} />{children}</>;
}
