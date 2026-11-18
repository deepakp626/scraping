import type { Metadata } from "next";
import { imageToolsListing } from "../components/ImageToolsSection";
import { addWatermarkSeo } from "./add-watermark";
import { addTextSeo } from "./add-text";
import { blurImageSeo } from "./blur-image";
import { changeFormatSeo } from "./change-format";
import { colorAdjustSeo } from "./color-adjust";
import { compressImageSeo } from "./compress-image";
import { convertJpgSeo } from "./convert-jpg";
import { convertPngSeo } from "./convert-png";
import { convertWebpSeo } from "./convert-webp";
import { cropImageSeo } from "./crop-image";
import { enhanceImageSeo } from "./enhance-image";
import { flipHorizontalSeo } from "./flip-horizontal";
import { flipVerticalSeo } from "./flip-vertical";
import { imageToPdfSeo } from "./image-to-pdf";
import { mergeImagesSeo } from "./merge-images";
import { pdfToImagesSeo } from "./pdf-to-images";
import { removeBgSeo } from "./remove-bg";
import { resizeImageSeo } from "./resize-image";
import { rotateImageSeo } from "./rotate-image";
import { sharpenImageSeo } from "./sharpen-image";
import { splitImageSeo } from "./split-image";

const imageToolSeo = {
  "add-text": addTextSeo,
  "add-watermark": addWatermarkSeo,
  "blur-image": blurImageSeo,
  "change-format": changeFormatSeo,
  "color-adjust": colorAdjustSeo,
  "compress-image": compressImageSeo,
  "convert-jpg": convertJpgSeo,
  "convert-png": convertPngSeo,
  "convert-webp": convertWebpSeo,
  "crop-image": cropImageSeo,
  "enhance-image": enhanceImageSeo,
  "flip-horizontal": flipHorizontalSeo,
  "flip-vertical": flipVerticalSeo,
  "image-to-pdf": imageToPdfSeo,
  "merge-images": mergeImagesSeo,
  "pdf-to-images": pdfToImagesSeo,
  "remove-bg": removeBgSeo,
  "resize-image": resizeImageSeo,
  "rotate-image": rotateImageSeo,
  "sharpen-image": sharpenImageSeo,
  "split-image": splitImageSeo,
};

export function getImageToolSeo(slug: string) {
  return imageToolSeo[slug as keyof typeof imageToolSeo];
}

const pageUrl = "https://compilepilot.com/tools/image-tools";
const imageUrl = "https://compilepilot.com/tools/image-tools/image-tools-og-image.png";

export const imageToolsSeo = {
  metadata: {
    title: "Free Online Image Tools & Editors | CompilePilot",
    description:
      "Edit images online with free tools to compress, resize, crop, convert, rotate, enhance, watermark and more. Explore CompilePilot’s image tools in one place.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Online Image Tools & Editors | CompilePilot",
      description:
        "Explore online image tools for compression, resizing, cropping, format conversion, rotation, background removal, enhancement, watermarks and more.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image tools collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Online Image Tools & Editors | CompilePilot",
      description:
        "Compress, resize, crop, convert, rotate, enhance and edit images online with CompilePilot’s collection of image tools.",
      images: [imageUrl],
    },
  } satisfies Metadata,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Free Online Image Tools & Editors | CompilePilot",
        description:
          "Explore CompilePilot’s collection of online image tools for editing, resizing, compressing, converting and enhancing images.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        mainEntity: {
          "@id": `${pageUrl}#itemlist`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#itemlist`,
        name: "CompilePilot Image Tools",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: imageToolsListing.length,
        itemListElement: imageToolsListing.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
        })),
      },
    ],
  },
};
