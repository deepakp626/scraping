import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildOttMediaDatasetSchema, getOttMediaDatasetMetadata } from "../seo/ottMediaMetadata";

export const metadata: Metadata = getOttMediaDatasetMetadata("trending-titles");

export default function TrendingTitlesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildOttMediaDatasetSchema("trending-titles")} />{children}</>;
}
