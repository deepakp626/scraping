import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const groceryUrl = `${siteUrl}/datasets/grocery`;
const datasetCatalogUrl = `${siteUrl}/dataset`;

const grocerySeo = {
  "sku-catalog": {
    name: "Grocery SKU Catalog Dataset",
    title:
      "Grocery SKU Catalog Dataset | Product Catalog Data – CompilePilot",
    description:
      "Explore structured grocery SKU catalog data for product and retail research. Organize available product identifiers, names, brands, categories, package details, and listing attributes in supported formats.",
    openGraphTitle:
      "Grocery SKU Catalog Dataset – Structured Retail Product Data | CompilePilot",
    openGraphDescription:
      "Explore grocery product catalog records with available SKU identifiers, product names, brands, categories, package information, and retail listing attributes.",
    twitterTitle: "Grocery SKU Catalog Dataset – CompilePilot",
    twitterDescription:
      "Explore structured grocery product records, including identifiers, brands, categories, package details, and listing attributes.",
    image: "grocery-sku-catalog-og-image.png",
    schemaName: "Grocery SKU Catalog Dataset",
    schemaDescription:
      "Structured grocery product catalog records. Potential dataset attributes include product identifiers, product names, brands, category classifications, package and size details, and retail listing attributes, subject to the fields actually supplied.",
    variableMeasured: [
      "SKU or product identifier, where available",
      "Product name and description, where available",
      "Brand",
      "Grocery category and subcategory",
      "Package size, quantity, or unit information, where available",
      "Retail listing reference or URL, where available",
    ],
  },
  "price-monitoring": {
    name: "Grocery Price Monitoring Dataset",
    title:
      "Grocery Price Monitoring Dataset | Retail Price Data – CompilePilot",
    description:
      "Explore structured grocery price monitoring data for retail and market research. Organize available product identifiers, retailer references, observed prices, currencies, and price timestamps in supported formats.",
    openGraphTitle:
      "Grocery Price Monitoring Dataset – Retail Price Intelligence | CompilePilot",
    openGraphDescription:
      "Explore grocery price observations with available product references, retailer details, prices, currencies, and timestamped records.",
    twitterTitle: "Grocery Price Monitoring Dataset – CompilePilot",
    twitterDescription:
      "Explore structured grocery price observations for retail research, including product references, retailer details, currencies, and timestamps.",
    image: "grocery-price-monitoring-og-image.png",
    schemaName: "Grocery Price Monitoring Dataset",
    schemaDescription:
      "Structured grocery price observations. Potential dataset attributes include product identifiers and listing references, retailer details, observed prices, currency codes, and observation timestamps, subject to the fields actually supplied.",
    variableMeasured: [
      "Product or SKU identifier, where available",
      "Product name or listing reference, where available",
      "Retailer or marketplace reference",
      "Observed price",
      "Currency code",
      "Price observation timestamp",
    ],
  },
  availability: {
    name: "Grocery Availability Dataset",
    title:
      "Grocery Availability Dataset | Product Stock Data – CompilePilot",
    description:
      "Explore structured grocery product availability data for retail research. Organize available product and SKU references, retailer details, availability status, and observation timestamps in supported formats.",
    openGraphTitle:
      "Grocery Availability Dataset – Product Stock Data | CompilePilot",
    openGraphDescription:
      "Explore grocery product availability records with product references, retailer details, stock status, and timestamped observations.",
    twitterTitle:
      "Grocery Availability Dataset – Product Stock Data | CompilePilot",
    twitterDescription:
      "Explore grocery product availability and stock status data for retail and marketplace research.",
    image: "grocery-availability-og-image.png",
    schemaName: "Grocery Product Availability Dataset",
    schemaDescription:
      "Explore structured grocery product availability data for retail research. Organize available product and SKU references, retailer details, availability status, and observation timestamps in supported formats.",
    variableMeasured: [
      "Product or SKU identifier, where available",
      "Product name or listing reference, where available",
      "Retailer or marketplace reference",
      "Availability or stock status",
      "Store or fulfillment reference, where available",
      "Availability observation timestamp",
    ],
  },
  promotions: {
    name: "Grocery Promotions Dataset",
    title:
      "Grocery Promotions Dataset | Retail Deals & Offers Data – CompilePilot",
    description:
      "Explore structured grocery promotion data for retail and market research. Organize available product references, promotional prices, discount details, offer types, retailer information, and validity dates.",
    openGraphTitle:
      "Grocery Promotions Dataset – Retail Deals & Offers Data | CompilePilot",
    openGraphDescription:
      "Research grocery promotions with structured product references, offer prices, discount details, promotion types, retailers, and validity periods.",
    twitterTitle:
      "Grocery Promotions Dataset – Retail Deals & Offers Data | CompilePilot",
    twitterDescription:
      "Explore grocery promotion and offer data for retail pricing and marketplace research.",
    image: "grocery-promotions-og-image.png",
    schemaName: "Grocery Promotions Dataset",
    schemaDescription:
      "Explore structured grocery promotion data for retail and market research. Organize available product references, promotional prices, discount details, offer types, retailer information, and validity dates.",
    variableMeasured: [
      "Product or SKU identifier, where available",
      "Retailer or marketplace reference",
      "Regular and promotional price, where available",
      "Discount amount or percentage, where available",
      "Promotion or offer type",
      "Offer start and end dates, where available",
      "Currency and observation timestamp",
    ],
  },
  "nutritional-data": {
    name: "Grocery Nutritional Data Dataset",
    title:
      "Grocery Nutritional Data Dataset | Food Product Nutrition – CompilePilot",
    description:
      "Explore structured grocery product nutrition data for food research and catalog analysis. Organize available product references, serving sizes, energy values, nutrients, ingredients, and dietary attributes where supplied.",
    openGraphTitle:
      "Grocery Nutritional Data Dataset – Food Product Nutrition | CompilePilot",
    openGraphDescription:
      "Explore grocery nutrition records with product references, serving sizes, energy, nutrient values, ingredients, and dietary attributes where available.",
    twitterTitle:
      "Grocery Nutritional Data Dataset – Food Product Nutrition | CompilePilot",
    twitterDescription:
      "Explore structured food product nutrition and ingredient data for grocery catalog research.",
    image: "grocery-nutritional-data-og-image.png",
    schemaName: "Grocery Nutritional Data Dataset",
    schemaDescription:
      "Explore structured grocery product nutrition data for food research and catalog analysis. Organize available product references, serving sizes, energy values, nutrients, ingredients, and dietary attributes where supplied.",
    variableMeasured: [
      "Product identifier and product name, where available",
      "Serving size and serving-size unit",
      "Energy or calorie value, where available",
      "Nutrient names and quantities",
      "Ingredient list, where available",
      "Dietary or allergen attributes, only where explicitly provided",
      "Source or label reference and observation date",
    ],
  },
  "store-locations": {
    name: "Grocery Store Locations Dataset",
    title:
      "Grocery Store Locations Dataset | Retail Store Data – CompilePilot",
    description:
      "Explore structured grocery store location data for retail mapping and market research. Organize available store names, addresses, geographic coordinates, retailer references, and store attributes where supplied.",
    openGraphTitle:
      "Grocery Store Locations Dataset – Retail Store Data | CompilePilot",
    openGraphDescription:
      "Explore grocery store location records with retailer names, addresses, geographic coordinates, and available store attributes.",
    twitterTitle:
      "Grocery Store Locations Dataset – Retail Store Data | CompilePilot",
    twitterDescription:
      "Explore structured grocery store location data for retail mapping, coverage analysis, and market research.",
    image: "grocery-store-locations-og-image.png",
    schemaName: "Grocery Store Locations Dataset",
    schemaDescription:
      "Explore structured grocery store location data for retail mapping and market research. Organize available store names, addresses, geographic coordinates, retailer references, and store attributes where supplied.",
    variableMeasured: [
      "Store or location identifier, where available",
      "Retailer or store name",
      "Street address and locality, where available",
      "City, region, and postal code, where available",
      "Latitude and longitude, where available",
      "Store type or location attributes, where available",
      "Source reference or last-observed date",
    ],
  },
  "brand-coverage": {
    name: "Grocery Brand Coverage Dataset",
    title:
      "Grocery Brand Coverage Dataset | Retail Brand & Product Data – CompilePilot",
    description:
      "Explore structured grocery brand coverage data for retail and category research. Organize available brand names, product associations, category presence, retailer references, and listing attributes.",
    openGraphTitle:
      "Grocery Brand Coverage Dataset – Retail Brand & Product Data | CompilePilot",
    openGraphDescription:
      "Research grocery brand presence with structured brand names, product associations, category coverage, and retailer listing references.",
    twitterTitle:
      "Grocery Brand Coverage Dataset – Retail Brand & Product Data | CompilePilot",
    twitterDescription:
      "Explore grocery brand coverage and product association data across retail categories and listings.",
    image: "grocery-brand-coverage-og-image.png",
    schemaName: "Grocery Brand Coverage Dataset",
    schemaDescription:
      "Explore structured grocery brand coverage data for retail and category research. Organize available brand names, product associations, category presence, retailer references, and listing attributes.",
    variableMeasured: [
      "Brand name and brand reference, where available",
      "Associated product or SKU identifiers",
      "Product names and listing references, where available",
      "Grocery category and subcategory",
      "Retailer or marketplace references",
      "Brand or listing attributes available in source records",
    ],
  },
  "category-trends": {
    name: "Grocery Category Trends Dataset",
    title:
      "Grocery Category Trends Dataset | Retail Category Analytics – CompilePilot",
    description:
      "Explore structured grocery category trend data for retail and market research. Organize available category references, product counts, price observations, promotion signals, and time-based measures where supplied.",
    openGraphTitle:
      "Grocery Category Trends Dataset – Retail Category Analytics | CompilePilot",
    openGraphDescription:
      "Analyze grocery category patterns with structured category references, product and price signals, promotions, and time-based observations where available.",
    twitterTitle:
      "Grocery Category Trends Dataset – Retail Category Analytics | CompilePilot",
    twitterDescription:
      "Explore grocery category trend data for assortment, pricing, and retail market analysis.",
    image: "grocery-category-trends-og-image.png",
    schemaName: "Grocery Category Trends Dataset",
    schemaDescription:
      "Explore structured grocery category trend data for retail and market research. Organize available category references, product counts, price observations, promotion signals, and time-based measures where supplied.",
    variableMeasured: [
      "Category and subcategory identifiers or names",
      "Retailer or marketplace reference",
      "Product or listing counts, where available",
      "Price or promotion measures, where available",
      "Observation period or timestamp",
      "Geographic or store grouping, where available",
    ],
  },
} as const;

export type GroceryDatasetSlug = keyof typeof grocerySeo;

function getDatasetUrl(slug: GroceryDatasetSlug) {
  return `${groceryUrl}/${slug}`;
}

export function getGroceryDatasetMetadata(
  slug: GroceryDatasetSlug,
): Metadata {
  const dataset = grocerySeo[slug];
  const url = getDatasetUrl(slug);
  const image = `${groceryUrl}/${dataset.image}`;

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

export function buildGroceryDatasetSchema(slug: GroceryDatasetSlug) {
  const dataset = grocerySeo[slug];
  const url = getDatasetUrl(slug);
  const datasetSchema: Record<string, unknown> = {
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: dataset.schemaName,
    description: dataset.schemaDescription,
    url,
    creator: {
      "@type": "Organization",
      name: "CompilePilot",
      url: `${siteUrl}/`,
    },
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: "CompilePilot Datasets",
      url: datasetCatalogUrl,
    },
    variableMeasured: dataset.variableMeasured,
    isPartOf: {
      "@type": "DataCatalog",
      name: "Grocery Datasets",
      url: groceryUrl,
    },
  };

  if ("temporalCoverage" in dataset) {
    datasetSchema.temporalCoverage = dataset.temporalCoverage;
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
