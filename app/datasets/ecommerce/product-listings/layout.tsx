import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildEcommerceDatasetSchema,
  getEcommerceDatasetMetadata,
} from "../seo/ecommerceMetaData";

export const metadata: Metadata =
  getEcommerceDatasetMetadata("product-listings");

export default function ProductListingsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema
        schema={buildEcommerceDatasetSchema("product-listings")}
      />
      {children}
    </>
  );
}
