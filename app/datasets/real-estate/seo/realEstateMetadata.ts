import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/real-estate`;

const datasetSeo = {
  "property-listings": {
    name: "Real Estate Property Listings Dataset",
    title: "Real Estate Property Listings Dataset | CompilePilot",
    description:
      "Explore real estate property listing data, including property attributes, asking prices, locations, and listing details for market research and analysis.",
    image: "real-estate-property-listings-og-image.webp",
    variableMeasured: ["property type", "property location", "listing status", "property attributes"],
  },
  "price-trends": {
    name: "Real Estate Price Trends Dataset",
    title: "Real Estate Price Trends Dataset | CompilePilot Data",
    description:
      "Explore real estate price trend data across property markets, with historical pricing indicators and market movements for research, analysis, and planning.",
    image: "real-estate-price-trends-og-image.webp",
    variableMeasured: ["property price", "price change", "property type", "observation date"],
  },
  "location-insights": {
    name: "Real Estate Location Insights Dataset",
    title: "Real Estate Location Insights Dataset | CompilePilot Data",
    description:
      "Explore real estate location data covering neighborhood attributes, local amenities, and geographic context for property research and market analysis.",
    image: "real-estate-location-insights-og-image.webp",
    variableMeasured: ["neighborhood attributes", "local amenities"],
  },
  "agent-profiles": {
    name: "Real Estate Agent Profiles Dataset",
    title: "Real Estate Agent Profiles Dataset | CompilePilot Data",
    description:
      "Explore real estate agent profile data, including professional details, agency affiliations, service areas, and related attributes for market research.",
    image: "real-estate-agent-profiles-og-image.webp",
    variableMeasured: ["agent name", "agency affiliation", "professional profile attributes"],
  },
  "rental-yields": {
    name: "Real Estate Rental Yields Dataset",
    title: "Real Estate Rental Yields Dataset | CompilePilot Data",
    description:
      "Explore real estate rental yield data with property-level rental and price indicators to support investment research, market comparisons, and analysis.",
    image: "real-estate-rental-yields-og-image.webp",
    variableMeasured: ["rental price", "property price", "rental yield", "property location"],
  },
  "project-data": {
    name: "Real Estate Project Data Dataset",
    title: "Real Estate Project Data Dataset | CompilePilot Data",
    description:
      "Explore real estate project data, including development details, project locations, property types, and status indicators for market research and analysis.",
    image: "real-estate-project-data-og-image.webp",
    variableMeasured: ["project name", "project location", "project status"],
  },
  "market-reports": {
    name: "Real Estate Market Reports Dataset",
    title: "Real Estate Market Reports Dataset | CompilePilot Data",
    description:
      "Explore real estate market report data with regional indicators, pricing context, and market summaries for property research, comparison, and analysis.",
    image: "real-estate-market-reports-og-image.webp",
    variableMeasured: ["market area", "report date", "pricing metrics"],
  },
  availability: {
    name: "Real Estate Availability Dataset",
    title: "Real Estate Availability Dataset | CompilePilot Data",
    description:
      "Explore real estate property availability data, including listing status, property type, location, and availability indicators for market research. Data analysis",
    image: "real-estate-availability-og-image.webp",
    imageAlt: "Real estate availability dataset",
    schemaDescription:
      "A dataset of real estate availability for research and analysis. Confirm actual fields, geographic coverage, time range, and update frequency against the published dataset before deployment.",
    keywords: [
      "real estate availability",
      "real estate dataset",
      "property market research",
      "real estate market analysis",
    ],
    variableMeasured: [
      "property location",
      "property type",
      "listing status",
      "availability date",
    ],
    includedInDataCatalog: true,
  },
} as const;

export type RealEstateDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: RealEstateDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getRealEstateDatasetMetadata(
  slug: RealEstateDatasetSlug,
): Metadata {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);
  const image = `${datasetsUrl}/${dataset.image}`;
  const imageAlt =
    "imageAlt" in dataset ? dataset.imageAlt : `${dataset.name} - CompilePilot`;

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
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.title,
      description: dataset.description,
      images: [image],
    },
  };
}

export function buildRealEstateDatasetSchema(slug: RealEstateDatasetSlug) {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);
  const schemaDescription =
    "schemaDescription" in dataset ? dataset.schemaDescription : dataset.description;
  const datasetSchema: Record<string, unknown> = {
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: dataset.name,
    description: schemaDescription,
    url,
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "CompilePilot",
      url: `${siteUrl}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "CompilePilot",
      url: `${siteUrl}/`,
    },
    isPartOf: { "@id": `${siteUrl}/#website` },
    variableMeasured: dataset.variableMeasured,
  };

  if ("keywords" in dataset) {
    datasetSchema.keywords = dataset.keywords;
  }
  if ("includedInDataCatalog" in dataset && dataset.includedInDataCatalog) {
    datasetSchema.includedInDataCatalog = {
      "@type": "DataCatalog",
      name: "CompilePilot Datasets",
      url: `${siteUrl}/datasets`,
    };
  }

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
      datasetSchema,
    ],
  };
}
