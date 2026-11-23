import {
  BarChart2,
  Clock,
  DollarSign,
  MapPin,
  Package,
  Percent,
  Store,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type FoodDeliveryDatasetKey =
  | 'platformListings'
  | 'deliveryFees'
  | 'orderVolume'
  | 'menuPricing'
  | 'etaData'
  | 'promotions'
  | 'restaurantRank'
  | 'zoneCoverage';

interface FoodDeliveryDataset {
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

export const foodDeliveryDatasets: Record<FoodDeliveryDatasetKey, FoodDeliveryDataset> = {
  platformListings: {
    name: 'Platform Listings',
    slug: 'platform-listings',
    icon: Store,
    badge: 'Restaurant Discovery',
    badgeSubtext: 'Platform-level restaurant catalog',
    title: 'Food Delivery Platform Listings Dataset',
    overviewCardTitle: 'Platform Listing Feed',
    description: 'Restaurant listings across food-delivery platforms, including identifiers, cuisine, location, service state, and listing attributes.',
    heroDescription: 'Build a unified view of restaurants presented across ordering platforms. Link restaurant profiles to platform-specific listings and capture the public discovery details customers see in each market.',
    featurePoints: ['Restaurant-platform identifiers', 'Cuisine and location context', 'Listing and service status', 'Public ratings where shown'],
    stats: [
      { label: 'Listing Fields', value: '25+', subtext: 'Profile and channel attributes' },
      { label: 'Granularity', value: 'Restaurant × app', subtext: 'Platform listings linked' },
      { label: 'Coverage', value: 'Market-based', subtext: 'Scope configured per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on source' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant-platform listing' },
      { label: 'Listing state', value: 'Observed at capture', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', platform_listing_id: 'DD-SEA-20418', restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', cuisine: 'New American', city: 'Seattle', neighborhood: 'Downtown', rating: 4.7, listing_status: 'available', observed_at: '2026-11-12T08:30:00Z' },
      { platform: 'MealRunner', platform_listing_id: 'MR-CHI-83710', restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', cuisine: 'American', city: 'Chicago', neighborhood: 'West Loop', rating: 4.5, listing_status: 'available', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Restaurant and Listing Identity',
        desc: 'Keys connecting a restaurant to its individual platform listing.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Normalized restaurant key and consumer-facing business name.' },
          { name: 'Platform Listing ID', type: 'String', desc: 'Identifier for the listing on a delivery platform.' },
          { name: 'Platform', type: 'String', desc: 'Ordering service presenting the restaurant listing.' },
          { name: 'Listing Status', type: 'Enum', desc: 'Observed listed, unavailable, or other source-reported state.' },
        ],
      },
      {
        title: 'Discovery Attributes',
        desc: 'Public listing details used to describe and compare restaurants.',
        fields: [
          { name: 'Cuisine', type: 'String', desc: 'Cuisine label displayed or normalized from the source.' },
          { name: 'City / Neighborhood', type: 'String', desc: 'Market and local area associated with the listing.' },
          { name: 'Rating', type: 'Decimal', desc: 'Public rating shown by the platform at capture time.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the listing was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'How are restaurant listings matched across platforms?', a: 'Matching can use names, addresses, phone numbers, coordinates, and other public identifiers. Match confidence and source-specific listing IDs can be retained so uncertain matches are reviewable.' },
      { q: 'How often are platform listings refreshed?', a: 'Refresh cadence depends on selected platforms, markets, and source availability. Scheduled snapshots can be configured for an agreed collection interval.' },
      { q: 'Which delivery formats are available?', a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery to a preferred storage destination can be scoped for a custom feed.' },
      { q: 'Does an available listing guarantee ordering is open?', a: 'No. The status reflects what the platform displayed when observed. Ordering availability can change before checkout or vary by address and time.' },
    ],
  },
  deliveryFees: {
    name: 'Delivery Fees',
    slug: 'delivery-fees',
    icon: DollarSign,
    badge: 'Delivery Cost Intelligence',
    badgeSubtext: 'Fee and minimum-order observations',
    title: 'Food Delivery Fees Dataset',
    overviewCardTitle: 'Delivery Fee Monitor',
    description: 'Platform-displayed delivery charges, service fees, order minimums, and fee conditions with market and restaurant context.',
    heroDescription: 'Compare the costs customers encounter when ordering from restaurants across delivery apps. Capture fee components and order thresholds with currency, service area, and observation-time context.',
    featurePoints: ['Delivery and service charges', 'Order minimums', 'Currency and market context', 'Fee conditions where disclosed'],
    stats: [
      { label: 'Fee Metrics', value: '20+', subtext: 'Charge and threshold fields' },
      { label: 'Granularity', value: 'Restaurant × area', subtext: 'Channel-specific observations' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
      { label: 'History', value: 'Timestamped', subtext: 'Track observed changes' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Platform, restaurant, area' },
      { label: 'Fee basis', value: 'Displayed at capture', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', service_area_id: 'SEA-DT-04', delivery_fee: 1.99, service_fee: 2.15, small_order_fee: 0, minimum_order: 15, currency: 'USD', free_delivery_threshold: 35, observed_at: '2026-11-12T09:00:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', service_area_id: 'CHI-WL-02', delivery_fee: 0, service_fee: 1.8, small_order_fee: 2.5, minimum_order: 20, currency: 'USD', free_delivery_threshold: 40, observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Fee Components',
        desc: 'Individual charges shown during the observed ordering flow.',
        fields: [
          { name: 'Delivery Fee', type: 'Decimal', desc: 'Displayed charge for delivery at the selected location.' },
          { name: 'Service Fee', type: 'Decimal', desc: 'Platform service charge where presented.' },
          { name: 'Small Order Fee', type: 'Decimal', desc: 'Additional charge shown below an order threshold.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the displayed fees.' },
        ],
      },
      {
        title: 'Order Conditions',
        desc: 'Thresholds and service-area context that affect the total cost.',
        fields: [
          { name: 'Minimum Order', type: 'Decimal', desc: 'Minimum basket amount displayed by the platform.' },
          { name: 'Free Delivery Threshold', type: 'Decimal', desc: 'Basket threshold for a displayed delivery-fee waiver.' },
          { name: 'Restaurant / Service Area', type: 'String', desc: 'Restaurant and delivery zone associated with the fee.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the fee observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are the observed fees the final checkout total?', a: 'No. Fees can depend on address, basket contents, membership, demand, taxes, and checkout state. The dataset captures disclosed values at observation time and does not guarantee a final total.' },
      { q: 'Can fee components be compared across apps?', a: 'Yes, when the source exposes comparable components. Original labels and currency are preserved to clarify differences in how platforms define charges.' },
      { q: 'How frequently can fees be monitored?', a: 'Collection frequency depends on the selected platform and market scope. Regular snapshots can help track changes, but cannot capture every short-lived variation.' },
      { q: 'Which output formats can I request?', a: 'CSV, JSON, and Parquet are standard. A scheduled export or delivery to a data platform can be arranged for a custom feed.' },
    ],
  },
  orderVolume: {
    name: 'Order Volume',
    slug: 'order-volume',
    icon: TrendingUp,
    badge: 'Demand Signals',
    badgeSubtext: 'Directional activity indicators',
    title: 'Food Delivery Order Volume Dataset',
    overviewCardTitle: 'Order Activity Signals',
    description: 'Structured order-activity indicators by restaurant, platform, market, and time period, with signal type and methodology context.',
    heroDescription: 'Analyze restaurant activity patterns using documented, observable indicators. This dataset distinguishes directional platform signals from verified transaction counts and retains the time, location, and method context needed for interpretation.',
    featurePoints: ['Restaurant and platform dimensions', 'Time-bucketed activity signals', 'Signal type and method notes', 'Market-level comparisons'],
    stats: [
      { label: 'Signal Fields', value: '18+', subtext: 'Activity and context details' },
      { label: 'Time Buckets', value: 'Configurable', subtext: 'Period depends on source' },
      { label: 'Interpretation', value: 'Directional', subtext: 'Not verified transactions' },
      { label: 'Method', value: 'Documented', subtext: 'Signal basis included' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant and time period' },
      { label: 'Signal basis', value: 'Methodology-labeled', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', city: 'Seattle', period_start: '2026-11-11T18:00:00Z', period_end: '2026-11-11T19:00:00Z', activity_index: 78.4, signal_label: 'High activity', observed_listing_rank: 3, methodology_version: '1.0', observed_at: '2026-11-11T19:05:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', city: 'Chicago', period_start: '2026-11-11T18:00:00Z', period_end: '2026-11-11T19:00:00Z', activity_index: 64.2, signal_label: 'Moderate activity', observed_listing_rank: 8, methodology_version: '1.0', observed_at: '2026-11-11T19:06:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Activity Signal',
        desc: 'Indicator values and labels associated with an observed time window.',
        fields: [
          { name: 'Activity Index', type: 'Decimal', desc: 'Normalized directional measure under the documented methodology.' },
          { name: 'Signal Label', type: 'String', desc: 'Source-displayed or methodology-derived activity category.' },
          { name: 'Period Start / End', type: 'ISO-8601', desc: 'Time window represented by the activity observation.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of the signal calculation or collection method.' },
        ],
      },
      {
        title: 'Restaurant and Market',
        desc: 'Platform and location keys for comparing activity signals.',
        fields: [
          { name: 'Restaurant ID', type: 'String', desc: 'Normalized restaurant or branch identifier.' },
          { name: 'Platform', type: 'String', desc: 'Delivery platform associated with the observation.' },
          { name: 'City', type: 'String', desc: 'Market for the restaurant activity signal.' },
          { name: 'Observed Listing Rank', type: 'Integer', desc: 'Listing position where captured; not a transaction count.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does this dataset provide actual order counts?', a: 'Not unless an authorized source explicitly supplies transaction data. Activity indicators and listing signals are directional and should not be represented as verified orders or revenue.' },
      { q: 'How should the activity index be interpreted?', a: 'Interpret it using the accompanying signal definition, scope, and methodology version. It is designed for comparisons within that framework, not as a universal measure of sales.' },
      { q: 'Can activity be compared across platforms?', a: 'Cross-platform comparison is appropriate only where the indicators and methodology are comparable. Platform-specific source context is retained so users can account for differences.' },
      { q: 'What time granularity is available?', a: 'Available time buckets depend on source visibility and the project configuration. Each record includes its represented period and observation timestamp.' },
    ],
  },
  menuPricing: {
    name: 'Menu Pricing',
    slug: 'menu-pricing',
    icon: Package,
    badge: 'Menu Price Intelligence',
    badgeSubtext: 'Channel and item price observations',
    title: 'Food Delivery Menu Pricing Dataset',
    overviewCardTitle: 'Menu Price Monitor',
    description: 'Restaurant menu item prices across delivery channels, including item identity, option context, currency, and observed price changes.',
    heroDescription: 'Compare menu prices presented across restaurant-owned and third-party ordering channels. Link price observations to normalized items and preserve channel, option, and promotion context for accurate analysis.',
    featurePoints: ['Item-level price records', 'Restaurant and channel keys', 'Currency and option context', 'Timestamped price history'],
    stats: [
      { label: 'Pricing Fields', value: '22+', subtext: 'Price and menu context' },
      { label: 'Granularity', value: 'Item × channel', subtext: 'Options where available' },
      { label: 'History', value: 'Timestamped', subtext: 'Track menu changes' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Menu item and channel' },
      { label: 'Price basis', value: 'Displayed item price', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', menu_item_id: 'MENU-184', item_name: 'Roasted Mushroom Toast', category: 'Brunch > Toasts', base_price: 15, listed_price: 16.25, currency: 'USD', option_name: 'Add avocado', option_price: 2, promotion_active: false, observed_at: '2026-11-12T09:30:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', menu_item_id: 'MENU-610', item_name: 'Lakehouse Burger', category: 'Mains > Burgers', base_price: 19, listed_price: 18, currency: 'USD', option_name: 'Double patty', option_price: 5, promotion_active: true, observed_at: '2026-11-12T09:40:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Menu Item Identity',
        desc: 'Normalized item and category context for channel comparisons.',
        fields: [
          { name: 'Restaurant ID', type: 'String', desc: 'Restaurant or branch identifier.' },
          { name: 'Menu Item ID / Name', type: 'String', desc: 'Item key and consumer-facing menu name.' },
          { name: 'Category', type: 'String', desc: 'Menu section or normalized category path.' },
          { name: 'Platform', type: 'String', desc: 'Ordering channel where the price was observed.' },
        ],
      },
      {
        title: 'Price and Options',
        desc: 'Displayed item price and configurable option values where available.',
        fields: [
          { name: 'Base / Listed Price', type: 'Decimal', desc: 'Menu base price and channel-displayed item price.' },
          { name: 'Currency', type: 'String', desc: 'Currency code for the displayed amount.' },
          { name: 'Option Name / Price', type: 'String / Decimal', desc: 'Customization and added charge when shown.' },
          { name: 'Promotion Active', type: 'Boolean', desc: 'Whether a visible promotion was associated with the price.' },
        ],
      },
    ],
    faqs: [
      { q: 'Why can menu prices differ across delivery channels?', a: 'Restaurants and platforms may set different channel prices, options, or promotions. Records preserve the source and item context so comparisons are made between the appropriate listings.' },
      { q: 'Are taxes and delivery charges included in menu prices?', a: 'Menu item prices are recorded separately from order-level taxes, fees, and delivery charges unless the source explicitly combines them.' },
      { q: 'How are equivalent menu items matched?', a: 'Matching may use item names, descriptions, categories, option details, and restaurant identity. Confidence and source IDs can be retained for review.' },
      { q: 'Can historical price changes be provided?', a: 'Timestamped snapshots can support price history for the agreed collection period and cadence, subject to source availability.' },
    ],
  },
  etaData: {
    name: 'ETA Data',
    slug: 'eta-data',
    icon: Clock,
    badge: 'Delivery Experience',
    badgeSubtext: 'Displayed delivery estimates',
    title: 'Food Delivery ETA Dataset',
    overviewCardTitle: 'Delivery ETA Feed',
    description: 'Time-stamped delivery estimates presented by food-ordering platforms, connected to the restaurant, service area, and order context.',
    heroDescription: 'Track the delivery times shown to customers across restaurants, platforms, and service areas. Normalize estimate ranges while preserving original display text and the conditions visible at capture.',
    featurePoints: ['Displayed estimate ranges', 'Restaurant and zone context', 'Platform and order conditions', 'Capture-time history'],
    stats: [
      { label: 'ETA Attributes', value: '15+', subtext: 'Range and service details' },
      { label: 'Granularity', value: 'Restaurant × zone', subtext: 'Channel-specific estimate' },
      { label: 'Time Context', value: 'Timestamped', subtext: 'Estimate history snapshots' },
      { label: 'Outcome Data', value: 'Separate', subtext: 'ETA is not actual delivery time' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant, platform, zone' },
      { label: 'Measure', value: 'Displayed estimate', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', service_area_id: 'SEA-DT-04', eta_min_minutes: 25, eta_max_minutes: 40, eta_display_text: '25-40 min', service_mode: 'delivery', order_minimum: 15, observed_at: '2026-11-12T10:00:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', service_area_id: 'CHI-WL-02', eta_min_minutes: 30, eta_max_minutes: 50, eta_display_text: '30-50 min', service_mode: 'delivery', order_minimum: 20, observed_at: '2026-11-12T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Estimate Details',
        desc: 'Normalized delivery estimate values and original source wording.',
        fields: [
          { name: 'ETA Minimum / Maximum', type: 'Integer (minutes)', desc: 'Lower and upper bounds of the displayed estimate.' },
          { name: 'ETA Display Text', type: 'String', desc: 'Original time estimate shown by the platform.' },
          { name: 'Service Mode', type: 'String', desc: 'Delivery, pickup, or other mode when identified.' },
          { name: 'Order Minimum', type: 'Decimal', desc: 'Displayed basket threshold associated with the estimate, if any.' },
        ],
      },
      {
        title: 'Restaurant and Service Area',
        desc: 'Keys and timestamps for comparing estimates across locations.',
        fields: [
          { name: 'Restaurant ID', type: 'String', desc: 'Restaurant or branch associated with the estimate.' },
          { name: 'Platform', type: 'String', desc: 'Ordering platform presenting the delivery estimate.' },
          { name: 'Service Area ID', type: 'String', desc: 'Zone or address-area context used to show the estimate.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC capture time; not the order delivery completion time.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does an ETA record show actual delivery performance?', a: 'No. It records an estimate shown before or during ordering, not a completed delivery duration. Actual performance requires separate order and fulfillment outcome data.' },
      { q: 'Why might an ETA vary by address or time?', a: 'Platforms can adjust estimates based on distance, demand, restaurant workload, courier supply, and other conditions. The service-area and observation-time fields provide comparison context.' },
      { q: 'Can displayed estimate text be retained?', a: 'Yes. The original source text can be preserved alongside normalized minimum and maximum minute values when the estimate supports that parsing.' },
      { q: 'How are ETA observations refreshed?', a: 'Refresh schedules can be configured for selected locations and platforms, subject to source availability and collection scope.' },
    ],
  },
  promotions: {
    name: 'Promotions',
    slug: 'promotions',
    icon: Percent,
    badge: 'Offer Intelligence',
    badgeSubtext: 'Restaurant and platform promotions',
    title: 'Food Delivery Promotions Dataset',
    overviewCardTitle: 'Promotion Monitor',
    description: 'Restaurant and platform offers with discount mechanics, eligibility, validity windows, and associated menu or order context.',
    heroDescription: 'Monitor promotional activity across food-delivery channels. Capture displayed offer terms, qualifying baskets, discount values, and date windows so campaigns can be compared with their conditions intact.',
    featurePoints: ['Offer type and terms', 'Discount and qualifying spend', 'Start and end dates', 'Restaurant and platform keys'],
    stats: [
      { label: 'Offer Fields', value: '22+', subtext: 'Mechanics and eligibility' },
      { label: 'Offer Types', value: 'Multi-format', subtext: 'Percent, fixed, bundle' },
      { label: 'Validity', value: 'Dated', subtext: 'When shown by the source' },
      { label: 'Refresh', value: 'Campaign-based', subtext: 'Active offers monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Offer and restaurant' },
      { label: 'Offer terms', value: 'Source-captured', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', offer_id: 'DD-OFR-8802', offer_type: 'percentage_discount', offer_text: '20% off up to $8', discount_value: 20, discount_unit: 'percent', minimum_order: 25, valid_from: '2026-11-10', valid_to: '2026-11-17', promo_code_required: false, observed_at: '2026-11-12T10:30:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', offer_id: 'MR-OFR-3619', offer_type: 'fixed_discount', offer_text: '$5 off orders over $30', discount_value: 5, discount_unit: 'USD', minimum_order: 30, valid_from: '2026-11-11', valid_to: '2026-11-14', promo_code_required: true, observed_at: '2026-11-12T10:40:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Offer Mechanics',
        desc: 'Promotion identity and consumer-facing discount structure.',
        fields: [
          { name: 'Offer ID / Type', type: 'String', desc: 'Source or normalized identifier and promotion mechanic.' },
          { name: 'Offer Text', type: 'String', desc: 'Promotion wording as displayed by the platform.' },
          { name: 'Discount Value / Unit', type: 'Decimal / String', desc: 'Discount amount and whether it is a percentage or fixed value.' },
          { name: 'Minimum Order', type: 'Decimal', desc: 'Qualifying basket threshold where stated.' },
        ],
      },
      {
        title: 'Eligibility and Validity',
        desc: 'Dates and conditions determining when an offer applies.',
        fields: [
          { name: 'Valid From / To', type: 'Date', desc: 'Advertised offer window when provided.' },
          { name: 'Promo Code Required', type: 'Boolean', desc: 'Whether a visible offer requires a code.' },
          { name: 'Restaurant / Platform', type: 'String', desc: 'Entities associated with the offer.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the offer was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are all promotion eligibility conditions captured?', a: 'The dataset records terms visible in the source, such as minimum spend or a code requirement. Terms hidden until checkout or account sign-in may not be observable.' },
      { q: 'Can offers be compared across platforms?', a: 'Yes, with their mechanics, limits, currency, and qualifying conditions retained. A percentage discount and a fixed discount should not be compared without considering those terms.' },
      { q: 'How are expired promotions handled?', a: 'Records retain observed validity dates and timestamps. Historical snapshots can preserve offers after they expire, depending on the agreed retention period.' },
      { q: 'Do promotions guarantee a discount at checkout?', a: 'No. Offers can be account-, location-, basket-, or time-dependent and may change before checkout. Confirm eligibility with the platform.' },
    ],
  },
  restaurantRank: {
    name: 'Restaurant Rank',
    slug: 'restaurant-rank',
    icon: BarChart2,
    badge: 'Discovery Visibility',
    badgeSubtext: 'Search and category placement',
    title: 'Food Delivery Restaurant Rank Dataset',
    overviewCardTitle: 'Restaurant Rank Tracker',
    description: 'Restaurant positions observed in platform search, category, and recommendation surfaces with query and location context.',
    heroDescription: 'Understand how restaurant visibility changes across delivery-app discovery surfaces. Rank observations retain the search term, category, market, and time context needed to interpret placement.',
    featurePoints: ['Search and category positions', 'Query and market context', 'Restaurant and platform identifiers', 'Timestamped rank history'],
    stats: [
      { label: 'Rank Signals', value: '15+', subtext: 'Position and surface metadata' },
      { label: 'Granularity', value: 'Query × area', subtext: 'Search context captured' },
      { label: 'History', value: 'Timestamped', subtext: 'Monitor placement changes' },
      { label: 'Interpretation', value: 'Observed order', subtext: 'Platform surface-specific' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant, query, surface' },
      { label: 'Rank basis', value: 'Observed listing position', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', city: 'Seattle', search_query: 'brunch', surface_type: 'search', result_position: 3, page_number: 1, sponsored: false, observed_at: '2026-11-12T11:00:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', city: 'Chicago', search_query: 'American food', surface_type: 'category', result_position: 8, page_number: 1, sponsored: true, observed_at: '2026-11-12T11:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Rank Observation',
        desc: 'Position and discovery surface attributes captured for each result.',
        fields: [
          { name: 'Result Position', type: 'Integer', desc: 'Observed placement within the captured result list.' },
          { name: 'Page Number', type: 'Integer', desc: 'Result page or pagination position where applicable.' },
          { name: 'Surface Type', type: 'Enum', desc: 'Search, category, recommendation, or other discovery surface.' },
          { name: 'Sponsored', type: 'Boolean', desc: 'Indicates paid placement only when identified by the source.' },
        ],
      },
      {
        title: 'Query and Market Context',
        desc: 'Search and location dimensions required to interpret ranking.',
        fields: [
          { name: 'Restaurant ID', type: 'String', desc: 'Restaurant or branch shown in the result.' },
          { name: 'Platform', type: 'String', desc: 'Delivery platform where rank was observed.' },
          { name: 'Search Query / Category', type: 'String', desc: 'User query or browse category associated with the surface.' },
          { name: 'City / Observed At', type: 'String / ISO-8601', desc: 'Market and UTC capture time for the ranking snapshot.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a ranking snapshot represent a permanent restaurant position?', a: 'No. Positions can vary by query, address, time, personalization, and platform changes. Each record describes a specific observed surface and capture context.' },
      { q: 'Are sponsored placements identified?', a: 'They are marked when the platform visibly identifies an item as sponsored or promoted. The dataset does not infer paid placement when no explicit signal is available.' },
      { q: 'Can ranks be compared between different search terms?', a: 'Rank comparisons are most meaningful when the platform, query, location, surface, and observation conditions are comparable.' },
      { q: 'How frequently can ranking snapshots be collected?', a: 'Collection cadence and query coverage are configured for the project and depend on source availability and the desired market scope.' },
    ],
  },
  zoneCoverage: {
    name: 'Zone Coverage',
    slug: 'zone-coverage',
    icon: MapPin,
    badge: 'Delivery Market Mapping',
    badgeSubtext: 'Restaurant and service-area coverage',
    title: 'Food Delivery Zone Coverage Dataset',
    overviewCardTitle: 'Delivery Zone Coverage',
    description: 'Restaurant delivery availability mapped to platform service zones, geographic areas, and coverage observation periods.',
    heroDescription: 'Map where delivery platforms list restaurants and expose service. Zone records connect restaurants, platforms, and market areas to support coverage comparisons while distinguishing observed scope from confirmed operating boundaries.',
    featurePoints: ['Platform zone identifiers', 'Restaurant-zone relationships', 'Market and geographic context', 'Coverage observation timestamps'],
    stats: [
      { label: 'Coverage Keys', value: '3 levels', subtext: 'Platform, restaurant, zone' },
      { label: 'Geo Detail', value: 'Zone-based', subtext: 'Boundaries when published' },
      { label: 'Service Status', value: 'Observed', subtext: 'At a captured location' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Scope set per market' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Restaurant and service zone' },
      { label: 'Coverage basis', value: 'Observed availability', isHighlight: true },
    ],
    records: [
      { platform: 'DashDish', restaurant_id: 'RST-SEA-042', zone_id: 'SEA-DT-04', city: 'Seattle', postal_code: '98101', coverage_status: 'deliverable', latitude: 47.6112, longitude: -122.3361, zone_boundary_available: false, observed_at: '2026-11-12T12:00:00Z' },
      { platform: 'MealRunner', restaurant_id: 'RST-CHI-107', zone_id: 'CHI-WL-02', city: 'Chicago', postal_code: '60606', coverage_status: 'deliverable', latitude: 41.8831, longitude: -87.6342, zone_boundary_available: true, observed_at: '2026-11-12T12:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Zone and Restaurant Keys',
        desc: 'Platform-specific identifiers connecting restaurants to delivery areas.',
        fields: [
          { name: 'Platform', type: 'String', desc: 'Delivery service associated with the zone observation.' },
          { name: 'Restaurant ID', type: 'String', desc: 'Restaurant or branch listed for the service area.' },
          { name: 'Zone ID', type: 'String', desc: 'Platform or normalized identifier for the delivery zone.' },
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed deliverable, unavailable, or unknown state.' },
        ],
      },
      {
        title: 'Geographic Context',
        desc: 'Market and spatial attributes available for the observed coverage record.',
        fields: [
          { name: 'City / Postal Code', type: 'String', desc: 'Market and postal area used to assess service.' },
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Representative point for the location or zone when available.' },
          { name: 'Zone Boundary Available', type: 'Boolean', desc: 'Indicates whether a source boundary was available.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when coverage was checked.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a zone record define the complete delivery boundary?', a: 'Only when the source provides a zone boundary. Otherwise the record represents an observed location or area check and should not be treated as a precise polygon.' },
      { q: 'Does missing coverage mean a restaurant never delivers there?', a: 'No. It may reflect the selected collection scope, source visibility, or the time of observation. Interpret coverage with its status and timestamp.' },
      { q: 'Can coverage be compared between platforms?', a: 'Yes, when equivalent locations and observation periods are used. Platform-specific zone definitions may differ and are retained where available.' },
      { q: 'What spatial formats can be delivered?', a: 'CSV and JSON are standard, with GeoJSON available when geographic coordinates or boundaries are part of the collected scope.' },
    ],
  },
};