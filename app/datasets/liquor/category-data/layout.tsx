import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildLiquorDatasetSchema, getLiquorDatasetMetadata } from "../seo/liquorMetadata";

export const metadata: Metadata = getLiquorDatasetMetadata("category-data");
export default function CategoryDataLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildLiquorDatasetSchema("category-data")} />{children}</>;
}
