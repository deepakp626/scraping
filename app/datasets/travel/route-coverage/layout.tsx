import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildTravelDatasetSchema,
  getTravelDatasetMetadata,
} from "../seo/travelMetadata";

export const metadata: Metadata = getTravelDatasetMetadata("route-coverage");

export default function RouteCoverageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildTravelDatasetSchema("route-coverage")} />
      {children}
    </>
  );
}
