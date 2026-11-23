import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/hotel`;

const datasetSeo = {
  "property-listings": {
    name: "Hotel Property Listings Dataset",
    title: "Hotel Property Listings Dataset | CompilePilot Data",
    description:
      "Explore hotel property listings, amenities, accommodation types, and locations. Research hospitality inventory and compare hotel attributes across lodging markets.",
    image: "hotel-property-listings-og-image.webp",
    variableMeasured: ["Property name", "Accommodation type", "Property location", "Amenities", "Property attributes"],
  },
  "rate-parity": {
    name: "Hotel Rate Parity Dataset",
    title: "Hotel Rate Parity Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel rate parity records, pricing comparisons, booking channels, and property details. Research price consistency across online travel platforms.",
    image: "hotel-rate-parity-og-image.webp",
    variableMeasured: ["Property identifier", "Rate amount", "Booking channel", "Rate comparison", "Currency"],
  },
  "guest-reviews": {
    name: "Hotel Guest Reviews Dataset",
    title: "Hotel Guest Reviews Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel guest reviews, ratings, feedback, and property details. Research guest sentiment and service experiences across hotels and booking platforms.",
    image: "hotel-guest-reviews-og-image.webp",
    variableMeasured: ["Property identifier", "Review rating", "Review text", "Review date", "Review source"],
  },
  availability: {
    name: "Hotel Availability Dataset",
    title: "Hotel Availability Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel availability records, property details, date ranges, and booking status. Research room inventory patterns across accommodation markets for hotels.",
    image: "hotel-availability-og-image.webp",
    variableMeasured: ["Property identifier", "Availability date", "Room type", "Availability status", "Inventory count"],
  },
  "amenities-data": {
    name: "Hotel Amenities Data Dataset",
    title: "Hotel Amenities Data Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel amenities, property features, facilities, and accommodation details. Compare listed amenities across properties and hospitality markets.",
    image: "hotel-amenities-data-og-image.webp",
    variableMeasured: ["Property identifier", "Amenity name", "Amenity category", "Amenity availability", "Property location"],
  },
  "ota-coverage": {
    name: "Hotel OTA Coverage Dataset",
    title: "Hotel OTA Coverage Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel OTA coverage, property listings, booking channels, and platform presence. Research hotel visibility across online travel platforms for hotels.",
    image: "hotel-ota-coverage-og-image.webp",
    variableMeasured: ["Property identifier", "OTA name", "Listing presence", "Booking channel", "Property location"],
  },
  "location-data": {
    name: "Hotel Location Data Dataset",
    title: "Hotel Location Data Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel location records, addresses, geographic attributes, and market details. Research accommodation distribution across regions and destinations.",
    image: "hotel-location-data-og-image.webp",
    variableMeasured: ["Property identifier", "Address", "City", "Region", "Country", "Geographic coordinates"],
  },
  "star-ratings": {
    name: "Hotel Star Ratings Dataset",
    title: "Hotel Star Ratings Dataset | CompilePilot Data Insights",
    description:
      "Explore hotel star ratings, property classifications, location details, and rating categories. Research classification patterns across hospitality markets.",
    image: "hotel-star-ratings-og-image.webp",
    variableMeasured: ["Property identifier", "Star rating", "Rating category", "Property type", "Property location"],
  },
} as const;

export type HotelDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: HotelDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getHotelDatasetMetadata(slug: HotelDatasetSlug): Metadata {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);
  const image = `${datasetsUrl}/${dataset.image}`;

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
          alt: `${dataset.name} - CompilePilot`,
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

export function buildHotelDatasetSchema(slug: HotelDatasetSlug) {
  const dataset = datasetSeo[slug];
  const url = getDatasetUrl(slug);

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
      },
    ],
  };
}
