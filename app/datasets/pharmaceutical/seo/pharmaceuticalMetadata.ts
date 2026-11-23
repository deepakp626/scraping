import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const pharmaceuticalUrl = `${siteUrl}/datasets/pharmaceutical`;
const datasetCatalogUrl = `${siteUrl}/dataset`;

const pharmaceuticalSeo = {
  "drug-listings": {
    name: "Pharmaceutical Drug Listings",
    title: "Pharmaceutical Drug Listings Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical drug listings data, including product names, dosage forms, strengths, ingredients, and product identifiers for industry research and analysis.",
    image: "pharmaceutical-drug-listings-og-image.webp",
    variableMeasured: [
      "drug name",
      "brand name",
      "active ingredient",
      "dosage form",
      "strength",
      "product identifier",
    ],
  },
  "price-comparison": {
    name: "Pharmaceutical Price Comparison",
    title: "Pharmaceutical Price Comparison Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical price comparison data across products, manufacturers, strengths, and markets for pricing research and industry analysis.",
    image: "pharmaceutical-price-comparison-og-image.webp",
    variableMeasured: [
      "drug name",
      "brand or generic status",
      "manufacturer",
      "strength",
      "listed price",
      "currency",
      "market",
    ],
  },
  availability: {
    name: "Pharmaceutical Availability",
    title: "Pharmaceutical Availability Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical availability data, including drug products, market locations, supplier details, and stock status for market research and analysis.",
    image: "pharmaceutical-availability-og-image.webp",
    variableMeasured: [
      "drug name",
      "product identifier",
      "market location",
      "supplier",
      "availability status",
      "stock date",
    ],
  },
  "manufacturer-data": {
    name: "Pharmaceutical Manufacturer Data",
    title: "Pharmaceutical Manufacturer Data Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical manufacturer data, including company profiles, product portfolios, manufacturing locations, and organization attributes for industry research.",
    image: "pharmaceutical-manufacturer-data-og-image.webp",
    variableMeasured: [
      "manufacturer name",
      "manufacturer identifier",
      "headquarters location",
      "manufacturing location",
      "product portfolio",
      "organization attributes",
    ],
  },
  "approval-status": {
    name: "Pharmaceutical Approval Status",
    title: "Pharmaceutical Approval Status Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical approval status data, including drug products, regulatory authorities, approval dates, jurisdictions, and status attributes for research.",
    image: "pharmaceutical-approval-status-og-image.webp",
    variableMeasured: [
      "drug name",
      "product identifier",
      "regulatory authority",
      "approval status",
      "approval date",
      "jurisdiction",
    ],
  },
  "therapeutic-class": {
    name: "Pharmaceutical Therapeutic Class",
    title: "Pharmaceutical Therapeutic Class Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical therapeutic class data, including drug names, therapeutic categories, classification codes, and ingredient attributes for industry research.",
    image: "pharmaceutical-therapeutic-class-og-image.webp",
    variableMeasured: [
      "drug name",
      "active ingredient",
      "therapeutic class",
      "classification code",
      "dosage form",
      "product identifier",
    ],
  },
  "market-trends": {
    name: "Pharmaceutical Market Trends",
    title: "Pharmaceutical Market Trends Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical market trends data, including product categories, market periods, pricing indicators, and geographic attributes for industry analysis.",
    image: "pharmaceutical-market-trends-og-image.webp",
    variableMeasured: [
      "market period",
      "product category",
      "market",
      "price indicator",
      "volume indicator",
      "growth measure",
    ],
  },
  "substitute-drugs": {
    name: "Pharmaceutical Substitute Drugs",
    title: "Pharmaceutical Substitute Drugs Dataset | CompilePilot Data",
    description:
      "Explore pharmaceutical substitute drug data, including product names, active ingredients, strengths, dosage forms, and product relationships for research.",
    image: "pharmaceutical-substitute-drugs-og-image.webp",
    variableMeasured: [
      "drug name",
      "substitute drug name",
      "active ingredient",
      "strength",
      "dosage form",
      "product relationship",
    ],
  },
} as const;

export type PharmaceuticalDatasetSlug = keyof typeof pharmaceuticalSeo;

export const pharmaceuticalCatalogMetadata: Metadata = {
  title: { absolute: "Pharmaceutical Datasets | CompilePilot Data" },
  description:
    "Explore pharmaceutical datasets covering drug information, pricing, availability, manufacturers, and market attributes for healthcare research and industry analysis.",
  alternates: { canonical: pharmaceuticalUrl },
  openGraph: {
    title: "Pharmaceutical Datasets | CompilePilot Data",
    description:
      "Explore pharmaceutical datasets covering drug information, pricing, availability, manufacturers, and market attributes for healthcare research and industry analysis.",
    url: pharmaceuticalUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: `${pharmaceuticalUrl}/pharmaceutical-datasets-og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Pharmaceutical Datasets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmaceutical Datasets | CompilePilot Data",
    description:
      "Explore pharmaceutical datasets covering drug information, pricing, availability, manufacturers, and market attributes for healthcare research and industry analysis.",
    images: [`${pharmaceuticalUrl}/pharmaceutical-datasets-og-image.webp`],
  },
};

function getPageUrl(slug: PharmaceuticalDatasetSlug) {
  return `${pharmaceuticalUrl}/${slug}`;
}

export function getPharmaceuticalDatasetMetadata(
  slug: PharmaceuticalDatasetSlug,
): Metadata {
  const dataset = pharmaceuticalSeo[slug];
  const url = getPageUrl(slug);
  const image = `${pharmaceuticalUrl}/${dataset.image}`;

  return {
    title: { absolute: dataset.title },
    description: dataset.description,
    alternates: { canonical: url },
    openGraph: {
      title: dataset.title,
      description: dataset.description,
      url,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: dataset.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.title,
      description: dataset.description,
      images: [image],
    },
  };
}

export function buildPharmaceuticalCatalogSchema() {
  const itemListElement = Object.keys(pharmaceuticalSeo).map((slug, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: pharmaceuticalSeo[slug as PharmaceuticalDatasetSlug].name,
    url: `${pharmaceuticalUrl}/${slug}`,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pharmaceuticalUrl}#webpage`,
        url: pharmaceuticalUrl,
        name: "Pharmaceutical Datasets | CompilePilot Data",
        description:
          "Explore pharmaceutical datasets covering drug information, pricing, availability, manufacturers, and market attributes for healthcare research and industry analysis.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pharmaceuticalUrl}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${pharmaceuticalUrl}#itemlist`,
        name: "Pharmaceutical Datasets",
        description:
          "Explore pharmaceutical datasets covering drug information, pricing, availability, manufacturers, and market attributes for healthcare research and industry analysis.",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: itemListElement.length,
        itemListElement,
      },
    ],
  };
}

export function buildPharmaceuticalDatasetSchema(
  slug: PharmaceuticalDatasetSlug,
) {
  const dataset = pharmaceuticalSeo[slug];
  const url = getPageUrl(slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: dataset.title,
        description: dataset.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${url}#dataset` },
      },
      {
        "@type": "Dataset",
        "@id": `${url}#dataset`,
        name: dataset.name,
        description: dataset.description,
        url,
        creator: {
          "@type": "Organization",
          name: "CompilePilot",
          url: siteUrl,
        },
        includedInDataCatalog: {
          "@type": "DataCatalog",
          name: "CompilePilot Datasets",
          url: datasetCatalogUrl,
        },
        variableMeasured: [...dataset.variableMeasured],
        isPartOf: {
          "@type": "DataCatalog",
          name: "Pharmaceutical Datasets",
          url: pharmaceuticalUrl,
        },
      },
    ],
  };
}
