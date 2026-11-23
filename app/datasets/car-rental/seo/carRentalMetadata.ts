import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/car-rental`;

const datasetSeo = {
  "fleet-inventory": {
    name: "Car Rental Fleet Inventory Dataset",
    title: "Car Rental Fleet Inventory Dataset | CompilePilot Data",
    description: "Explore car rental fleet inventory data, including vehicle details, rental categories, fleet status, and location attributes for market research and analysis.",
    image: "car-rental-fleet-inventory-1200x630.webp",
    variableMeasured: ["vehicle make and model", "vehicle category", "fleet status", "vehicle location", "vehicle attributes"],
  },
  "rate-data": {
    name: "Car Rental Rate Data",
    title: "Car Rental Rate Data Dataset | CompilePilot Data",
    description: "Explore car rental rate data, including daily prices, rental durations, vehicle categories, and location attributes for market research and pricing analysis.",
    image: "car-rental-rate-data-1200x630.webp",
    variableMeasured: ["daily rental rate", "currency", "rental duration", "vehicle category", "pickup location", "drop-off location", "rate conditions"],
  },
  "location-coverage": {
    name: "Car Rental Location Coverage",
    title: "Car Rental Location Coverage Dataset | CompilePilot Data",
    description: "Explore car rental location coverage data, including rental branches, service areas, pickup locations, and geographic attributes for market research and analysis.",
    image: "car-rental-location-coverage-1200x630.webp",
    variableMeasured: ["rental location", "branch identifier", "city", "region", "country", "pickup and drop-off availability", "service area"],
  },
  availability: {
    name: "Car Rental Availability",
    title: "Car Rental Availability Dataset | CompilePilot Data",
    description: "Explore car rental availability data, including vehicle categories, rental dates, location attributes, and inventory status for market research and analysis.",
    image: "car-rental-availability-1200x630.webp",
    variableMeasured: ["vehicle category", "pickup date", "return date", "pickup location", "drop-off location", "availability status", "inventory count"],
  },
  "vehicle-specs": {
    name: "Car Rental Vehicle Specifications",
    title: "Car Rental Vehicle Specifications Dataset | CompilePilot Data",
    description: "Explore car rental vehicle specifications, including make, model, transmission, fuel type, seating capacity, and vehicle category for market research.",
    image: "car-rental-vehicle-specs-1200x630.webp",
    variableMeasured: ["vehicle make", "vehicle model", "vehicle category", "transmission", "fuel type", "seating capacity", "luggage capacity"],
  },
  "vendor-profiles": {
    name: "Car Rental Vendor Profiles",
    title: "Car Rental Vendor Profiles Dataset | CompilePilot Data",
    description: "Explore car rental vendor profile data, including provider names, branch networks, service locations, and company attributes for market research and analysis.",
    image: "car-rental-vendor-profiles-1200x630.webp",
    variableMeasured: ["vendor name", "vendor identifier", "branch network", "service locations", "company attributes", "service coverage"],
  },
  "price-comparison": {
    name: "Car Rental Price Comparison",
    title: "Car Rental Price Comparison Dataset | CompilePilot Data",
    description: "Explore car rental price comparison data across providers, vehicle categories, rental periods, and locations for market research and pricing analysis.",
    image: "car-rental-price-comparison-1200x630.webp",
    variableMeasured: ["vendor", "quoted rental price", "currency", "vehicle category", "rental duration", "pickup location", "rate conditions"],
  },
  "customer-reviews": {
    name: "Car Rental Customer Reviews",
    title: "Car Rental Customer Reviews Dataset | CompilePilot Data",
    description: "Explore car rental customer review data, including ratings, review text, provider attributes, and location details for service research and analysis.",
    image: "car-rental-customer-reviews-1200x630.webp",
    variableMeasured: ["review rating", "review text", "review date", "vendor", "rental location", "service attributes"],
  },
} as const;

export type CarRentalDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: CarRentalDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getCarRentalDatasetMetadata(slug: CarRentalDatasetSlug): Metadata {
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
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: dataset.name,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.title,
      description: dataset.description,
      images: [image],
    },
  };
}

export function buildCarRentalDatasetSchema(slug: CarRentalDatasetSlug) {
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
        description: slug === "fleet-inventory"
          ? "A dataset of car rental fleet inventory records for research and analysis. Confirm the actual fields, geographic coverage, time range, and update frequency against the published dataset before deployment."
          : dataset.description,
        url,
        creator: {
          "@type": "Organization",
          name: "CompilePilot",
          url: `${siteUrl}/`,
        },
        variableMeasured: [...dataset.variableMeasured],
        ...(slug === "fleet-inventory" ? {
          keywords: [
            "car rental fleet inventory",
            "rental vehicle data",
            "car rental fleet data",
            "vehicle availability research",
            "rental market analysis",
          ],
          includedInDataCatalog: {
            "@type": "DataCatalog",
            name: "CompilePilot Datasets",
            url: `${siteUrl}/datasets`,
          },
        } : {}),
      },
    ],
  };
}
