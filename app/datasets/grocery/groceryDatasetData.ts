import {
  Apple,
  BarChart3,
  CircleCheck,
  MapPin,
  Package,
  Percent,
  Tags,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup } from '../components/DatasetTemplate';

export const groceryDatasets = {
  skuCatalog: {
    name: 'SKU Catalog',
    slug: 'sku-catalog',
    icon: Package,
    badge: 'Product Data',
    description: 'Normalized grocery product records with pack sizes, identifiers, brand, category, and listing details.',
    badgeSubtext: 'Product-level catalog records',
    title: 'Grocery SKU Catalog Dataset',
    overviewCardTitle: 'SKU Catalog Feed',
    heroDescription: 'Build a consistent view of grocery assortments across retailers. Match products by barcode, compare pack formats, and map each item to a clean brand and category hierarchy.',
    featurePoints: ['GTIN and retailer IDs', 'Pack and unit sizes', 'Brand and category mapping', 'Listing change history'],
    stats: [
      { label: 'Product Records', value: '1M+', subtext: 'Across monitored assortments' },
      { label: 'Identifiers', value: 'GTIN', subtext: 'Where published by retailers' },
      { label: 'Core Fields', value: '40+', subtext: 'Normalized catalog attributes' },
      { label: 'Refresh Cadence', value: 'Daily', subtext: 'Configurable by retailer' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Coverage', value: 'Grocery retail listings' },
      { label: 'Identifiers', value: 'GTIN, SKU, retailer ID', isHighlight: true },
    ],
    records: [
      { retailer: 'Market Street', retailer_sku: 'MS-10482', gtin: '0001111048205', product_name: 'Organic Whole Milk', brand: 'Valley Farm', category: 'Dairy > Milk', package_size: '1 gal', unit_price: 5.49, currency: 'USD', listing_status: 'active', observed_at: '2026-11-03T08:30:00Z' },
      { retailer: 'Fresh Basket', retailer_sku: 'FB-77201', gtin: '0002220772018', product_name: 'Baby Spinach', brand: 'Green Acres', category: 'Produce > Leafy Greens', package_size: '5 oz', unit_price: 3.29, currency: 'USD', listing_status: 'active', observed_at: '2026-11-03T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product Identity',
        desc: 'Retailer and global identifiers used to match the same product across stores.',
        fields: [
          { name: 'GTIN / UPC', type: 'String', desc: 'Published global trade item number or barcode.' },
          { name: 'Retailer SKU', type: 'String', desc: 'Product identifier assigned by the retailer.' },
          { name: 'Product Name', type: 'String', desc: 'Normalized consumer-facing item name.' },
          { name: 'Brand', type: 'String', desc: 'Brand name associated with the listing.' },
        ],
      },
      {
        title: 'Assortment Details',
        desc: 'Pack, category, and listing attributes for assortment analysis.',
        fields: [
          { name: 'Category Path', type: 'String', desc: 'Normalized department and subcategory hierarchy.' },
          { name: 'Package Size', type: 'String', desc: 'Published package count, weight, or volume.' },
          { name: 'Unit Price', type: 'Decimal', desc: 'Observed listing price in the displayed currency.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the product record was captured.' },
        ],
      },
    ],
    faq: {
      q: 'How are matching grocery products identified across retailers?',
      a: 'Records use published GTIN or UPC values when available, alongside retailer SKU, product name, brand, and package size. Match confidence can be included for products without a shared barcode.',
    },
  },
  priceMonitoring: {
    name: 'Price Monitoring',
    slug: 'price-monitoring',
    icon: TrendingUp,
    badge: 'Price Intelligence',
    description: 'Timestamped shelf prices, unit prices, and price movement history for grocery products.',
    badgeSubtext: 'Comparable price observations',
    title: 'Grocery Price Monitoring Dataset',
    overviewCardTitle: 'Price Monitor Feed',
    heroDescription: 'Track grocery shelf prices across retailers and locations with a consistent time series. Compare equivalent pack sizes, follow price changes, and spot local differences in everyday essentials.',
    featurePoints: ['Timestamped shelf prices', 'Comparable unit pricing', 'Promotion-aware records', 'Retailer and store context'],
    stats: [
      { label: 'Price Points', value: 'Daily', subtext: 'Historical snapshots available' },
      { label: 'Price Fields', value: '15+', subtext: 'Shelf and unit price metrics' },
      { label: 'Markets', value: 'Multi-region', subtext: 'Retailer and location based' },
      { label: 'History', value: '12 mo+', subtext: 'Available by coverage plan' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Currency', value: 'Source currency retained' },
      { label: 'History', value: 'Timestamped snapshots', isHighlight: true },
    ],
    records: [
      { retailer: 'Market Street', store_id: 'MS-018', product_gtin: '0001111048205', product_name: 'Organic Whole Milk', shelf_price: 5.49, unit_price: 0.043, unit_of_measure: 'fl oz', currency: 'USD', promo_active: false, observed_at: '2026-11-03T08:30:00Z' },
      { retailer: 'Fresh Basket', store_id: 'FB-204', product_gtin: '0002220772018', product_name: 'Baby Spinach', shelf_price: 3.29, unit_price: 0.658, unit_of_measure: 'oz', currency: 'USD', promo_active: true, observed_at: '2026-11-03T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Observed Price',
        desc: 'Retail prices captured with their units, source, and observation time.',
        fields: [
          { name: 'Shelf Price', type: 'Decimal', desc: 'Displayed item price before applicable discounts.' },
          { name: 'Unit Price', type: 'Decimal', desc: 'Price per normalized weight, volume, or count unit.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the source price.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for this price observation.' },
        ],
      },
      {
        title: 'Comparison Context',
        desc: 'Product and store keys for like-for-like price comparisons.',
        fields: [
          { name: 'Product GTIN', type: 'String', desc: 'Barcode used to identify the matching product.' },
          { name: 'Retailer', type: 'String', desc: 'Retail brand hosting the product listing.' },
          { name: 'Store ID', type: 'String', desc: 'Store or fulfillment location tied to the observation.' },
          { name: 'Promotion Active', type: 'Boolean', desc: 'Indicates whether a visible promotion was present.' },
        ],
      },
    ],
    faq: {
      q: 'Can prices be compared across different package sizes?',
      a: 'Yes. Where package quantities are available, the feed includes a normalized unit price and unit of measure. This supports comparisons across different pack sizes while keeping each retailer’s original shelf price.',
    },
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: CircleCheck,
    badge: 'Inventory Signals',
    description: 'Store- and channel-level grocery availability observations with fulfillment context.',
    badgeSubtext: 'Location-aware stock signals',
    title: 'Grocery Availability Dataset',
    overviewCardTitle: 'Availability Feed',
    heroDescription: 'Understand which grocery products shoppers can find and fulfill by store or delivery area. Monitor in-stock signals, pickup and delivery options, and changes in availability over time.',
    featurePoints: ['Store-level status', 'Pickup and delivery flags', 'Observed timestamps', 'Availability history'],
    stats: [
      { label: 'Status Checks', value: 'Daily', subtext: 'Configurable sampling cadence' },
      { label: 'Channels', value: '3+', subtext: 'In-store, pickup, delivery' },
      { label: 'Location Keys', value: 'Store ID', subtext: 'Or postal-area coverage' },
      { label: 'Signals', value: 'Stock + ETA', subtext: 'When shown by the source' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and location' },
      { label: 'Status', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { retailer: 'Market Street', store_id: 'MS-018', product_gtin: '0001111048205', product_name: 'Organic Whole Milk', availability_status: 'in_stock', pickup_available: true, delivery_available: true, estimated_ready_minutes: 45, observed_at: '2026-11-03T08:30:00Z' },
      { retailer: 'Fresh Basket', store_id: 'FB-204', product_gtin: '0002220772018', product_name: 'Baby Spinach', availability_status: 'low_stock', pickup_available: true, delivery_available: false, estimated_ready_minutes: 60, observed_at: '2026-11-03T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Location',
        desc: 'Keys connecting each availability observation to its product and store.',
        fields: [
          { name: 'Product GTIN', type: 'String', desc: 'Barcode or global product identifier, when available.' },
          { name: 'Retailer', type: 'String', desc: 'Retailer associated with the availability signal.' },
          { name: 'Store ID', type: 'String', desc: 'Store or fulfillment location identifier.' },
          { name: 'Product Name', type: 'String', desc: 'Consumer-facing item name from the listing.' },
        ],
      },
      {
        title: 'Fulfillment Status',
        desc: 'Source-reported inventory and fulfillment options at capture time.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Observed status such as in stock, low stock, or unavailable.' },
          { name: 'Pickup Available', type: 'Boolean', desc: 'Whether pickup was offered for the selected location.' },
          { name: 'Delivery Available', type: 'Boolean', desc: 'Whether delivery was offered for the selected area.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the status was checked.' },
        ],
      },
    ],
    faq: {
      q: 'Does an availability record guarantee inventory is still on the shelf?',
      a: 'No. Availability is a time-stamped observation of the retailer’s published online signal, not a reservation or live inventory guarantee. Refresh cadence and source context are provided so downstream systems can judge freshness.',
    },
  },
  promotionsDeals: {
    name: 'Promotions & Deals',
    slug: 'promotions-deals',
    icon: Percent,
    badge: 'Promotion Intelligence',
    description: 'Grocery discounts, advertised deals, loyalty pricing, and promotion validity windows.',
    badgeSubtext: 'Offer and markdown tracking',
    title: 'Grocery Promotions & Deals Dataset',
    overviewCardTitle: 'Promotions Feed',
    heroDescription: 'Compare advertised grocery offers across retailers and markets. Capture deal mechanics, loyalty requirements, date ranges, and effective prices to understand promotional activity at product level.',
    featurePoints: ['Offer type and terms', 'Start and end dates', 'Loyalty price flags', 'Discount calculations'],
    stats: [
      { label: 'Offer Types', value: '10+', subtext: 'Sale, coupon, multi-buy' },
      { label: 'Offer Windows', value: 'Dated', subtext: 'Start and end when shown' },
      { label: 'Price Context', value: 'Before + after', subtext: 'Observed offer values' },
      { label: 'Refresh', value: 'Daily', subtext: 'During active campaigns' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Offer Scope', value: 'Product and retailer' },
      { label: 'Terms', value: 'Captured when published', isHighlight: true },
    ],
    records: [
      { retailer: 'Market Street', offer_id: 'MS-OFR-8821', product_gtin: '0001111048205', product_name: 'Organic Whole Milk', offer_type: 'weekly_sale', regular_price: 5.99, offer_price: 5.49, discount_percent: 8.3, loyalty_required: false, valid_from: '2026-11-01', valid_to: '2026-11-07' },
      { retailer: 'Fresh Basket', offer_id: 'FB-OFR-1904', product_gtin: '0002220772018', product_name: 'Baby Spinach', offer_type: 'loyalty_price', regular_price: 3.79, offer_price: 3.29, discount_percent: 13.2, loyalty_required: true, valid_from: '2026-11-02', valid_to: '2026-11-08' },
    ],
    attributeGroups: [
      {
        title: 'Offer Details',
        desc: 'Promotion identifiers and consumer-facing offer mechanics.',
        fields: [
          { name: 'Offer ID', type: 'String', desc: 'Identifier for the retailer promotion, when published.' },
          { name: 'Offer Type', type: 'String', desc: 'Sale, coupon, loyalty price, multi-buy, or other observed mechanic.' },
          { name: 'Loyalty Required', type: 'Boolean', desc: 'Whether the displayed offer requires membership.' },
          { name: 'Valid From / To', type: 'Date', desc: 'Advertised offer validity dates where provided.' },
        ],
      },
      {
        title: 'Promotion Pricing',
        desc: 'Offer and regular price values for discount analysis.',
        fields: [
          { name: 'Regular Price', type: 'Decimal', desc: 'Reference price shown alongside the deal.' },
          { name: 'Offer Price', type: 'Decimal', desc: 'Displayed promotional item price.' },
          { name: 'Discount Percent', type: 'Decimal', desc: 'Calculated reduction from regular to offer price.' },
          { name: 'Product GTIN', type: 'String', desc: 'Barcode linking the offer to its product.' },
        ],
      },
    ],
    faq: {
      q: 'Are loyalty-only and multi-buy offers included?',
      a: 'Yes, when those terms are visible in the source. The feed records the offer type, qualifying terms, loyalty requirement, displayed prices, and validity dates where available.',
    },
  },
  nutritionalData: {
    name: 'Nutritional Data',
    slug: 'nutritional-data',
    icon: Apple,
    badge: 'Nutrition Attributes',
    description: 'Structured nutrition facts, serving information, ingredients, and dietary labels for grocery products.',
    badgeSubtext: 'Label-level product details',
    title: 'Grocery Nutritional Data Dataset',
    overviewCardTitle: 'Nutrition Data Feed',
    heroDescription: 'Analyze packaged food assortments with structured label information. Normalize serving sizes, nutrients, ingredient statements, and source-published dietary claims for catalog enrichment and product research.',
    featurePoints: ['Serving-size normalization', 'Macro and micronutrients', 'Ingredient statements', 'Dietary labels as listed'],
    stats: [
      { label: 'Nutrition Fields', value: '30+', subtext: 'Label-derived attributes' },
      { label: 'Serving Basis', value: 'Per serving', subtext: 'Per 100 g where available' },
      { label: 'Product Match', value: 'GTIN', subtext: 'With listing identifiers' },
      { label: 'Refresh', value: 'On change', subtext: 'Label and listing updates' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Source', value: 'Published product labels' },
      { label: 'Dietary Claims', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { product_gtin: '0001111048205', product_name: 'Organic Whole Milk', serving_size: '1 cup (240 ml)', calories_kcal: 150, protein_g: 8, total_fat_g: 8, total_carbohydrate_g: 12, sugars_g: 12, sodium_mg: 105, ingredients: 'Organic Grade A milk, vitamin D3', dietary_labels: ['organic', 'gluten-free'], observed_at: '2026-11-03T08:30:00Z' },
      { product_gtin: '0003330456102', product_name: 'Rolled Oats', serving_size: '1/2 cup (40 g)', calories_kcal: 150, protein_g: 5, total_fat_g: 3, total_carbohydrate_g: 27, sugars_g: 1, sodium_mg: 0, ingredients: 'Whole grain rolled oats', dietary_labels: ['vegan', 'whole grain'], observed_at: '2026-11-03T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Serving and Nutrients',
        desc: 'Nutrition panel values with serving basis and measurement units.',
        fields: [
          { name: 'Serving Size', type: 'String', desc: 'Serving quantity and measure as published on the label.' },
          { name: 'Calories', type: 'Integer (kcal)', desc: 'Energy per stated serving, when available.' },
          { name: 'Protein / Fat / Carbohydrate', type: 'Decimal (g)', desc: 'Macronutrients per serving.' },
          { name: 'Sodium', type: 'Decimal (mg)', desc: 'Sodium amount per serving.' },
        ],
      },
      {
        title: 'Ingredients and Claims',
        desc: 'Label text and product claims retained with source context.',
        fields: [
          { name: 'Ingredients', type: 'String', desc: 'Ingredient statement transcribed from the product listing or label.' },
          { name: 'Dietary Labels', type: 'Array', desc: 'Dietary claims presented by the source retailer or manufacturer.' },
          { name: 'Product GTIN', type: 'String', desc: 'Barcode used to match the nutrition record to the item.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the latest captured label data.' },
        ],
      },
    ],
    faq: {
      q: 'Are dietary labels independently certified?',
      a: 'The dataset captures claims displayed by the retailer or manufacturer and preserves their source context. It does not independently certify claims or replace professional nutrition guidance.',
    },
  },
  storeLocations: {
    name: 'Store Locations',
    slug: 'store-locations',
    icon: MapPin,
    badge: 'Retail Footprint',
    description: 'Grocery store directory records with addresses, geographic coordinates, and published services.',
    badgeSubtext: 'Geocoded store-level coverage',
    title: 'Grocery Store Locations Dataset',
    overviewCardTitle: 'Store Directory Feed',
    heroDescription: 'Map grocery retail coverage with standardized location records. Join store identifiers to market data, find nearby branches, and analyze published store hours and fulfillment services.',
    featurePoints: ['Normalized addresses', 'Latitude and longitude', 'Store hours where listed', 'Service availability'],
    stats: [
      { label: 'Location Records', value: '50K+', subtext: 'Across covered retail brands' },
      { label: 'Geo Fields', value: 'Lat / Long', subtext: 'Where source data permits' },
      { label: 'Store Details', value: '20+', subtext: 'Address and service fields' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Location change monitoring' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Individual store' },
      { label: 'Coordinates', value: 'Source or geocoded', isHighlight: true },
    ],
    records: [
      { retailer: 'Market Street', store_id: 'MS-018', store_name: 'Market Street North', address: '1200 North Main St', city: 'Madison', region: 'WI', postal_code: '53703', country: 'US', latitude: 43.0796, longitude: -89.3841, pickup_available: true, delivery_available: true, observed_at: '2026-11-03T06:00:00Z' },
      { retailer: 'Fresh Basket', store_id: 'FB-204', store_name: 'Fresh Basket Central', address: '455 Lake Ave', city: 'Madison', region: 'WI', postal_code: '53704', country: 'US', latitude: 43.1013, longitude: -89.3564, pickup_available: true, delivery_available: false, observed_at: '2026-11-03T06:00:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Store Identity and Address',
        desc: 'Stable identifiers and structured postal address components.',
        fields: [
          { name: 'Store ID', type: 'String', desc: 'Retailer-assigned identifier for the location.' },
          { name: 'Store Name', type: 'String', desc: 'Published branch name, where available.' },
          { name: 'Address', type: 'String', desc: 'Street address and normalized city, region, and postal code.' },
          { name: 'Country', type: 'ISO-3166', desc: 'Country code for the location.' },
        ],
      },
      {
        title: 'Geography and Services',
        desc: 'Coordinates and store services published by the retailer.',
        fields: [
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Store coordinates from source data or geocoding.' },
          { name: 'Pickup Available', type: 'Boolean', desc: 'Whether the retailer lists pickup for the branch.' },
          { name: 'Delivery Available', type: 'Boolean', desc: 'Whether the retailer lists delivery for the branch.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time the location record was last checked.' },
        ],
      },
    ],
    faq: {
      q: 'Are store coordinates always supplied directly by retailers?',
      a: 'Coordinates are taken from retailer-published data when available; otherwise, they may be geocoded from the listed address. The delivery schema identifies coordinate provenance when that detail is available.',
    },
  },
  brandCoverage: {
    name: 'Brand Coverage',
    slug: 'brand-coverage',
    icon: Tags,
    badge: 'Brand Assortment',
    description: 'Retailer-level brand presence, product counts, and category coverage for grocery brands.',
    badgeSubtext: 'Cross-retailer brand mapping',
    title: 'Grocery Brand Coverage Dataset',
    overviewCardTitle: 'Brand Coverage Feed',
    heroDescription: 'Measure where grocery brands appear and how their assortments vary by retailer, category, and market. Follow product counts and listing presence using consistent brand and retailer keys.',
    featurePoints: ['Brand normalization', 'Retailer presence', 'Category-level assortment', 'Listing count comparisons'],
    stats: [
      { label: 'Brands', value: '100K+', subtext: 'Across covered categories' },
      { label: 'Coverage Keys', value: 'Retailer', subtext: 'Brand, category, market' },
      { label: 'Presence', value: 'SKU-level', subtext: 'Linked catalog listings' },
      { label: 'Refresh', value: 'Weekly', subtext: 'Configurable coverage checks' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Dimensions', value: 'Brand, retailer, category' },
      { label: 'Brand Names', value: 'Normalized aliases', isHighlight: true },
    ],
    records: [
      { brand_id: 'BR-GA-001', brand_name: 'Valley Farm', retailer: 'Market Street', category: 'Dairy', listed_sku_count: 42, active_sku_count: 39, market: 'US-WI', coverage_share_percent: 18.4, observed_at: '2026-11-02T12:00:00Z' },
      { brand_id: 'BR-GA-002', brand_name: 'Green Acres', retailer: 'Fresh Basket', category: 'Produce', listed_sku_count: 27, active_sku_count: 24, market: 'US-WI', coverage_share_percent: 11.2, observed_at: '2026-11-02T12:00:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Brand and Retailer',
        desc: 'Normalized brand identities and the retail context where they are listed.',
        fields: [
          { name: 'Brand ID', type: 'String', desc: 'Stable normalized identifier for a brand entity.' },
          { name: 'Brand Name', type: 'String', desc: 'Preferred brand name after alias normalization.' },
          { name: 'Retailer', type: 'String', desc: 'Retailer where products for the brand were observed.' },
          { name: 'Market', type: 'String', desc: 'Country, region, or market segment covered.' },
        ],
      },
      {
        title: 'Assortment Coverage',
        desc: 'Listing counts and category presence for each retailer-brand combination.',
        fields: [
          { name: 'Category', type: 'String', desc: 'Normalized grocery department or category.' },
          { name: 'Listed SKU Count', type: 'Integer', desc: 'Distinct brand listings observed for the retailer.' },
          { name: 'Active SKU Count', type: 'Integer', desc: 'Listings currently marked active by the source.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the coverage snapshot.' },
        ],
      },
    ],
    faq: {
      q: 'How are alternate brand spellings handled?',
      a: 'Brand aliases can be mapped to a preferred normalized brand name while retaining the source label for auditability. Uncertain matches can be delivered with confidence or left unmatched based on your requirements.',
    },
  },
  categoryTrends: {
    name: 'Category Trends',
    slug: 'category-trends',
    icon: BarChart3,
    badge: 'Market Trends',
    description: 'Longitudinal grocery category indicators based on assortment, observed prices, and product activity.',
    badgeSubtext: 'Category-level market signals',
    title: 'Grocery Category Trends Dataset',
    overviewCardTitle: 'Category Trends Feed',
    heroDescription: 'Follow how grocery categories change over time across covered retailers. Analyze assortment breadth, price movement, promotion activity, and product additions with clear market and time-period context.',
    featurePoints: ['Category and market series', 'Price index movement', 'Assortment changes', 'Promotion prevalence'],
    stats: [
      { label: 'Trend Measures', value: '20+', subtext: 'Category-level indicators' },
      { label: 'Time Grain', value: 'Weekly', subtext: 'Daily options by source' },
      { label: 'Market Scope', value: 'Regional', subtext: 'Retailer coverage dependent' },
      { label: 'History', value: '12 mo+', subtext: 'Available by coverage plan' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Grain', value: 'Category, market, period' },
      { label: 'Measures', value: 'Observed indicators', isHighlight: true },
    ],
    records: [
      { category_id: 'CAT-DAIRY-MILK', category: 'Dairy > Milk', retailer: 'Market Street', market: 'US-WI', period_start: '2026-10-26', period_end: '2026-11-01', active_sku_count: 186, average_unit_price: 0.041, price_index_change_percent: -1.8, promo_share_percent: 14.5, new_sku_count: 3 },
      { category_id: 'CAT-PRODUCE-LEAFY', category: 'Produce > Leafy Greens', retailer: 'Fresh Basket', market: 'US-WI', period_start: '2026-10-26', period_end: '2026-11-01', active_sku_count: 94, average_unit_price: 0.612, price_index_change_percent: 2.4, promo_share_percent: 9.6, new_sku_count: 1 },
    ],
    attributeGroups: [
      {
        title: 'Trend Dimensions',
        desc: 'Category, retailer, market, and reporting period for each measurement.',
        fields: [
          { name: 'Category ID / Path', type: 'String', desc: 'Stable category key and readable hierarchy.' },
          { name: 'Retailer', type: 'String', desc: 'Retailer included in the category observation.' },
          { name: 'Market', type: 'String', desc: 'Geographic market represented by the series.' },
          { name: 'Period Start / End', type: 'Date', desc: 'Inclusive dates covered by the aggregate record.' },
        ],
      },
      {
        title: 'Category Measures',
        desc: 'Comparable measures describing assortment and observed market activity.',
        fields: [
          { name: 'Active SKU Count', type: 'Integer', desc: 'Distinct active products observed in the period.' },
          { name: 'Average Unit Price', type: 'Decimal', desc: 'Mean normalized unit price for included observations.' },
          { name: 'Price Index Change', type: 'Percentage', desc: 'Change in the category price index from the prior period.' },
          { name: 'Promotion Share', type: 'Percentage', desc: 'Share of observed listings with an active promotion.' },
        ],
      },
    ],
    faq: {
      q: 'How should category-level price trends be interpreted?',
      a: 'Trend measures are computed from the covered products and sources for each period. They are directional indicators rather than a universal cost-of-living index; product coverage, market, and aggregation method should be considered when comparing series.',
    },
  },
} satisfies Record<string, {
  name: string;
  slug: string;
  icon: LucideIcon;
  badge: string;
  description: string;
  badgeSubtext: string;
  title: string;
  overviewCardTitle: string;
  heroDescription: string;
  featurePoints: string[];
  stats: { label: string; value: string; subtext: string }[];
  metadataItems: { label: string; value: string; isHighlight?: boolean }[];
  records: Record<string, string | number | boolean | string[]>[];
  attributeGroups: DataDictionaryGroup[];
  faq: { q: string; a: string };
}>;

export type GroceryDatasetKey = keyof typeof groceryDatasets;