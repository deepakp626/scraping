import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const ecommerceUrl = `${siteUrl}/datasets/ecommerce`;
const datasetCatalogUrl = `${siteUrl}/dataset`;

const datasetSeo = {
  "product-listings": {
    path: "product-listings",
    name: "E-commerce Product Listings Dataset",
    title:
      "E-commerce Product Listings Dataset | Global Retail Catalog Data – CompilePilot",
    description:
      "Explore structured e-commerce product listing data from global retail marketplaces. Access product identifiers, categories, pricing, stock, ratings, sellers, images, and variants in CSV, JSON, NDJSON, or Parquet.",
    openGraphTitle:
      "E-commerce Product Listings Dataset – Global Catalog Intelligence | CompilePilot",
    openGraphDescription:
      "Discover structured product catalog data with identifiers, pricing, inventory, ratings, seller details, images, and variants across retail marketplaces.",
    twitterTitle: "E-commerce Product Listings Dataset – CompilePilot",
    twitterDescription:
      "Explore structured retail product data, including pricing, stock, identifiers, ratings, sellers, and product attributes.",
    image: "ecommerce-product-listings-og-image.png",
    schemaDescription:
      "Structured product listing records containing product identifiers, titles, brands, category paths, listing URLs, prices, discounts, currency, stock availability, fulfillment, ratings, review counts, bestseller rank, images, variants, specifications, and seller information.",
    variableMeasured: [
      "Product identifiers (ASIN, UPC, EAN, GTIN, SKU)",
      "Product title, brand, and manufacturer",
      "Category taxonomy and canonical listing URL",
      "Current price, list price, discount, and currency",
      "Stock status, quantity when public, and fulfillment",
      "Ratings, review counts, and bestseller rank",
      "Product images, specifications, and variants",
      "Seller and merchant information",
    ],
    distribution: ["CSV", "JSON", "NDJSON", "Apache Parquet"],
  },
  "pricing-data": {
    path: "pricing-data",
    name: "E-commerce Pricing Dataset",
    title:
      "E-commerce Pricing Dataset | Historical Price Intelligence – CompilePilot",
    description:
      "Explore e-commerce pricing data across 50+ retail marketplaces. Track current and historical prices, discounts, coupons, Buy Box activity, seller offers, currencies, and MAP compliance signals.",
    openGraphTitle:
      "E-commerce Pricing Data – Historical Price Intelligence & MAP Tracking | CompilePilot",
    openGraphDescription:
      "Access structured retail pricing observations with current prices, MSRP, coupons, historical trends, Buy Box winners, competing offers, and MAP violation indicators.",
    twitterTitle: "E-commerce Pricing Dataset – CompilePilot",
    twitterDescription:
      "Explore current and historical retail pricing, promotions, Buy Box activity, seller offers, and MAP compliance data.",
    image: "ecommerce-pricing-data-og-image.png",
    schemaDescription:
      "Structured e-commerce pricing observations covering product identifiers, current active prices, list and MSRP prices, discounts, currencies, shipping costs, coupon values, deal types, checkout prices, historical price changes, moving averages, all-time price highs and lows, Buy Box winners, competing seller offers, MAP benchmarks, violation flags, and detection timestamps.",
    variableMeasured: [
      "Product identifiers including ASIN, UPC, EAN, GTIN, and SKU",
      "Current active price and list or MSRP price",
      "Discount percentage and currency code",
      "Shipping and handling fee",
      "Coupon value and promotion type",
      "Effective checkout price and promotion expiry timestamp",
      "7-day and 30-day price changes",
      "30-day moving average and historical price highs and lows",
      "Price volatility score",
      "Buy Box winner, Buy Box price, and competing seller offers",
      "MAP benchmark, MAP violation status, and violation variance",
      "Unauthorized seller flag and detection timestamp",
    ],
    temporalCoverage: "Historical price observations; page states 5+ years of history",
    distribution: ["CSV", "JSON", "NDJSON", "Apache Parquet"],
  },
  "reviews-ratings": {
    path: "reviews-ratings",
    name: "E-commerce Reviews & Ratings Dataset",
    title:
      "E-commerce Reviews & Ratings Dataset | Customer Feedback Data – CompilePilot",
    description:
      "Explore structured e-commerce review and rating data for product research and marketplace analysis. Organize available review text, star ratings, review dates, verified-purchase indicators, and product references in supported formats.",
    openGraphTitle:
      "E-commerce Reviews & Ratings Dataset – Customer Feedback Data | CompilePilot",
    openGraphDescription:
      "Analyze product feedback with structured review text, ratings, review dates, verified-purchase indicators, and product references.",
    twitterTitle:
      "E-commerce Reviews & Ratings Dataset – Customer Feedback Data | CompilePilot",
    twitterDescription:
      "Explore structured product reviews and ratings for e-commerce research, customer sentiment analysis, and marketplace intelligence.",
    image: "ecommerce-reviews-ratings-og-image.png",
    schemaDescription:
      "Explore structured e-commerce review and rating data for product research and marketplace analysis. Organize available review text, star ratings, review dates, verified-purchase indicators, and product references in supported formats.",
    variableMeasured: [
      "Product identifiers and listing references",
      "Review text and review title, where available",
      "Star rating and rating scale",
      "Review date and update date, where available",
      "Verified-purchase indicator, where available",
      "Helpful vote counts, where available",
      "Reviewer or profile reference, subject to availability and privacy",
    ],
  },
  "seller-profiles": {
    path: "seller-profiles",
    name: "E-commerce Seller Profiles Dataset",
    title:
      "E-commerce Seller Profiles Dataset | Marketplace Seller Intelligence – CompilePilot",
    description:
      "Explore structured e-commerce seller profile data for marketplace research. Organize available seller names, profile references, marketplace identifiers, ratings, locations, fulfillment details, and business signals in supported formats.",
    openGraphTitle:
      "E-commerce Seller Profiles Dataset – Marketplace Seller Intelligence | CompilePilot",
    openGraphDescription:
      "Research marketplace sellers with structured profile references, ratings, locations, fulfillment details, and available business information.",
    twitterTitle:
      "E-commerce Seller Profiles Dataset – Marketplace Seller Intelligence | CompilePilot",
    twitterDescription:
      "Explore structured marketplace seller profile data for competitive research and seller intelligence.",
    image: "ecommerce-seller-profiles-og-image.png",
    schemaDescription:
      "Explore structured e-commerce seller profile data for marketplace research. Organize available seller names, profile references, marketplace identifiers, ratings, locations, fulfillment details, and business signals in supported formats.",
    variableMeasured: [
      "Seller or merchant name and marketplace identifier",
      "Seller profile URL or reference",
      "Seller rating and feedback count, where available",
      "Seller location, where publicly listed",
      "Fulfillment or shipping information, where available",
      "Marketplace status and business attributes, where available",
    ],
  },
  "category-taxonomy": {
    path: "category-taxonomy",
    name: "E-commerce Category Taxonomy Dataset",
    title:
      "E-commerce Category Taxonomy Dataset | Product Classification Data – CompilePilot",
    description:
      "Explore structured e-commerce category taxonomy data for product classification and catalog analysis. Organize available category names, identifiers, parent-child relationships, breadcrumb paths, and marketplace references.",
    openGraphTitle:
      "E-commerce Category Taxonomy Dataset – Product Classification | CompilePilot",
    openGraphDescription:
      "Use structured category names, identifiers, hierarchy paths, and marketplace references for catalog organization and product classification.",
    twitterTitle:
      "E-commerce Category Taxonomy Dataset – Product Classification | CompilePilot",
    twitterDescription:
      "Explore e-commerce category hierarchies and structured taxonomy data for catalog mapping and product classification.",
    image: "ecommerce-category-taxonomy-og-image.png",
    schemaDescription:
      "Explore structured e-commerce category taxonomy data for product classification and catalog analysis. Organize available category names, identifiers, parent-child relationships, breadcrumb paths, and marketplace references.",
    variableMeasured: [
      "Category identifier and category name",
      "Parent category identifier",
      "Child category relationships",
      "Full category breadcrumb or hierarchy path",
      "Marketplace or source reference",
      "Category URL, where available",
    ],
  },
  "stock-availability": {
    path: "stock-availability",
    name: "E-commerce Stock Availability Dataset",
    title:
      "E-commerce Stock Availability Dataset | Inventory Signals – CompilePilot",
    description:
      "Explore structured e-commerce stock availability data for product and marketplace monitoring. Organize available availability status, stock signals, fulfillment details, seller references, and observation timestamps.",
    openGraphTitle:
      "E-commerce Stock Availability Dataset – Inventory Signals | CompilePilot",
    openGraphDescription:
      "Monitor product availability with structured stock status, fulfillment signals, seller references, and observation timestamps where available.",
    twitterTitle:
      "E-commerce Stock Availability Dataset – Inventory Signals | CompilePilot",
    twitterDescription:
      "Explore product availability and inventory signals across e-commerce listings and marketplaces.",
    image: "ecommerce-stock-availability-og-image.png",
    schemaDescription:
      "Explore structured e-commerce stock availability data for product and marketplace monitoring. Organize available availability status, stock signals, fulfillment details, seller references, and observation timestamps.",
    variableMeasured: [
      "Product identifier and listing URL",
      "Availability or stock status",
      "Quantity or stock level, only where publicly exposed",
      "Seller or merchant reference",
      "Fulfillment or delivery signal, where available",
      "Marketplace and observation timestamp",
    ],
  },
  "discounts-offers": {
    path: "discounts-offers",
    name: "E-commerce Discounts & Offers Dataset",
    title:
      "E-commerce Discounts & Offers Dataset | Promotions Intelligence – CompilePilot",
    description:
      "Explore structured e-commerce discounts and promotional offer data for marketplace analysis. Organize available list prices, sale prices, discount values, coupon details, promotion types, and offer validity information.",
    openGraphTitle:
      "E-commerce Discounts & Offers Dataset – Promotions Intelligence | CompilePilot",
    openGraphDescription:
      "Analyze retail promotions with structured sale prices, discounts, coupon details, promotion types, and offer validity fields where available.",
    twitterTitle:
      "E-commerce Discounts & Offers Dataset – Promotions Intelligence | CompilePilot",
    twitterDescription:
      "Explore e-commerce discounts, coupons, and promotional offer data for pricing and marketplace analysis.",
    image: "ecommerce-discounts-offers-og-image.png",
    schemaDescription:
      "Explore structured e-commerce discounts and promotional offer data for marketplace analysis. Organize available list prices, sale prices, discount values, coupon details, promotion types, and offer validity information.",
    variableMeasured: [
      "Product and marketplace identifiers",
      "List price and current offer price, where available",
      "Discount amount or percentage",
      "Coupon code or coupon value, where publicly visible",
      "Promotion or deal type",
      "Offer start and end time, where available",
      "Currency and observation timestamp",
    ],
  },
  "brand-intelligence": {
    path: "brand-intelligence",
    name: "E-commerce Brand Intelligence Dataset",
    title:
      "E-commerce Brand Intelligence Dataset | Retail Brand Analytics – CompilePilot",
    description:
      "Explore structured e-commerce brand intelligence data for retail and marketplace research. Organize available brand names, product associations, category presence, seller references, pricing signals, and listing attributes.",
    openGraphTitle:
      "E-commerce Brand Intelligence Dataset – Retail Brand Analytics | CompilePilot",
    openGraphDescription:
      "Research brand presence across retail marketplaces with structured product associations, category coverage, seller references, and listing signals.",
    twitterTitle:
      "E-commerce Brand Intelligence Dataset – Retail Brand Analytics | CompilePilot",
    twitterDescription:
      "Explore structured e-commerce brand data for product, category, seller, and marketplace research.",
    image: "ecommerce-brand-intelligence-og-image.png",
    schemaDescription:
      "Explore structured e-commerce brand intelligence data for retail and marketplace research. Organize available brand names, product associations, category presence, seller references, pricing signals, and listing attributes.",
    variableMeasured: [
      "Brand name and brand reference",
      "Associated product identifiers and listing URLs",
      "Category and marketplace presence",
      "Seller or merchant references, where available",
      "Pricing and rating signals, where available",
      "Brand or product attributes available in source listings",
    ],
  },
} as const;

export type EcommerceDatasetSlug = keyof typeof datasetSeo;

function getPageUrl(slug: EcommerceDatasetSlug) {
  return `${ecommerceUrl}/${datasetSeo[slug].path}`;
}

export function getEcommerceDatasetMetadata(
  slug: EcommerceDatasetSlug,
): Metadata {
  const dataset = datasetSeo[slug];
  const url = getPageUrl(slug);
  const image = `${ecommerceUrl}/${dataset.image}`;

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

export function buildEcommerceDatasetSchema(slug: EcommerceDatasetSlug) {
  const dataset = datasetSeo[slug];
  const url = getPageUrl(slug);
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
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: "CompilePilot Datasets",
      url: datasetCatalogUrl,
    },
    variableMeasured: dataset.variableMeasured,
    isPartOf: {
      "@type": "DataCatalog",
      name: "E-commerce Datasets",
      url: ecommerceUrl,
    },
  };

  if ("distribution" in dataset) {
    datasetSchema.distribution = dataset.distribution.map(
      (encodingFormat) => ({
        "@type": "DataDownload",
        encodingFormat,
      }),
    );
  }

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
