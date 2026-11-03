'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Tag,
  Package,
  TrendingUp,
  Star,
  Store,
  Layers,
  AlertCircle,
  Percent
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (BRAND INTELLIGENCE)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    brand_id: "BRD-SONY-001",
    brand_name: "Sony",
    parent_company: "Sony Group Corporation",
    marketplace: "amazon.com",
    primary_category: "Electronics > Audio & Video",
    share_of_voice_percent: 34.8,
    organic_search_share_percent: 28.5,
    sponsored_search_share_percent: 41.2,
    top_search_keywords: ["wireless headphones", "noise canceling headphones", "bluetooth speaker"],
    total_indexed_products: 4250,
    average_catalog_rating: 4.62,
    total_brand_reviews_count: 1840290,
    authorized_sellers_count: 14,
    unauthorized_sellers_count: 32,
    buy_box_retention_percent: 86.4,
    map_compliance_rate_percent: 92.1,
    portfolio_out_of_stock_percent: 3.8,
    primary_competitor_brands: ["Bose", "Sennheiser", "Apple"],
    official_storefront_url: "https://www.amazon.com/stores/Sony/page/A4310920",
    last_audit_timestamp: "2026-11-03T18:00:00Z"
  },
  {
    brand_id: "BRD-DYSON-002",
    brand_name: "Dyson",
    parent_company: "Dyson Ltd",
    marketplace: "walmart.com",
    primary_category: "Home > Vacuums & Air Treatment",
    share_of_voice_percent: 42.1,
    organic_search_share_percent: 39.4,
    sponsored_search_share_percent: 44.8,
    top_search_keywords: ["cordless vacuum", "hair dryer", "air purifier"],
    total_indexed_products: 1120,
    average_catalog_rating: 4.54,
    total_brand_reviews_count: 624500,
    authorized_sellers_count: 6,
    unauthorized_sellers_count: 18,
    buy_box_retention_percent: 91.2,
    map_compliance_rate_percent: 96.5,
    portfolio_out_of_stock_percent: 2.1,
    primary_competitor_brands: ["Shark", "Bissell", "Tineco"],
    official_storefront_url: "https://www.walmart.com/browse/dyson/YnJhbmQ6RHlzb24",
    last_audit_timestamp: "2026-11-03T18:30:00Z"
  }
];

const csvSample = `brand_id,brand_name,parent_company,marketplace,share_of_voice,organic_share,sponsored_share,total_skus,avg_rating,unauth_sellers,map_compliance
BRD-SONY-001,Sony,"Sony Group Corporation",amazon.com,34.8,28.5,41.2,4250,4.62,32,92.1
BRD-DYSON-002,Dyson,"Dyson Ltd",walmart.com,42.1,39.4,44.8,1120,4.54,18,96.5
BRD-APPLE-003,Apple,"Apple Inc",target.com,52.4,54.1,50.7,2890,4.78,4,99.2`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Brand Identity & Corporate Structure",
    desc: "Parent corporate entities, trademark registries, and official marketplace storefront assets.",
    fields: [
      { name: "Brand Name", type: "String", desc: "Official standardized commercial brand entity name" },
      { name: "Parent Corporate Entity", type: "String", desc: "Ultimate parent holding corporation or manufacturing group" },
      { name: "Official Storefront URL", type: "String (URL)", desc: "Direct canonical link to the brand's verified marketplace hub" },
      { name: "Primary Retail Department", type: "String", desc: "Core category generating the largest portion of brand catalog" },
      { name: "Marketplace & Domain", type: "String", desc: "Retail platform audited (amazon.com, walmart.com, target.com, etc.)" }
    ]
  },
  {
    title: "2. Digital Shelf Share of Voice (SOV)",
    desc: "Search engine ranking visibility, organic shelf presence, and paid sponsored positioning.",
    fields: [
      { name: "Aggregate Share of Voice (SOV)", type: "Percentage", desc: "Composite share of first-page search placements across category keywords" },
      { name: "Organic Search Shelf Share", type: "Percentage", desc: "Proportion of natural organic search ranking slots captured on page one" },
      { name: "Sponsored Ad Search Share", type: "Percentage", desc: "Proportion of paid sponsored product/brand ad slots captured" },
      { name: "Top Keyword Search Terms", type: "Array (Strings)", desc: "High-volume consumer search keywords where brand ranks top 3" },
      { name: "Average Search Rank Position", type: "Float", desc: "Mean rank index across top category search result pages" }
    ]
  },
  {
    title: "3. Catalog Portfolio & Assortment Scale",
    desc: "Total catalog breadth, assortment coverage, and inventory health metrics.",
    fields: [
      { name: "Total Indexed Product SKUs", type: "Integer", desc: "Volume of distinct active product listings representing the brand" },
      { name: "Portfolio Out-of-Stock Ratio", type: "Percentage", desc: "Percentage of brand catalog currently unavailable or out of stock" },
      { name: "Average Portfolio Selling Price", type: "Float (USD)", desc: "Mean active selling price across all brand SKUs" },
      { name: "New Product Introduction Velocity", type: "Integer / Month", desc: "Volume of newly indexed product models launched over past 30 days" }
    ]
  },
  {
    title: "4. Brand Integrity & Authorized Distribution",
    desc: "Reseller channel governance, gray-market presence, and Buy Box ownership.",
    fields: [
      { name: "Authorized Sellers Count", type: "Integer", desc: "Count of verified commercial distributors approved to retail the brand" },
      { name: "Unauthorized 3P Sellers Count", type: "Integer", desc: "Count of rogue third-party merchants offering brand SKUs" },
      { name: "Buy Box Retention Rate", type: "Percentage", desc: "Percentage of time authorized sellers maintain control of the Buy Box" },
      { name: "MAP Compliance Rate", type: "Percentage", desc: "Percentage of live listings adhering to Minimum Advertised Price rules" },
      { name: "Counterfeit Risk Threat Index", type: "Enum / Score", desc: "Algorithmic threat rating (Low, Medium, High) based on unverified sellers" }
    ]
  },
  {
    title: "5. Customer Sentiment & Brand Equity",
    desc: "Aggregate consumer sentiment ratings, feedback volume, and social proof benchmarking.",
    fields: [
      { name: "Average Catalog Star Rating", type: "Float (1.0 - 5.0)", desc: "Normalized mean star rating computed across all brand customer reviews" },
      { name: "Total Aggregate Review Volume", type: "Integer", desc: "Cumulative customer review submissions recorded across catalog" },
      { name: "Brand Net Sentiment Polarity", type: "Float (-1.0 to 1.0)", desc: "Cross-catalog sentiment polarity derived from NLP review processing" },
      { name: "Top Positive Customer Themes", type: "Array (Strings)", desc: "Most cited positive product attributes (e.g., 'Build Quality', 'Sound Clarity')" }
    ]
  },
  {
    title: "6. Competitive Benchmarks & Market Share",
    desc: "Category rival benchmarking, price positioning indices, and overlap matrices.",
    fields: [
      { name: "Primary Competitor Brands", type: "Array (Strings)", desc: "Top competing brand entities vying for identical search keywords" },
      { name: "Price Positioning Premium Index", type: "Float", desc: "Ratio comparing brand average price against category benchmark" },
      { name: "Assortment Overlap Ratio", type: "Percentage", desc: "Catalog overlap percentage against leading category competitors" },
      { name: "Brand Audit Timestamp", type: "ISO-8601", desc: "UTC timestamp of the latest brand intelligence synchronization" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Brand Intelligence",
    slug: "/datasets/ecommerce/brand-intelligence",
    desc: "Share of voice, digital shelf placement, sponsored brand ad capture, and assortment benchmarks.",
    icon: Tag,
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
    name: "Stock Availability",
    slug: "/datasets/ecommerce/stock-availability",
    desc: "Out-of-stock frequency, lead times, replenishment intervals, and warehouse fulfillment metrics.",
    icon: AlertCircle,
    badge: "Supply Chain"
  },
  {
    name: "Discounts & Offers",
    slug: "/datasets/ecommerce/discounts-offers",
    desc: "Lightning deals, coupon codes, promotional banners, bundle markdowns, and flash sales.",
    icon: Percent,
    badge: "Promotions"
  }
];

/* ─────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────── */
const faqs: FAQItem[] = [
  {
    q: "What information is included in the Brand Intelligence Dataset?",
    a: "The dataset provides holistic digital shelf telemetry including Share of Voice (SOV) percentages, organic vs sponsored search placement rankings, total catalog SKU counts, authorized vs unauthorized reseller counts, Buy Box retention rates, MAP compliance scores, and catalog customer sentiment averages across 45+ normalized attributes."
  },
  {
    q: "How do you calculate digital shelf Share of Voice (SOV)?",
    a: "We crawl top high-intent category search keywords and evaluate page-one product listings. We calculate the percentage of total top-tier placement slots captured by a brand across organic results, sponsored product ads, and editorial recommendations."
  },
  {
    q: "Can this dataset help protect brand equity against unauthorized sellers?",
    a: "Yes. Brand integrity teams utilize our unauthorized seller counts, Buy Box loss tracking, and MAP violation telemetry to pinpoint unauthorized distributors, combat counterfeit gray-market goods, and protect authorized dealer margins."
  },
  {
    q: "How frequently is brand intelligence data refreshed?",
    a: "Digital shelf rankings and Buy Box retention rates are audited on daily or weekly cadences. For major brand monitoring campaigns, we also provide custom continuous scraping pipelines that capture SERP changes in near real-time."
  },
  {
    q: "What delivery formats and cloud storage options are supported?",
    a: "Brand intelligence datasets are delivered in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet formats. Automated sync into AWS S3, Google Cloud Storage, Snowflake, BigQuery, or REST API endpoints is fully supported."
  },
  {
    q: "How can I request a sample brand intelligence dataset for my brand?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our enterprise data team will deliver a sample audit report covering your brand and top 3 competitors within 24 hours."
  }
];

export default function BrandIntelligencePage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Brand Intelligence' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified brand health telemetry, digital shelf share of voice, and reseller compliance feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Brand Dataset"
      badgeSubtext="100K+ Global Brands Indexed"
      title="E-commerce Brand Intelligence & Digital Shelf Placement Datasets"
      description="Monitor digital shelf share of voice (SOV), organic vs sponsored search placement, unauthorized seller brand dilution, customer sentiment benchmarks, and brand portfolio footprints across global e-commerce channels. Empower brand managers, enterprise manufacturers, and market intelligence teams with holistic brand health telemetry."
      featurePoints={[
        "Digital Shelf Share of Voice",
        "Sponsored vs Organic Rank",
        "Authorized Reseller Audits",
        "Brand Review Sentiment",
        "Portfolio Assortment Size",
        "Counterfeit Risk Flags"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Brand Scraper?"
      overviewCardTitle="Brand Intelligence Feed"
      liveBadgeText="Live Brand Feed"
      stats={[
        { label: "Brands Monitored", value: "100K+", subtext: "Enterprise brands" },
        { label: "Digital Shelf", value: "50M+", subtext: "SERP search rankings" },
        { label: "Catalog Footprint", value: "500M+", subtext: "Associated listings" },
        { label: "Update Cadence", value: "Daily / Weekly", subtext: "Brand health feeds" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, BigQuery, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Brand Sample"
      sampleSectionTitle="Explore the Brand Intelligence Schema"
      sampleSectionDescription="Inspect actual brand health records delivered in our dataset. Every field is verified, normalized, and formatted for direct loading into brand protection platforms, market intelligence dashboards, or executive BI tools."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_brand_intelligence_sample.json"
      csvFilename="ecommerce_brand_intelligence_sample.csv"
      sampleRecordCount="2 / 100K+ Brands"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Brand Attributes & Field Specifications"
      dictionarySectionDescription="Every brand record includes deep competitive telemetry—from search Share of Voice and sponsored placement ratios to authorized reseller audits, MAP compliance, and aggregate sentiment ratings."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine brand intelligence with product listings, real-time pricing trends, customer reviews, and merchant directories."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our digital shelf tracking methodology, share of voice calculation, reseller audits, and cloud delivery pipelines."
      faqs={faqs}
    />
  );
}

