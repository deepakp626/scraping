import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildPharmaceuticalDatasetSchema, getPharmaceuticalDatasetMetadata } from "../seo/pharmaceuticalMetadata";

export const metadata: Metadata = getPharmaceuticalDatasetMetadata("market-trends");

export default function MarketTrendsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildPharmaceuticalDatasetSchema("market-trends")} />{children}</>;
}
