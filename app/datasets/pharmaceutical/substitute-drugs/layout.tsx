import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildPharmaceuticalDatasetSchema, getPharmaceuticalDatasetMetadata } from "../seo/pharmaceuticalMetadata";

export const metadata: Metadata = getPharmaceuticalDatasetMetadata("substitute-drugs");

export default function SubstituteDrugsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildPharmaceuticalDatasetSchema("substitute-drugs")} />{children}</>;
}
