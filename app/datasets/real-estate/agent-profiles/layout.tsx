import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildRealEstateDatasetSchema, getRealEstateDatasetMetadata } from "../seo/realEstateMetadata";
export const metadata: Metadata = getRealEstateDatasetMetadata("agent-profiles");
export default function AgentProfilesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildRealEstateDatasetSchema("agent-profiles")} />{children}</>;
}
