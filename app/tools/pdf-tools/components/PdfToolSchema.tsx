interface PdfToolSchemaProps {
  schema: Record<string, unknown>;
}

export default function PdfToolSchema({ schema }: PdfToolSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}