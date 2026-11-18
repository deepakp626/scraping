import {
  AlertCircle,
  Clock,
  DollarSign,
  Globe,
  Store,
  Tag,
  TrendingUp,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type QuickCommerceDatasetKey =
  | 'darkStore'
  | 'deliverySlots'
  | 'categoryPricing'
  | 'brandPresence'
  | 'etaTracking'
  | 'availability'
  | 'platformCoverage'
  | 'demandIndex';

interface QuickCommerceDataset {
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
  faq: FAQItem;
}

export const quickCommerceDatasets: Record<QuickCommerceDatasetKey, QuickCommerceDataset> = {
  darkStore: {
    name: 'Dark Store Data',
    slug: 'dark-store-data',
    icon: Store,
    badge: 'Fulfillment Locations',
    badgeSubtext: 'Store and service-area records',
    title: 'Quick-Commerce Dark Store Dataset',
    overviewCardTitle: 'Dark Store Directory',
    description: 'Location-level records for quick-commerce fulfillment hubs, including published service areas, operating details, and platform context.',
    heroDescription: 'Map the fulfillment footprint behind rapid-delivery platforms. Standardized dark-store and micro-fulfillment location records help teams compare geographic coverage, operating windows, and service-area overlap.',
    featurePoints: ['Store and platform IDs', 'Coordinates and service areas', 'Published operating hours', 'Location-level platform coverage'],
    stats: [
      { label: 'Location Fields', value: '25+', subtext: 'Standardized store attributes' },
      { label: 'Geo Detail', value: 'Lat / Long', subtext: 'When available from sources' },
      { label: 'Coverage', value: 'City-level', subtext: 'Configurable market scope' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence set per project' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Fulfillment location' },
      { label: 'Location status', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', dark_store_id: 'DC-MUM-041', city: 'Mumbai', neighborhood: 'Andheri West', latitude: 19.1364, longitude: 72.8296, service_radius_km: 3.2, operating_hours: '07:00-23:00', observed_at: '2026-11-10T09:00:00Z' },
      { platform: 'QuickBasket', dark_store_id: 'QB-BLR-018', city: 'Bengaluru', neighborhood: 'Indiranagar', latitude: 12.9784, longitude: 77.6408, service_radius_km: 2.8, operating_hours: '06:00-00:00', observed_at: '2026-11-10T09:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Location Identity',
        desc: 'Identifiers and geographic context for each observed fulfillment location.',
        fields: [
          { name: 'Dark Store ID', type: 'String', desc: 'Platform or source identifier for a fulfillment location.' },
          { name: 'Platform', type: 'String', desc: 'Quick-commerce service associated with the location.' },
          { name: 'Address / Neighborhood', type: 'String', desc: 'Published street, locality, or neighborhood details.' },
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Coordinates when exposed by the source or geocoding workflow.' },
        ],
      },
      {
        title: 'Service Footprint',
        desc: 'Published operating and delivery-area attributes for coverage analysis.',
        fields: [
          { name: 'Service Radius', type: 'Decimal (km)', desc: 'Observed or derived approximate service radius when available.' },
          { name: 'Operating Hours', type: 'String', desc: 'Hours shown for the location or its associated service.' },
          { name: 'Location Status', type: 'Enum', desc: 'Observed active, inactive, or unknown status.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the location observation.' },
        ],
      },
    ],
    faq: {
      q: 'Are dark store coordinates exact?',
      a: 'Coordinates are included when a platform publishes them or when an address can be geocoded. The record indicates the available location detail; geocoded points should be treated as approximate rather than proof of a customer-facing entrance.',
    },
  },
  deliverySlots: {
    name: 'Delivery Slots',
    slug: 'delivery-slots',
    icon: Clock,
    badge: 'Fulfillment Windows',
    badgeSubtext: 'Time-slot availability snapshots',
    title: 'Quick-Commerce Delivery Slots Dataset',
    overviewCardTitle: 'Delivery Slot Feed',
    description: 'Time-stamped observations of delivery windows, slot status, and displayed fulfillment estimates across selected platforms and service areas.',
    heroDescription: 'Compare the delivery windows shoppers are shown across markets and times of day. Slot observations can help quantify service availability patterns and identify when delivery options change.',
    featurePoints: ['Slot start and end times', 'Platform and service-area keys', 'Availability snapshots', 'Displayed fees where shown'],
    stats: [
      { label: 'Slot Attributes', value: '20+', subtext: 'Window and status fields' },
      { label: 'Time Detail', value: 'Local + UTC', subtext: 'Timezone-aware timestamps' },
      { label: 'Observation', value: 'Snapshot', subtext: 'Not a reservation record' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source cadence' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Platform and service area' },
      { label: 'Slot status', value: 'Observed at capture time', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', service_area_id: 'DC-MUM-AW', slot_id: 'SLOT-1800', slot_start: '2026-11-10T18:00:00+05:30', slot_end: '2026-11-10T18:30:00+05:30', slot_status: 'available', delivery_fee: 19, currency: 'INR', observed_at: '2026-11-10T12:15:00Z' },
      { platform: 'QuickBasket', service_area_id: 'QB-BLR-IN', slot_id: 'SLOT-1930', slot_start: '2026-11-10T19:30:00+05:30', slot_end: '2026-11-10T20:00:00+05:30', slot_status: 'limited', delivery_fee: 0, currency: 'INR', observed_at: '2026-11-10T12:18:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Slot Window',
        desc: 'Time boundaries and identifiers for a displayed delivery option.',
        fields: [
          { name: 'Slot ID', type: 'String', desc: 'Source slot identifier or stable derived key.' },
          { name: 'Slot Start / End', type: 'ISO-8601', desc: 'Displayed window boundaries with timezone context where available.' },
          { name: 'Service Area ID', type: 'String', desc: 'Platform area or location context used to show the slot.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the option was captured.' },
        ],
      },
      {
        title: 'Availability and Cost',
        desc: 'Source-displayed slot state and associated delivery charges.',
        fields: [
          { name: 'Slot Status', type: 'Enum', desc: 'Displayed state such as available, limited, or unavailable.' },
          { name: 'Delivery Fee', type: 'Decimal', desc: 'Fee displayed for the delivery option, when provided.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the fee.' },
          { name: 'Platform', type: 'String', desc: 'Quick-commerce service presenting the slot.' },
        ],
      },
    ],
    faq: {
      q: 'Does a delivery-slot record mean the slot can still be booked?',
      a: 'No. Each record is a time-stamped observation of a displayed option. Slot availability can change quickly, and the dataset does not reserve a slot or guarantee checkout eligibility.',
    },
  },
  categoryPricing: {
    name: 'Category Pricing',
    slug: 'category-pricing',
    icon: DollarSign,
    badge: 'Price Intelligence',
    badgeSubtext: 'Category and market comparisons',
    title: 'Quick-Commerce Category Pricing Dataset',
    overviewCardTitle: 'Category Price Monitor',
    description: 'Comparable product prices and category context across quick-commerce platforms, locations, and observation times.',
    heroDescription: 'Track how everyday product prices vary between delivery platforms and local markets. Normalized category paths, product identifiers, and timestamped price observations support structured price benchmarking.',
    featurePoints: ['Comparable listed prices', 'Normalized category paths', 'Platform and location context', 'Promotion-aware observations'],
    stats: [
      { label: 'Price Metrics', value: '18+', subtext: 'List, sale, and unit values' },
      { label: 'Comparisons', value: 'Cross-platform', subtext: 'Where products can be matched' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Coverage', value: 'Category and product listings' },
      { label: 'Price basis', value: 'Displayed listing price', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', city: 'Mumbai', category_path: 'Beverages > Dairy', product_id: 'DC-MLK-1002', product_name: 'Fresh Toned Milk', pack_size: '500 ml', listed_price: 32, sale_price: 29, currency: 'INR', promotion_active: true, observed_at: '2026-11-10T09:20:00Z' },
      { platform: 'QuickBasket', city: 'Bengaluru', category_path: 'Household > Cleaning', product_id: 'QB-CLN-4480', product_name: 'Lemon Dish Liquid', pack_size: '500 ml', listed_price: 115, sale_price: 115, currency: 'INR', promotion_active: false, observed_at: '2026-11-10T09:25:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Category',
        desc: 'Listing identifiers and normalized taxonomy for category-level comparison.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Platform listing identifier for the observed item.' },
          { name: 'Product Name', type: 'String', desc: 'Consumer-facing product title as displayed.' },
          { name: 'Category Path', type: 'String', desc: 'Normalized department and subcategory hierarchy.' },
          { name: 'Pack Size', type: 'String', desc: 'Displayed quantity, count, weight, or volume.' },
        ],
      },
      {
        title: 'Price Observation',
        desc: 'Displayed price values and capture context for analysis over time.',
        fields: [
          { name: 'Listed Price', type: 'Decimal', desc: 'Standard product price shown by the platform.' },
          { name: 'Sale Price', type: 'Decimal', desc: 'Promotional price when a discount is displayed.' },
          { name: 'Promotion Active', type: 'Boolean', desc: 'Indicates whether a visible promotion was present.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the price observation.' },
        ],
      },
    ],
    faq: {
      q: 'How are prices made comparable across platforms?',
      a: 'Records retain each platform’s displayed price and currency, then use product identifiers, names, pack sizes, and normalized categories to support matching. Any derived unit-price or match-confidence fields can be provided with their calculation method documented.',
    },
  },
  brandPresence: {
    name: 'Brand Presence',
    slug: 'brand-presence',
    icon: Tag,
    badge: 'Brand Intelligence',
    badgeSubtext: 'Assortment and listing visibility',
    title: 'Quick-Commerce Brand Presence Dataset',
    overviewCardTitle: 'Brand Presence Monitor',
    description: 'Brand-level product assortment, category representation, and listing visibility signals observed across rapid-delivery platforms.',
    heroDescription: 'Measure how brands appear across quick-commerce catalogs and local markets. Track listed products, category placement, observed price ranges, and search visibility signals where a platform exposes them.',
    featurePoints: ['Brand and parent-company mapping', 'Listed assortment counts', 'Category presence', 'Search visibility snapshots'],
    stats: [
      { label: 'Brand Fields', value: '30+', subtext: 'Identity and catalog signals' },
      { label: 'Assortment', value: 'SKU-level', subtext: 'Platform listing detail' },
      { label: 'Markets', value: 'City-level', subtext: 'Configurable platform scope' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Track presence over time' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Brand, platform, category' },
      { label: 'Visibility', value: 'Source-observed signals', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', city: 'Mumbai', brand_id: 'BR-DAIRY-021', brand_name: 'Valley Farms', parent_company: 'Valley Foods Ltd', category_path: 'Dairy > Milk', listed_sku_count: 14, search_position_median: 5, observed_at: '2026-11-10T10:00:00Z' },
      { platform: 'QuickBasket', city: 'Bengaluru', brand_id: 'BR-HOME-114', brand_name: 'BrightHome', parent_company: 'Bright Consumer Co', category_path: 'Household > Cleaning', listed_sku_count: 9, search_position_median: 8, observed_at: '2026-11-10T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Brand Identity',
        desc: 'Brand and corporate identifiers used to consolidate catalog observations.',
        fields: [
          { name: 'Brand ID', type: 'String', desc: 'Stable brand identifier in the normalized dataset.' },
          { name: 'Brand Name', type: 'String', desc: 'Brand name as displayed or standardized.' },
          { name: 'Parent Company', type: 'String', desc: 'Associated parent company where identified.' },
          { name: 'Platform / City', type: 'String', desc: 'Market context for the brand observation.' },
        ],
      },
      {
        title: 'Catalog Presence',
        desc: 'Assortment and visibility measures derived from observed listings.',
        fields: [
          { name: 'Category Path', type: 'String', desc: 'Category in which the brand was observed.' },
          { name: 'Listed SKU Count', type: 'Integer', desc: 'Count of matching active product listings in the snapshot.' },
          { name: 'Search Position Median', type: 'Decimal', desc: 'Median observed position for selected search terms, when collected.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time of the catalog or search observation.' },
        ],
      },
    ],
    faq: {
      q: 'Does brand presence represent market share or sales?',
      a: 'No. Presence metrics describe observed catalog listings and, where collected, search placement. They do not represent sales, market share, or consumer demand unless those measures are independently supplied by a source.',
    },
  },
  etaTracking: {
    name: 'ETA Tracking',
    slug: 'eta-tracking',
    icon: Truck,
    badge: 'Delivery Experience',
    badgeSubtext: 'Displayed estimate observations',
    title: 'Quick-Commerce ETA Tracking Dataset',
    overviewCardTitle: 'ETA Observation Feed',
    description: 'Time-stamped delivery estimates shown by quick-commerce platforms, connected to the selected market, service area, and fulfillment context.',
    heroDescription: 'Compare delivery estimates presented to shoppers across platforms and time periods. The dataset captures displayed ETA values as observations, helping teams analyze stated service expectations without treating them as completed-delivery outcomes.',
    featurePoints: ['Displayed ETA values', 'Platform and location keys', 'Capture-time history', 'Service mode context'],
    stats: [
      { label: 'ETA Measures', value: '10+', subtext: 'Range and estimate fields' },
      { label: 'Time Context', value: 'Timestamped', subtext: 'Observed estimate history' },
      { label: 'Coverage', value: 'Area-based', subtext: 'Market and service context' },
      { label: 'Outcome Data', value: 'Separate', subtext: 'ETA is not actual delivery time' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Platform and service area' },
      { label: 'Measure', value: 'Displayed estimate', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', city: 'Mumbai', service_area_id: 'DC-MUM-AW', service_mode: 'instant', eta_min_minutes: 12, eta_max_minutes: 18, eta_text: '12-18 min', observed_at: '2026-11-10T11:00:00Z' },
      { platform: 'QuickBasket', city: 'Bengaluru', service_area_id: 'QB-BLR-IN', service_mode: 'scheduled', eta_min_minutes: 25, eta_max_minutes: 35, eta_text: '25-35 min', observed_at: '2026-11-10T11:05:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Estimate Details',
        desc: 'Normalized ETA values paired with the original displayed estimate.',
        fields: [
          { name: 'ETA Minimum', type: 'Integer (minutes)', desc: 'Lower end of the displayed estimate range, when stated.' },
          { name: 'ETA Maximum', type: 'Integer (minutes)', desc: 'Upper end of the displayed estimate range, when stated.' },
          { name: 'ETA Display Text', type: 'String', desc: 'Original estimate text shown by the platform.' },
          { name: 'Service Mode', type: 'String', desc: 'Instant or scheduled mode when presented by the source.' },
        ],
      },
      {
        title: 'Observation Context',
        desc: 'Market keys and timestamps needed to compare estimates responsibly.',
        fields: [
          { name: 'Platform', type: 'String', desc: 'Service presenting the delivery estimate.' },
          { name: 'Service Area ID', type: 'String', desc: 'Area or location context used to show the estimate.' },
          { name: 'City', type: 'String', desc: 'City associated with the selected service area.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC capture time; this is not a delivery completion time.' },
        ],
      },
    ],
    faq: {
      q: 'Can these estimates be used as actual delivery times?',
      a: 'No. ETA records capture estimates displayed at a point in time, not order placement or delivery completion events. Actual delivery performance requires separate, appropriately sourced outcome data.',
    },
  },
  availability: {
    name: 'Availability Signals',
    slug: 'availability',
    icon: AlertCircle,
    badge: 'Inventory Signals',
    badgeSubtext: 'Product and location snapshots',
    title: 'Quick-Commerce Availability Signals Dataset',
    overviewCardTitle: 'Availability Signal Feed',
    description: 'Product-level stock and fulfillment signals observed in quick-commerce catalogs, with platform, location, and capture-time context.',
    heroDescription: 'Monitor how product availability changes across rapid-delivery platforms and service areas. Source-reported stock labels and fulfillment options help teams identify catalog gaps and availability patterns over time.',
    featurePoints: ['Product-level status', 'Location-aware observations', 'Fulfillment options', 'Timestamped availability history'],
    stats: [
      { label: 'Status Values', value: 'Normalized', subtext: 'Source labels preserved' },
      { label: 'Granularity', value: 'SKU + Area', subtext: 'Where listing context allows' },
      { label: 'Channels', value: 'Delivery', subtext: 'Other modes when published' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Frequency set by scope' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Status basis', value: 'Source-reported listing' },
      { label: 'Freshness', value: 'Capture timestamp included', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', service_area_id: 'DC-MUM-AW', product_id: 'DC-MLK-1002', product_name: 'Fresh Toned Milk 500 ml', availability_status: 'in_stock', delivery_available: true, stock_label: 'Available', observed_at: '2026-11-10T09:20:00Z' },
      { platform: 'QuickBasket', service_area_id: 'QB-BLR-IN', product_id: 'QB-CLN-4480', product_name: 'Lemon Dish Liquid 500 ml', availability_status: 'unavailable', delivery_available: false, stock_label: 'Currently unavailable', observed_at: '2026-11-10T09:25:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Area',
        desc: 'Keys connecting each availability observation to its catalog listing and market.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Platform listing identifier for the product.' },
          { name: 'Product Name', type: 'String', desc: 'Consumer-facing product title as displayed.' },
          { name: 'Service Area ID', type: 'String', desc: 'Platform area or fulfillment location context.' },
          { name: 'Platform', type: 'String', desc: 'Quick-commerce service associated with the signal.' },
        ],
      },
      {
        title: 'Availability State',
        desc: 'Source-reported status and fulfillment options at capture time.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Normalized state such as in stock, limited, or unavailable.' },
          { name: 'Source Stock Label', type: 'String', desc: 'Original availability text displayed by the platform.' },
          { name: 'Delivery Available', type: 'Boolean', desc: 'Whether delivery was offered for the selected area.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the listing state was captured.' },
        ],
      },
    ],
    faq: {
      q: 'Does an in-stock signal guarantee the product can be ordered?',
      a: 'No. It records the platform’s listing state at capture time and is not a reservation or live inventory guarantee. Availability may change between observations or during checkout.',
    },
  },
  platformCoverage: {
    name: 'Platform Coverage',
    slug: 'platform-coverage',
    icon: Globe,
    badge: 'Market Mapping',
    badgeSubtext: 'Platform and category footprint',
    title: 'Quick-Commerce Platform Coverage Dataset',
    overviewCardTitle: 'Platform Coverage Map',
    description: 'Structured coverage matrix showing observed platform presence by market, service area, category, and collection date.',
    heroDescription: 'Understand where quick-commerce platforms and categories are represented in collected public catalog data. Coverage records make market comparisons explicit, including collection scope and observation freshness.',
    featurePoints: ['Platform and market matrix', 'Category-level presence', 'Service-area granularity', 'Coverage observation dates'],
    stats: [
      { label: 'Coverage Keys', value: '4 levels', subtext: 'Platform, city, area, category' },
      { label: 'Market Detail', value: 'Configurable', subtext: 'Selected cities and regions' },
      { label: 'Presence', value: 'Observed', subtext: 'Based on collected listings' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Scope documented per feed' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Market and category' },
      { label: 'Coverage basis', value: 'Collection scope disclosed', isHighlight: true },
    ],
    records: [
      { platform: 'DashCart', country: 'India', city: 'Mumbai', service_area_id: 'DC-MUM-AW', category_path: 'Beverages > Dairy', listing_count: 482, coverage_status: 'observed', last_observed_at: '2026-11-10T09:20:00Z' },
      { platform: 'QuickBasket', country: 'India', city: 'Bengaluru', service_area_id: 'QB-BLR-IN', category_path: 'Household > Cleaning', listing_count: 216, coverage_status: 'observed', last_observed_at: '2026-11-10T09:25:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Market Coverage',
        desc: 'Geographic and platform dimensions defining the observed coverage record.',
        fields: [
          { name: 'Platform', type: 'String', desc: 'Quick-commerce service included in the collection scope.' },
          { name: 'Country / City', type: 'String', desc: 'Market identifiers associated with the coverage observation.' },
          { name: 'Service Area ID', type: 'String', desc: 'More granular service area when available.' },
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed, not observed, or unavailable within the defined scope.' },
        ],
      },
      {
        title: 'Catalog Footprint',
        desc: 'Category and volume context for interpreting collected catalog coverage.',
        fields: [
          { name: 'Category Path', type: 'String', desc: 'Category hierarchy evaluated for the platform and market.' },
          { name: 'Listing Count', type: 'Integer', desc: 'Count of listings observed within the stated scope.' },
          { name: 'Collection Scope', type: 'String', desc: 'Configured collection boundary or sampling definition.' },
          { name: 'Last Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the latest coverage observation.' },
        ],
      },
    ],
    faq: {
      q: 'Does missing coverage mean a platform does not operate in that market?',
      a: 'Not necessarily. Coverage describes the defined collection scope and what was observable during collection. A missing record can reflect scope limits or source visibility and should not be interpreted as proof that a service is absent.',
    },
  },
  demandIndex: {
    name: 'Demand Index',
    slug: 'demand-index',
    icon: TrendingUp,
    badge: 'Market Trends',
    badgeSubtext: 'Directional category signals',
    title: 'Quick-Commerce Demand Index Dataset',
    overviewCardTitle: 'Category Demand Signals',
    description: 'A normalized, directional index built from documented public catalog signals to compare relative category activity across markets and time periods.',
    heroDescription: 'Explore how observed catalog signals shift across quick-commerce categories and locations. Index values are designed for directional comparison, with methodology and contributing signals documented alongside each release.',
    featurePoints: ['Market and category time series', 'Documented index methodology', 'Comparable normalized values', 'Underlying source-signal context'],
    stats: [
      { label: 'Index Scale', value: '0-100', subtext: 'Normalized within methodology' },
      { label: 'Dimensions', value: 'Category + City', subtext: 'Configured market coverage' },
      { label: 'Signals', value: 'Multi-factor', subtext: 'Inputs documented per release' },
      { label: 'Interpretation', value: 'Directional', subtext: 'Not reported sales volume' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Category and time period' },
      { label: 'Index values', value: 'Methodology documented', isHighlight: true },
    ],
    records: [
      { platform: 'Multi-platform', city: 'Mumbai', category_path: 'Beverages > Dairy', period: '2026-11-09', demand_index: 74.2, index_change_7d: 3.6, observed_listing_count: 482, methodology_version: '1.0' },
      { platform: 'Multi-platform', city: 'Bengaluru', category_path: 'Fresh Food > Produce', period: '2026-11-09', demand_index: 68.7, index_change_7d: -1.2, observed_listing_count: 391, methodology_version: '1.0' },
    ],
    attributeGroups: [
      {
        title: 'Index Dimensions',
        desc: 'Category and market fields used to group index observations.',
        fields: [
          { name: 'City / Market', type: 'String', desc: 'Market associated with the index value.' },
          { name: 'Category Path', type: 'String', desc: 'Normalized category used for trend comparison.' },
          { name: 'Period', type: 'Date', desc: 'Date or reporting window represented by the record.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of the documented index calculation.' },
        ],
      },
      {
        title: 'Index Signals',
        desc: 'Normalized measure and context for reviewing movement over time.',
        fields: [
          { name: 'Demand Index', type: 'Decimal (0-100)', desc: 'Relative index value under the stated methodology.' },
          { name: 'Index Change 7d', type: 'Decimal', desc: 'Change from the prior comparable seven-day period.' },
          { name: 'Observed Listing Count', type: 'Integer', desc: 'Number of listings contributing to the observation context.' },
          { name: 'Platform Scope', type: 'String', desc: 'Platforms or aggregated sources included in the calculation.' },
        ],
      },
    ],
    faq: {
      q: 'Is the Demand Index a measure of actual orders or sales?',
      a: 'No. It is a directional index derived from documented observable catalog signals and does not represent order counts, revenue, or verified consumer demand. The methodology version and available input context should be reviewed before comparing values.',
    },
  },
};