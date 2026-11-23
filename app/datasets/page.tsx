import type { Metadata } from "next";
import DatasetsSchema from "./components/datasetsSchema";
import DatasetPageClient from "./DatasetPageClient";
import { buildDatasetsSchema, datasetsMetadata } from "./seo/datasets";

export const metadata: Metadata = datasetsMetadata;

export default function DatasetsPage() {
  return (
    <>
      <DatasetsSchema schema={buildDatasetsSchema()} />
      <DatasetPageClient />
    </>
  );
}
