import type { Metadata } from "next";
import type { ReactNode } from "react";
import DatasetsSchema from "@/app/datasets/components/datasetsSchema";
import { buildOttMediaDatasetSchema, getOttMediaDatasetMetadata } from "../seo/ottMediaMetadata";

export const metadata: Metadata = getOttMediaDatasetMetadata("language-data");

export default function LanguageDataLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><DatasetsSchema schema={buildOttMediaDatasetSchema("language-data")} />{children}</>;
}
