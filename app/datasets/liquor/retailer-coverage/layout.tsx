import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildLiquorDatasetSchema, getLiquorDatasetMetadata } from "../seo/liquorMetadata";

export const metadata: Metadata = getLiquorDatasetMetadata("retailer-coverage");
export default function RetailerCoverageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildLiquorDatasetSchema("retailer-coverage")} />{children}</>;
}
