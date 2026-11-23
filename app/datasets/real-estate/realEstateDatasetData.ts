import {
  BarChart2,
  Building2,
  CalendarRange,
  DollarSign,
  Home,
  Layers,
  MapPin,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type RealEstateDatasetKey =
  | 'propertyListings'
  | 'priceTrends'
  | 'locationInsights'
  | 'agentProfiles'
  | 'rentalYields'
  | 'projectData'
  | 'marketReports'
  | 'availability';

interface RealEstateDataset {
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

export const realEstateDatasets: Record<RealEstateDatasetKey, RealEstateDataset> = {
  propertyListings: {
    name: 'Property Listings',
    slug: 'property-listings',
    icon: Home,
    badge: 'Property Inventory',
    badgeSubtext: 'Residential and commercial listings',
    title: 'Real Estate Property Listings Dataset',
    overviewCardTitle: 'Property Listings Feed',
    description: 'Structured property listings with asking price, type, area, rooms, listing status, broker, and geographic context.',
    heroDescription: 'Build a normalized view of residential and commercial properties across listing sources. Standardize property attributes and retain source listing identifiers, status, and observation dates for reliable market analysis.',
    featurePoints: ['Source and property identifiers', 'Price and area attributes', 'Property type and status', 'Location and listing dates'],
    stats: [
      { label: 'Listing Fields', value: '40+', subtext: 'Property and source attributes' },
      { label: 'Granularity', value: 'Listing-level', subtext: 'Residential and commercial' },
      { label: 'Coverage', value: 'Market-based', subtext: 'Regions configured per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on sources' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Individual property listing' },
      { label: 'Listing state', value: 'Observed at capture', isHighlight: true },
    ],
    records: [
      { listing_id: 'LST-AUS-80421', property_id: 'PROP-AUS-1908', property_type: 'Condominium', transaction_type: 'sale', city: 'Austin', region: 'TX', postal_code: '78704', bedrooms: 2, bathrooms: 2, area_sqft: 1180, asking_price: 485000, currency: 'USD', listing_status: 'active', observed_at: '2026-11-12T08:30:00Z' },
      { listing_id: 'LST-DEN-26117', property_id: 'PROP-DEN-4720', property_type: 'Detached house', transaction_type: 'rent', city: 'Denver', region: 'CO', postal_code: '80206', bedrooms: 3, bathrooms: 2, area_sqft: 1640, asking_price: 3200, currency: 'USD', listing_status: 'active', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Property Identity',
        desc: 'Identifiers and classification fields for matching property listings.',
        fields: [
          { name: 'Listing ID / Property ID', type: 'String', desc: 'Source listing key and normalized property identifier.' },
          { name: 'Property Type', type: 'String', desc: 'Published or normalized building and unit type.' },
          { name: 'Transaction Type', type: 'Enum', desc: 'Sale, rent, lease, or other listing purpose.' },
          { name: 'Listing Status', type: 'Enum', desc: 'Observed active, pending, removed, or source-specific state.' },
        ],
      },
      {
        title: 'Price and Physical Attributes',
        desc: 'Core listing measures for filtering and property comparisons.',
        fields: [
          { name: 'Asking Price / Currency', type: 'Decimal / String', desc: 'Published asking amount and associated currency.' },
          { name: 'Bedrooms / Bathrooms', type: 'Decimal', desc: 'Room counts as published by the listing source.' },
          { name: 'Area', type: 'Decimal (sq ft)', desc: 'Published or normalized interior area and unit.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the listing was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are listing prices final transaction prices?', a: 'No. Asking prices reflect what a listing source displayed at capture time. They are not verified sale prices and may change or exclude fees, taxes, and negotiation outcomes.' },
      { q: 'How are duplicate listings for the same property handled?', a: 'Records can be linked using addresses, coordinates, property attributes, and source identifiers. Match confidence and source listing IDs can be retained for review.' },
      { q: 'Can the dataset distinguish rentals from properties for sale?', a: 'Yes. Transaction type and relevant price context are included when indicated by the source, allowing sale and rental inventory to be analyzed separately.' },
      { q: 'How often are property listings refreshed?', a: 'Refresh cadence depends on selected sources, markets, and fields. Scheduled snapshots can be configured for an agreed collection interval.' },
    ],
  },
  priceTrends: {
    name: 'Price Trends',
    slug: 'price-trends',
    icon: TrendingUp,
    badge: 'Market Pricing',
    badgeSubtext: 'Area and property price history',
    title: 'Real Estate Price Trends Dataset',
    overviewCardTitle: 'Property Price Trends',
    description: 'Time-series summaries of observed asking prices and price-per-area measures by geography, property type, and period.',
    heroDescription: 'Follow changes in listed property prices across neighborhoods and property segments. Trend measures are derived from observed listing data, with period, currency, sample size, and methodology context included.',
    featurePoints: ['Period-based price observations', 'Price per area measures', 'Property type and market filters', 'Sample and methodology context'],
    stats: [
      { label: 'Trend Measures', value: '20+', subtext: 'Median, range, and unit metrics' },
      { label: 'Dimensions', value: 'Market + type', subtext: 'Configured geographic scope' },
      { label: 'History', value: 'Time-series', subtext: 'Period-based observations' },
      { label: 'Price Basis', value: 'Asking prices', subtext: 'Listing-derived indicators' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Market, type, period' },
      { label: 'Trend basis', value: 'Observed listing data', isHighlight: true },
    ],
    records: [
      { market: 'Austin, TX', property_type: 'Condominium', transaction_type: 'sale', period: '2026-10', median_asking_price: 462000, median_price_per_sqft: 391.5, currency: 'USD', listing_sample_count: 842, monthly_change_percent: 1.7, methodology_version: '1.0' },
      { market: 'Denver, CO', property_type: 'Detached house', transaction_type: 'sale', period: '2026-10', median_asking_price: 638000, median_price_per_sqft: 389, currency: 'USD', listing_sample_count: 1106, monthly_change_percent: -0.8, methodology_version: '1.0' },
    ],
    attributeGroups: [
      {
        title: 'Market Dimensions',
        desc: 'Geographic and property groupings used for trend aggregation.',
        fields: [
          { name: 'Market', type: 'String', desc: 'City, region, postal area, or configured market.' },
          { name: 'Property Type', type: 'String', desc: 'Property segment represented by the trend record.' },
          { name: 'Transaction Type', type: 'Enum', desc: 'Sale or rental market designation.' },
          { name: 'Period', type: 'Date / String', desc: 'Month, quarter, or other configured reporting period.' },
        ],
      },
      {
        title: 'Price Indicators',
        desc: 'Summary values calculated from listings in the specified market scope.',
        fields: [
          { name: 'Median Asking Price', type: 'Decimal', desc: 'Median observed asking amount for the period.' },
          { name: 'Median Price per Sq Ft', type: 'Decimal', desc: 'Median asking price normalized by interior area.' },
          { name: 'Listing Sample Count', type: 'Integer', desc: 'Number of qualifying listing records in the aggregation.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of the aggregation and calculation approach.' },
        ],
      },
    ],
    faqs: [
      { q: 'Do price trends represent completed transactions?', a: 'Not unless transaction records are supplied by an authorized source. These measures are generally derived from observed asking prices and should not be treated as closed-sale prices.' },
      { q: 'How are price-per-area values calculated?', a: 'They are calculated from observed asking price and the area value and unit available in the listing. Records without comparable area data may be excluded from this metric.' },
      { q: 'Can trends be compared across different markets?', a: 'Comparisons are most meaningful when property type, transaction type, period, currency, and collection scope are aligned.' },
      { q: 'What time periods are available?', a: 'Available history depends on source coverage and collection cadence. Weekly, monthly, or quarterly summaries can be configured for the selected markets.' },
    ],
  },
  locationInsights: {
    name: 'Location Insights',
    slug: 'location-insights',
    icon: MapPin,
    badge: 'Geospatial Intelligence',
    badgeSubtext: 'Neighborhood and property context',
    title: 'Real Estate Location Insights Dataset',
    overviewCardTitle: 'Location Insights Feed',
    description: 'Property-linked geographic context including coordinates, neighborhood, transit proximity, and nearby public points of interest where available.',
    heroDescription: 'Connect property records to structured location context for neighborhood and proximity analysis. Geographic attributes can include normalized address, transit distance, and nearby amenities when available from configured sources.',
    featurePoints: ['Coordinates and neighborhood', 'Transit proximity indicators', 'Nearby amenity context', 'Property-to-area joins'],
    stats: [
      { label: 'Location Fields', value: '30+', subtext: 'Geography and proximity data' },
      { label: 'Geo Detail', value: 'Address-level', subtext: 'When source coverage permits' },
      { label: 'POI Context', value: 'Configurable', subtext: 'Categories selected per project' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Location signals monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Property and surrounding area' },
      { label: 'Coordinates', value: 'Source or geocoded', isHighlight: true },
    ],
    records: [
      { property_id: 'PROP-AUS-1908', address: '812 Willow Creek Road', neighborhood: 'South Lamar', city: 'Austin', region: 'TX', latitude: 30.2488, longitude: -97.7792, nearest_transit_name: 'South Lamar Station', transit_distance_m: 620, nearby_grocery_count_1km: 4, nearby_park_count_1km: 3, observed_at: '2026-11-12T09:30:00Z' },
      { property_id: 'PROP-DEN-4720', address: '1460 Juniper Avenue', neighborhood: 'Congress Park', city: 'Denver', region: 'CO', latitude: 39.7315, longitude: -104.9521, nearest_transit_name: 'Colfax Avenue Stop', transit_distance_m: 410, nearby_grocery_count_1km: 2, nearby_park_count_1km: 5, observed_at: '2026-11-12T09:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Property Geography',
        desc: 'Address and geographic identifiers linking the property to its market.',
        fields: [
          { name: 'Property ID', type: 'String', desc: 'Normalized property identifier for joining location records.' },
          { name: 'Address / Neighborhood', type: 'String', desc: 'Street address and local area label where available.' },
          { name: 'City / Region', type: 'String', desc: 'Administrative market context for the property.' },
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Source-published coordinates or an approximate geocoded point.' },
        ],
      },
      {
        title: 'Proximity Indicators',
        desc: 'Distance and nearby-amenity context derived for the selected radius.',
        fields: [
          { name: 'Nearest Transit', type: 'String', desc: 'Nearest configured transit feature where identified.' },
          { name: 'Transit Distance', type: 'Integer (m)', desc: 'Approximate straight-line or network distance with method defined.' },
          { name: 'Nearby POI Counts', type: 'Integer', desc: 'Count of selected point-of-interest categories within a radius.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the latest location enrichment.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are coordinates and proximity distances exact?', a: 'Coordinates may be geocoded and proximity values may be calculated from mapped features. They are approximate and depend on source quality, geocoding precision, and the stated distance method.' },
      { q: 'Which nearby points of interest can be included?', a: 'Categories such as transit, schools, parks, and retail can be configured based on the available sources and the project’s geographic scope.' },
      { q: 'Does proximity data indicate property quality or value?', a: 'No. Proximity attributes are descriptive geographic context and do not establish property quality, safety, investment suitability, or future value.' },
      { q: 'Can the location data be joined to listing records?', a: 'Yes. Property identifiers and normalized addresses can support joins, with source keys and match context retained where available.' },
    ],
  },
  agentProfiles: {
    name: 'Agent Profiles',
    slug: 'agent-profiles',
    icon: Building2,
    badge: 'Professional Profiles',
    badgeSubtext: 'Public agent and brokerage records',
    title: 'Real Estate Agent Profiles Dataset',
    overviewCardTitle: 'Agent Profile Catalog',
    description: 'Public real estate agent and brokerage profiles with service markets, contact channels, license details where published, and listing associations.',
    heroDescription: 'Create a structured reference of public agent and brokerage information across selected markets. Profiles can connect professional identities with observed listing activity while preserving the original source and publication context.',
    featurePoints: ['Agent and brokerage identifiers', 'Public contact information', 'Market and specialty context', 'License details where listed'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Professional and contact details' },
      { label: 'Relationships', value: 'Agent → Office', subtext: 'Brokerage links normalized' },
      { label: 'Coverage', value: 'Market-based', subtext: 'Regions configured per request' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Public profiles monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Agent and brokerage profile' },
      { label: 'Profile basis', value: 'Public source information', isHighlight: true },
    ],
    records: [
      { agent_id: 'AGT-AUS-0192', agent_name: 'Taylor Morgan', brokerage_id: 'BRK-CEDAR-04', brokerage_name: 'Cedar Lane Realty', market: 'Austin, TX', specialties: 'Residential; Condominiums', public_email: 't.morgan@example.test', license_state: 'TX', license_number: 'TX-RE-482019', active_listing_count: 8, observed_at: '2026-11-12T10:00:00Z' },
      { agent_id: 'AGT-DEN-0831', agent_name: 'Jordan Lee', brokerage_id: 'BRK-SUMMIT-12', brokerage_name: 'Summit & Stone', market: 'Denver, CO', specialties: 'Residential; Relocation', public_email: 'j.lee@example.test', license_state: 'CO', license_number: 'CO-RE-731086', active_listing_count: 5, observed_at: '2026-11-12T10:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Agent and Brokerage Identity',
        desc: 'Professional identifiers and brokerage relationships from public profiles.',
        fields: [
          { name: 'Agent ID / Name', type: 'String', desc: 'Normalized agent identifier and published professional name.' },
          { name: 'Brokerage ID / Name', type: 'String', desc: 'Associated brokerage or office identifiers.' },
          { name: 'Market', type: 'String', desc: 'Geographic market associated with the public profile.' },
          { name: 'Specialties', type: 'String', desc: 'Professional specialties as stated in the source profile.' },
        ],
      },
      {
        title: 'Contact and License Context',
        desc: 'Public business contact and professional registration attributes.',
        fields: [
          { name: 'Public Email / Phone', type: 'String', desc: 'Business contact information publicly listed by the source.' },
          { name: 'License State / Number', type: 'String', desc: 'License details when published; not independently certified.' },
          { name: 'Active Listing Count', type: 'Integer', desc: 'Observed associated listings within the selected scope.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the latest profile observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are agent license details independently verified?', a: 'No. License information is captured from public profiles or sources and is not a regulatory verification. Confirm current status with the relevant licensing authority.' },
      { q: 'Is personal contact information included?', a: 'The dataset is scoped to publicly listed professional contact details. Private or restricted information is not a target of collection.' },
      { q: 'How are agents linked to property listings?', a: 'Links may use source agent IDs, brokerage details, public profile URLs, and listing attribution. Match confidence and source references can be retained.' },
      { q: 'How often are profiles refreshed?', a: 'Refresh frequency depends on source availability and the selected markets. Periodic snapshots can capture public profile changes.' },
    ],
  },
  rentalYields: {
    name: 'Rental Yields',
    slug: 'rental-yields',
    icon: DollarSign,
    badge: 'Rental Market Analytics',
    badgeSubtext: 'Rent and price relationship indicators',
    title: 'Real Estate Rental Yields Dataset',
    overviewCardTitle: 'Rental Yield Indicators',
    description: 'Geographic summaries combining observed rental asking prices and property price indicators to estimate gross yield ranges.',
    heroDescription: 'Compare rental-market indicators across neighborhoods and property segments. Yield measures are calculated from observed asking data under a documented method and should be treated as descriptive estimates, not investment advice.',
    featurePoints: ['Rent and price inputs', 'Area and property segments', 'Gross yield calculation context', 'Sample size and period metadata'],
    stats: [
      { label: 'Yield Measures', value: '15+', subtext: 'Rent and price indicators' },
      { label: 'Granularity', value: 'Market + type', subtext: 'Configured geographic scope' },
      { label: 'Methodology', value: 'Documented', subtext: 'Inputs and periods retained' },
      { label: 'Interpretation', value: 'Descriptive', subtext: 'Not investment advice' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Market and property segment' },
      { label: 'Yield basis', value: 'Asking data estimate', isHighlight: true },
    ],
    records: [
      { market: 'Austin, TX', property_type: 'Condominium', period: '2026-Q3', median_monthly_rent: 2250, median_asking_price: 462000, currency: 'USD', estimated_gross_yield_percent: 5.84, rental_sample_count: 624, sale_sample_count: 842, methodology_version: '1.0' },
      { market: 'Denver, CO', property_type: 'Detached house', period: '2026-Q3', median_monthly_rent: 2875, median_asking_price: 638000, currency: 'USD', estimated_gross_yield_percent: 5.41, rental_sample_count: 718, sale_sample_count: 1106, methodology_version: '1.0' },
    ],
    attributeGroups: [
      {
        title: 'Market and Property Segment',
        desc: 'Geographic and property groupings for rental yield summaries.',
        fields: [
          { name: 'Market', type: 'String', desc: 'City, region, or configured market grouping.' },
          { name: 'Property Type', type: 'String', desc: 'Property segment used for the calculation.' },
          { name: 'Period', type: 'Date / String', desc: 'Time window used to aggregate rental and sale listings.' },
          { name: 'Currency', type: 'String', desc: 'Currency code for the input asking values.' },
        ],
      },
      {
        title: 'Yield Inputs and Calculation',
        desc: 'Observed asking data, sample context, and estimate methodology.',
        fields: [
          { name: 'Median Monthly Rent', type: 'Decimal', desc: 'Median observed rental asking price for the selected scope.' },
          { name: 'Median Asking Price', type: 'Decimal', desc: 'Median observed sale asking price for the selected scope.' },
          { name: 'Estimated Gross Yield', type: 'Decimal (%)', desc: 'Annualized asking rent divided by asking price under the stated method.' },
          { name: 'Sample Counts / Method Version', type: 'Integer / String', desc: 'Input record counts and calculation version.' },
        ],
      },
    ],
    faqs: [
      { q: 'Is the rental yield figure a guaranteed return?', a: 'No. It is a descriptive estimate derived from observed asking data. It does not account for vacancy, expenses, taxes, financing, realized rent, or future market changes.' },
      { q: 'How is gross yield estimated?', a: 'The measure annualizes the median monthly asking rent and divides it by the median asking sale price for the selected market and property segment, under the documented methodology.' },
      { q: 'Are rental and sale records from the same properties?', a: 'Not necessarily. Aggregated inputs may come from different listings in the same market scope and period; sample counts are included to make that context visible.' },
      { q: 'Can yields be compared across markets?', a: 'Comparisons require consistent property types, time periods, currencies, and collection coverage. The metric is not a substitute for property-level financial analysis.' },
    ],
  },
  projectData: {
    name: 'Project Data',
    slug: 'project-data',
    icon: Layers,
    badge: 'Development Intelligence',
    badgeSubtext: 'Residential and commercial projects',
    title: 'Real Estate Project Data Dataset',
    overviewCardTitle: 'Development Project Feed',
    description: 'Public development project records with project type, developer, location, planned units, construction stage, and published milestone dates.',
    heroDescription: 'Track publicly listed real estate developments from announcement through construction milestones. Normalize project and developer details while retaining the source and status date used for each observation.',
    featurePoints: ['Project and developer identifiers', 'Location and project type', 'Unit counts and phases', 'Construction stage observations'],
    stats: [
      { label: 'Project Fields', value: '35+', subtext: 'Milestones and attributes' },
      { label: 'Project Types', value: 'Multi-use', subtext: 'Residential and commercial' },
      { label: 'Lifecycle', value: 'Stage-based', subtext: 'Status tracked over time' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Public project updates' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Development project / phase' },
      { label: 'Project basis', value: 'Publicly reported data', isHighlight: true },
    ],
    records: [
      { project_id: 'PRJ-AUS-031', project_name: 'Cedar District Residences', developer: 'Cedar Urban Partners', project_type: 'Residential', city: 'Austin', region: 'TX', planned_units: 286, construction_stage: 'under_construction', expected_completion: '2027-Q4', phase_count: 2, observed_at: '2026-11-12T11:00:00Z' },
      { project_id: 'PRJ-DEN-084', project_name: 'Union Yard Offices', developer: 'Summit Works Development', project_type: 'Mixed-use', city: 'Denver', region: 'CO', planned_units: 142, construction_stage: 'planning', expected_completion: '2028-Q2', phase_count: 1, observed_at: '2026-11-12T11:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Project Identity and Location',
        desc: 'Identifiers and attributes describing a public development project.',
        fields: [
          { name: 'Project ID / Name', type: 'String', desc: 'Normalized project key and published development name.' },
          { name: 'Developer', type: 'String', desc: 'Developer or project sponsor associated with the record.' },
          { name: 'Project Type', type: 'String', desc: 'Residential, commercial, mixed-use, or source-defined type.' },
          { name: 'City / Region', type: 'String', desc: 'Market where the project is located.' },
        ],
      },
      {
        title: 'Scale and Milestones',
        desc: 'Published project scale, phase structure, and timeline estimates.',
        fields: [
          { name: 'Planned Units', type: 'Integer', desc: 'Published unit count when available.' },
          { name: 'Construction Stage', type: 'Enum', desc: 'Observed planning, construction, completed, or other status.' },
          { name: 'Expected Completion', type: 'Date / String', desc: 'Published estimated completion period.' },
          { name: 'Phase Count / Observed At', type: 'Integer / ISO-8601', desc: 'Number of phases and latest UTC capture time.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are planned unit counts and completion dates guaranteed?', a: 'No. They reflect public project information at the time observed and can change as development plans are revised.' },
      { q: 'Can projects with multiple phases be represented?', a: 'Yes. Project records can include phases and phase-specific milestones where the source publishes that detail.' },
      { q: 'Does the dataset include permit or regulatory status?', a: 'Permit and planning details may be included when they are publicly available within the configured source scope; the dataset is not a regulatory determination.' },
      { q: 'How often are construction stages refreshed?', a: 'Project updates can be collected periodically, with cadence depending on source activity and availability.' },
    ],
  },
  marketReports: {
    name: 'Market Reports',
    slug: 'market-reports',
    icon: BarChart2,
    badge: 'Market Analytics',
    badgeSubtext: 'Area-level supply and pricing summaries',
    title: 'Real Estate Market Reports Dataset',
    overviewCardTitle: 'Market Summary Feed',
    description: 'Structured real estate market summaries covering listing supply, asking prices, property mix, and time-period comparisons.',
    heroDescription: 'Compare housing and commercial market conditions using consistent area and time-period summaries. Reports include their contributing listing scope and calculation context so metrics can be interpreted as observed market indicators.',
    featurePoints: ['Area and period summaries', 'Supply and price indicators', 'Property segment breakdowns', 'Sample and methodology details'],
    stats: [
      { label: 'Report Metrics', value: '25+', subtext: 'Supply and price indicators' },
      { label: 'Dimensions', value: 'Area + type', subtext: 'Markets configured per request' },
      { label: 'Frequency', value: 'Period-based', subtext: 'Monthly or quarterly options' },
      { label: 'Basis', value: 'Observed listings', subtext: 'Scope documented per report' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Market, segment, period' },
      { label: 'Report basis', value: 'Listing-derived indicators', isHighlight: true },
    ],
    records: [
      { market: 'Austin, TX', segment: 'Residential sale', period: '2026-Q3', active_listing_count: 6248, median_asking_price: 518000, median_days_listed: 31, new_listing_count: 1834, price_change_quarterly_percent: 1.2, currency: 'USD', methodology_version: '1.0' },
      { market: 'Denver, CO', segment: 'Residential rent', period: '2026-Q3', active_listing_count: 3812, median_monthly_rent: 2480, median_days_listed: 24, new_listing_count: 1160, rent_change_quarterly_percent: -0.4, currency: 'USD', methodology_version: '1.0' },
    ],
    attributeGroups: [
      {
        title: 'Report Scope',
        desc: 'Market, segment, and time window represented by each summary.',
        fields: [
          { name: 'Market', type: 'String', desc: 'City, region, or configured geographic area.' },
          { name: 'Segment', type: 'String', desc: 'Property and transaction segment summarized.' },
          { name: 'Period', type: 'Date / String', desc: 'Reporting period used for aggregation.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of definitions and aggregation rules.' },
        ],
      },
      {
        title: 'Market Indicators',
        desc: 'Listing supply and asking-price summaries based on collected records.',
        fields: [
          { name: 'Active / New Listing Count', type: 'Integer', desc: 'Observed listings meeting the report criteria.' },
          { name: 'Median Asking Price / Rent', type: 'Decimal', desc: 'Median listed price or rent for the selected segment.' },
          { name: 'Median Days Listed', type: 'Decimal', desc: 'Median observed listing duration where history is available.' },
          { name: 'Currency', type: 'String', desc: 'Currency code for monetary values in the report.' },
        ],
      },
    ],
    faqs: [
      { q: 'Do market reports include completed sales data?', a: 'The standard report summarizes public listing observations. Completed transaction metrics are included only when supplied by an authorized source and clearly identified.' },
      { q: 'How are market boundaries defined?', a: 'Geographic boundaries and included listing sources are configured for the report and documented with its scope.' },
      { q: 'Can reports be compared across time periods?', a: 'Yes, if geography, property segment, source coverage, and methodology are consistent. Methodology versions and sample counts help identify changes in comparability.' },
      { q: 'How frequently are market summaries produced?', a: 'Monthly or quarterly summaries are common, with other schedules available depending on source coverage and project requirements.' },
    ],
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: CalendarRange,
    badge: 'Listing Status Signals',
    badgeSubtext: 'Property availability snapshots',
    title: 'Real Estate Availability Dataset',
    overviewCardTitle: 'Property Availability Feed',
    description: 'Time-stamped property listing status observations with transaction type, source, status history, and market context.',
    heroDescription: 'Track how property listings move through active, pending, leased, or removed states across selected sources. Status history supports inventory analysis while making clear that source updates may lag real-world changes.',
    featurePoints: ['Listing and property keys', 'Sale and rental status', 'Status change timestamps', 'Market and source context'],
    stats: [
      { label: 'Status Fields', value: '18+', subtext: 'State and lifecycle context' },
      { label: 'Granularity', value: 'Listing-level', subtext: 'By source and market' },
      { label: 'History', value: 'Timestamped', subtext: 'Changes captured over time' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Listing and source' },
      { label: 'Status basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { listing_id: 'LST-AUS-80421', property_id: 'PROP-AUS-1908', source: 'HomeBoard', transaction_type: 'sale', listing_status: 'active', status_effective_date: '2026-11-08', asking_price: 485000, currency: 'USD', city: 'Austin', region: 'TX', observed_at: '2026-11-12T12:00:00Z' },
      { listing_id: 'LST-DEN-26117', property_id: 'PROP-DEN-4720', source: 'KeyStreet', transaction_type: 'rent', listing_status: 'leased', status_effective_date: '2026-11-10', asking_price: 3200, currency: 'USD', city: 'Denver', region: 'CO', observed_at: '2026-11-12T12:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Listing Lifecycle',
        desc: 'Listing identifiers and observed status transitions.',
        fields: [
          { name: 'Listing ID / Property ID', type: 'String', desc: 'Source listing key and normalized property identifier.' },
          { name: 'Listing Status', type: 'Enum', desc: 'Source status normalized to active, pending, leased, sold, or removed.' },
          { name: 'Status Effective Date', type: 'Date', desc: 'Date associated with the status change when published.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the status was captured.' },
        ],
      },
      {
        title: 'Transaction and Market Context',
        desc: 'Price and location fields used to group availability status.',
        fields: [
          { name: 'Transaction Type', type: 'Enum', desc: 'Sale, rental, lease, or other listing purpose.' },
          { name: 'Asking Price / Currency', type: 'Decimal / String', desc: 'Published asking amount and currency where available.' },
          { name: 'Source', type: 'String', desc: 'Listing platform or publisher for the status observation.' },
          { name: 'City / Region', type: 'String', desc: 'Market where the listing is located.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a status change confirm a property was sold or leased?', a: 'It records the status shown by the source. It is not independent confirmation of a completed transaction unless the source explicitly provides verified transaction data.' },
      { q: 'Can listing status history be included?', a: 'Yes. Repeated timestamped observations can be used to track source-reported changes over the configured collection period.' },
      { q: 'How quickly are status updates reflected?', a: 'Timing depends on source update frequency and collection cadence. A status may lag the property’s real-world availability.' },
      { q: 'Are sale and rental availability separated?', a: 'Yes. Transaction type is included when identified by the source, enabling separate analysis of for-sale and rental listings.' },
    ],
  },
};