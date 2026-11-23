import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const datasetsUrl = `${siteUrl}/datasets/liquor`;

const datasetSeo = {
  "product-catalog": {
    name: "Alcohol Product Catalog Dataset",
    title: "Alcohol Product Catalog Dataset | CompilePilot Data",
    description:
      "Explore alcohol catalog records for market research, category analysis, and regulatory review. Examine product classifications and related catalog attributes.",
    image: "liquor-product-catalog-og-image.webp",
    variableMeasured: ["Product identifier", "Product name", "Product category", "Brand", "Package size", "Alcohol by volume"],
  },
  "pricing-data": {
    name: "Liquor Pricing Dataset",
    title: "Liquor Pricing Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor pricing records, product categories, package details, and market comparisons. Research price patterns across product segments and retail markets.",
    image: "liquor-pricing-data-og-image.webp",
    variableMeasured: ["Product identifier", "Product category", "Price", "Package size", "Currency", "Retailer"],
  },
  availability: {
    name: "Liquor Availability Dataset",
    title: "Liquor Availability Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor availability records, product details, retailer listings, and stock status. Research inventory patterns across retail channels and markets.",
    image: "liquor-availability-og-image.webp",
    variableMeasured: ["Product identifier", "Product category", "Retailer", "Availability status", "Inventory status"],
  },
  ratings: {
    name: "Liquor Ratings Dataset",
    title: "Liquor Ratings Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor product ratings, review summaries, category details, and brand references. Research rating patterns and feedback across product segments.",
    image: "liquor-ratings-og-image.webp",
    variableMeasured: ["Product identifier", "Rating value", "Review count", "Review source", "Product category"],
  },
  "brand-profiles": {
    name: "Liquor Brand Profiles Dataset",
    title: "Liquor Brand Profiles Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor brand profiles, brand attributes, product ranges, and category details. Research brand portfolios and positioning across beverage markets.",
    image: "liquor-brand-profiles-og-image.webp",
    variableMeasured: ["Brand name", "Brand identifier", "Brand attributes", "Product range", "Product category"],
  },
  "category-data": {
    name: "Liquor Category Data Dataset",
    title: "Liquor Category Data Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor category records, product classifications, and related attributes. Research category structures and product distribution across beverage markets.",
    image: "liquor-category-data-og-image.webp",
    variableMeasured: ["Category name", "Category identifier", "Product classification", "Parent category", "Product count"],
  },
  "market-trends": {
    name: "Liquor Market Trends Dataset",
    title: "Liquor Market Trends Dataset | CompilePilot Data Insights",
    description:
      "Explore liquor market trend records, category patterns, and product attributes. Research market movements and segment-level changes across retail channels.",
    image: "liquor-market-trends-og-image.webp",
    variableMeasured: ["Product category", "Market period", "Trend measure", "Market segment", "Geographic market"],
  },
  "retailer-coverage": {
    name: "Liquor Retailer Coverage Dataset",
    title: "Liquor Retailer Coverage Dataset | CompilePilot Insights",
    description:
      "Explore liquor retailer coverage, store listings, product categories, and market presence. Research distribution reach across retail channels and regions.",
    image: "liquor-retailer-coverage-og-image.webp",
    variableMeasured: ["Retailer name", "Retailer identifier", "Product category", "Store location", "Coverage measure"],
  },
} as const;

export type LiquorDatasetSlug = keyof typeof datasetSeo;

function getDatasetUrl(slug: LiquorDatasetSlug) {
  return `${datasetsUrl}/${slug}`;
}

export function getLiquorDatasetMetadata(slug: LiquorDatasetSlug): Metadata {
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
      images: [{ url: image, width: 1200, height: 630, alt: `${dataset.name} - CompilePilot` }],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.title,
      description: dataset.description,
      images: [image],
    },
  };
}

export function buildLiquorDatasetSchema(slug: LiquorDatasetSlug) {
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
        creator: { "@type": "Organization", name: "CompilePilot", url: `${siteUrl}/` },
        publisher: { "@type": "Organization", name: "CompilePilot", url: `${siteUrl}/` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        variableMeasured: dataset.variableMeasured,
      },
    ],
  };
}
