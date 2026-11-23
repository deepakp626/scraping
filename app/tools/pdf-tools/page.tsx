import type { Metadata } from "next";
import PdfToolsSection, { pdfTools } from "./components/PdfToolsSection";

const pageUrl = "https://compilepilot.com/tools/pdf-tools";

export const metadata: Metadata = {
  title: "Free Online PDF Tools & Converters | CompilePilot",
  description:
    "Use free online PDF tools to merge, split, compress, convert, rotate, unlock, sign and edit PDF files. Manage documents quickly with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Free PDF Tools & Online PDF Converters | CompilePilot",
    description:
      "Explore free PDF tools to merge, split, compress, convert, rotate, unlock, sign, add watermarks, extract pages and images, and perform OCR. Manage PDF documents online with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/pdf-tools-og-image.png",
        width: 1200,
        height: 630,
        alt: "Free online PDF tools and converters by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Tools & Online PDF Converters | CompilePilot",
    description:
      "Use CompilePilot's online PDF tools to merge, split, compress, convert, rotate, sign and edit PDF files. Manage documents quickly and easily.",
    images: ["https://compilepilot.com/pdf-tools-og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Free Online PDF Tools & Converters | CompilePilot",
      description:
        "Use free online PDF tools to merge, split, compress, convert, rotate, unlock, sign and edit PDF files. Manage documents quickly with CompilePilot.",
      isPartOf: {
        "@id": "https://compilepilot.com/#website",
      },
      mainEntity: {
        "@id": `${pageUrl}#pdftools`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#pdftools`,
      name: "Online PDF Tools",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: pdfTools.length,
      itemListElement: pdfTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
      })),
    },
  ],
};

export default function PdfToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PdfToolsSection />
    </>
  );
}