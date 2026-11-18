import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/epub-to-mobi";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/epub-to-mobi-og-image.png";

const pageTitle = "EPUB to MOBI Converter Online | CompilePilot";
const pageDescription =
  "Convert EPUB ebooks to MOBI format with CompilePilot. Check file compatibility and conversion results before using the converted ebook on your reading device.";
const socialTitle = "EPUB to MOBI Converter – CompilePilot";
const socialDescription =
  "Convert supported EPUB ebook files to MOBI format with CompilePilot’s online converter.";

export const epubToMobiSeo = {
  metadata: {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "EPUB to MOBI Converter - CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
  } satisfies Metadata,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${pageUrl}#webapp` },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapp`,
        name: "EPUB to MOBI Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: ["EPUB input", "MOBI output"],
        isPartOf: { "@id": `${siteUrl}#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "CompilePilot",
      },
    ],
  },
};
