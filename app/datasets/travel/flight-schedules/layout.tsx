import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import {
  buildTravelDatasetSchema,
  getTravelDatasetMetadata,
} from "../seo/travelMetadata";

export const metadata: Metadata = getTravelDatasetMetadata("flight-schedules");

export default function FlightSchedulesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <DatasetsSchema schema={buildTravelDatasetSchema("flight-schedules")} />
      {children}
    </>
  );
}
