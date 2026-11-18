import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/quick-commerce`;
const datasetCatalogUrl = `${siteUrl}/dataset`;

const datasetSeo = {
  "dark-store-data": {
    name: "Quick Commerce Dark Store Data",
    title:
      "Dark Store Data Dataset | Quick Commerce Store Intelligence – CompilePilot",
    schemaPageName:
      "Dark Store Data Dataset | Quick Commerce Store Intelligence – CompilePilot",
    schemaDescription:
      "Structured dark store records. Potential attributes include store identifiers, store locations, operating details, service areas, and store characteristics, subject to the fields actually supplied.",
    description:
      "Explore structured dark store data for quick commerce research. Organize available store identifiers, locations, operating details, service areas, and store attributes for retail and delivery network analysis.",
    openGraphTitle:
      "Quick Commerce Dark Store Data – Store Network Intelligence | CompilePilot",
    openGraphDescription:
      "Explore dark store records with available location, store, operating, and service-area attributes for quick commerce research.",
    twitterTitle: "Quick Commerce Dark Store Data – CompilePilot",
    twitterDescription:
      "Explore structured dark store location and operating data for quick commerce network and retail research.",
    image: "quick-commerce-dark-store-data-og-image.webp",
    variables: [
      "Dark store or location identifier, where available",
      "Store name or internal reference, where available",
      "Address and geographic coordinates, where available",
      "Operating status or operating hours, where available",
      "Delivery or service-area reference, where available",
      "Store attributes and observation timestamp, where available",
    ],
    includedInDataCatalog: true,
  },
  "delivery-slots": {
    name: "Quick Commerce Delivery Slots Dataset",
    title:
      "Quick Commerce Delivery Slots Dataset | Delivery Time Data – CompilePilot",
    schemaPageName:
      "Quick Commerce Delivery Slots Dataset | Delivery Time Data – CompilePilot",
    schemaDescription:
      "Structured quick commerce delivery slot observations. Potential attributes include delivery time windows, location or service-area references, slot availability status, and observation timestamps, subject to the fields actually supplied.",
    description:
      "Explore structured quick commerce delivery slot data for retail and logistics research. Organize available delivery windows, location references, service availability, and observation timestamps in supported formats.",
    openGraphTitle:
      "Quick Commerce Delivery Slots Dataset – Delivery Window Intelligence | CompilePilot",
    openGraphDescription:
      "Explore delivery slot records with available time windows, service-area references, availability status, and timestamped observations.",
    twitterTitle: "Quick Commerce Delivery Slots Dataset – CompilePilot",
    twitterDescription:
      "Explore structured delivery window and slot availability data for quick commerce and logistics research.",
    image: "quick-commerce-delivery-slots-og-image.webp",
    variables: [
      "Delivery slot or time-window identifier, where available",
      "Delivery date and start/end time, where available",
      "Store, location, or service-area reference",
      "Slot availability status, where available",
      "Delivery option or service type, where available",
      "Observation timestamp and source reference, where available",
    ],
    includedInDataCatalog: true,
  },
  "category-pricing": {
    name: "Quick Commerce Category Pricing Dataset",
    title:
      "Quick Commerce Category Pricing Dataset | Category-Level Price Data – CompilePilot",
    schemaPageName: "Quick Commerce Category Pricing Dataset",
    schemaDescription:
      "Explore structured quick commerce category pricing data for market and retail research. Analyze category-level price observations, product group references, platform context, and recorded timestamps in supported formats.",
    description:
      "Explore structured quick commerce category pricing data for market and retail research. Analyze category-level price observations, product group references, platform context, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Quick Commerce Category Pricing Dataset – Category Price Intelligence | CompilePilot",
    openGraphDescription:
      "Explore category-level pricing observations with product group references, platform context, and timestamped records for quick commerce research.",
    twitterTitle:
      "Quick Commerce Category Pricing Dataset – Category Price Intelligence | CompilePilot",
    twitterDescription:
      "Explore category-level pricing observations with product group references, platform context, and timestamped records for quick commerce research.",
    image: "quick-commerce-category-pricing-og-image.webp",
    variables: [
      "Category or taxonomy identifier",
      "Category name or hierarchy",
      "Observed price and currency, where available",
      "Platform or retailer reference",
      "Observation timestamp",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
  "brand-presence": {
    name: "Quick Commerce Brand Presence Dataset",
    title:
      "Quick Commerce Brand Presence Dataset | Brand Coverage Data – CompilePilot",
    schemaPageName: "Quick Commerce Brand Presence Dataset",
    schemaDescription:
      "Explore structured quick commerce brand presence data for retail and market research. Review brand references, category associations, platform coverage, and recorded observations in supported formats.",
    description:
      "Explore structured quick commerce brand presence data for retail and market research. Review brand references, category associations, platform coverage, and recorded observations in supported formats.",
    openGraphTitle:
      "Quick Commerce Brand Presence Dataset – Brand Coverage Intelligence | CompilePilot",
    openGraphDescription:
      "Explore brand presence records with brand identifiers, category associations, platform references, and timestamped observations.",
    twitterTitle:
      "Quick Commerce Brand Presence Dataset – Brand Coverage Intelligence | CompilePilot",
    twitterDescription:
      "Explore brand presence records with brand identifiers, category associations, platform references, and timestamped observations.",
    image: "quick-commerce-brand-presence-og-image.webp",
    variables: [
      "Brand name or identifier",
      "Associated category reference",
      "Platform or retailer reference",
      "Presence or listing indicator, where available",
      "Market or service-area reference, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
  "eta-tracking": {
    name: "Quick Commerce ETA Tracking Dataset",
    title:
      "Quick Commerce ETA Tracking Dataset | Delivery Estimate Data – CompilePilot",
    schemaPageName: "Quick Commerce ETA Tracking Dataset",
    schemaDescription:
      "Explore structured quick commerce estimated-time-of-arrival records for logistics and retail research. Organize ETA observations, delivery or order references, platform context, and timestamps in supported formats.",
    description:
      "Explore structured quick commerce estimated-time-of-arrival records for logistics and retail research. Organize ETA observations, delivery or order references, platform context, and timestamps in supported formats.",
    openGraphTitle:
      "Quick Commerce ETA Tracking Dataset – Delivery Estimate Intelligence | CompilePilot",
    openGraphDescription:
      "Explore estimated arrival records with order or delivery references, platform context, observed estimates, and timestamps.",
    twitterTitle:
      "Quick Commerce ETA Tracking Dataset – Delivery Estimate Intelligence | CompilePilot",
    twitterDescription:
      "Explore estimated arrival records with order or delivery references, platform context, observed estimates, and timestamps.",
    image: "quick-commerce-eta-tracking-og-image.webp",
    variables: [
      "Order or delivery reference, where available",
      "Estimated arrival time or duration",
      "ETA observation timestamp",
      "Platform or service reference",
      "Location or service-area reference, where available",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
  availability: {
    name: "Quick Commerce Availability Dataset",
    title:
      "Quick Commerce Availability Dataset | Product Availability Data – CompilePilot",
    schemaPageName: "Quick Commerce Availability Dataset",
    schemaDescription:
      "Explore structured quick commerce availability data for retail and operations research. Review product or category references, platform context, availability observations, and recorded timestamps in supported formats.",
    description:
      "Explore structured quick commerce availability data for retail and operations research. Review product or category references, platform context, availability observations, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Quick Commerce Availability Dataset – Product Availability Intelligence | CompilePilot",
    openGraphDescription:
      "Explore availability observations with product or category references, platform context, and timestamped records.",
    twitterTitle:
      "Quick Commerce Availability Dataset – Product Availability Intelligence | CompilePilot",
    twitterDescription:
      "Explore availability observations with product or category references, platform context, and timestamped records.",
    image: "quick-commerce-availability-og-image.webp",
    variables: [
      "Product or item identifier, where available",
      "Product or category reference",
      "Availability status or indicator",
      "Platform or retailer reference",
      "Location or service-area reference, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
  "platform-coverage": {
    name: "Quick Commerce Platform Coverage Dataset",
    title:
      "Quick Commerce Platform Coverage Dataset | Platform Reach Data – CompilePilot",
    schemaPageName: "Quick Commerce Platform Coverage Dataset",
    schemaDescription:
      "Explore structured quick commerce platform coverage data for market research and competitive analysis. Organize platform references, geographic or service-area coverage, category context, and recorded observations in supported formats.",
    description:
      "Explore structured quick commerce platform coverage data for market research and competitive analysis. Organize platform references, geographic or service-area coverage, category context, and recorded observations in supported formats.",
    openGraphTitle:
      "Quick Commerce Platform Coverage Dataset – Market Reach Intelligence | CompilePilot",
    openGraphDescription:
      "Explore platform coverage records with service-area references, category context, and timestamped observations.",
    twitterTitle:
      "Quick Commerce Platform Coverage Dataset – Market Reach Intelligence | CompilePilot",
    twitterDescription:
      "Explore platform coverage records with service-area references, category context, and timestamped observations.",
    image: "quick-commerce-platform-coverage-og-image.webp",
    variables: [
      "Platform name or identifier",
      "Geographic or service-area reference",
      "Category or market segment, where available",
      "Coverage indicator or status, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
  "demand-index": {
    name: "Quick Commerce Demand Index Dataset",
    title:
      "Quick Commerce Demand Index Dataset | Demand Signal Data – CompilePilot",
    schemaPageName: "Quick Commerce Demand Index Dataset",
    schemaDescription:
      "Explore structured quick commerce demand index data for retail planning and market research. Review demand indicators, product or category references, platform or location context, and recorded timestamps in supported formats.",
    description:
      "Explore structured quick commerce demand index data for retail planning and market research. Review demand indicators, product or category references, platform or location context, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Quick Commerce Demand Index Dataset – Demand Signal Intelligence | CompilePilot",
    openGraphDescription:
      "Explore demand index observations with category or product references, platform or location context, and timestamps.",
    twitterTitle:
      "Quick Commerce Demand Index Dataset – Demand Signal Intelligence | CompilePilot",
    twitterDescription:
      "Explore demand index observations with category or product references, platform or location context, and timestamps.",
    image: "quick-commerce-demand-index-og-image.webp",
    variables: [
      "Demand index value or signal, where available",
      "Product or category reference",
      "Platform or location context, where available",
      "Measurement period or observation timestamp",
      "Index methodology or source reference, where available",
      "Source or record identifier",
    ],
    includedInDataCatalog: false,
  },
} as const;

export type QuickCommerceDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: QuickCommerceDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getQuickCommerceDatasetMetadata(
  slug: QuickCommerceDatasetSlug,
): Metadata {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);
  const image = `${datasetsUrl}/${dataset.image}`;

  return {
    title: { absolute: dataset.title },
    description: dataset.description,
    alternates: { canonical: url },
    openGraph: {
      title: dataset.openGraphTitle,
      description: dataset.openGraphDescription,
      url,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${dataset.name} - CompilePilot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.twitterTitle,
      description: dataset.twitterDescription,
      images: [image],
    },
  };
}

export function buildQuickCommerceDatasetSchema(
  slug: QuickCommerceDatasetSlug,
) {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);
  const datasetSchema: Record<string, unknown> = {
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: dataset.name,
    description: dataset.schemaDescription,
    url,
    creator: {
      "@type": "Organization",
      name: "CompilePilot",
      url: `${siteUrl}/`,
    },
    variableMeasured: dataset.variables,
    isPartOf: dataset.includedInDataCatalog
      ? {
          "@type": "DataCatalog",
          name: "Quick Commerce Datasets",
          url: datasetsUrl,
        }
      : {
          "@id": `${siteUrl}/#website`,
        },
  };

  if (dataset.includedInDataCatalog) {
    datasetSchema.includedInDataCatalog = {
      "@type": "DataCatalog",
      name: "CompilePilot Datasets",
      url: datasetCatalogUrl,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: dataset.schemaPageName,
        description: dataset.description,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${url}#dataset`,
        },
      },
      datasetSchema,
    ],
  };
}
