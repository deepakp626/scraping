import type { Metadata } from "next";
import type { ConverterTool } from "../components/ConverterToolsSection";

const pageUrl = "https://compilepilot.com/tools/converter-tools";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/converter-tools-og-image.png";

const pageTitle = "Free Online File Converters | CompilePilot";
const pageDescription =
  "Convert files online with CompilePilot. Explore free online converters for common file formats and transform supported files with simple tools for everyday workflows.";
const socialTitle = "Online File Converters | Convert Files – CompilePilot";
const socialDescription =
  "Explore CompilePilot’s online file converters to change supported files between common formats with convenient tools for everyday workflows.";

export const converterToolsLandingMetadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "CompilePilot",
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "CompilePilot online file converters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [ogImage],
  },
};

export function buildConverterToolsLandingSchema(
  tools: readonly Pick<ConverterTool, "name" | "link">[],
) {
  const sortedTools = [...tools].sort((a, b) => a.name.localeCompare(b.name));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${pageUrl}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name: "CompilePilot Converter Tools",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: sortedTools.length,
        itemListElement: sortedTools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          url: new URL(tool.link, siteUrl).toString(),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "CompilePilot",
      },
    ],
  };
}
