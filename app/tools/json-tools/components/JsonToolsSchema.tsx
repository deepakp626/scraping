interface JsonToolsSchemaProps {
  schema: Record<string, unknown>;
}

export default function JsonToolsSchema({ schema }: JsonToolsSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}