import {
  DollarSign,
  Layers,
  MapPin,
  Star,
  Store,
  Tag,
  TrendingUp,
  Wine,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type LiquorDatasetKey =
  | 'productCatalog'
  | 'pricingData'
  | 'availability'
  | 'ratings'
  | 'brandProfiles'
  | 'categoryData'
  | 'marketTrends'
  | 'retailerCoverage';

interface LiquorDataset {
  name: string;
  slug: string;
  icon: LucideIcon;
  badge: string;
  badgeSubtext: string;
  title: string;
  overviewCardTitle: string;
  description: string;
  heroDescription: string;
  featurePoints: string[];
  stats: { label: string; value: string; subtext: string }[];
  metadataItems: { label: string; value: string; isHighlight?: boolean }[];
  records: Record<string, string | number | boolean>[];
  attributeGroups: DataDictionaryGroup[];
  faqs: FAQItem[];
}

export const liquorDatasets: Record<LiquorDatasetKey, LiquorDataset> = {
  productCatalog: {
    name: 'Product Catalog',
    slug: 'product-catalog',
    icon: Wine,
    badge: 'Beverage Catalog',
    badgeSubtext: 'Product and bottle attributes',
    title: 'Liquor & Alcohol Product Catalog Dataset',
    overviewCardTitle: 'Product Catalog Feed',
    description: 'Structured beverage product listings with brand, category, bottle size, identifiers, origin, and published alcohol attributes.',
    heroDescription: 'Build a normalized catalog across retailers and beverage categories. Match products using UPC or GTIN where available and retain source listing details for bottle formats, origin, producer, and label attributes.',
    featurePoints: ['UPC / GTIN product keys', 'Brand and category mapping', 'Bottle size and packaging', 'Origin and published ABV'],
    stats: [
      { label: 'Catalog Fields', value: '35+', subtext: 'Product and label attributes' },
      { label: 'Product Keys', value: 'UPC / GTIN', subtext: 'When published by source' },
      { label: 'Categories', value: 'Multi-type', subtext: 'Wine, beer, and spirits' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on sources' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Retail product listing' },
      { label: 'Product details', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { product_id: 'LIQ-BOU-10482', upc: '0008835210482', product_name: 'North Ridge Small Batch Bourbon', brand: 'North Ridge', category: 'Spirits > Whiskey > Bourbon', bottle_size_ml: 750, abv_percent: 45, origin_country: 'United States', producer: 'North Ridge Distilling', observed_at: '2026-11-12T08:30:00Z' },
      { product_id: 'LIQ-WIN-30214', upc: '0007741830214', product_name: 'Stone Harbor Coastal Pinot Noir', brand: 'Stone Harbor', category: 'Wine > Red > Pinot Noir', bottle_size_ml: 750, abv_percent: 13.5, origin_country: 'United States', producer: 'Stone Harbor Cellars', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product Identity',
        desc: 'Identifiers and labels used to match the same product across retailers.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Normalized product key for the catalog record.' },
          { name: 'UPC / GTIN', type: 'String', desc: 'Published product barcode when available.' },
          { name: 'Product Name', type: 'String', desc: 'Consumer-facing item name as displayed by the retailer.' },
          { name: 'Brand / Producer', type: 'String', desc: 'Brand and producer names associated with the product.' },
        ],
      },
      {
        title: 'Beverage Attributes',
        desc: 'Category, bottle, and origin details published for the product.',
        fields: [
          { name: 'Category Path', type: 'String', desc: 'Normalized beverage category and subcategory.' },
          { name: 'Bottle Size', type: 'Integer (ml)', desc: 'Published container volume normalized to milliliters.' },
          { name: 'ABV', type: 'Decimal (%)', desc: 'Alcohol by volume when stated by the source.' },
          { name: 'Origin Country', type: 'String', desc: 'Country of origin as published or normalized.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are UPC or GTIN values available for every product?', a: 'No. Identifiers are included when visible or available from the source. Records without a published barcode can still be matched using names, brand, size, and other product attributes.' },
      { q: 'Is alcohol content independently tested?', a: 'No. ABV values are captured from public product or retailer information and are not laboratory measurements or independent verification.' },
      { q: 'Can products be matched across different bottle sizes?', a: 'Yes. Product identity can be normalized while size variants remain separate sellable records, making pack and volume comparisons explicit.' },
      { q: 'Which data formats are available?', a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery can be scoped for a preferred storage destination.' },
    ],
  },
  pricingData: {
    name: 'Pricing Data',
    slug: 'pricing-data',
    icon: DollarSign,
    badge: 'Price Intelligence',
    badgeSubtext: 'Retailer and bottle-level observations',
    title: 'Liquor & Alcohol Pricing Dataset',
    overviewCardTitle: 'Beverage Price Monitor',
    description: 'Timestamped retailer prices for alcoholic beverage products, including bottle size, unit-price context, promotions, and currency.',
    heroDescription: 'Track beverage prices across retailers and regions with bottle and package context intact. Compare equivalent sizes, preserve displayed promotion terms, and follow price movement through timestamped observations.',
    featurePoints: ['Retailer-level price points', 'Bottle-size normalization', 'Unit-price comparisons', 'Promotion-aware history'],
    stats: [
      { label: 'Price Fields', value: '20+', subtext: 'Shelf and unit values' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
      { label: 'Comparison', value: 'Size-aware', subtext: 'Bottle and pack context' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product, retailer, location' },
      { label: 'Price basis', value: 'Displayed retail price', isHighlight: true },
    ],
    records: [
      { retailer: 'Bottle & Barrel', store_id: 'BB-SEA-018', product_id: 'LIQ-BOU-10482', product_name: 'North Ridge Small Batch Bourbon', bottle_size_ml: 750, shelf_price: 38.99, unit_price_per_liter: 51.99, currency: 'USD', promotion_active: false, observed_at: '2026-11-12T09:00:00Z' },
      { retailer: 'Cellar Market', store_id: 'CM-PDX-042', product_id: 'LIQ-WIN-30214', product_name: 'Stone Harbor Coastal Pinot Noir', bottle_size_ml: 750, shelf_price: 21.5, unit_price_per_liter: 28.67, currency: 'USD', promotion_active: true, observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Observed Price',
        desc: 'Retail prices captured with product and currency context.',
        fields: [
          { name: 'Shelf Price', type: 'Decimal', desc: 'Displayed product price at the observed retailer.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the displayed amount.' },
          { name: 'Unit Price', type: 'Decimal', desc: 'Price normalized to a configured volume or package unit.' },
          { name: 'Promotion Active', type: 'Boolean', desc: 'Indicates whether a visible promotion was present.' },
        ],
      },
      {
        title: 'Product and Retail Context',
        desc: 'Bottle, retailer, and location attributes for comparable pricing.',
        fields: [
          { name: 'Product ID / Name', type: 'String', desc: 'Catalog identifier and retailer-facing product name.' },
          { name: 'Bottle Size', type: 'Integer (ml)', desc: 'Container volume used to interpret the listed price.' },
          { name: 'Retailer / Store ID', type: 'String', desc: 'Seller and branch associated with the price point.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for this price observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are prices inclusive of taxes and deposits?', a: 'Tax, deposit, and fee treatment varies by retailer and market. The feed captures the displayed amount and any visible price context, but does not assume all charges are included.' },
      { q: 'How are different bottle sizes compared?', a: 'Bottle volumes are normalized where possible, enabling unit-price comparisons while retaining the original package size and shelf price.' },
      { q: 'Can historical pricing and promotion changes be tracked?', a: 'Timestamped snapshots can support historical analysis for the selected collection cadence and retention period.' },
      { q: 'Can the same product be compared across retailers?', a: 'Yes, when product identifiers or matching attributes support a reliable match. Source listing IDs and bottle sizes remain available for validation.' },
    ],
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: MapPin,
    badge: 'Retail Availability Signals',
    badgeSubtext: 'Product and location snapshots',
    title: 'Liquor & Alcohol Availability Dataset',
    overviewCardTitle: 'Availability Monitor',
    description: 'Retail product availability observations by beverage, retailer, store or delivery area, with timestamp and source status.',
    heroDescription: 'Monitor where beverage products are listed as available across retailers and markets. Location-aware snapshots capture source-reported stock and fulfillment signals without treating them as guaranteed inventory.',
    featurePoints: ['Product and store identifiers', 'Location-level status', 'Pickup and delivery signals', 'Timestamped availability history'],
    stats: [
      { label: 'Status Values', value: 'Normalized', subtext: 'Original source labels retained' },
      { label: 'Granularity', value: 'SKU + location', subtext: 'Retail or service area' },
      { label: 'Fulfillment', value: 'When listed', subtext: 'Pickup and delivery flags' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Cadence set by scope' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and retail location' },
      { label: 'Status basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { retailer: 'Bottle & Barrel', store_id: 'BB-SEA-018', product_id: 'LIQ-BOU-10482', product_name: 'North Ridge Small Batch Bourbon', availability_status: 'in_stock', pickup_available: true, delivery_available: true, stock_label: 'Available', observed_at: '2026-11-12T10:00:00Z' },
      { retailer: 'Cellar Market', store_id: 'CM-PDX-042', product_id: 'LIQ-WIN-30214', product_name: 'Stone Harbor Coastal Pinot Noir', availability_status: 'limited', pickup_available: true, delivery_available: false, stock_label: 'Low stock', observed_at: '2026-11-12T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Location',
        desc: 'Keys connecting each availability observation to a product and store.',
        fields: [
          { name: 'Product ID / Name', type: 'String', desc: 'Normalized product key and displayed product name.' },
          { name: 'Retailer', type: 'String', desc: 'Retail chain associated with the listing.' },
          { name: 'Store ID', type: 'String', desc: 'Branch or fulfillment location identifier.' },
          { name: 'Location', type: 'String', desc: 'City, postal area, or service location where available.' },
        ],
      },
      {
        title: 'Availability State',
        desc: 'Source-reported stock status and fulfillment options.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Normalized state such as in stock, limited, or unavailable.' },
          { name: 'Source Stock Label', type: 'String', desc: 'Original availability wording displayed by the retailer.' },
          { name: 'Pickup / Delivery Available', type: 'Boolean', desc: 'Indicates fulfillment options shown for the location.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when availability was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does an in-stock observation guarantee the item can be purchased?', a: 'No. It records a retailer’s online status at capture time and is not a reservation or live inventory guarantee. Stock can change before checkout.' },
      { q: 'Can availability be broken down by store?', a: 'Yes, when the retailer exposes branch or fulfillment-location context. The available granularity depends on the source and selected market.' },
      { q: 'Are pickup and delivery status tracked separately?', a: 'Separate fulfillment flags can be included when shown by the retailer, along with the overall product availability label.' },
      { q: 'How current are availability records?', a: 'Each record includes an observation timestamp. Refresh cadence can be configured, but the data represents a snapshot rather than continuous inventory access.' },
    ],
  },
  ratings: {
    name: 'Expert Ratings',
    slug: 'ratings',
    icon: Star,
    badge: 'Tasting and Rating Intelligence',
    badgeSubtext: 'Attributed expert and guide scores',
    title: 'Liquor & Alcohol Expert Ratings Dataset',
    overviewCardTitle: 'Expert Rating Feed',
    description: 'Product ratings and tasting notes attributed to public critics, publications, competitions, and beverage guides.',
    heroDescription: 'Bring published expert scores and tasting descriptions into a structured product reference. Preserve the rating source, score scale, review date, and beverage vintage or expression context for appropriate comparison.',
    featurePoints: ['Attributed rating sources', 'Score and scale context', 'Tasting notes where published', 'Vintage and expression matching'],
    stats: [
      { label: 'Rating Fields', value: '20+', subtext: 'Score and provenance details' },
      { label: 'Sources', value: 'Attributed', subtext: 'Critic or guide retained' },
      { label: 'Scale', value: 'Source-specific', subtext: 'Maximum value included' },
      { label: 'Refresh', value: 'Periodic', subtext: 'New publications monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and rating source' },
      { label: 'Rating basis', value: 'Published and attributed', isHighlight: true },
    ],
    records: [
      { rating_id: 'RATE-88402', product_id: 'LIQ-BOU-10482', product_name: 'North Ridge Small Batch Bourbon', source: 'Cask Review Journal', reviewer: 'Morgan Ellis', rating_value: 92, rating_scale_max: 100, tasting_note: 'Vanilla, toasted oak, and dried fruit with a long finish.', review_date: '2026-09-18', observed_at: '2026-11-12T11:00:00Z' },
      { rating_id: 'RATE-30941', product_id: 'LIQ-WIN-30214', product_name: 'Stone Harbor Coastal Pinot Noir', source: 'Vine & Table Guide', reviewer: 'Avery Chen', rating_value: 91, rating_scale_max: 100, tasting_note: 'Red cherry, light spice, and balanced acidity.', review_date: '2026-10-04', observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Rating and Product',
        desc: 'Score values tied to the rated beverage product or release.',
        fields: [
          { name: 'Rating ID', type: 'String', desc: 'Source rating key or stable normalized identifier.' },
          { name: 'Product ID / Name', type: 'String', desc: 'Catalog product and specific expression associated with the score.' },
          { name: 'Rating Value / Scale', type: 'Decimal', desc: 'Published score and its maximum value.' },
          { name: 'Review Date', type: 'Date', desc: 'Date of the attributed rating or publication.' },
        ],
      },
      {
        title: 'Attribution and Notes',
        desc: 'Publication and tasting context for interpreting expert opinions.',
        fields: [
          { name: 'Source / Reviewer', type: 'String', desc: 'Publication, guide, competition, or named reviewer.' },
          { name: 'Tasting Note', type: 'String', desc: 'Published tasting description where available.' },
          { name: 'Vintage / Batch', type: 'String', desc: 'Release detail associated with the rating, when stated.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the rating was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are expert scores normalized across publications?', a: 'Original values and source scales are preserved. Scores from different systems should not be assumed equivalent unless a separate, documented normalization is requested.' },
      { q: 'Are tasting notes written or endorsed by the dataset provider?', a: 'No. Notes are attributed to their public source and are captured subject to source terms. Attribution is retained with the record.' },
      { q: 'Can ratings be matched to a specific vintage or batch?', a: 'Vintage, expression, or batch details are included when the source provides them and can be matched to the catalog record.' },
      { q: 'How frequently are new ratings added?', a: 'Collection cadence depends on selected publications and products. Periodic updates can capture newly published ratings where accessible.' },
    ],
  },
  brandProfiles: {
    name: 'Brand Profiles',
    slug: 'brand-profiles',
    icon: Tag,
    badge: 'Brand Intelligence',
    badgeSubtext: 'Producer, portfolio, and origin records',
    title: 'Liquor & Alcohol Brand Profiles Dataset',
    overviewCardTitle: 'Brand Profile Catalog',
    description: 'Brand and producer profiles linking beverage portfolios, product expressions, origin, public company information, and retailer presence.',
    heroDescription: 'Understand the organizations and brands behind beverage portfolios. Normalize brand identities and connect product lines, producers, origins, and public profile details across retailer listings.',
    featurePoints: ['Brand and parent identifiers', 'Producer and portfolio links', 'Origin and category context', 'Public company information'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Identity and portfolio details' },
      { label: 'Relationships', value: 'Parent → Brand', subtext: 'Product links normalized' },
      { label: 'Categories', value: 'Multi-type', subtext: 'Spirits, wine, beer, more' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Profile changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Parent, brand, product' },
      { label: 'Profile basis', value: 'Public source data', isHighlight: true },
    ],
    records: [
      { brand_id: 'BR-NRIDGE-001', brand_name: 'North Ridge', parent_company: 'North Ridge Beverage Group', producer: 'North Ridge Distilling', primary_category: 'Whiskey', origin_country: 'United States', portfolio_product_count: 18, official_website: 'https://northridge.example', observed_at: '2026-11-12T12:00:00Z' },
      { brand_id: 'BR-STHARBOR-014', brand_name: 'Stone Harbor', parent_company: 'Harbor Coast Wines', producer: 'Stone Harbor Cellars', primary_category: 'Wine', origin_country: 'United States', portfolio_product_count: 12, official_website: 'https://stoneharbor.example', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Brand and Company Identity',
        desc: 'Normalized organization and brand identifiers for portfolio analysis.',
        fields: [
          { name: 'Brand ID / Name', type: 'String', desc: 'Stable brand key and published consumer-facing name.' },
          { name: 'Parent Company', type: 'String', desc: 'Associated parent organization where identified.' },
          { name: 'Producer', type: 'String', desc: 'Producer, distiller, winery, or brewery associated with the brand.' },
          { name: 'Official Website', type: 'URL', desc: 'Public brand or producer website where identified.' },
        ],
      },
      {
        title: 'Portfolio and Origin',
        desc: 'Product portfolio and beverage-market context.',
        fields: [
          { name: 'Primary Category', type: 'String', desc: 'Main beverage category associated with the brand.' },
          { name: 'Origin Country', type: 'String', desc: 'Country associated with brand or production origin as stated.' },
          { name: 'Portfolio Product Count', type: 'Integer', desc: 'Count of linked catalog products in the observed scope.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time of the latest brand-profile observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'How are parent companies and brands connected?', a: 'Relationships are assembled from public company and product information. Source attribution and identifiers can be retained so corporate links are reviewable.' },
      { q: 'Does portfolio product count represent every product a brand makes?', a: 'No. Counts reflect products observed within the configured retailer, market, and collection scope, not necessarily the complete global portfolio.' },
      { q: 'Can brand profiles include retailer coverage?', a: 'Brand records can be joined to product catalog and retailer coverage datasets using normalized brand and product identifiers.' },
      { q: 'How often are brand profiles updated?', a: 'Profiles can be refreshed periodically or when relevant changes are observed, depending on source availability and project scope.' },
    ],
  },
  categoryData: {
    name: 'Category Data',
    slug: 'category-data',
    icon: Layers,
    badge: 'Beverage Taxonomy',
    badgeSubtext: 'Normalized category hierarchies',
    title: 'Liquor & Alcohol Category Dataset',
    overviewCardTitle: 'Beverage Category Taxonomy',
    description: 'Standardized beverage category and subcategory mappings across retailer taxonomies and public product listings.',
    heroDescription: 'Bring retailer category structures into a consistent beverage taxonomy. Map source paths to normalized categories while preserving original labels and mapping context for product analysis.',
    featurePoints: ['Hierarchical category paths', 'Source labels preserved', 'Cross-retailer mappings', 'Product-to-category links'],
    stats: [
      { label: 'Taxonomy Levels', value: '4+', subtext: 'Category depth as available' },
      { label: 'Mapping', value: 'Cross-source', subtext: 'Retailer labels normalized' },
      { label: 'Coverage', value: 'Multi-category', subtext: 'Wine, beer, and spirits' },
      { label: 'Versioning', value: 'Documented', subtext: 'Taxonomy changes traceable' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Category and product mapping' },
      { label: 'Mapping basis', value: 'Source labels retained', isHighlight: true },
    ],
    records: [
      { retailer: 'Bottle & Barrel', source_category_path: 'Spirits / Whiskey / Bourbon', category_id: 'SP-WH-BRB', normalized_path: 'Spirits > Whiskey > Bourbon', parent_category_id: 'SP-WH', product_count: 286, mapping_confidence: 0.97, taxonomy_version: '2026.2', observed_at: '2026-11-12T13:00:00Z' },
      { retailer: 'Cellar Market', source_category_path: 'Wine / Red Wine / Pinot Noir', category_id: 'WN-RED-PN', normalized_path: 'Wine > Red > Pinot Noir', parent_category_id: 'WN-RED', product_count: 174, mapping_confidence: 0.95, taxonomy_version: '2026.2', observed_at: '2026-11-12T13:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Category Hierarchy',
        desc: 'Source and normalized paths for beverage category navigation.',
        fields: [
          { name: 'Category ID', type: 'String', desc: 'Stable identifier for the normalized category.' },
          { name: 'Parent Category ID', type: 'String', desc: 'Identifier for the parent taxonomy node.' },
          { name: 'Normalized Path', type: 'String', desc: 'Hierarchical path used for cross-source analysis.' },
          { name: 'Source Category Path', type: 'String', desc: 'Original category wording and hierarchy from the retailer.' },
        ],
      },
      {
        title: 'Mapping Context',
        desc: 'Retailer and taxonomy details for interpreting category assignments.',
        fields: [
          { name: 'Retailer', type: 'String', desc: 'Source retailer for the category mapping.' },
          { name: 'Product Count', type: 'Integer', desc: 'Observed linked products within the configured scope.' },
          { name: 'Mapping Confidence', type: 'Decimal (0-1)', desc: 'Confidence score when assisted mapping is used.' },
          { name: 'Taxonomy Version', type: 'String', desc: 'Version of the normalized category definitions.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are all retailer taxonomies identical?', a: 'No. Source categories and their depth differ. Original paths are retained alongside normalized mappings to make those differences visible.' },
      { q: 'Can a product belong to more than one category?', a: 'Yes, if a source assigns multiple categories or the project taxonomy supports multiple associations. Each mapping retains its source context.' },
      { q: 'How are uncertain category mappings handled?', a: 'Mapping confidence can be included, and low-confidence or ambiguous assignments can be flagged for review rather than silently treated as exact.' },
      { q: 'Can taxonomy changes be tracked over time?', a: 'Yes. Taxonomy versions and observation timestamps can be used to identify category definition or assignment changes.' },
    ],
  },
  marketTrends: {
    name: 'Market Trends',
    slug: 'market-trends',
    icon: TrendingUp,
    badge: 'Beverage Market Signals',
    badgeSubtext: 'Category and price movement indicators',
    title: 'Liquor & Alcohol Market Trends Dataset',
    overviewCardTitle: 'Market Trends Feed',
    description: 'Time-series indicators for observed beverage assortment, pricing, availability, and category activity across selected markets.',
    heroDescription: 'Explore market changes using documented signals derived from observed retailer listings. Category and price indicators can be compared over time while keeping their collection scope and methodology explicit.',
    featurePoints: ['Category-level time series', 'Price and assortment signals', 'Market comparison dimensions', 'Methodology and scope context'],
    stats: [
      { label: 'Trend Measures', value: '20+', subtext: 'Price and assortment metrics' },
      { label: 'Dimensions', value: 'Market + category', subtext: 'Configurable scope' },
      { label: 'History', value: 'Time-series', subtext: 'Period-based observations' },
      { label: 'Interpretation', value: 'Observed signals', subtext: 'Not audited sales data' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Category, retailer, period' },
      { label: 'Trend basis', value: 'Observed catalog signals', isHighlight: true },
    ],
    records: [
      { market: 'Seattle Metro', retailer_group: 'Multi-retailer', category_path: 'Spirits > Whiskey > Bourbon', period: '2026-11', median_price: 34.8, currency: 'USD', active_product_count: 412, availability_rate_percent: 91.2, price_index_change_monthly: 1.8, methodology_version: '1.0' },
      { market: 'Portland Metro', retailer_group: 'Multi-retailer', category_path: 'Wine > Red > Pinot Noir', period: '2026-11', median_price: 22.4, currency: 'USD', active_product_count: 338, availability_rate_percent: 87.6, price_index_change_monthly: -0.6, methodology_version: '1.0' },
    ],
    attributeGroups: [
      {
        title: 'Market and Category Dimensions',
        desc: 'Geographic and product taxonomy dimensions for trend comparisons.',
        fields: [
          { name: 'Market', type: 'String', desc: 'City, region, or configured market grouping.' },
          { name: 'Retailer Group', type: 'String', desc: 'Retailers or retailer group included in the observation.' },
          { name: 'Category Path', type: 'String', desc: 'Normalized beverage category represented.' },
          { name: 'Period', type: 'Date / String', desc: 'Month, week, or other configured reporting period.' },
        ],
      },
      {
        title: 'Trend Indicators',
        desc: 'Observed price, assortment, and availability summaries.',
        fields: [
          { name: 'Median Price / Currency', type: 'Decimal / String', desc: 'Median listed price and source currency for the period.' },
          { name: 'Active Product Count', type: 'Integer', desc: 'Distinct observed products in the configured category scope.' },
          { name: 'Availability Rate', type: 'Decimal (%)', desc: 'Share of sampled listings observed as available.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of the aggregation and calculation approach.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does market trend data represent actual beverage sales?', a: 'Not unless an authorized source explicitly provides transaction data. Listing, price, and availability indicators describe observed retail catalogs, not audited sales volume.' },
      { q: 'How are trend measures calculated?', a: 'Each measure is defined by the accompanying aggregation method and scope. Methodology version and contributing dimensions should be used when interpreting or comparing results.' },
      { q: 'Can different regions be compared directly?', a: 'Comparisons are most reliable when category definitions, retailer coverage, currency treatment, and collection periods are aligned.' },
      { q: 'What time periods are available?', a: 'Available periods depend on source history and collection cadence. Weekly or monthly summaries can be configured for the selected markets.' },
    ],
  },
  retailerCoverage: {
    name: 'Retailer Coverage',
    slug: 'retailer-coverage',
    icon: Store,
    badge: 'Channel Coverage',
    badgeSubtext: 'Retailer and market footprint',
    title: 'Liquor & Alcohol Retailer Coverage Dataset',
    overviewCardTitle: 'Retailer Coverage Map',
    description: 'Retailer coverage records showing product-category presence, market footprint, source scope, and latest observation status.',
    heroDescription: 'Map where beverage retailers and product categories are represented in collected public catalog data. Coverage records make the geographic scope, source, and observation freshness explicit for market analysis.',
    featurePoints: ['Retailer and market dimensions', 'Category-level presence', 'Product listing coverage', 'Source and freshness tracking'],
    stats: [
      { label: 'Coverage Keys', value: '4 levels', subtext: 'Retailer, market, category, period' },
      { label: 'Market Scope', value: 'Configurable', subtext: 'Regions selected per project' },
      { label: 'Presence', value: 'Observed', subtext: 'Collection scope disclosed' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Coverage snapshots' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Retailer, market, category' },
      { label: 'Coverage basis', value: 'Collection scope documented', isHighlight: true },
    ],
    records: [
      { retailer_id: 'RET-BB-001', retailer_name: 'Bottle & Barrel', market: 'Seattle Metro', category_path: 'Spirits > Whiskey', product_listing_count: 642, online_ordering_available: true, delivery_coverage_status: 'observed', last_observed_at: '2026-11-12T14:00:00Z' },
      { retailer_id: 'RET-CM-014', retailer_name: 'Cellar Market', market: 'Portland Metro', category_path: 'Wine > Red Wine', product_listing_count: 518, online_ordering_available: true, delivery_coverage_status: 'observed', last_observed_at: '2026-11-12T14:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Retailer and Market',
        desc: 'Retail source identifiers and geographic scope for coverage.',
        fields: [
          { name: 'Retailer ID / Name', type: 'String', desc: 'Normalized retailer key and public brand name.' },
          { name: 'Market', type: 'String', desc: 'City, region, or configured geographic market.' },
          { name: 'Category Path', type: 'String', desc: 'Beverage category evaluated for the retailer.' },
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed, not observed, or unavailable within the defined scope.' },
        ],
      },
      {
        title: 'Catalog and Service Footprint',
        desc: 'Listing volume and fulfillment indicators available for the retailer.',
        fields: [
          { name: 'Product Listing Count', type: 'Integer', desc: 'Count of observed listings within the selected scope.' },
          { name: 'Online Ordering Available', type: 'Boolean', desc: 'Indicates whether online ordering was observed.' },
          { name: 'Delivery Coverage Status', type: 'Enum', desc: 'Observed delivery service status for the market.' },
          { name: 'Last Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the most recent coverage check.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does missing retailer coverage mean a retailer has no products in a category?', a: 'No. It can reflect collection scope, source visibility, or temporary listing availability. Coverage should be interpreted with its market, category, and observation date.' },
      { q: 'Can coverage be reported at store level?', a: 'Yes, where store identifiers and local catalog data are exposed. Coverage can also be summarized at market or retailer level.' },
      { q: 'Are online ordering and delivery coverage the same?', a: 'No. A retailer may list products online without providing delivery in every market. Separate service indicators are used when source data allows.' },
      { q: 'How often is retailer coverage refreshed?', a: 'Refresh cadence depends on the source list and geographic scope. Scheduled coverage checks can be configured for the project.' },
    ],
  },
};