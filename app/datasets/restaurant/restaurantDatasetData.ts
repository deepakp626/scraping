import {
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Star,
  Tag,
  Truck,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type RestaurantDatasetKey =
  | 'menuData'
  | 'ratingsReviews'
  | 'locationData'
  | 'cuisineTags'
  | 'operatingHours'
  | 'priceRange'
  | 'chainProfiles'
  | 'deliveryPartners';

interface RestaurantDataset {
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

export const restaurantDatasets: Record<RestaurantDatasetKey, RestaurantDataset> = {
  menuData: {
    name: 'Menu Data',
    slug: 'menu-data',
    icon: Utensils,
    badge: 'Menu Intelligence',
    badgeSubtext: 'Item-level menu records',
    title: 'Restaurant Menu Data Dataset',
    overviewCardTitle: 'Menu Catalog Feed',
    description: 'Structured restaurant menu listings with item names, categories, descriptions, prices, dietary labels, and source context.',
    heroDescription: 'Create a consistent view of restaurant menus across locations and ordering channels. Normalize item names, categories, prices, and published dietary information while retaining restaurant and source identifiers.',
    featurePoints: ['Menu and item identifiers', 'Category and description fields', 'Published price and currency', 'Dietary labels where shown'],
    stats: [
      { label: 'Menu Fields', value: '30+', subtext: 'Item and listing attributes' },
      { label: 'Granularity', value: 'Item-level', subtext: 'Menu sections and options' },
      { label: 'Coverage', value: 'Multi-source', subtext: 'Markets selected per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence configured to scope' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant menu item' },
      { label: 'Menu content', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', menu_item_id: 'MENU-184', item_name: 'Roasted Mushroom Toast', category: 'Brunch > Toasts', description: 'Sourdough, whipped ricotta, herbs', price: 14.5, currency: 'USD', dietary_label: 'Vegetarian', available: true, observed_at: '2026-11-12T08:30:00Z' },
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', menu_item_id: 'MENU-219', item_name: 'Citrus Olive Cake', category: 'Desserts', description: 'Olive oil cake with seasonal citrus', price: 9, currency: 'USD', dietary_label: 'Contains gluten', available: true, observed_at: '2026-11-12T08:30:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Restaurant and Menu Item',
        desc: 'Identifiers connecting each menu listing to its restaurant and channel.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Stable restaurant key and consumer-facing business name.' },
          { name: 'Menu Item ID', type: 'String', desc: 'Source item identifier or normalized key.' },
          { name: 'Item Name', type: 'String', desc: 'Menu item title as published by the restaurant or platform.' },
          { name: 'Category', type: 'String', desc: 'Menu section or normalized category path.' },
        ],
      },
      {
        title: 'Item Details and Price',
        desc: 'Published descriptions, pricing, availability, and dietary labels.',
        fields: [
          { name: 'Description', type: 'String', desc: 'Public menu description when provided.' },
          { name: 'Price / Currency', type: 'Decimal / String', desc: 'Displayed item price and its currency code.' },
          { name: 'Dietary Label', type: 'String', desc: 'Dietary or allergen label only when published by the source.' },
          { name: 'Available', type: 'Boolean', desc: 'Whether the listing appeared available at capture time.' },
        ],
      },
    ],
    faq: {
      q: 'Are dietary and allergen details independently verified?',
      a: 'No. The dataset captures information displayed by the restaurant or ordering source and does not independently verify ingredients, allergens, or dietary suitability.',
    },
  },
  ratingsReviews: {
    name: 'Ratings & Reviews',
    slug: 'ratings-reviews',
    icon: Star,
    badge: 'Guest Feedback',
    badgeSubtext: 'Public restaurant review records',
    title: 'Restaurant Ratings & Reviews Dataset',
    overviewCardTitle: 'Review Intelligence Feed',
    description: 'Structured public restaurant reviews with ratings, dates, source attribution, and restaurant location context.',
    heroDescription: 'Analyze public feedback across restaurant discovery and ordering platforms. Review text and rating observations can be grouped by source, location, date, and language while preserving source context.',
    featurePoints: ['Review and restaurant identifiers', 'Rating scale context', 'Review text and dates', 'Source and language attribution'],
    stats: [
      { label: 'Review Fields', value: '20+', subtext: 'Rating and provenance details' },
      { label: 'Source Context', value: 'Included', subtext: 'Platform retained per record' },
      { label: 'Language', value: 'Detected', subtext: 'Original text preserved' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Subject to source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Individual review' },
      { label: 'Content basis', value: 'Public source reviews', isHighlight: true },
    ],
    records: [
      { review_id: 'REV-70218', source: 'CityTable', restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', rating: 4.5, rating_scale: 5, review_title: 'Thoughtful brunch menu', review_text: 'Fresh ingredients and friendly service. The mushroom toast was excellent.', language: 'en', review_date: '2026-10-29', observed_at: '2026-11-12T09:00:00Z' },
      { review_id: 'REV-81537', source: 'DineMap', restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', rating: 4, rating_scale: 5, review_title: 'Good neighborhood dinner', review_text: 'Comfortable room and a well-balanced seasonal menu.', language: 'en', review_date: '2026-11-02', observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Review Content',
        desc: 'Rating and public review text captured with source scale context.',
        fields: [
          { name: 'Review ID', type: 'String', desc: 'Source review identifier or stable derived key.' },
          { name: 'Rating / Scale', type: 'Decimal / Integer', desc: 'Score and maximum rating scale shown by the source.' },
          { name: 'Review Title / Text', type: 'String', desc: 'Public review content, subject to source terms.' },
          { name: 'Review Date', type: 'Date', desc: 'Date associated with the review on its source.' },
        ],
      },
      {
        title: 'Restaurant and Provenance',
        desc: 'Restaurant identity and source details for trustworthy aggregation.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Business key and display name associated with the review.' },
          { name: 'Source', type: 'String', desc: 'Public platform where the review was observed.' },
          { name: 'Language', type: 'String', desc: 'Detected or source-provided language code.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC capture time for the review record.' },
        ],
      },
    ],
    faq: {
      q: 'Are reviews independently verified as genuine customer experiences?',
      a: 'No. The dataset records public review content and source-provided metadata; it does not independently verify reviewer identity or the accuracy of an individual review.',
    },
  },
  locationData: {
    name: 'Location Data',
    slug: 'location-data',
    icon: MapPin,
    badge: 'Restaurant Footprint',
    badgeSubtext: 'Address and geographic attributes',
    title: 'Restaurant Location Data Dataset',
    overviewCardTitle: 'Restaurant Locations Feed',
    description: 'Restaurant directory records with standardized addresses, coordinates, neighborhood, contact details, and location status where published.',
    heroDescription: 'Map restaurant footprints with normalized business and geographic identifiers. Location records support market coverage analysis, proximity searches, and joins to menus, reviews, and operating-hour datasets.',
    featurePoints: ['Normalized postal addresses', 'Coordinates where available', 'Restaurant and branch IDs', 'Neighborhood and market tags'],
    stats: [
      { label: 'Location Fields', value: '25+', subtext: 'Address and contact details' },
      { label: 'Geo Detail', value: 'Lat / Long', subtext: 'When available or geocoded' },
      { label: 'Granularity', value: 'Branch-level', subtext: 'Chain and independent venues' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Location changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Restaurant location' },
      { label: 'Coordinates', value: 'Source or geocoded', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', address: '418 Pine Street', city: 'Seattle', region: 'WA', postal_code: '98101', country: 'US', latitude: 47.6112, longitude: -122.3361, phone: '+1-206-555-0142', location_status: 'active', observed_at: '2026-11-12T10:00:00Z' },
      { restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', address: '92 North Wells Street', city: 'Chicago', region: 'IL', postal_code: '60606', country: 'US', latitude: 41.8831, longitude: -87.6342, phone: '+1-312-555-0188', location_status: 'active', observed_at: '2026-11-12T10:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Business Location',
        desc: 'Address and identity fields describing an individual restaurant branch.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Stable location key and published business name.' },
          { name: 'Address', type: 'String', desc: 'Street address as published or normalized.' },
          { name: 'City / Region / Postal Code', type: 'String', desc: 'Administrative and postal location attributes.' },
          { name: 'Country', type: 'String', desc: 'Country code or name associated with the location.' },
        ],
      },
      {
        title: 'Coordinates and Contact',
        desc: 'Geographic coordinates and public contact details where available.',
        fields: [
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Published coordinates or approximate geocoded point.' },
          { name: 'Phone', type: 'String', desc: 'Public telephone number associated with the branch.' },
          { name: 'Location Status', type: 'Enum', desc: 'Observed active, inactive, or unknown status.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the latest location observation.' },
        ],
      },
    ],
    faq: {
      q: 'Are location coordinates always exact?',
      a: 'Coordinates may be supplied by a source or geocoded from an address. Geocoded coordinates are approximate and should not be treated as confirmation of an entrance or precise service boundary.',
    },
  },
  cuisineTags: {
    name: 'Cuisine Tags',
    slug: 'cuisine-tags',
    icon: Tag,
    badge: 'Cuisine Classification',
    badgeSubtext: 'Normalized cuisine labels',
    title: 'Restaurant Cuisine Tags Dataset',
    overviewCardTitle: 'Cuisine Classification Feed',
    description: 'Restaurant cuisine and food-style labels standardized across public listings, with source terms and confidence context where available.',
    heroDescription: 'Unify cuisine labels across restaurant directories and ordering platforms. Preserve source wording alongside normalized tags to support discovery, market segmentation, and cuisine coverage analysis.',
    featurePoints: ['Normalized cuisine taxonomy', 'Original source labels retained', 'Restaurant-level associations', 'Multi-label classification support'],
    stats: [
      { label: 'Tag Fields', value: '15+', subtext: 'Cuisine and provenance data' },
      { label: 'Taxonomy', value: 'Normalized', subtext: 'Source labels preserved' },
      { label: 'Granularity', value: 'Restaurant-level', subtext: 'Multi-tag associations' },
      { label: 'Refresh', value: 'On change', subtext: 'Listing updates monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant and cuisine tag' },
      { label: 'Tag basis', value: 'Source-attributed mapping', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', source: 'CityTable', source_cuisine_label: 'Pacific Northwest, New American', normalized_cuisine: 'New American', cuisine_group: 'North American', mapping_confidence: 0.94, observed_at: '2026-11-12T10:30:00Z' },
      { restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', source: 'DineMap', source_cuisine_label: 'Modern American, Seasonal', normalized_cuisine: 'American', cuisine_group: 'North American', mapping_confidence: 0.91, observed_at: '2026-11-12T10:40:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Restaurant Association',
        desc: 'Restaurant and source keys connecting each cuisine classification.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Business or branch identifier and published name.' },
          { name: 'Source', type: 'String', desc: 'Directory or platform providing the original label.' },
          { name: 'Source Cuisine Label', type: 'String', desc: 'Cuisine wording as presented by the source.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the cuisine label was captured.' },
        ],
      },
      {
        title: 'Normalized Taxonomy',
        desc: 'Standardized cuisine tags and classification context.',
        fields: [
          { name: 'Normalized Cuisine', type: 'String', desc: 'Mapped cuisine label in the normalized taxonomy.' },
          { name: 'Cuisine Group', type: 'String', desc: 'Broader cuisine family for aggregation.' },
          { name: 'Mapping Confidence', type: 'Decimal (0-1)', desc: 'Confidence score when automated or assisted mapping is used.' },
          { name: 'Taxonomy Version', type: 'String', desc: 'Version of the cuisine taxonomy used for mapping.' },
        ],
      },
    ],
    faq: {
      q: 'Can one restaurant have multiple cuisine tags?',
      a: 'Yes. Restaurants may have multiple source labels and normalized cuisine associations. The original source wording is retained so users can distinguish publisher claims from normalized classifications.',
    },
  },
  operatingHours: {
    name: 'Operating Hours',
    slug: 'operating-hours',
    icon: Clock,
    badge: 'Service Availability',
    badgeSubtext: 'Weekly schedules and exceptions',
    title: 'Restaurant Operating Hours Dataset',
    overviewCardTitle: 'Operating Hours Feed',
    description: 'Restaurant opening schedules with day-level hours, timezone, service periods, and published holiday or temporary exceptions.',
    heroDescription: 'Compare when restaurant locations are scheduled to operate. Normalize weekly opening intervals and retain timezone and exception details to support service availability analysis across branches and markets.',
    featurePoints: ['Day-level opening intervals', 'Local timezone context', 'Meal-service periods', 'Published holiday exceptions'],
    stats: [
      { label: 'Schedule Fields', value: '18+', subtext: 'Day and interval details' },
      { label: 'Time Context', value: 'Local time', subtext: 'Timezone retained' },
      { label: 'Granularity', value: 'Location + day', subtext: 'Multiple service windows' },
      { label: 'Exceptions', value: 'When listed', subtext: 'Holiday and temporary hours' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Branch and day' },
      { label: 'Hours basis', value: 'Published schedule', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', day_of_week: 'Monday', opens_at: '08:00', closes_at: '21:00', timezone: 'America/Los_Angeles', service_period: 'All day', hours_status: 'open', exception_date: '', observed_at: '2026-11-12T11:00:00Z' },
      { restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', day_of_week: 'Monday', opens_at: '11:30', closes_at: '22:00', timezone: 'America/Chicago', service_period: 'Lunch and dinner', hours_status: 'open', exception_date: '', observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Weekly Schedule',
        desc: 'Local opening intervals and service-period context by location.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Location identifier and published restaurant name.' },
          { name: 'Day of Week', type: 'Enum', desc: 'Weekday associated with the published schedule.' },
          { name: 'Opens At / Closes At', type: 'Time', desc: 'Local start and end times for the operating interval.' },
          { name: 'Timezone', type: 'IANA String', desc: 'Timezone used to interpret local operating hours.' },
        ],
      },
      {
        title: 'Service and Exceptions',
        desc: 'Meal windows, closure states, and date-specific schedule overrides.',
        fields: [
          { name: 'Service Period', type: 'String', desc: 'Meal period or service type where provided.' },
          { name: 'Hours Status', type: 'Enum', desc: 'Open, closed, or special-hours state from the source.' },
          { name: 'Exception Date', type: 'Date', desc: 'Date of a published holiday or temporary schedule exception.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the schedule was captured.' },
        ],
      },
    ],
    faq: {
      q: 'Do published hours guarantee the restaurant is open?',
      a: 'No. Hours are source-published observations and can be changed without notice. Temporary closures or service interruptions may not appear until a source updates its listing.',
    },
  },
  priceRange: {
    name: 'Price Range',
    slug: 'price-range',
    icon: DollarSign,
    badge: 'Pricing Intelligence',
    badgeSubtext: 'Restaurant and menu price context',
    title: 'Restaurant Price Range Dataset',
    overviewCardTitle: 'Restaurant Price Benchmarks',
    description: 'Restaurant-level price indicators and menu price distributions with currency, location, cuisine, and source context.',
    heroDescription: 'Compare restaurant price positioning across neighborhoods, cuisines, and ordering channels. Combine published price-range labels with item-level menu observations where available, keeping currency and collection method explicit.',
    featurePoints: ['Published price bands', 'Menu-derived price statistics', 'Currency and market context', 'Cuisine and restaurant keys'],
    stats: [
      { label: 'Price Metrics', value: '20+', subtext: 'Bands and distribution fields' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original units retained' },
      { label: 'Granularity', value: 'Restaurant-level', subtext: 'Menu-derived where possible' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Configured to market scope' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant and market' },
      { label: 'Price basis', value: 'Source or menu-derived', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', city: 'Seattle', cuisine: 'New American', source_price_tier: '$$', currency: 'USD', menu_item_count: 38, menu_price_min: 7, menu_price_median: 16, menu_price_max: 34, observed_at: '2026-11-12T11:30:00Z' },
      { restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', city: 'Chicago', cuisine: 'American', source_price_tier: '$$$', currency: 'USD', menu_item_count: 52, menu_price_min: 10, menu_price_median: 24, menu_price_max: 58, observed_at: '2026-11-12T11:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Restaurant and Market',
        desc: 'Restaurant identity and market attributes used for price comparisons.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Location identifier and published business name.' },
          { name: 'City', type: 'String', desc: 'Market where the restaurant price was observed.' },
          { name: 'Cuisine', type: 'String', desc: 'Normalized cuisine label when available.' },
          { name: 'Source Price Tier', type: 'String', desc: 'Price band displayed by the source, if provided.' },
        ],
      },
      {
        title: 'Menu Price Distribution',
        desc: 'Price range summary derived from menu listings where sufficient items are available.',
        fields: [
          { name: 'Currency', type: 'String', desc: 'Currency code associated with observed menu prices.' },
          { name: 'Menu Item Count', type: 'Integer', desc: 'Number of priced menu items included in the summary.' },
          { name: 'Minimum / Median / Maximum', type: 'Decimal', desc: 'Summary statistics over observed item prices.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time of the source or menu snapshot.' },
        ],
      },
    ],
    faq: {
      q: 'Are price tiers calculated in the same way across every source?',
      a: 'No. A publisher-provided tier is retained as a source label, while menu-derived statistics are calculated from observed prices and identified as such. Currency and methodology context should be considered when comparing markets.',
    },
  },
  chainProfiles: {
    name: 'Chain Profiles',
    slug: 'chain-profiles',
    icon: Building2,
    badge: 'Restaurant Groups',
    badgeSubtext: 'Brand and branch relationships',
    title: 'Restaurant Chain Profiles Dataset',
    overviewCardTitle: 'Chain Profile Catalog',
    description: 'Restaurant brand profiles linking parent groups, concepts, locations, public contact details, and operating markets.',
    heroDescription: 'Understand the structure and geographic footprint of restaurant chains. Connect brand-level profiles to branch locations, cuisine positioning, and public corporate information with source attribution.',
    featurePoints: ['Brand and parent-group identifiers', 'Branch counts and market presence', 'Cuisine and concept attributes', 'Public corporate details'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Brand and group attributes' },
      { label: 'Relationships', value: 'Brand → Branch', subtext: 'Entity links normalized' },
      { label: 'Markets', value: 'Multi-region', subtext: 'Coverage selected per project' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Profile changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Brand, parent, branch' },
      { label: 'Profile basis', value: 'Public source data', isHighlight: true },
    ],
    records: [
      { chain_id: 'CHN-014', brand_name: 'Juniper Table', parent_group: 'Juniper Dining Co.', concept_type: 'Full service', primary_cuisine: 'New American', headquarters_city: 'Seattle', country: 'US', published_branch_count: 12, website: 'https://junipertable.example', observed_at: '2026-11-12T12:00:00Z' },
      { chain_id: 'CHN-028', brand_name: 'Nori & Rice', parent_group: 'Harbor Kitchens Group', concept_type: 'Fast casual', primary_cuisine: 'Japanese', headquarters_city: 'Portland', country: 'US', published_branch_count: 27, website: 'https://nori-rice.example', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Brand Identity',
        desc: 'Identifiers and public profile attributes for a restaurant concept.',
        fields: [
          { name: 'Chain ID / Brand Name', type: 'String', desc: 'Normalized chain key and consumer-facing brand.' },
          { name: 'Parent Group', type: 'String', desc: 'Associated parent company where identified.' },
          { name: 'Concept Type', type: 'String', desc: 'Service or restaurant concept classification.' },
          { name: 'Primary Cuisine', type: 'String', desc: 'Main cuisine label associated with the brand.' },
        ],
      },
      {
        title: 'Footprint and Corporate Details',
        desc: 'Published market footprint and corporate reference fields.',
        fields: [
          { name: 'Headquarters City / Country', type: 'String', desc: 'Publicly listed headquarters location.' },
          { name: 'Published Branch Count', type: 'Integer', desc: 'Branch count stated by the source at observation time.' },
          { name: 'Website', type: 'URL', desc: 'Official brand or group website where identified.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time of the latest profile observation.' },
        ],
      },
    ],
    faq: {
      q: 'Are branch counts independently audited?',
      a: 'No. Branch counts are captured from public sources or compiled from observed location records, and are not an audit or guarantee of current operations. The source and observation time should be used to assess freshness.',
    },
  },
  deliveryPartners: {
    name: 'Delivery Partners',
    slug: 'delivery-partners',
    icon: Truck,
    badge: 'Ordering Channels',
    badgeSubtext: 'Restaurant and delivery platform links',
    title: 'Restaurant Delivery Partners Dataset',
    overviewCardTitle: 'Delivery Partner Coverage',
    description: 'Restaurant availability across delivery platforms with listing status, delivery fees, estimated times, and service-area context where shown.',
    heroDescription: 'Map which delivery platforms list each restaurant and compare the service details presented to customers. Preserve platform, location, fee, and estimated-delivery context for channel and coverage analysis.',
    featurePoints: ['Restaurant-platform matching', 'Listing and service-area status', 'Displayed fees and minimums', 'Estimated delivery windows'],
    stats: [
      { label: 'Partner Fields', value: '25+', subtext: 'Platform and service attributes' },
      { label: 'Granularity', value: 'Restaurant + area', subtext: 'Channel-level observations' },
      { label: 'Fees', value: 'When listed', subtext: 'Currency and conditions retained' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Coverage scoped by market' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Restaurant and delivery platform' },
      { label: 'Service state', value: 'Observed at capture time', isHighlight: true },
    ],
    records: [
      { restaurant_id: 'RST-SEA-042', restaurant_name: 'Juniper Table', platform: 'DashDish', service_area_id: 'SEA-DT-04', listing_status: 'available', delivery_fee: 2.49, currency: 'USD', minimum_order: 15, eta_min_minutes: 25, eta_max_minutes: 40, observed_at: '2026-11-12T12:30:00Z' },
      { restaurant_id: 'RST-CHI-107', restaurant_name: 'Lake & Field', platform: 'MealRunner', service_area_id: 'CHI-LOOP-02', listing_status: 'available', delivery_fee: 0, currency: 'USD', minimum_order: 20, eta_min_minutes: 30, eta_max_minutes: 45, observed_at: '2026-11-12T12:40:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Restaurant and Platform',
        desc: 'Restaurant identity and delivery channel context for each listing.',
        fields: [
          { name: 'Restaurant ID / Name', type: 'String', desc: 'Restaurant or branch identifier and display name.' },
          { name: 'Platform', type: 'String', desc: 'Delivery marketplace or ordering channel.' },
          { name: 'Service Area ID', type: 'String', desc: 'Platform market or delivery zone associated with the record.' },
          { name: 'Listing Status', type: 'Enum', desc: 'Observed listed, unavailable, or other source-reported state.' },
        ],
      },
      {
        title: 'Delivery Terms',
        desc: 'Fees, minimums, and delivery estimates presented by the platform.',
        fields: [
          { name: 'Delivery Fee / Currency', type: 'Decimal / String', desc: 'Displayed delivery charge and associated currency.' },
          { name: 'Minimum Order', type: 'Decimal', desc: 'Published minimum basket value where shown.' },
          { name: 'ETA Range', type: 'Integer (minutes)', desc: 'Lower and upper bounds of the displayed delivery estimate.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the platform listing observation.' },
        ],
      },
    ],
    faq: {
      q: 'Does a delivery listing guarantee the restaurant is accepting orders?',
      a: 'No. The dataset captures a platform listing state at a point in time. Restaurant acceptance, fees, delivery estimates, and service availability can change before checkout.',
    },
  },
};