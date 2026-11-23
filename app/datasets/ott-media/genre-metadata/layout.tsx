import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildOttMediaDatasetSchema, getOttMediaDatasetMetadata } from "../seo/ottMediaMetadata";

export const metadata: Metadata = getOttMediaDatasetMetadata("genre-metadata");

export default function GenreMetadataLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildOttMediaDatasetSchema("genre-metadata")} />{children}</>;
}
