import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/food-delivery`;

const datasetSeo = {
  "platform-listings": {
    name: "Food Delivery Platform Listings Dataset",
    title: "Food Delivery Platform Listings Dataset | CompilePilot",
    description:
      "Explore food delivery platform listings, provider details, service areas, and features. Use structured data to research delivery markets and compare platforms.",
    openGraphTitle:
      "Food Delivery Platform Listings Dataset | CompilePilot",
    openGraphDescription:
      "Explore food delivery platform listings, provider details, service areas, and features. Use structured data to research delivery markets and compare platforms.",
    twitterTitle:
      "Food Delivery Platform Listings Dataset | CompilePilot",
    twitterDescription:
      "Explore food delivery platform listings, provider details, service areas, and features. Use structured data to research delivery markets and compare platforms.",
    image: "food-delivery-platform-listings-og-image.webp",
    variableMeasured: [
      "Food delivery platform name or identifier",
      "Platform website or public profile reference, where available",
      "Service-area or geographic coverage reference",
      "Delivery service or ordering channel attributes, where available",
      "Supported cuisine, restaurant, or merchant categories, where available",
      "Platform listing or operating status, where available",
      "Source or observation timestamp, where available",
    ],
  },
  "delivery-fees": {
    name: "Food Delivery Fees Dataset",
    title: "Food Delivery Fees Dataset | Delivery Cost Insights",
    description:
      "Explore food delivery fees, service charges, platform details, and location context. Compare costs and research pricing patterns with structured records.",
    openGraphTitle: "Food Delivery Fees Dataset | Delivery Cost Insights",
    openGraphDescription:
      "Explore food delivery fees, service charges, platform details, and location context. Compare costs and research pricing patterns with structured records.",
    twitterTitle: "Food Delivery Fees Dataset | Delivery Cost Insights",
    twitterDescription:
      "Explore food delivery fees, service charges, platform details, and location context. Compare costs and research pricing patterns with structured records.",
    image: "food-delivery-delivery-fees-og-image.webp",
    variableMeasured: [
      "Delivery fee amount and currency, where available",
      "Service charge or additional fee, where available",
      "Food delivery platform or provider identifier",
      "Restaurant or merchant reference, where available",
      "Delivery location or service-area reference, where available",
      "Order value threshold or fee condition, where available",
      "Fee type or pricing rule, where available",
      "Observation timestamp and source identifier",
    ],
  },
  "order-volume": {
    name: "Food Delivery Order Volume Dataset",
    title: "Food Delivery Order Volume Dataset | CompilePilot Data",
    description:
      "Explore food delivery order volume, platform trends, and locations. Research demand patterns and compare activity across delivery markets using structured data.",
    openGraphTitle: "Food Delivery Order Volume Dataset | CompilePilot Data",
    openGraphDescription:
      "Explore food delivery order volume, platform trends, and locations. Research demand patterns and compare activity across delivery markets using structured data.",
    twitterTitle: "Food Delivery Order Volume Dataset | CompilePilot Data",
    twitterDescription:
      "Explore food delivery order volume, platform trends, and locations. Research demand patterns and compare activity across delivery markets using structured data.",
    image: "food-delivery-order-volume-og-image.webp",
    variableMeasured: [
      "Order volume or order count",
      "Measurement period or reporting interval",
      "Food delivery platform or provider identifier",
      "Restaurant, merchant, or category reference, where available",
      "Geographic or service-area reference, where available",
      "Order status or order segment, where available",
      "Observation timestamp and source identifier",
    ],
  },
  "menu-pricing": {
    name: "Food Delivery Menu Pricing Dataset",
    title: "Food Delivery Menu Pricing Dataset | CompilePilot Data",
    description:
      "Explore food delivery menu prices, item details, restaurant references, and locations. Compare menu costs and research pricing patterns across delivery markets.",
    openGraphTitle: "Food Delivery Menu Pricing Dataset | CompilePilot Data",
    openGraphDescription:
      "Explore food delivery menu prices, item details, restaurant references, and locations. Compare menu costs and research pricing patterns across delivery markets.",
    twitterTitle: "Food Delivery Menu Pricing Dataset | CompilePilot Data",
    twitterDescription:
      "Explore food delivery menu prices, item details, restaurant references, and locations. Compare menu costs and research pricing patterns across delivery markets.",
    image: "food-delivery-menu-pricing-og-image.webp",
    variableMeasured: [
      "Menu item name or identifier",
      "Restaurant or merchant identifier",
      "Menu category or item classification, where available",
      "Platform or ordering channel reference, where available",
      "Location or service-area reference, where available",
      "Observation timestamp and source identifier",
    ],
  },
  "eta-data": {
    name: "Food Delivery ETA Dataset",
    title: "Food Delivery ETA Dataset | Estimated Arrival Data",
    description:
      "Explore food delivery ETA records, estimated arrival times, platform details, and location context. Research delivery timing patterns across service areas.",
    openGraphTitle: "Food Delivery ETA Dataset | Estimated Arrival Data",
    openGraphDescription:
      "Explore food delivery ETA records, estimated arrival times, platform details, and location context. Research delivery timing patterns across service areas.",
    twitterTitle: "Food Delivery ETA Dataset | Estimated Arrival Data",
    twitterDescription:
      "Explore food delivery ETA records, estimated arrival times, platform details, and location context. Research delivery timing patterns across service areas.",
    image: "food-delivery-eta-data-og-image.webp",
    variableMeasured: [
      "Estimated arrival time or ETA value",
      "ETA observation or calculation timestamp",
      "Food delivery platform or provider identifier",
      "Order or delivery reference, where available",
      "Service area or geographic reference, where available",
      "Delivery status or timing category, where available",
    ],
  },
  promotions: {
    name: "Food Delivery Promotions Dataset",
    title: "Food Delivery Promotions Dataset | Platform Offer Data",
    description:
      "Explore food delivery promotions, discount details, eligibility conditions, and platform references. Research offer structures and compare promotional patterns.",
    openGraphTitle: "Food Delivery Promotions Dataset | Platform Offer Data",
    openGraphDescription:
      "Explore food delivery promotions, discount details, eligibility conditions, and platform references. Research offer structures and compare promotional patterns.",
    twitterTitle: "Food Delivery Promotions Dataset | Platform Offer Data",
    twitterDescription:
      "Explore food delivery promotions, discount details, eligibility conditions, and platform references. Research offer structures and compare promotional patterns.",
    image: "food-delivery-promotions-og-image.webp",
    variableMeasured: [
      "Promotion or offer identifier",
      "Discount value, type, and currency, where available",
      "Promotion start and end dates, where available",
      "Eligibility rules or minimum order conditions, where available",
      "Food delivery platform or merchant reference",
      "Applicable location or service-area reference, where available",
      "Observation timestamp and source identifier",
    ],
  },
  "restaurant-rank": {
    name: "Food Delivery Restaurant Rankings Dataset",
    title: "Food Delivery Restaurant Rankings Dataset | CompilePilot",
    description:
      "Explore food delivery restaurant ranking data, restaurant details, platform references, and location context. Research ranking patterns across delivery markets.",
    openGraphTitle:
      "Food Delivery Restaurant Rankings Dataset | CompilePilot",
    openGraphDescription:
      "Explore food delivery restaurant ranking data, restaurant details, platform references, and location context. Research ranking patterns across delivery markets.",
    twitterTitle:
      "Food Delivery Restaurant Rankings Dataset | CompilePilot",
    twitterDescription:
      "Explore food delivery restaurant ranking data, restaurant details, platform references, and location context. Research ranking patterns across delivery markets.",
    image: "food-delivery-restaurant-rank-og-image.webp",
    variableMeasured: [
      "Restaurant or merchant identifier",
      "Ranking position or score, where available",
      "Food delivery platform or ranking source",
      "Ranking category or measurement period, where available",
      "Restaurant cuisine or category reference, where available",
      "Location or service-area reference, where available",
      "Observation timestamp and source identifier",
    ],
  },
  "zone-coverage": {
    name: "Food Delivery Zone Coverage Dataset",
    title: "Food Delivery Zone Coverage Dataset | Service Areas",
    description:
      "Explore food delivery zone coverage, platform details, service areas, and location data. Research geographic availability patterns across delivery markets.",
    openGraphTitle: "Food Delivery Zone Coverage Dataset | Service Areas",
    openGraphDescription:
      "Explore food delivery zone coverage, platform details, service areas, and location data. Research geographic availability patterns across delivery markets.",
    twitterTitle: "Food Delivery Zone Coverage Dataset | Service Areas",
    twitterDescription:
      "Explore food delivery zone coverage, platform details, service areas, and location data. Research geographic availability patterns across delivery markets.",
    image: "food-delivery-zone-coverage-og-image.webp",
    variableMeasured: [
      "Delivery zone or service-area identifier",
      "Food delivery platform or provider reference",
      "Geographic boundary or location descriptor, where available",
      "Restaurant or merchant coverage reference, where available",
      "Zone status or coverage classification, where available",
      "Observation timestamp and source identifier",
    ],
  },
} as const;

export type FoodDeliveryDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: FoodDeliveryDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getFoodDeliveryDatasetMetadata(
  slug: FoodDeliveryDatasetSlug,
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

export function buildFoodDeliveryDatasetSchema(
  slug: FoodDeliveryDatasetSlug,
) {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: dataset.name,
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
          url: `${siteUrl}/`,
        },
        isPartOf: { "@id": `${siteUrl}/#website` },
        variableMeasured: dataset.variableMeasured,
      },
    ],
  };
}
