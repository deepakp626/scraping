interface ImageToolSchemaProps {
  schema: Record<string, unknown>;
}

export default function ImageToolSchema({ schema }: ImageToolSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
