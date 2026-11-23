import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildLiquorDatasetSchema, getLiquorDatasetMetadata } from "../seo/liquorMetadata";

export const metadata: Metadata = getLiquorDatasetMetadata("market-trends");
export default function MarketTrendsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildLiquorDatasetSchema("market-trends")} />{children}</>;
}
