import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildPharmaceuticalDatasetSchema, getPharmaceuticalDatasetMetadata } from "../seo/pharmaceuticalMetadata";

export const metadata: Metadata = getPharmaceuticalDatasetMetadata("drug-listings");

export default function DrugListingsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildPharmaceuticalDatasetSchema("drug-listings")} />{children}</>;
}
