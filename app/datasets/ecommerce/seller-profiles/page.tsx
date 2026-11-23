'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Store,
  Package,
  TrendingUp,
  Star,
  Layers,
  AlertCircle,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (SELLER PROFILES)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    seller_id: "A2L77EE7U53NWQ",
    storefront_name: "AnkerDirect",
    legal_business_name: "Fantasia Trading LLC",
    business_registration_number: "US-DE-5231908",
    marketplace: "amazon.com",
    country_of_registration: "United States",
    state_province: "California",
    business_address: "5350 Ontario Mills Pkwy, Suite 100, Ontario, CA 91764",
    positive_feedback_30d: 99.4,
    positive_feedback_90d: 99.1,
    positive_feedback_lifetime: 99.2,
    lifetime_feedback_count: 842190,
    total_active_asins: 1450,
    primary_category: "Electronics > Portable Audio & Power",
    top_brands: ["Anker", "Soundcore", "eufy", "Nebula"],
    fulfillment_model: "FBA (100% Prime)",
    brand_authorized_status: "Official Brand Storefront",
    seller_account_age_years: 12.5,
    customer_service_email: "support@anker.com",
    last_profile_sync: "2026-11-03T18:00:00Z"
  },
  {
    seller_id: "WMT-SLR-984021",
    storefront_name: "ProElectronics Deals",
    legal_business_name: "ProCommerce Distribution Inc",
    business_registration_number: "US-NY-8421093",
    marketplace: "walmart.com",
    country_of_registration: "United States",
    state_province: "New York",
    business_address: "140 58th St, Suite 4B, Brooklyn, NY 11220",
    positive_feedback_30d: 96.8,
    positive_feedback_90d: 97.2,
    positive_feedback_lifetime: 97.0,
    lifetime_feedback_count: 42350,
    total_active_asins: 3820,
    primary_category: "Cell Phones & Accessories",
    top_brands: ["Samsung", "Apple", "Belkin", "OtterBox"],
    fulfillment_model: "Walmart Fulfillment Services (WFS)",
    brand_authorized_status: "Verified 3rd-Party Reseller",
    seller_account_age_years: 6.2,
    customer_service_email: "orders@proelectronicsdeals.com",
    last_profile_sync: "2026-11-03T18:30:00Z"
  }
];

const csvSample = `seller_id,storefront_name,legal_business_name,marketplace,country,state,positive_feedback_lifetime,lifetime_feedback_count,active_asins,primary_category,fulfillment_model,status
A2L77EE7U53NWQ,AnkerDirect,"Fantasia Trading LLC",amazon.com,United States,CA,99.2,842190,1450,"Electronics > Power","FBA (100% Prime)","Official Brand Storefront"
WMT-SLR-984021,ProElectronics Deals,"ProCommerce Distribution Inc",walmart.com,United States,NY,97.0,42350,3820,"Cell Phones & Accessories","Walmart WFS","Verified 3rd-Party Reseller"
EBAY-SLR-330129,TechWarehouse USA,"OmniTech Retail LLC",ebay.com,United States,TX,98.6,189400,8900,"Computers & Tablets","Merchant Fulfilled","Top Rated Plus Seller"`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Merchant Identification & Verification",
    desc: "Official trading identity, legal entity status, and registered corporate profile.",
    fields: [
      { name: "Marketplace Seller ID", type: "String", desc: "Unique permanent merchant token assigned by the retail platform" },
      { name: "Public Storefront Name", type: "String", desc: "Customer-facing trade name displayed on the merchant storefront" },
      { name: "Legal Corporate Name", type: "String", desc: "Official registered enterprise name (e.g., LLC, Inc, GmbH, Ltd)" },
      { name: "Business Registration Number", type: "String", desc: "State or national corporate entity registration code" },
      { name: "Marketplace & Domain", type: "String", desc: "Retail platform origin (amazon.com, walmart.com, ebay.com, etc.)" }
    ]
  },
  {
    title: "2. Corporate Locations & Contact Details",
    desc: "Physical corporate addresses and verified customer support contact channels.",
    fields: [
      { name: "Registered Address", type: "String", desc: "Physical street address filed on official merchant business records" },
      { name: "City, State & Postal Code", type: "String", desc: "Normalized municipal location and postal zone of headquarters" },
      { name: "Country of Incorporation", type: "ISO Country", desc: "Country where merchant entity is legally headquartered" },
      { name: "Customer Service Email", type: "Email String", desc: "Public customer support contact email for order inquiries" },
      { name: "Customer Support Phone", type: "Phone String", desc: "Direct telephone hotline published on merchant profile" }
    ]
  },
  {
    title: "3. Reputation, Ratings & Lifetime Feedback",
    desc: "Customer satisfaction ratios, positive feedback percentages, and star rankings.",
    fields: [
      { name: "Positive Feedback (30D / 90D)", type: "Percentage", desc: "Recent rolling 30-day and 90-day customer satisfaction ratios" },
      { name: "Lifetime Feedback Score", type: "Percentage", desc: "Historical cumulative positive feedback ratio across store history" },
      { name: "Lifetime Feedback Count", type: "Integer", desc: "Total cumulative volume of customer merchant reviews received" },
      { name: "Average Star Rating", type: "Float (1.0 - 5.0)", desc: "Normalized aggregate merchant rating awarded by verified buyers" },
      { name: "Negative Feedback Ratio", type: "Percentage", desc: "Percentage of lifetime complaints regarding delivery or counterfeit issues" }
    ]
  },
  {
    title: "4. Catalog Footprint & Brand Matrix",
    desc: "Assortment scale, catalog breadth, and top brands represented by the seller.",
    fields: [
      { name: "Total Active SKUs / ASINs", type: "Integer", desc: "Current volume of live distinct products listed by the storefront" },
      { name: "Top Represented Brands", type: "Array (Strings)", desc: "Leading brand names comprising the largest share of merchant revenue" },
      { name: "Primary Category Classification", type: "String", desc: "Core retail department generating majority of merchant catalog" },
      { name: "Brand Authorization Status", type: "Enum", desc: "Status: 'Official Brand Store', 'Authorized Distributor', or '3P Reseller'" }
    ]
  },
  {
    title: "5. Fulfillment Models & Supply Chain",
    desc: "Logistics infrastructure, dispatch speeds, and fulfillment network reliance.",
    fields: [
      { name: "Primary Fulfillment Channel", type: "String", desc: "Fulfillment method (FBA, Walmart WFS, Merchant Fulfilled / FBM)" },
      { name: "Ships-From Warehouse Location", type: "String", desc: "Geographic dispatch origin for merchant-fulfilled parcels" },
      { name: "Average Dispatch Lead Time", type: "Float (Days)", desc: "Mean days between order placement and verified package handover" },
      { name: "Return & Restocking Policy", type: "String", desc: "Merchant specific terms regarding return windows and restock fees" }
    ]
  },
  {
    title: "6. Account Age & Compliance Telemetry",
    desc: "Risk indicators, cross-platform merchant linkage, and tenure telemetry.",
    fields: [
      { name: "Storefront Tenure / Age", type: "Float (Years)", desc: "Elapsed duration since merchant opened active marketplace storefront" },
      { name: "Cross-Platform Merchant Tokens", type: "Array (Strings)", desc: "Linked seller IDs identified across Walmart, eBay, and Amazon" },
      { name: "Account Status Flag", type: "Enum", desc: "Status: 'Active', 'Suspended', 'Under Review', or 'Deactivated'" },
      { name: "Last Profile Synchronization", type: "ISO-8601", desc: "UTC timestamp of the latest automated merchant audit" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Seller Profiles",
    slug: "/datasets/ecommerce/seller-profiles",
    desc: "Storefront details, 3P seller directories, ratings, inventory footprint, and merchant contact links.",
    icon: Store,
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
    q: "What information is included in the Seller Profiles Dataset?",
    a: "The dataset provides comprehensive merchant intelligence including official legal corporate entity names, registered physical business addresses, customer service emails and phone numbers, positive feedback ratings (30D, 90D, lifetime), total active catalog SKU counts, top brands distributed, and fulfillment models across 40+ normalized attributes."
  },
  {
    q: "How do you identify corporate business entities and physical addresses?",
    a: "We extract official marketplace legal entity declarations required by consumer protection mandates (such as the US INFORM Consumers Act and EU DSA regulations), capturing verified registered company names, business registration IDs, and official corporate mailing addresses."
  },
  {
    q: "Can this dataset be used to detect unauthorized sellers and gray market goods?",
    a: "Yes. Brand protection teams routinely cross-reference our seller database against authorized distributor rosters to identify rogue 3rd-party merchants selling diverted, counterfeit, or MAP-violating inventory."
  },
  {
    q: "Can you match merchants operating across different marketplaces?",
    a: "Yes. Using legal corporate names, business registration numbers, and normalized physical address matching algorithms, we link merchant storefronts operating concurrently across Amazon, Walmart, eBay, and regional marketplaces."
  },
  {
    q: "What delivery formats and cloud storage options are supported?",
    a: "Datasets are provided in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet formats. Automated sync into AWS S3, Google Cloud Storage, Snowflake, Databricks, PostgreSQL, or REST API endpoints is fully supported."
  },
  {
    q: "How can I request a sample merchant dataset for my category?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our data team will supply a sample extract covering verified merchants in your target product category within 24 hours."
  }
];

export default function SellerProfilesPage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Seller Profiles' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified merchant directories, legal business identities, and marketplace seller footprints."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Merchant Dataset"
      badgeSubtext="15M+ Global Sellers Profiled"
      title="E-commerce Marketplace Seller Profiles & Merchant Intelligence Datasets"
      description="Access comprehensive merchant directories and 3rd-party seller intelligence across Amazon, Walmart, eBay, and international shopping platforms. Extract corporate legal entities, registered business addresses, lifetime feedback ratings, catalog sizes, brand distribution footprints, and cross-platform merchant identities engineered for brand protection, lead generation, and competitive auditing."
      featurePoints={[
        "Verified Entity Names",
        "Business Physical Addresses",
        "Lifetime Feedback Scores",
        "Storefront Catalog Sizes",
        "Cross-Platform Matching",
        "Fulfillment Model Flags"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Merchant Scraper?"
      overviewCardTitle="Merchant Intelligence Feed"
      liveBadgeText="Live Merchant Feed"
      stats={[
        { label: "Seller Profiles", value: "15M+", subtext: "Global merchants mapped" },
        { label: "Coverage", value: "50+", subtext: "Marketplaces & regions" },
        { label: "Business Entities", value: "100%", subtext: "Verified registrations" },
        { label: "Catalog Velocity", value: "Weekly+", subtext: "Inventory refreshes" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, BigQuery, PostgreSQL, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Merchant Sample"
      sampleSectionTitle="Explore the Seller Profiles Schema"
      sampleSectionDescription="Inspect actual merchant records delivered in our dataset. Every field is verified, normalized, and formatted for direct integration into CRM pipelines, risk management engines, or brand protection tools."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_seller_profiles_sample.json"
      csvFilename="ecommerce_seller_profiles_sample.csv"
      sampleRecordCount="2 / 15M+ Profiles"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Merchant Attributes & Field Specifications"
      dictionarySectionDescription="Every seller record includes rich merchant data—from corporate legal filings and physical addresses to customer feedback scores, active SKU counts, and fulfillment classifications."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine merchant intelligence with complete product catalogs, real-time pricing trends, customer reviews, and category hierarchies."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our seller directory methodology, legal address validation, cross-platform matching, and delivery pipelines."
      faqs={faqs}
    />
  );
}

