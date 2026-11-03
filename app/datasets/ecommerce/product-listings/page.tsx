import type { Metadata } from "next";
import ProductListingsClient from "./ProductListingsClient";

export const metadata: Metadata = {
  title: "E-commerce Product Listings Dataset | Global Retail Catalog Data",
  description:
    "Access clean, structured e-commerce product listings datasets aggregated across Amazon, Walmart, eBay, and leading retailers. Extract titles, ASINs, pricing, variants, stock, and attributes in CSV, JSON, or Parquet.",
  keywords: [
    "ecommerce product listings dataset",
    "product catalog dataset",
    "amazon product listings data",
    "retail marketplace dataset",
    "ecommerce sku dataset",
    "product attributes data feed",
    "online shopping dataset",
    "competitor pricing dataset",
    "CompilePilot datasets",
  ],
  alternates: {
    canonical: "https://compilepilot.com/datasets/ecommerce/product-listings",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/datasets/ecommerce/product-listings",
    siteName: "CompilePilot",
    title: "E-commerce Product Listings Dataset | Global Retail Catalog Data | CompilePilot",
    description:
      "High-accuracy, verified e-commerce product listing datasets covering Amazon, Walmart, eBay, Target, and custom web stores. Download clean catalog data in CSV, JSON, or Parquet.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot E-commerce Product Listings Dataset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Product Listings Dataset | CompilePilot",
    description:
      "Structured product listing datasets covering 500M+ SKUs across global e-commerce marketplaces. Clean, deduplicated, and delivered in CSV, JSON, or Parquet.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcommerceProductListingsPage() {
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://compilepilot.com/datasets/ecommerce/product-listings#webpage",
        url: "https://compilepilot.com/datasets/ecommerce/product-listings",
        name: "E-commerce Product Listings Dataset | Global Retail Catalog Data",
        description:
          "Access clean, structured e-commerce product listings datasets aggregated across Amazon, Walmart, eBay, and leading retailers.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        breadcrumb: {
          "@id": "https://compilepilot.com/datasets/ecommerce/product-listings#breadcrumb",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://compilepilot.com/datasets/ecommerce/product-listings#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://compilepilot.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Datasets",
            item: "https://compilepilot.com/datasets",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "E-commerce",
            item: "https://compilepilot.com/datasets/ecommerce",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Product Listings",
            item: "https://compilepilot.com/datasets/ecommerce/product-listings",
          },
        ],
      },
      {
        "@type": "Dataset",
        "@id": "https://compilepilot.com/datasets/ecommerce/product-listings#dataset",
        name: "E-commerce Product Listings Dataset",
        description:
          "Aggregated product catalog dataset containing over 500 million products indexed across global e-commerce platforms. Features attributes such as ASIN, UPC, Brand, Category Breadcrumbs, Current Price, MSRP, Stock Status, Ratings, Review Count, and High-Resolution Image URLs.",
        url: "https://compilepilot.com/datasets/ecommerce/product-listings",
        keywords: [
          "ecommerce product listings dataset",
          "retail catalog data",
          "amazon product data",
          "sku data feed",
          "product pricing dataset",
        ],
        creator: {
          "@type": "Organization",
          name: "CompilePilot",
          url: "https://compilepilot.com",
        },
        distribution: [
          {
            "@type": "DataDownload",
            encodingFormat: "text/csv",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/product-listings",
          },
          {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/product-listings",
          },
          {
            "@type": "DataDownload",
            encodingFormat: "application/x-parquet",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/product-listings",
          },
        ],
        variableMeasured: [
          "Product Title",
          "ASIN / UPC / EAN / GTIN",
          "Brand & Manufacturer",
          "Category Breadcrumbs",
          "Current Selling Price",
          "List / MSRP Price",
          "Discount Percentage",
          "Stock Availability Status",
          "Average Star Rating",
          "Total Review Count",
          "Best Seller Rank (BSR)",
          "Buy Box Winner",
          "High-Resolution Images",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://compilepilot.com/datasets/ecommerce/product-listings#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What information is included in the Product Listings Dataset?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The dataset provides comprehensive product catalog intelligence across 45+ normalized attributes. Key fields include universal identifiers (ASIN, UPC, EAN, SKU), canonical product URLs, brand and manufacturer details, hierarchical category breadcrumbs, active pricing and MSRP, discount percentages, stock availability, Buy Box winners, fulfillment methods, ratings, reviews, BSR, images, and variant matrices.",
            },
          },
          {
            "@type": "Question",
            name: "Which marketplaces are covered?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We extract and maintain product listings across all major global retail marketplaces including Amazon (US, UK, DE, FR, JP, IN, CA, AU), Walmart, eBay, Target, Best Buy, Home Depot, Wayfair, Flipkart, AliExpress, and Shopify/WooCommerce storefronts.",
            },
          },
          {
            "@type": "Question",
            name: "How frequently is the data updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Update frequencies can be tailored to your needs: real-time streaming, hourly, daily, weekly, bi-weekly, or monthly automated deliveries, alongside historical catalog snapshots on demand.",
            },
          },
          {
            "@type": "Question",
            name: "What file formats are available?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Datasets are delivered in CSV, JSON, NDJSON (JSON Lines), Parquet, and Excel (XLSX), with direct automated delivery into AWS S3, Google Cloud Storage, Azure Blob, Snowflake, or via secure REST APIs.",
            },
          },
          {
            "@type": "Question",
            name: "Can I request custom product attributes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every dataset can be fully customized with bespoke attributes, category filters, brand whitelists, geo zip-code scraping, seller intelligence, or custom rating thresholds.",
            },
          },
          {
            "@type": "Question",
            name: "How can I access a sample dataset?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can request a free sample dataset directly through our contact form or the 'Request Dataset Sample' button. We will deliver a representative sample in CSV, JSON, or Parquet.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductListingsClient />
    </>
  );
}
