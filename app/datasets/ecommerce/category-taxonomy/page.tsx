'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Layers,
  Package,
  TrendingUp,
  Star,
  Store,
  AlertCircle,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (CATEGORY TAXONOMY)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    category_id: "CAT-AMZ-281407",
    category_node_id: "281407",
    category_name: "Over-Ear Headphones",
    hierarchy_depth: 4,
    parent_category_id: "CAT-AMZ-172541",
    marketplace: "amazon.com",
    l1_department: "Electronics",
    l2_category: "Headphones, Earbuds & Accessories",
    l3_subcategory: "Headphones",
    l4_segment: "Over-Ear Headphones",
    l5_niche: null,
    full_breadcrumb_path: "Electronics > Headphones, Earbuds & Accessories > Headphones > Over-Ear Headphones",
    canonical_category_url: "https://www.amazon.com/b?node=281407",
    total_indexed_products: 48920,
    distinct_brands_count: 320,
    average_price_usd: 124.50,
    standard_taxonomy_code: "UNSPSC-52161514",
    google_product_category_id: 2922,
    has_children_nodes: true,
    last_taxonomy_sync: "2026-11-03T12:00:00Z"
  },
  {
    category_id: "CAT-WMT-3944-133277",
    category_node_id: "3944_133277",
    category_name: "Cordless Stick Vacuums",
    hierarchy_depth: 4,
    parent_category_id: "CAT-WMT-3944-1065",
    marketplace: "walmart.com",
    l1_department: "Home",
    l2_category: "Vacuums & Floor Care",
    l3_subcategory: "Stick Vacuums",
    l4_segment: "Cordless Stick Vacuums",
    l5_niche: null,
    full_breadcrumb_path: "Home > Vacuums & Floor Care > Stick Vacuums > Cordless Stick Vacuums",
    canonical_category_url: "https://www.walmart.com/browse/home/cordless-stick-vacuums/3944_133277",
    total_indexed_products: 18450,
    distinct_brands_count: 145,
    average_price_usd: 219.00,
    standard_taxonomy_code: "UNSPSC-47121607",
    google_product_category_id: 3014,
    has_children_nodes: false,
    last_taxonomy_sync: "2026-11-03T12:30:00Z"
  }
];

const csvSample = `category_id,node_id,category_name,depth,marketplace,l1_department,l2_category,l3_subcategory,l4_segment,total_products,distinct_brands,google_cat_id
CAT-AMZ-281407,281407,"Over-Ear Headphones",4,amazon.com,"Electronics","Audio & Accessories","Headphones","Over-Ear Headphones",48920,320,2922
CAT-WMT-3944-133277,3944_133277,"Cordless Stick Vacuums",4,walmart.com,"Home","Vacuums & Floor Care","Stick Vacuums","Cordless Stick Vacuums",18450,145,3014
CAT-TGT-5xt0t,5xt0t,"Smart Watches",3,target.com,"Electronics","Wearable Technology","Smart Watches",null,12400,68,5028`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Category Identifiers & Taxonomy Keys",
    desc: "Unique category node tokens and permanent navigation links across retail catalogs.",
    fields: [
      { name: "CompilePilot Category ID", type: "String", desc: "Normalized universal category identifier across all marketplaces" },
      { name: "Marketplace Node ID", type: "String / Integer", desc: "Native numeric category node token used in retailer page URLs" },
      { name: "Category Display Name", type: "String", desc: "Official human-readable name of the department or sub-category" },
      { name: "Canonical Category URL", type: "String (URL)", desc: "Direct permanent URL pointing to the live department listing page" },
      { name: "Marketplace & Domain", type: "String", desc: "Retail platform origin (amazon.com, walmart.com, target.com, etc.)" }
    ]
  },
  {
    title: "2. Hierarchical Taxonomy Breadcrumbs (L1–L5)",
    desc: "Full parent-child department trees parsed and normalized from root to leaf nodes.",
    fields: [
      { name: "L1 Department", type: "String", desc: "Top-level department tier (e.g., 'Electronics', 'Home & Kitchen', 'Fashion')" },
      { name: "L2 Category", type: "String", desc: "Secondary category grouping (e.g., 'Computers & Tablets', 'Audio')" },
      { name: "L3 Subcategory", type: "String", desc: "Tertiary departmental division (e.g., 'Laptops', 'Headphones')" },
      { name: "L4 Segment", type: "String", desc: "Quaternary product segment (e.g., 'Traditional Laptops', 'Over-Ear')" },
      { name: "Full Breadcrumb Path", type: "String / Array", desc: "Delimited text string and structured array of full hierarchical path" }
    ]
  },
  {
    title: "3. Relational Tree Structure & Depth",
    desc: "Graph relationships connecting parent departments, child nodes, and sibling categories.",
    fields: [
      { name: "Hierarchy Depth Level", type: "Integer (1 - 6)", desc: "Numeric tree depth counting levels down from primary root node" },
      { name: "Parent Node Identifier", type: "String", desc: "Identifier of immediate superior category in the taxonomy tree" },
      { name: "Child Nodes Count", type: "Integer", desc: "Number of immediate sub-categories branching from this node" },
      { name: "Has Children (Is Leaf Node)", type: "Boolean", desc: "True if category contains further child nodes; false if terminal leaf" }
    ]
  },
  {
    title: "4. Catalog Assortment & Scale Signals",
    desc: "Product indexing volumes, active merchant counts, and category price ranges.",
    fields: [
      { name: "Total Indexed Products", type: "Integer", desc: "Total cumulative volume of active SKUs mapped under this category node" },
      { name: "Distinct Brands Count", type: "Integer", desc: "Number of unique verified brands represented in this department" },
      { name: "Category Average Price", type: "Float (USD)", desc: "Benchmark mean selling price computed across all active catalog items" },
      { name: "Best Seller Rank (BSR) Range", type: "Range (Min - Max)", desc: "BSR sales velocity range indexed within the subcategory" }
    ]
  },
  {
    title: "5. Industry Standard Taxonomy Harmonization",
    desc: "Universal standard codes mapping disparate retailer taxonomies into global industry standards.",
    fields: [
      { name: "UNSPSC Code", type: "Standard Code", desc: "United Nations Standard Products and Services Code mapping" },
      { name: "Google Product Category ID", type: "Integer / Text", desc: "Google Shopping standardized product taxonomy category identifier" },
      { name: "Cross-Marketplace Equivalence", type: "Array (Node IDs)", desc: "Linked equivalent category nodes identified on competing platforms" }
    ]
  },
  {
    title: "6. Facet & Filter Specification Attributes",
    desc: "Available search filters, facet attributes, and navigational refinement options.",
    fields: [
      { name: "Available Facet Filters", type: "Array (Strings)", desc: "Left-rail filter attributes (e.g., 'Brand', 'Price', 'Rating', 'Size')" },
      { name: "Department Special Badges", type: "Array (Strings)", desc: "Department specific badges (e.g., 'Climate Pledge Friendly', 'Rollback')" },
      { name: "Taxonomy Sync Timestamp", type: "ISO-8601", desc: "UTC timestamp of the latest category tree crawling verification" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Category Taxonomy",
    slug: "/datasets/ecommerce/category-taxonomy",
    desc: "Hierarchical category tree mapping, department categorization, and breadcrumb structures.",
    icon: Layers,
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
    q: "What information is included in the Category Taxonomy Dataset?",
    a: "The dataset provides comprehensive hierarchical department mappings from top-level L1 departments down to granular L5 sub-categories. It includes unique marketplace node IDs, canonical category URLs, parent-child relational keys, active product volume counts, distinct brand counts, and cross-standard UNSPSC / Google Shopping category codes."
  },
  {
    q: "How do you harmonize different category trees across different marketplaces?",
    a: "Each marketplace uses its own unique naming and taxonomy logic. Our data engineering pipeline parses breadcrumbs from Amazon, Walmart, Target, and eBay, and maps them into a unified, normalized master category tree, cross-referenced with UNSPSC and Google Product Taxonomy codes."
  },
  {
    q: "Can I use this dataset to map and classify my internal product catalog?",
    a: "Yes. Many enterprise retailers, data scientists, and marketplace sellers utilize our category taxonomy dataset to train automated classification models, standardize disparate product feeds, and align cross-channel merchandising hierarchies."
  },
  {
    q: "How frequently is category taxonomy data updated?",
    a: "Marketplaces regularly merge, split, or rename seasonal and emerging sub-categories. We crawl and audit department trees bi-weekly, recording all newly introduced nodes, deprecated category IDs, and hierarchy changes in automated changelog feeds."
  },
  {
    q: "What delivery formats and cloud storage destinations are supported?",
    a: "Taxonomy datasets are supplied in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet formats. Automated sync into AWS S3, Google Cloud Storage, Snowflake, PostgreSQL, or REST API endpoints is fully supported."
  },
  {
    q: "How can I request a sample taxonomy dataset for my industry?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our team will supply a sample extract covering department trees in your target industry within 24 hours."
  }
];

export default function CategoryTaxonomyPage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Category Taxonomy' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified category trees, department hierarchies, and cross-retailer taxonomy mappings."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Taxonomy Dataset"
      badgeSubtext="500K+ Category Nodes Mapped"
      title="E-commerce Category Taxonomy & Department Hierarchy Datasets"
      description="Explore comprehensive, normalized department trees and hierarchical catalog taxonomy datasets across Amazon, Walmart, Target, Home Depot, and international shopping platforms. Harmonize disparate retailer taxonomies into unified L1 through L5 category breadcrumbs with parent-child relationships, node IDs, and product volume distributions engineered for catalog syndication, search classification, and assortment benchmarking."
      featurePoints={[
        "L1 to L5 Hierarchy Trees",
        "Standardized Category IDs",
        "Cross-Retailer Mapping",
        "Category Depth Indices",
        "Product Count Volume",
        "Breadcrumb Path Arrays"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Catalog Scraper?"
      overviewCardTitle="Category Taxonomy Feed"
      liveBadgeText="Live Taxonomy Feed"
      stats={[
        { label: "Category Nodes", value: "500K+", subtext: "Normalized departments" },
        { label: "Hierarchy Depth", value: "Up to L6", subtext: "Granular sub-categories" },
        { label: "Retail Platforms", value: "45+", subtext: "Harmonized structures" },
        { label: "Update Cadence", value: "Bi-Weekly+", subtext: "Taxonomy sync" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, PostgreSQL, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Taxonomy Sample"
      sampleSectionTitle="Explore the Category Taxonomy Schema"
      sampleSectionDescription="Inspect actual hierarchical taxonomy records delivered in our dataset. Every field is verified, structured, and normalized for direct loading into catalog mapping engines, search systems, or analytics pipelines."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_category_taxonomy_sample.json"
      csvFilename="ecommerce_category_taxonomy_sample.csv"
      sampleRecordCount="2 / 500K+ Categories"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Taxonomy Attributes & Field Specifications"
      dictionarySectionDescription="Every category record provides rich taxonomy metadata—from L1–L5 breadcrumb paths and node tokens to product counts, parent-child links, and UNSPSC codes."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine category taxonomy with full product catalog specifications, real-time pricing trends, customer reviews, and merchant directories."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our category mapping methodology, UNSPSC alignment, tree depth standards, and cloud delivery pipelines."
      faqs={faqs}
    />
  );
}

