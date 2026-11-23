import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildPharmaceuticalCatalogSchema,
  pharmaceuticalCatalogMetadata,
} from "./seo/pharmaceuticalMetadata";

export const metadata: Metadata = pharmaceuticalCatalogMetadata;

export default function PharmaceuticalLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildPharmaceuticalCatalogSchema()} />
      {children}
    </>
  );
}
