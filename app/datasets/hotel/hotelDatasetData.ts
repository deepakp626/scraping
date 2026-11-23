import {
  BarChart2,
  CalendarRange,
  Globe,
  Hotel,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type HotelDatasetKey =
  | 'propertyListings'
  | 'rateParity'
  | 'guestReviews'
  | 'availability'
  | 'amenitiesData'
  | 'otaCoverage'
  | 'locationData'
  | 'starRatings';

interface HotelDataset {
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

export const hotelDatasets: Record<HotelDatasetKey, HotelDataset> = {
  propertyListings: {
    name: 'Property Listings',
    slug: 'property-listings',
    icon: Hotel,
    badge: 'Property Intelligence',
    badgeSubtext: 'Hotel and lodging catalog records',
    title: 'Hotel Property Listings Dataset',
    overviewCardTitle: 'Property Catalog Feed',
    description: 'Structured hotel and accommodation listings with property identity, type, address, services, and source-specific identifiers.',
    heroDescription: 'Build a normalized catalog of accommodation properties across booking and travel sources. Match properties using public identifiers and listing details while preserving source context for reliable joins to rates, reviews, and availability.',
    featurePoints: ['Property and source identifiers', 'Address and property type', 'Public descriptions and contacts', 'Cross-channel matching context'],
    stats: [
      { label: 'Property Fields', value: '35+', subtext: 'Identity and listing attributes' },
      { label: 'Granularity', value: 'Property-level', subtext: 'Independent and chain hotels' },
      { label: 'Coverage', value: 'Multi-source', subtext: 'Markets selected per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on source' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property and source listing' },
      { label: 'Listing state', value: 'Observed at capture', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', source_listing_id: 'OTA-492810', property_name: 'Westbridge House', property_type: 'Boutique hotel', address: '18 Alder Lane', city: 'London', country: 'GB', phone: '+44-20-5550-0182', star_classification: 4, listing_status: 'active', observed_at: '2026-11-12T08:30:00Z' },
      { property_id: 'HTL-TYO-0147', source_listing_id: 'OTA-618245', property_name: 'Mori Central Hotel', property_type: 'Hotel', address: '2-14 Chuo Avenue', city: 'Tokyo', country: 'JP', phone: '+81-3-5550-0147', star_classification: 4, listing_status: 'active', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Property Identity',
        desc: 'Identifiers and descriptive attributes for matching accommodation listings.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Normalized property key and consumer-facing property name.' },
          { name: 'Source Listing ID', type: 'String', desc: 'Identifier assigned by the booking or travel source.' },
          { name: 'Property Type', type: 'String', desc: 'Hotel, resort, guesthouse, or other published accommodation type.' },
          { name: 'Listing Status', type: 'Enum', desc: 'Observed active, inactive, or other source-reported state.' },
        ],
      },
      {
        title: 'Location and Contact',
        desc: 'Public address and contact context for property discovery.',
        fields: [
          { name: 'Address', type: 'String', desc: 'Street address as published or normalized.' },
          { name: 'City / Country', type: 'String', desc: 'Market location associated with the property.' },
          { name: 'Phone', type: 'String', desc: 'Public contact number where provided.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the latest listing observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'How are duplicate hotel listings matched?', a: 'Matching can use property names, addresses, coordinates, contact details, and source identifiers. Match confidence and source-specific IDs can be retained for review.' },
      { q: 'Are property details independently verified?', a: 'No. The dataset captures public listing information and normalizes it for analysis. Critical details should be confirmed with the property or booking source.' },
      { q: 'How frequently are listings refreshed?', a: 'Refresh cadence depends on selected sources, markets, and fields. Scheduled snapshots can be configured for an agreed collection interval.' },
      { q: 'Which delivery formats are available?', a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery to a preferred storage location can be scoped for a custom feed.' },
    ],
  },
  rateParity: {
    name: 'Rate Parity',
    slug: 'rate-parity',
    icon: TrendingUp,
    badge: 'Rate Comparison',
    badgeSubtext: 'Channel and property price checks',
    title: 'Hotel Rate Parity Dataset',
    overviewCardTitle: 'Rate Parity Monitor',
    description: 'Comparable hotel rate observations across booking channels for matching properties, stay dates, room types, and occupancy.',
    heroDescription: 'Evaluate how a property’s displayed room rates vary between booking channels. Align observations by stay, occupancy, room, and cancellation terms so that parity comparisons retain the conditions attached to each offer.',
    featurePoints: ['Cross-channel rate observations', 'Matched stay and occupancy context', 'Room and cancellation terms', 'Timestamped price comparisons'],
    stats: [
      { label: 'Rate Attributes', value: '30+', subtext: 'Price and booking conditions' },
      { label: 'Comparison', value: 'Channel-level', subtext: 'Matched stays and rooms' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property, channel, stay' },
      { label: 'Rate basis', value: 'Displayed offer', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', channel: 'StayFinder', check_in: '2026-12-01', check_out: '2026-12-04', room_type: 'Queen Room', occupancy: 2, refundable: true, total_price: 642, currency: 'GBP', taxes_included: true, observed_at: '2026-11-12T09:00:00Z' },
      { property_id: 'HTL-LON-0082', channel: 'RoomMarket', check_in: '2026-12-01', check_out: '2026-12-04', room_type: 'Queen Room', occupancy: 2, refundable: true, total_price: 658, currency: 'GBP', taxes_included: true, observed_at: '2026-11-12T09:05:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Stay and Room Context',
        desc: 'Search dimensions used to align property rates across channels.',
        fields: [
          { name: 'Property ID', type: 'String', desc: 'Normalized property key used to match source listings.' },
          { name: 'Check-in / Check-out', type: 'Date', desc: 'Stay dates associated with the rate observation.' },
          { name: 'Room Type', type: 'String', desc: 'Room category as displayed by the booking channel.' },
          { name: 'Occupancy', type: 'Integer', desc: 'Guest count used for the rate search.' },
        ],
      },
      {
        title: 'Rate and Conditions',
        desc: 'Displayed price with cancellation and tax context for comparison.',
        fields: [
          { name: 'Total Price / Currency', type: 'Decimal / String', desc: 'Displayed stay price and associated currency.' },
          { name: 'Refundable', type: 'Boolean', desc: 'Whether the displayed rate indicates refundable terms.' },
          { name: 'Taxes Included', type: 'Boolean', desc: 'Indicates whether listed taxes are included when stated.' },
          { name: 'Channel / Observed At', type: 'String / ISO-8601', desc: 'Booking source and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'What does rate parity mean in this dataset?', a: 'It describes a comparison of observed offers for matched properties and booking conditions across channels. It does not imply a contractual parity obligation or explain the cause of price differences.' },
      { q: 'How are comparable room rates selected?', a: 'Observations are aligned using property, dates, occupancy, room attributes, meal plan, and cancellation terms where available. Source details are retained when exact equivalence cannot be established.' },
      { q: 'Are taxes and fees included in every total?', a: 'Tax and fee inclusion depends on source disclosure. The dataset records that context when available, and users should verify the final checkout amount.' },
      { q: 'Can historical parity changes be analyzed?', a: 'Yes. Timestamped observations can support historical comparison for the selected collection cadence and retention period.' },
    ],
  },
  guestReviews: {
    name: 'Guest Reviews',
    slug: 'guest-reviews',
    icon: Star,
    badge: 'Guest Feedback',
    badgeSubtext: 'Public hotel review records',
    title: 'Hotel Guest Reviews Dataset',
    overviewCardTitle: 'Guest Review Feed',
    description: 'Structured public hotel reviews with ratings, review dates, property context, source attribution, and language information.',
    heroDescription: 'Analyze public guest feedback across travel and booking sources. Review text and rating observations can be grouped by property, source, date, and language while retaining the context customers see.',
    featurePoints: ['Review and property identifiers', 'Rating scale context', 'Review and stay dates', 'Source and language attribution'],
    stats: [
      { label: 'Review Fields', value: '22+', subtext: 'Rating and provenance details' },
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
      { review_id: 'GREV-221804', source: 'StayFinder', property_id: 'HTL-LON-0082', property_name: 'Westbridge House', rating: 4.5, rating_scale: 5, review_title: 'Comfortable stay near transit', review_text: 'The room was quiet and the staff were helpful. Easy walk to the station.', language: 'en', review_date: '2026-10-28', verified_stay: true, observed_at: '2026-11-12T10:00:00Z' },
      { review_id: 'GREV-319572', source: 'RoomMarket', property_id: 'HTL-TYO-0147', property_name: 'Mori Central Hotel', rating: 4, rating_scale: 5, review_title: 'Convenient location', review_text: 'Clean room and convenient access to local restaurants.', language: 'en', review_date: '2026-10-30', verified_stay: false, observed_at: '2026-11-12T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Review Content',
        desc: 'Rating and public review text captured with source-scale context.',
        fields: [
          { name: 'Review ID', type: 'String', desc: 'Source review identifier or stable derived key.' },
          { name: 'Rating / Scale', type: 'Decimal / Integer', desc: 'Score and maximum rating scale shown by the source.' },
          { name: 'Review Title / Text', type: 'String', desc: 'Public review content, subject to source terms.' },
          { name: 'Review Date', type: 'Date', desc: 'Date associated with the review on its source.' },
        ],
      },
      {
        title: 'Property and Provenance',
        desc: 'Property identity and source details for contextual review analysis.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Normalized property key and published name.' },
          { name: 'Source', type: 'String', desc: 'Public platform where the review was observed.' },
          { name: 'Language', type: 'String', desc: 'Detected or source-provided language code.' },
          { name: 'Verified Stay', type: 'Boolean', desc: 'Source-provided verification indicator, if available.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are guest reviews independently verified?', a: 'No. The dataset records public review content and source-provided indicators. It does not independently verify reviewer identity, a stay, or the claims in a review.' },
      { q: 'Are original rating scales preserved?', a: 'Yes. Ratings are paired with their source scale where available, allowing users to interpret values without assuming that every platform uses the same scale.' },
      { q: 'Can review text be delivered in its original language?', a: 'Original public text can be retained along with a detected or source-provided language code, subject to source terms and the requested collection scope.' },
      { q: 'How often are new reviews collected?', a: 'Refresh cadence depends on source availability and the selected property set. Periodic collection can be configured for an agreed schedule.' },
    ],
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: CalendarRange,
    badge: 'Room Inventory Signals',
    badgeSubtext: 'Property and stay-date snapshots',
    title: 'Hotel Availability Dataset',
    overviewCardTitle: 'Availability Monitor',
    description: 'Hotel room availability observations by property, stay dates, occupancy, room type, and booking channel.',
    heroDescription: 'Track whether room options are displayed for selected properties and travel dates. Availability snapshots preserve search conditions and source context, helping teams distinguish a point-in-time result from a reservation guarantee.',
    featurePoints: ['Property and date keys', 'Room and occupancy context', 'Channel-level availability', 'Timestamped search snapshots'],
    stats: [
      { label: 'Availability Fields', value: '20+', subtext: 'Stay and inventory context' },
      { label: 'Granularity', value: 'Property × stay', subtext: 'Room type where available' },
      { label: 'Observation', value: 'Snapshot', subtext: 'Not a room reservation' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property, stay, room' },
      { label: 'Availability', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', channel: 'StayFinder', check_in: '2026-12-01', check_out: '2026-12-04', occupancy: 2, room_type: 'Queen Room', availability_status: 'available', rooms_remaining_band: '1-3', refundable_option_available: true, observed_at: '2026-11-12T11:00:00Z' },
      { property_id: 'HTL-TYO-0147', channel: 'RoomMarket', check_in: '2026-12-10', check_out: '2026-12-12', occupancy: 2, room_type: 'Twin Room', availability_status: 'limited', rooms_remaining_band: '1-3', refundable_option_available: false, observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Stay Search Context',
        desc: 'Property and booking conditions used to check room availability.',
        fields: [
          { name: 'Property ID / Channel', type: 'String', desc: 'Normalized property and booking-source identifiers.' },
          { name: 'Check-in / Check-out', type: 'Date', desc: 'Stay dates used for the availability search.' },
          { name: 'Occupancy', type: 'Integer', desc: 'Guest count associated with the query.' },
          { name: 'Room Type', type: 'String', desc: 'Room category returned by the source.' },
        ],
      },
      {
        title: 'Availability State',
        desc: 'Source-reported inventory state and option context at capture time.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Observed available, limited, or unavailable state.' },
          { name: 'Rooms Remaining Band', type: 'String', desc: 'Source-displayed quantity or documented range, when available.' },
          { name: 'Refundable Option Available', type: 'Boolean', desc: 'Whether a refundable rate was among observed options.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC capture timestamp; the record does not hold a room.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does an available status guarantee a room can still be booked?', a: 'No. It records a source response at a point in time and does not reserve inventory. Availability can change before checkout.' },
      { q: 'Which search details are needed for comparison?', a: 'Property, dates, occupancy, room type, channel, and rate conditions should be aligned where possible. These query attributes are retained to support comparable analysis.' },
      { q: 'Are exact room counts always available?', a: 'No. Some sources expose only a general availability state or a limited-inventory message. Original source labels can be kept when exact counts are absent.' },
      { q: 'Can availability be monitored for future dates?', a: 'Yes. Searches can be configured for selected properties and future stay dates, subject to source access and the agreed refresh schedule.' },
    ],
  },
  amenitiesData: {
    name: 'Amenities Data',
    slug: 'amenities-data',
    icon: ShieldCheck,
    badge: 'Property Features',
    badgeSubtext: 'Amenity and service attributes',
    title: 'Hotel Amenities Dataset',
    overviewCardTitle: 'Amenities Catalog',
    description: 'Hotel facilities and room amenities standardized across public property listings, with source labels and applicability context.',
    heroDescription: 'Compare accommodation features using a consistent amenity taxonomy. Preserve the source wording and whether a feature applies property-wide or to a specific room type when that distinction is published.',
    featurePoints: ['Normalized amenity taxonomy', 'Property and room scope', 'Original labels retained', 'Source-attributed observations'],
    stats: [
      { label: 'Amenity Fields', value: '40+', subtext: 'Facilities and room features' },
      { label: 'Taxonomy', value: 'Normalized', subtext: 'Source wording retained' },
      { label: 'Granularity', value: 'Property / room', subtext: 'Applicability captured' },
      { label: 'Refresh', value: 'On change', subtext: 'Listing updates monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property and amenity' },
      { label: 'Amenity basis', value: 'Source-published', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', source: 'StayFinder', amenity_code: 'WIFI_FREE', amenity_name: 'Free Wi-Fi', amenity_category: 'Connectivity', scope: 'property', availability_note: 'Available throughout property', observed_at: '2026-11-12T12:00:00Z' },
      { property_id: 'HTL-TYO-0147', source: 'RoomMarket', amenity_code: 'BATH_PRIVATE', amenity_name: 'Private bathroom', amenity_category: 'Room features', scope: 'room_type', availability_note: 'Included with Twin Room', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Amenity Classification',
        desc: 'Standardized feature labels with original source terminology.',
        fields: [
          { name: 'Amenity Code', type: 'String', desc: 'Normalized identifier for the amenity concept.' },
          { name: 'Amenity Name', type: 'String', desc: 'Readable normalized amenity label.' },
          { name: 'Amenity Category', type: 'String', desc: 'Broader grouping such as connectivity or wellness.' },
          { name: 'Source Label', type: 'String', desc: 'Original amenity wording from the listing.' },
        ],
      },
      {
        title: 'Property Applicability',
        desc: 'Context showing where and how a feature applies.',
        fields: [
          { name: 'Property ID', type: 'String', desc: 'Normalized hotel or accommodation identifier.' },
          { name: 'Scope', type: 'Enum', desc: 'Property-wide, room-type-specific, or other published scope.' },
          { name: 'Availability Note', type: 'String', desc: 'Source explanation or condition for the feature.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the amenity was observed.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are listed amenities guaranteed to be available during a stay?', a: 'No. The dataset records features published by the source at capture time. Availability, operating hours, and fees can vary and should be confirmed with the property.' },
      { q: 'Are room amenities distinguished from property-wide facilities?', a: 'Where the source makes that distinction, the record includes an applicability scope. If it is not stated, the scope is not assumed.' },
      { q: 'Can original amenity wording be preserved?', a: 'Yes. Source labels can be retained alongside normalized amenity names and categories to make taxonomy mappings transparent.' },
      { q: 'How are amenities standardized across languages?', a: 'Labels can be mapped to a shared taxonomy while retaining source text and language context. Ambiguous mappings can be flagged for review.' },
    ],
  },
  otaCoverage: {
    name: 'OTA Coverage',
    slug: 'ota-coverage',
    icon: Globe,
    badge: 'Channel Distribution',
    badgeSubtext: 'Property presence across booking sites',
    title: 'Hotel OTA Coverage Dataset',
    overviewCardTitle: 'OTA Coverage Map',
    description: 'Property presence and listing coverage across online travel agencies, markets, and collection periods.',
    heroDescription: 'Understand where hotel properties appear across online travel agencies. Coverage records link matched properties to channels and markets, making the collection scope and observation freshness explicit.',
    featurePoints: ['Property-to-channel matching', 'Market and source dimensions', 'Listing presence status', 'Coverage observation dates'],
    stats: [
      { label: 'Coverage Keys', value: '3 levels', subtext: 'Property, channel, market' },
      { label: 'Matching', value: 'Cross-source', subtext: 'Identifiers retained' },
      { label: 'Presence', value: 'Observed', subtext: 'Collection scope disclosed' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Coverage snapshots' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property and OTA' },
      { label: 'Coverage basis', value: 'Observed listing presence', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', property_name: 'Westbridge House', ota: 'StayFinder', market: 'London', source_listing_id: 'SF-492810', coverage_status: 'listed', latest_rate_observed: true, last_observed_at: '2026-11-12T13:00:00Z' },
      { property_id: 'HTL-LON-0082', property_name: 'Westbridge House', ota: 'RoomMarket', market: 'London', source_listing_id: 'RM-700319', coverage_status: 'listed', latest_rate_observed: true, last_observed_at: '2026-11-12T13:05:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Property and Channel',
        desc: 'Matched property and OTA keys defining each coverage record.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Normalized property key and display name.' },
          { name: 'OTA', type: 'String', desc: 'Online travel agency or booking channel observed.' },
          { name: 'Source Listing ID', type: 'String', desc: 'Channel-specific property listing identifier.' },
          { name: 'Market', type: 'String', desc: 'City or destination associated with the coverage record.' },
        ],
      },
      {
        title: 'Coverage Status and Freshness',
        desc: 'Presence state and recency indicators for channel coverage.',
        fields: [
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed listed, not observed, or unavailable state.' },
          { name: 'Latest Rate Observed', type: 'Boolean', desc: 'Indicates whether a rate result was observed in the latest check.' },
          { name: 'Collection Scope', type: 'String', desc: 'Configured sources and markets included in the coverage check.' },
          { name: 'Last Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the most recent coverage observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does missing OTA coverage prove a property is not listed there?', a: 'No. A missing record can reflect collection scope, source visibility, matching limits, or temporary availability. It should not be interpreted as proof of absence.' },
      { q: 'How are property listings matched across OTAs?', a: 'Matching uses public names, addresses, coordinates, contact information, and source identifiers where available. Match confidence can be included for downstream review.' },
      { q: 'Can coverage include rate or availability checks?', a: 'The coverage feed can include indicators showing whether a rate or availability result was observed in a configured check, with details available in related datasets.' },
      { q: 'How often is OTA coverage refreshed?', a: 'Coverage cadence depends on the selected source list and markets. Scheduled refreshes can be configured for the project requirements.' },
    ],
  },
  locationData: {
    name: 'Location Data',
    slug: 'location-data',
    icon: MapPin,
    badge: 'Property Geospatial Data',
    badgeSubtext: 'Address and coordinate records',
    title: 'Hotel Location Data Dataset',
    overviewCardTitle: 'Hotel Location Directory',
    description: 'Accommodation location records with standardized addresses, coordinates, destination context, and public contact details.',
    heroDescription: 'Map properties and lodging markets with normalized address and geographic attributes. Location data supports proximity analysis, destination coverage, and joins to property, rate, and review records.',
    featurePoints: ['Standardized addresses', 'Latitude and longitude', 'Destination and neighborhood', 'Property identifier matching'],
    stats: [
      { label: 'Location Fields', value: '25+', subtext: 'Address and geo attributes' },
      { label: 'Geo Detail', value: 'Lat / Long', subtext: 'Source or geocoded values' },
      { label: 'Granularity', value: 'Property-level', subtext: 'Individual accommodation' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Location changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Property location' },
      { label: 'Coordinates', value: 'Source or geocoded', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', property_name: 'Westbridge House', address: '18 Alder Lane', neighborhood: 'Bloomsbury', city: 'London', region: 'England', postal_code: 'WC1N 2AB', country: 'GB', latitude: 51.5224, longitude: -0.1238, observed_at: '2026-11-12T14:00:00Z' },
      { property_id: 'HTL-TYO-0147', property_name: 'Mori Central Hotel', address: '2-14 Chuo Avenue', neighborhood: 'Chuo City', city: 'Tokyo', region: 'Tokyo', postal_code: '104-0045', country: 'JP', latitude: 35.6698, longitude: 139.7721, observed_at: '2026-11-12T14:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Address and Destination',
        desc: 'Property address attributes standardized for location-based analysis.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Normalized accommodation identifier and published name.' },
          { name: 'Address', type: 'String', desc: 'Street address as published or normalized.' },
          { name: 'Neighborhood / City', type: 'String', desc: 'Locality and destination city for the property.' },
          { name: 'Region / Postal Code / Country', type: 'String', desc: 'Administrative and postal context for the address.' },
        ],
      },
      {
        title: 'Coordinates and Provenance',
        desc: 'Geographic coordinates with capture context.',
        fields: [
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Published coordinates or approximate geocoded point.' },
          { name: 'Coordinate Source', type: 'Enum', desc: 'Source-published or geocoded origin where available.' },
          { name: 'Geocode Precision', type: 'String', desc: 'Address-level or area-level precision when determined.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the latest location observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are hotel coordinates exact?', a: 'Coordinates may be supplied by a source or geocoded from an address. Geocoded points are approximate and should not be treated as confirmation of an entrance or property boundary.' },
      { q: 'Can the data include neighborhood-level location?', a: 'Yes. Neighborhood or locality labels are included when available from the source or supported by the configured normalization process.' },
      { q: 'How are duplicate property locations handled?', a: 'Records can be linked using property identifiers, address components, coordinates, names, and contact details. Source IDs remain available to audit matches.' },
      { q: 'Which geospatial formats are supported?', a: 'CSV and JSON are standard. GeoJSON can be provided when point coordinates or source boundaries are part of the collected scope.' },
    ],
  },
  starRatings: {
    name: 'Star Ratings',
    slug: 'star-ratings',
    icon: BarChart2,
    badge: 'Rating Intelligence',
    badgeSubtext: 'Official class and platform ratings',
    title: 'Hotel Star Ratings Dataset',
    overviewCardTitle: 'Star Rating Reference',
    description: 'Hotel classification and platform rating observations with rating scale, source, property, and capture-time context.',
    heroDescription: 'Compare hotel star classifications and customer rating signals without conflating different rating systems. Each value is paired with its rating type, scale, and source so users can interpret it appropriately.',
    featurePoints: ['Classification and review scores', 'Rating type and scale', 'Property and source identifiers', 'Timestamped rating history'],
    stats: [
      { label: 'Rating Types', value: 'Multiple', subtext: 'Classification vs guest score' },
      { label: 'Scale Context', value: 'Included', subtext: 'Maximum score retained' },
      { label: 'Granularity', value: 'Property-level', subtext: 'Source-specific observations' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Ratings monitored over time' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property and rating source' },
      { label: 'Rating type', value: 'Explicitly classified', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', property_name: 'Westbridge House', source: 'StayFinder', rating_type: 'guest_review_average', rating_value: 8.8, rating_scale_max: 10, star_classification: 4, classification_source: 'Published property profile', review_count: 1248, observed_at: '2026-11-12T15:00:00Z' },
      { property_id: 'HTL-TYO-0147', property_name: 'Mori Central Hotel', source: 'RoomMarket', rating_type: 'guest_review_average', rating_value: 4.3, rating_scale_max: 5, star_classification: 4, classification_source: 'Published property profile', review_count: 836, observed_at: '2026-11-12T15:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Rating Values',
        desc: 'Scores and classifications with their respective type and scale.',
        fields: [
          { name: 'Rating Type', type: 'Enum', desc: 'Guest review average, official class, or another stated rating.' },
          { name: 'Rating Value', type: 'Decimal', desc: 'Observed score as presented by the source.' },
          { name: 'Rating Scale Maximum', type: 'Decimal', desc: 'Maximum value of the source rating scale.' },
          { name: 'Star Classification', type: 'Integer', desc: 'Published star class where available.' },
        ],
      },
      {
        title: 'Property and Rating Source',
        desc: 'Property keys and source context for interpreting ratings.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Normalized property identifier and display name.' },
          { name: 'Source', type: 'String', desc: 'Platform or classification source for the observation.' },
          { name: 'Review Count', type: 'Integer', desc: 'Number of reviews contributing to an average when shown.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the rating was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are star classifications the same as guest review ratings?', a: 'No. Star classification generally describes a property category, while guest ratings summarize customer feedback. The dataset identifies rating type to keep these measures distinct.' },
      { q: 'Can ratings from different platforms be directly compared?', a: 'Only after accounting for the source scale, rating type, and review count. Original values and scale maxima are retained rather than assuming equivalence.' },
      { q: 'Are hotel star classifications independently certified?', a: 'The dataset captures classifications presented by public sources and does not independently certify them. The classification source is included when available.' },
      { q: 'How often are ratings updated?', a: 'Refresh timing depends on source access and the selected properties. Periodic snapshots can be configured to track rating and review-count changes.' },
    ],
  },
};