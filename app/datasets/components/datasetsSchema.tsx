interface DatasetsSchemaProps {
  schema: Record<string, unknown>;
}

export default function DatasetsSchema({ schema }: DatasetsSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
