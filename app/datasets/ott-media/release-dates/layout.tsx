import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildOttMediaDatasetSchema, getOttMediaDatasetMetadata } from "../seo/ottMediaMetadata";

export const metadata: Metadata = getOttMediaDatasetMetadata("release-dates");

export default function ReleaseDatesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildOttMediaDatasetSchema("release-dates")} />{children}</>;
}
