interface ConverterToolsSchemaProps {
  schema: Record<string, unknown>;
}

export default function ConverterToolsSchema({
  schema,
}: ConverterToolsSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
