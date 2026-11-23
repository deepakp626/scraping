import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildEcommerceDatasetSchema,
  getEcommerceDatasetMetadata,
} from "../seo/ecommerceMetaData";

export const metadata: Metadata =
  getEcommerceDatasetMetadata("reviews-ratings");

export default function ReviewsRatingsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema
        schema={buildEcommerceDatasetSchema("reviews-ratings")}
      />
      {children}
    </>
  );
}
