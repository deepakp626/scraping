import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildLiquorDatasetSchema, getLiquorDatasetMetadata } from "../seo/liquorMetadata";

export const metadata: Metadata = getLiquorDatasetMetadata("availability");
export default function AvailabilityLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildLiquorDatasetSchema("availability")} />{children}</>;
}
