import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildEcommerceDatasetSchema,
  getEcommerceDatasetMetadata,
} from "../seo/ecommerceMetaData";

export const metadata: Metadata =
  getEcommerceDatasetMetadata("category-taxonomy");

export default function CategoryTaxonomyLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema
        schema={buildEcommerceDatasetSchema("category-taxonomy")}
      />
      {children}
    </>
  );
}
