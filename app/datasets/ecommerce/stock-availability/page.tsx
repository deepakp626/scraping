'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  AlertCircle,
  Package,
  TrendingUp,
  Star,
  Store,
  Layers,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (STOCK AVAILABILITY)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    asin: "B09G9FPHP6",
    sku: "APL-IPD-MINI-64-SLV",
    product_name: "Apple iPad mini (6th Generation, Wi-Fi, 64GB) - Space Gray",
    brand: "Apple",
    marketplace: "amazon.com",
    stock_status: "In Stock",
    is_available: true,
    quantity_remaining: 18,
    inventory_alert_message: "Only 18 left in stock - order soon.",
    postal_code_checked: "10001",
    fulfillment_model: "FBA (Ships from Amazon)",
    fast_shipping_eligible: true,
    estimated_delivery_date: "2026-11-05",
    estimated_lead_time_days: 1,
    out_of_stock_duration_hours_30d: 4.5,
    out_of_stock_incidence_count_30d: 1,
    backorder_allowed: false,
    buy_box_in_stock: true,
    next_in_stock_seller: "Best Buy Official via Amazon",
    last_stock_audit: "2026-11-03T18:55:00Z"
  },
  {
    asin: "B08N5WRWNW",
    sku: "APL-MBP-M1-512-SG",
    product_name: "Apple MacBook Pro 13-inch (M1 Chip, 16GB RAM, 512GB SSD) - Space Gray",
    brand: "Apple",
    marketplace: "amazon.com",
    stock_status: "Temporarily Out of Stock",
    is_available: false,
    quantity_remaining: 0,
    inventory_alert_message: "Temporarily out of stock. Order now and we'll deliver when available.",
    postal_code_checked: "90210",
    fulfillment_model: "Amazon 1st Party",
    fast_shipping_eligible: false,
    estimated_delivery_date: null,
    estimated_lead_time_days: 14,
    out_of_stock_duration_hours_30d: 72.0,
    out_of_stock_incidence_count_30d: 3,
    backorder_allowed: true,
    buy_box_in_stock: false,
    next_in_stock_seller: "Adorama Camera (3rd Party)",
    last_stock_audit: "2026-11-03T19:05:00Z"
  }
];

const csvSample = `asin,sku,product_name,brand,marketplace,stock_status,is_available,quantity_remaining,postal_code,fulfillment_model,lead_time_days,oos_hours_30d
B09G9FPHP6,APL-IPD-MINI-64-SLV,"Apple iPad mini (6th Gen, 64GB)",Apple,amazon.com,"In Stock",true,18,"10001","FBA (Ships from Amazon)",1,4.5
B08N5WRWNW,APL-MBP-M1-512-SG,"Apple MacBook Pro 13-inch (M1, 512GB)",Apple,amazon.com,"Temporarily Out of Stock",false,0,"90210","Amazon 1st Party",14,72.0
B0BDHWDR12,APL-WCH-S8-41,"Apple Watch Series 8 GPS 41mm",Apple,target.com,"In Stock",true,5,"60601","Target Store Pickup",0,0.0`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Core Product & Geographic Identifiers",
    desc: "Marketplace keys and regional location coordinates for location-specific stock extraction.",
    fields: [
      { name: "Product Title / Name", type: "String", desc: "Normalized title of the item audited for inventory status" },
      { name: "ASIN / UPC / EAN / GTIN", type: "String", desc: "Universal product barcodes and retailer identification numbers" },
      { name: "SKU / Part Number", type: "String", desc: "Specific catalog part code or merchant SKU identifier" },
      { name: "Brand & Manufacturer", type: "String", desc: "Brand company name associated with the product" },
      { name: "Postal / Zip Code Checked", type: "String", desc: "Target delivery postal code used during localized inventory query" }
    ]
  },
  {
    title: "2. Real-Time Stock States & Availability",
    desc: "Live inventory status flags and public quantity threshold observations.",
    fields: [
      { name: "Stock Availability Status", type: "Enum", desc: "Status values: 'In Stock', 'Out of Stock', 'Backorder', or 'Pre-order'" },
      { name: "Is Available Flag", type: "Boolean", desc: "Binary true/false indicator for instant programmatic filtering" },
      { name: "Quantity Remaining Count", type: "Integer (if public)", desc: "Inventory count displayed (e.g., 'Only 3 left in stock - order soon')" },
      { name: "Inventory Alert Message", type: "String", desc: "Exact textual notice rendered on the live product buy box" },
      { name: "Backorder Allowed Flag", type: "Boolean", desc: "True if retailer accepts reservations for future fulfillment batches" }
    ]
  },
  {
    title: "3. Fulfillment & Warehouse Distribution",
    desc: "Logistics infrastructure, dispatch channels, and fulfillment programs.",
    fields: [
      { name: "Fulfillment Model", type: "String", desc: "Logistics method (FBA, Amazon 1P, Walmart WFS, Merchant Fulfilled)" },
      { name: "Fast Shipping Badges", type: "Boolean / String", desc: "Eligibility flags for Prime, Walmart+, Target Circle 360 delivery" },
      { name: "Ships-From Entity", type: "String", desc: "Merchant or warehouse hub handling physical parcel dispatch" },
      { name: "Sold-By Entity", type: "String", desc: "Commercial seller entity holding title to the merchandise" }
    ]
  },
  {
    title: "4. Delivery ETA & Lead Time Metrics",
    desc: "Customer transit promises, processing delays, and expected delivery dates.",
    fields: [
      { name: "Estimated Delivery Date", type: "ISO Date", desc: "Promised customer arrival date calculated at time of audit" },
      { name: "Estimated Shipping Lead Days", type: "Integer", desc: "Number of calendar days between order placement and delivery" },
      { name: "Next-Day Delivery Eligible", type: "Boolean", desc: "True if item qualifies for guaranteed overnight or next-day delivery" },
      { name: "In-Store Pickup Available", type: "Boolean", desc: "True if local store click-and-collect inventory is active" }
    ]
  },
  {
    title: "5. Longitudinal Out-of-Stock Telemetry",
    desc: "Historical downtime records, depletion velocity, and replenishment intervals.",
    fields: [
      { name: "30-Day Out-of-Stock Hours", type: "Float", desc: "Cumulative hours item remained unavailable across trailing 30 days" },
      { name: "OOS Incidence Count (30D)", type: "Integer", desc: "Number of distinct stockout events recorded over trailing 30 days" },
      { name: "Estimated Daily Depletion Rate", type: "Float", desc: "Computed sales velocity based on public quantity drops over time" },
      { name: "Replenishment Recovery Time", type: "Float (Days)", desc: "Mean days required for catalog item to return to 'In Stock' state" }
    ]
  },
  {
    title: "6. Buy Box Stock Parity & Competition",
    desc: "Impact of stockouts on Buy Box rotation and competitor substitution opportunities.",
    fields: [
      { name: "Buy Box In-Stock Status", type: "Boolean", desc: "Flags whether primary Buy Box winner is currently able to fulfill" },
      { name: "Next Available In-Stock Seller", type: "String", desc: "Secondary merchant ready to capture sales upon primary stockout" },
      { name: "In-Stock Price Premium Delta", type: "Float / Percent", desc: "Price difference between out-of-stock winner and live 3P seller" },
      { name: "Stock Audit Timestamp", type: "ISO-8601", desc: "UTC timestamp when inventory availability was verified" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Stock Availability",
    slug: "/datasets/ecommerce/stock-availability",
    desc: "Out-of-stock frequency, lead times, replenishment intervals, and warehouse fulfillment metrics.",
    icon: AlertCircle,
    badge: "Current Dataset",
    active: true
  },
  {
    name: "Product Listings",
    slug: "/datasets/ecommerce/product-listings",
    desc: "Complete catalog specifications, ASINs, brand hierarchy, variants, and listing metadata.",
    icon: Package,
    badge: "Catalog Hub"
  },
  {
    name: "Pricing Data",
    slug: "/datasets/ecommerce/pricing-data",
    desc: "Historical & real-time pricing trends, MAP violations, strike-through rates, and Buy Box trackers.",
    icon: TrendingUp,
    badge: "Price Intel"
  },
  {
    name: "Reviews & Ratings",
    slug: "/datasets/ecommerce/reviews-ratings",
    desc: "Customer review sentiments, verified purchase badges, review body text, and star breakdowns.",
    icon: Star,
    badge: "High Volume"
  },
  {
    name: "Seller Profiles",
    slug: "/datasets/ecommerce/seller-profiles",
    desc: "Storefront details, 3P seller directories, ratings, inventory footprint, and merchant contact links.",
    icon: Store,
    badge: "Intelligence"
  },
  {
    name: "Category Taxonomy",
    slug: "/datasets/ecommerce/category-taxonomy",
    desc: "Hierarchical category tree mapping, department categorization, and breadcrumb structures.",
    icon: Layers,
    badge: "Catalog"
  },
  {
    name: "Discounts & Offers",
    slug: "/datasets/ecommerce/discounts-offers",
    desc: "Lightning deals, coupon codes, promotional banners, bundle markdowns, and flash sales.",
    icon: Percent,
    badge: "Promotions"
  },
  {
    name: "Brand Intelligence",
    slug: "/datasets/ecommerce/brand-intelligence",
    desc: "Share of voice, digital shelf placement, sponsored brand ad capture, and assortment benchmarks.",
    icon: Tag,
    badge: "Strategy"
  }
];

/* ─────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────── */
const faqs: FAQItem[] = [
  {
    q: "What information is included in the Stock Availability Dataset?",
    a: "The dataset provides real-time stock states ('In Stock', 'Out of Stock', 'Backorder'), public inventory quantity remaining counters, localized delivery ETAs, fulfillment model tags (FBA, WFS, 3P), historical 30-day out-of-stock duration hours, and Buy Box stock status across 35+ normalized attributes."
  },
  {
    q: "Can you track stock availability across specific geographic postal codes?",
    a: "Yes. Major retailers like Amazon, Walmart, and Target adjust product availability and delivery ETAs based on shopper zip codes. We support geo-targeted scraping by rotating localized IP proxies and delivering stock telemetry matched to your target regional fulfillment zones."
  },
  {
    q: "How frequently is inventory status checked and updated?",
    a: "Stock data can be polled on hourly, sub-daily, or daily cadences. For high-velocity categories and flash-sale events, we support continuous streaming feeds that immediately notify your systems when an item switches from 'In Stock' to 'Out of Stock' or vice versa."
  },
  {
    q: "Can this dataset help predict competitor stockouts?",
    a: "Yes. By analyzing consecutive public quantity drops (e.g., 'Only 9 left', 'Only 5 left') combined with historic sales velocity, predictive supply chain models can anticipate impending competitor stockouts and optimize pricing or ad spend accordingly."
  },
  {
    q: "What delivery formats and cloud storage options are supported?",
    a: "Datasets are supplied in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet formats. Automated sync into AWS S3 buckets, Google Cloud Storage, Snowflake, Kafka streams, or REST API endpoints is fully supported."
  },
  {
    q: "How can I request a sample stock availability dataset for my SKUs?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our team will supply a sample extract tracking inventory states for your target products within 24 hours."
  }
];

export default function StockAvailabilityPage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Stock Availability' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified inventory telemetry, out-of-stock rates, and regional availability feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Inventory Dataset"
      badgeSubtext="100M+ SKUs Monitored Daily"
      title="E-commerce Stock Availability & Inventory Velocity Datasets"
      description="Track real-time out-of-stock (OOS) rates, inventory depletion velocity, backorder warnings, and fulfillment replenishment cycles across leading e-commerce marketplaces. Optimize supply chain visibility, anticipate competitor stockouts, and protect Buy Box revenue with granular SKU-level stock state feeds engineered for logistics forecasting and dynamic merchandising."
      featurePoints={[
        "Live In-Stock / OOS Flags",
        "Stock Quantity Counters",
        "Out-of-Stock Duration Logs",
        "Replenishment ETA Tracking",
        "Fulfillment Warehouse Type",
        "Fast Delivery Badges"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Inventory Scraper?"
      overviewCardTitle="Stock Availability Feed"
      liveBadgeText="Live Stock Feed"
      stats={[
        { label: "SKUs Tracked", value: "100M+", subtext: "Daily stock audits" },
        { label: "Update Speed", value: "Hourly+", subtext: "High-velocity tracking" },
        { label: "Stock Accuracy", value: "99.8%", subtext: "Real-time verification" },
        { label: "Coverage", value: "40+", subtext: "Fulfillment networks" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Kafka, Snowflake, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Stock Sample"
      sampleSectionTitle="Explore the Stock Availability Schema"
      sampleSectionDescription="Inspect actual inventory availability records delivered in our dataset. Every field is verified, timestamped, and normalized for direct loading into supply chain dashboards, automated repricers, or ERP systems."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_stock_availability_sample.json"
      csvFilename="ecommerce_stock_availability_sample.csv"
      sampleRecordCount="2 / 100M+ SKUs"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Inventory Attributes & Field Specifications"
      dictionarySectionDescription="Every stock availability record includes granular inventory data—from real-time in-stock statuses and quantity counters to delivery ETAs and 30-day OOS duration hours."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine stock availability with product listings, real-time pricing trends, seller directories, and customer reviews."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our stock monitoring methodology, postal code geo-targeting, depletion velocity tracking, and cloud delivery pipelines."
      faqs={faqs}
    />
  );
}

