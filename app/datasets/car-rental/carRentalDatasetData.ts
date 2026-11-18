import {
  Building2,
  CalendarRange,
  Car,
  Database,
  DollarSign,
  MapPin,
  Star,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type CarRentalDatasetKey =
  | 'fleetInventory'
  | 'rateData'
  | 'locationCoverage'
  | 'availability'
  | 'vehicleSpecs'
  | 'vendorProfiles'
  | 'priceComparison'
  | 'customerReviews';

interface CarRentalDataset {
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

export const carRentalDatasets: Record<CarRentalDatasetKey, CarRentalDataset> = {
  fleetInventory: {
    name: 'Fleet Inventory',
    slug: 'fleet-inventory',
    icon: Car,
    badge: 'Vehicle Inventory',
    badgeSubtext: 'Rental fleet listings',
    title: 'Car Rental Fleet Inventory Dataset',
    overviewCardTitle: 'Fleet Inventory Feed',
    description: 'Structured rental vehicle inventory with vehicle class, make, model, pickup location, supplier, and listing status.',
    heroDescription: 'Build a normalized view of vehicles offered by rental suppliers across locations. Connect vehicle-class inventory with public supplier listings and retain observation details for fleet and assortment analysis.',
    featurePoints: ['Supplier and vehicle identifiers', 'Vehicle class and model details', 'Pickup location context', 'Listing status and timestamps'],
    stats: [
      { label: 'Inventory Fields', value: '30+', subtext: 'Vehicle and listing attributes' },
      { label: 'Granularity', value: 'Vehicle class', subtext: 'Specific models where shown' },
      { label: 'Coverage', value: 'Location-based', subtext: 'Markets set per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on sources' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Supplier vehicle listing' },
      { label: 'Inventory basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { supplier: 'Northway Rentals', vehicle_listing_id: 'NWR-SFO-SUV-204', vehicle_class: 'Midsize SUV', make: 'Toyota', model: 'RAV4 or similar', model_year: 2025, transmission: 'Automatic', pickup_location_id: 'SFO-T1', seats: 5, doors: 4, listing_status: 'listed', observed_at: '2026-11-12T08:30:00Z' },
      { supplier: 'Cedar Mobility', vehicle_listing_id: 'CDM-SEA-CMP-118', vehicle_class: 'Compact', make: 'Hyundai', model: 'Elantra or similar', model_year: 2024, transmission: 'Automatic', pickup_location_id: 'SEA-DT-02', seats: 5, doors: 4, listing_status: 'listed', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Vehicle and Supplier Identity',
        desc: 'Supplier and vehicle listing attributes for fleet analysis.',
        fields: [
          { name: 'Supplier', type: 'String', desc: 'Rental company or marketplace presenting the vehicle.' },
          { name: 'Vehicle Listing ID', type: 'String', desc: 'Source-specific key for the observed listing or class.' },
          { name: 'Vehicle Class', type: 'String', desc: 'Rental class or segment shown by the supplier.' },
          { name: 'Make / Model', type: 'String', desc: 'Specific model or “or similar” description where published.' },
        ],
      },
      {
        title: 'Fleet Attributes and Status',
        desc: 'Vehicle configuration and source-reported listing state.',
        fields: [
          { name: 'Model Year', type: 'Integer', desc: 'Vehicle model year when provided by the source.' },
          { name: 'Transmission / Seats / Doors', type: 'String / Integer', desc: 'Published vehicle configuration details.' },
          { name: 'Pickup Location ID', type: 'String', desc: 'Branch or pickup location associated with the offer.' },
          { name: 'Listing Status / Observed At', type: 'Enum / ISO-8601', desc: 'Source status and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does fleet inventory identify the exact vehicle that will be rented?', a: 'Not always. Rental offers may be guaranteed by vehicle class, with a specific model described as “or similar.” The source wording is retained where available.' },
      { q: 'Is a listed vehicle guaranteed to be available?', a: 'No. The dataset captures a listing or inventory signal at a point in time and does not reserve a vehicle or guarantee fulfillment.' },
      { q: 'Can inventory be compared by pickup location?', a: 'Yes. Supplier and pickup location identifiers support location-level comparisons when that context is exposed by the source.' },
      { q: 'How often is fleet inventory refreshed?', a: 'Refresh cadence depends on suppliers, locations, and source access. Scheduled snapshots can be configured for the requested scope.' },
    ],
  },
  rateData: {
    name: 'Rate Data',
    slug: 'rate-data',
    icon: DollarSign,
    badge: 'Rental Rate Intelligence',
    badgeSubtext: 'Timestamped quote observations',
    title: 'Car Rental Rate Data Dataset',
    overviewCardTitle: 'Rental Rate Monitor',
    description: 'Rental quote observations with supplier, vehicle class, pickup and return dates, rate plan, taxes, and currency context.',
    heroDescription: 'Track displayed rental rates across suppliers and locations. Preserve the trip duration, vehicle class, included mileage, fees, and cancellation conditions needed to interpret each quote over time.',
    featurePoints: ['Timestamped rental quotes', 'Pickup and return conditions', 'Rate-plan and mileage context', 'Tax and currency fields'],
    stats: [
      { label: 'Rate Fields', value: '25+', subtext: 'Price and booking conditions' },
      { label: 'Comparison', value: 'Trip-specific', subtext: 'Dates and vehicle class aligned' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Quote and rental period' },
      { label: 'Rate basis', value: 'Displayed quote', isHighlight: true },
    ],
    records: [
      { supplier: 'Northway Rentals', quote_id: 'NWR-Q-81824', pickup_location_id: 'SFO-T1', pickup_datetime: '2026-12-01T10:00:00-08:00', return_datetime: '2026-12-05T10:00:00-08:00', vehicle_class: 'Midsize SUV', daily_rate: 64.5, total_price: 318.42, currency: 'USD', mileage_policy: 'Unlimited', taxes_included: true, observed_at: '2026-11-12T09:00:00Z' },
      { supplier: 'Cedar Mobility', quote_id: 'CDM-Q-40917', pickup_location_id: 'SEA-DT-02', pickup_datetime: '2026-12-03T09:00:00-08:00', return_datetime: '2026-12-06T09:00:00-08:00', vehicle_class: 'Compact', daily_rate: 42, total_price: 156.8, currency: 'USD', mileage_policy: 'Unlimited', taxes_included: false, observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Rental and Vehicle Context',
        desc: 'Trip and vehicle dimensions required for rate comparison.',
        fields: [
          { name: 'Supplier / Quote ID', type: 'String', desc: 'Rental provider and source quote identifier.' },
          { name: 'Pickup / Return Datetime', type: 'ISO-8601', desc: 'Rental period boundaries with timezone where available.' },
          { name: 'Pickup Location ID', type: 'String', desc: 'Branch or airport location associated with the quote.' },
          { name: 'Vehicle Class', type: 'String', desc: 'Vehicle group for which the displayed quote applies.' },
        ],
      },
      {
        title: 'Rate and Conditions',
        desc: 'Price breakdown and terms presented with the rental quote.',
        fields: [
          { name: 'Daily Rate / Total Price', type: 'Decimal', desc: 'Displayed daily and trip-level amount where available.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the quoted price.' },
          { name: 'Mileage Policy', type: 'String', desc: 'Mileage allowance or policy shown by the supplier.' },
          { name: 'Taxes Included / Observed At', type: 'Boolean / ISO-8601', desc: 'Tax inclusion disclosure and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Is the displayed rental quote the final amount due?', a: 'Not necessarily. Taxes, optional products, deposits, payment method, driver eligibility, and checkout conditions can affect the final amount. The dataset records disclosed price context.' },
      { q: 'How are rental quotes made comparable?', a: 'Comparison requires aligned pickup and return times, vehicle class, location, mileage policy, and rate conditions. These fields are retained where the source exposes them.' },
      { q: 'Are taxes and insurance always included?', a: 'No. Inclusion depends on the supplier and rate plan. Source disclosures are recorded when available, and missing details are not assumed.' },
      { q: 'Can rate history be provided?', a: 'Timestamped snapshots can support rate history for the selected suppliers, locations, and collection cadence.' },
    ],
  },
  locationCoverage: {
    name: 'Location Coverage',
    slug: 'location-coverage',
    icon: MapPin,
    badge: 'Rental Network Mapping',
    badgeSubtext: 'Supplier branches and pickup locations',
    title: 'Car Rental Location Coverage Dataset',
    overviewCardTitle: 'Location Coverage Map',
    description: 'Rental supplier location records with branch identifiers, addresses, airport context, operating details, and market coverage.',
    heroDescription: 'Map supplier pickup and return networks across cities and airports. Normalize branch information and coordinates to support coverage analysis and joins with fleet, rate, and availability records.',
    featurePoints: ['Branch and supplier identifiers', 'Airport and city classification', 'Addresses and coordinates', 'Public operating details'],
    stats: [
      { label: 'Location Fields', value: '25+', subtext: 'Branch and contact attributes' },
      { label: 'Geo Detail', value: 'Lat / Long', subtext: 'When available or geocoded' },
      { label: 'Coverage', value: 'Airport + city', subtext: 'Markets set per project' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Location changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Supplier branch' },
      { label: 'Coordinates', value: 'Source or geocoded', isHighlight: true },
    ],
    records: [
      { supplier: 'Northway Rentals', location_id: 'SFO-T1', location_name: 'San Francisco International Airport Terminal 1', location_type: 'airport', address: '780 S Airport Boulevard', city: 'San Francisco', region: 'CA', country: 'US', latitude: 37.6152, longitude: -122.3899, operating_hours: '05:00-23:30', observed_at: '2026-11-12T10:00:00Z' },
      { supplier: 'Cedar Mobility', location_id: 'SEA-DT-02', location_name: 'Seattle Downtown', location_type: 'city', address: '910 Pine Street', city: 'Seattle', region: 'WA', country: 'US', latitude: 47.6121, longitude: -122.3338, operating_hours: '07:00-20:00', observed_at: '2026-11-12T10:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Supplier Location Identity',
        desc: 'Identifiers and classification for each rental branch or pickup point.',
        fields: [
          { name: 'Supplier / Location ID', type: 'String', desc: 'Rental provider and source-specific branch identifier.' },
          { name: 'Location Name / Type', type: 'String', desc: 'Published branch name and airport, city, or other category.' },
          { name: 'Address', type: 'String', desc: 'Street address as published or normalized.' },
          { name: 'City / Region / Country', type: 'String', desc: 'Geographic market and administrative location.' },
        ],
      },
      {
        title: 'Geography and Operations',
        desc: 'Coordinates and public branch service information.',
        fields: [
          { name: 'Latitude / Longitude', type: 'Decimal', desc: 'Published coordinates or approximate geocoded point.' },
          { name: 'Operating Hours', type: 'String', desc: 'Publicly listed opening hours where available.' },
          { name: 'Airport Code', type: 'IATA String', desc: 'Associated airport code for airport rental locations.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the latest location observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are branch coordinates exact?', a: 'Coordinates may be source-published or geocoded from an address. Geocoded points are approximate and should not be treated as confirmation of an entrance or vehicle handover point.' },
      { q: 'Can airport and off-airport branches be distinguished?', a: 'Yes. Location type and airport association are included when indicated by the supplier or source listing.' },
      { q: 'Does a location record confirm that a supplier is currently operating?', a: 'No. It represents publicly observed location information at capture time. Branch operations and hours can change without notice.' },
      { q: 'Which geographic formats can be delivered?', a: 'CSV and JSON are standard. GeoJSON can be provided when coordinates or source boundaries are part of the selected scope.' },
    ],
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: CalendarRange,
    badge: 'Rental Availability Signals',
    badgeSubtext: 'Date and location search snapshots',
    title: 'Car Rental Availability Dataset',
    overviewCardTitle: 'Vehicle Availability Feed',
    description: 'Time-stamped rental search results showing vehicle-class availability by supplier, pickup location, and rental dates.',
    heroDescription: 'Monitor which vehicle classes suppliers display for selected trip dates and pickup locations. Availability records preserve search conditions and source context, and do not reserve or guarantee a vehicle.',
    featurePoints: ['Pickup and return date context', 'Supplier and location keys', 'Vehicle class availability', 'Timestamped search observations'],
    stats: [
      { label: 'Availability Fields', value: '20+', subtext: 'Trip and inventory context' },
      { label: 'Granularity', value: 'Class + location', subtext: 'Supplier-specific results' },
      { label: 'Observation', value: 'Snapshot', subtext: 'Not a vehicle reservation' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Supplier, class, trip' },
      { label: 'Availability', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { supplier: 'Northway Rentals', location_id: 'SFO-T1', pickup_datetime: '2026-12-01T10:00:00-08:00', return_datetime: '2026-12-05T10:00:00-08:00', vehicle_class: 'Midsize SUV', availability_status: 'available', vehicle_description: 'Toyota RAV4 or similar', estimated_total: 318.42, currency: 'USD', observed_at: '2026-11-12T11:00:00Z' },
      { supplier: 'Cedar Mobility', location_id: 'SEA-DT-02', pickup_datetime: '2026-12-03T09:00:00-08:00', return_datetime: '2026-12-06T09:00:00-08:00', vehicle_class: 'Compact', availability_status: 'limited', vehicle_description: 'Hyundai Elantra or similar', estimated_total: 156.8, currency: 'USD', observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Rental Search Context',
        desc: 'Supplier, pickup location, and trip dates used for the search.',
        fields: [
          { name: 'Supplier / Location ID', type: 'String', desc: 'Rental provider and pickup branch identifier.' },
          { name: 'Pickup / Return Datetime', type: 'ISO-8601', desc: 'Rental period boundaries with timezone when available.' },
          { name: 'Vehicle Class', type: 'String', desc: 'Vehicle segment returned by the source.' },
          { name: 'Availability Status', type: 'Enum', desc: 'Observed available, limited, unavailable, or source-specific state.' },
        ],
      },
      {
        title: 'Result and Price Context',
        desc: 'Displayed vehicle description and estimate associated with the result.',
        fields: [
          { name: 'Vehicle Description', type: 'String', desc: 'Specific model or “or similar” wording from the source.' },
          { name: 'Estimated Total / Currency', type: 'Decimal / String', desc: 'Displayed trip estimate and currency where available.' },
          { name: 'Search Parameters', type: 'String', desc: 'Additional filters or renter criteria included in the query.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC search capture timestamp; the record does not hold a vehicle.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does an available result guarantee a vehicle can be booked?', a: 'No. It is a point-in-time search observation, not a reservation. Availability and price may change before checkout.' },
      { q: 'Why are pickup and return times important?', a: 'Rental duration and exact times can affect availability, rate calculations, and supplier conditions. Records preserve those search parameters where available.' },
      { q: 'Are results tied to an exact vehicle model?', a: 'Often the supplier guarantees a vehicle class rather than a specific model. The source description, including “or similar,” is retained.' },
      { q: 'Can availability be monitored for future rental dates?', a: 'Yes. Searches can be configured for selected locations and date ranges, subject to source access and the agreed refresh schedule.' },
    ],
  },
  vehicleSpecs: {
    name: 'Vehicle Specs',
    slug: 'vehicle-specs',
    icon: Database,
    badge: 'Vehicle Reference Data',
    badgeSubtext: 'Rental class and specification records',
    title: 'Rental Vehicle Specifications Dataset',
    overviewCardTitle: 'Vehicle Specs Catalog',
    description: 'Vehicle and rental-class attributes including body style, transmission, fuel type, seating, luggage capacity, and dimensions where published.',
    heroDescription: 'Standardize vehicle specifications across rental suppliers and listing sources. Link rental classes to published model details while keeping class-level guarantees distinct from specific vehicle configurations.',
    featurePoints: ['Vehicle class normalization', 'Seating and luggage capacity', 'Fuel and transmission types', 'Make, model, and dimensions'],
    stats: [
      { label: 'Specification Fields', value: '35+', subtext: 'Vehicle configuration attributes' },
      { label: 'Classification', value: 'Class + model', subtext: 'Source precision retained' },
      { label: 'Vehicle Types', value: 'Multi-segment', subtext: 'Cars, vans, and specialty' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Catalog changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Vehicle model or rental class' },
      { label: 'Specs basis', value: 'Source-published', isHighlight: true },
    ],
    records: [
      { vehicle_spec_id: 'VSP-TOY-RAV4-25', vehicle_class: 'Midsize SUV', make: 'Toyota', model: 'RAV4', model_year: 2025, body_style: 'SUV', transmission: 'Automatic', fuel_type: 'Hybrid', seats: 5, large_bags: 3, doors: 4, drivetrain: 'AWD', observed_at: '2026-11-12T12:00:00Z' },
      { vehicle_spec_id: 'VSP-HYU-ELANTRA-24', vehicle_class: 'Compact', make: 'Hyundai', model: 'Elantra', model_year: 2024, body_style: 'Sedan', transmission: 'Automatic', fuel_type: 'Gasoline', seats: 5, large_bags: 2, doors: 4, drivetrain: 'FWD', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Vehicle Identity and Class',
        desc: 'Make, model, model year, and rental category information.',
        fields: [
          { name: 'Vehicle Spec ID', type: 'String', desc: 'Normalized identifier for the vehicle specification record.' },
          { name: 'Vehicle Class', type: 'String', desc: 'Supplier or normalized rental vehicle segment.' },
          { name: 'Make / Model / Year', type: 'String / Integer', desc: 'Vehicle manufacturer, model, and model year when known.' },
          { name: 'Body Style', type: 'String', desc: 'Sedan, SUV, van, or other published body configuration.' },
        ],
      },
      {
        title: 'Configuration',
        desc: 'Passenger, luggage, powertrain, and driving attributes.',
        fields: [
          { name: 'Transmission / Fuel Type', type: 'String', desc: 'Published transmission and fuel configuration.' },
          { name: 'Seats / Doors', type: 'Integer', desc: 'Passenger seating and door counts where available.' },
          { name: 'Large Bag Capacity', type: 'Integer', desc: 'Published or source-estimated luggage capacity.' },
          { name: 'Drivetrain / Observed At', type: 'String / ISO-8601', desc: 'Drivetrain detail and UTC record timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are vehicle specifications guaranteed for a rental booking?', a: 'No. Rental bookings may guarantee only a vehicle class, and the supplier can provide a comparable model. Specifications are reference data, not a guarantee of the assigned vehicle.' },
      { q: 'How are “or similar” listings represented?', a: 'The rental class and the original source description are kept distinct from model-specific specifications so the booking promise is not overstated.' },
      { q: 'Are specifications available for every rental class?', a: 'Coverage varies by supplier and source. Class-level attributes may be available when exact make and model details are not.' },
      { q: 'Can specifications be linked to inventory and rate records?', a: 'Yes. Vehicle class, supplier listing identifiers, and normalized model attributes can connect the specs dataset to fleet and quote observations.' },
    ],
  },
  vendorProfiles: {
    name: 'Vendor Profiles',
    slug: 'vendor-profiles',
    icon: Building2,
    badge: 'Supplier Intelligence',
    badgeSubtext: 'Rental company and marketplace profiles',
    title: 'Car Rental Vendor Profiles Dataset',
    overviewCardTitle: 'Vendor Profile Catalog',
    description: 'Rental supplier profiles with public identity, service markets, booking channels, fleet categories, and location network context.',
    heroDescription: 'Create a structured reference for rental companies, brokers, and marketplaces. Connect supplier identity to publicly listed markets, locations, vehicle categories, and service information with source attribution.',
    featurePoints: ['Supplier and parent identifiers', 'Public service markets', 'Location and fleet context', 'Booking channel references'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Identity and operation details' },
      { label: 'Relationships', value: 'Parent → Brand', subtext: 'Supplier links normalized' },
      { label: 'Coverage', value: 'Multi-market', subtext: 'Scope configured per request' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Public profiles monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Supplier or marketplace' },
      { label: 'Profile basis', value: 'Public source data', isHighlight: true },
    ],
    records: [
      { vendor_id: 'VND-NWR-001', vendor_name: 'Northway Rentals', parent_company: 'Northway Mobility Group', vendor_type: 'rental operator', headquarters_country: 'United States', service_markets: 'United States, Canada', location_count_observed: 184, fleet_categories: 'Economy, SUV, Premium, Van', website: 'https://northway.example', observed_at: '2026-11-12T13:00:00Z' },
      { vendor_id: 'VND-CDM-014', vendor_name: 'Cedar Mobility', parent_company: 'Cedar Travel Holdings', vendor_type: 'rental operator', headquarters_country: 'United States', service_markets: 'United States', location_count_observed: 72, fleet_categories: 'Compact, Midsize, SUV', website: 'https://cedarmobility.example', observed_at: '2026-11-12T13:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Supplier Identity',
        desc: 'Public business names and organizational relationships.',
        fields: [
          { name: 'Vendor ID / Name', type: 'String', desc: 'Normalized supplier identifier and public business name.' },
          { name: 'Vendor Type', type: 'Enum', desc: 'Rental operator, broker, marketplace, or other source-defined type.' },
          { name: 'Parent Company', type: 'String', desc: 'Associated parent organization where identified.' },
          { name: 'Headquarters Country', type: 'String', desc: 'Country associated with public company information.' },
        ],
      },
      {
        title: 'Markets and Operations',
        desc: 'Public service footprint and fleet context for vendor comparison.',
        fields: [
          { name: 'Service Markets', type: 'String', desc: 'Countries or regions where service is listed.' },
          { name: 'Observed Location Count', type: 'Integer', desc: 'Count of locations found in the configured data scope.' },
          { name: 'Fleet Categories', type: 'String', desc: 'Vehicle segments publicly offered by the supplier.' },
          { name: 'Website / Observed At', type: 'URL / ISO-8601', desc: 'Public website and UTC profile observation time.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does observed location count represent a supplier’s complete network?', a: 'No. It counts locations observed within the configured source and market scope and may not represent the supplier’s full global network.' },
      { q: 'Can rental operators be distinguished from brokers?', a: 'Vendor type can reflect the source’s description or a normalized classification. Original source context can be retained for review.' },
      { q: 'Are vendor company details independently verified?', a: 'No. Profiles are compiled from public sources and should be confirmed with the supplier for legal, contracting, or operational decisions.' },
      { q: 'Can vendor profiles link to rates and locations?', a: 'Yes. Normalized vendor identifiers can connect profile records with location coverage, fleet inventory, and rate observations.' },
    ],
  },
  priceComparison: {
    name: 'Price Comparison',
    slug: 'price-comparison',
    icon: TrendingUp,
    badge: 'Cross-Supplier Benchmarking',
    badgeSubtext: 'Aligned rental quote comparisons',
    title: 'Car Rental Price Comparison Dataset',
    overviewCardTitle: 'Rental Price Comparison',
    description: 'Comparable rental quote summaries across suppliers for aligned locations, vehicle classes, trip dates, and rate conditions.',
    heroDescription: 'Compare supplier offers for the same rental search rather than relying on headline daily rates alone. The dataset aligns trip parameters and retains taxes, mileage, cancellation, and vehicle-class context where available.',
    featurePoints: ['Aligned trip search parameters', 'Supplier and class comparisons', 'Total and daily rate measures', 'Fee and mileage context'],
    stats: [
      { label: 'Comparison Fields', value: '25+', subtext: 'Price and trip dimensions' },
      { label: 'Comparison Basis', value: 'Aligned search', subtext: 'Dates and locations matched' },
      { label: 'Rate Context', value: 'Total + daily', subtext: 'Conditions retained' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Converted values labeled' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Search and supplier offer' },
      { label: 'Comparison basis', value: 'Matched trip conditions', isHighlight: true },
    ],
    records: [
      { search_id: 'SRCH-SFO-1201-04D', supplier: 'Northway Rentals', pickup_location_id: 'SFO-T1', pickup_date: '2026-12-01', return_date: '2026-12-05', vehicle_class: 'Midsize SUV', total_price: 318.42, daily_rate: 79.61, currency: 'USD', taxes_included: true, mileage_policy: 'Unlimited', observed_at: '2026-11-12T14:00:00Z' },
      { search_id: 'SRCH-SFO-1201-04D', supplier: 'Cedar Mobility', pickup_location_id: 'SFO-T1', pickup_date: '2026-12-01', return_date: '2026-12-05', vehicle_class: 'Midsize SUV', total_price: 342.8, daily_rate: 85.7, currency: 'USD', taxes_included: false, mileage_policy: 'Unlimited', observed_at: '2026-11-12T14:05:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Matched Search Dimensions',
        desc: 'Trip conditions shared across supplier offers in a comparison.',
        fields: [
          { name: 'Search ID', type: 'String', desc: 'Key grouping quotes returned for the same configured search.' },
          { name: 'Pickup / Return Date', type: 'Date', desc: 'Dates defining the rental period.' },
          { name: 'Pickup Location', type: 'String', desc: 'Branch or airport location used for comparison.' },
          { name: 'Vehicle Class', type: 'String', desc: 'Vehicle segment matched across supplier offers.' },
        ],
      },
      {
        title: 'Offer Price and Terms',
        desc: 'Rate measures and conditions retained for fair supplier comparison.',
        fields: [
          { name: 'Total Price / Daily Rate', type: 'Decimal', desc: 'Displayed trip total and normalized daily amount.' },
          { name: 'Currency', type: 'String', desc: 'Original quote currency; converted values are separately labeled.' },
          { name: 'Taxes Included', type: 'Boolean', desc: 'Source disclosure for tax inclusion where available.' },
          { name: 'Mileage Policy', type: 'String', desc: 'Mileage allowance or policy associated with the offer.' },
        ],
      },
    ],
    faqs: [
      { q: 'How are rental offers aligned for price comparison?', a: 'Offers are grouped by shared search dimensions such as dates, pickup location, and vehicle class. Differences in mileage, taxes, cancellation, or other terms remain visible.' },
      { q: 'Are the lowest listed rates necessarily the best value?', a: 'Not necessarily. Deposits, insurance, mileage limits, cancellation rules, and taxes can change the total cost. The comparison retains available terms to support evaluation.' },
      { q: 'Are prices converted to a common currency?', a: 'Original quote currency is retained. Currency conversions can be provided as separate derived values with the conversion date and method documented.' },
      { q: 'Can price comparisons be refreshed over time?', a: 'Yes. The same configured search can be repeated on a schedule, creating timestamped comparisons subject to supplier source availability.' },
    ],
  },
  customerReviews: {
    name: 'Customer Reviews',
    slug: 'customer-reviews',
    icon: Star,
    badge: 'Customer Feedback',
    badgeSubtext: 'Public rental provider reviews',
    title: 'Car Rental Customer Reviews Dataset',
    overviewCardTitle: 'Rental Review Feed',
    description: 'Structured public customer reviews of rental suppliers and locations with rating, review date, source attribution, and service context.',
    heroDescription: 'Analyze public feedback about rental providers, branches, and booking experiences. Preserve source-specific rating scales and review context to compare service signals without treating opinions as verified operational outcomes.',
    featurePoints: ['Review and supplier identifiers', 'Rating scale context', 'Location and service attributes', 'Source and language metadata'],
    stats: [
      { label: 'Review Fields', value: '22+', subtext: 'Rating and provenance details' },
      { label: 'Source Context', value: 'Included', subtext: 'Platform retained per record' },
      { label: 'Granularity', value: 'Supplier / branch', subtext: 'Where reviews identify location' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Subject to source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Individual public review' },
      { label: 'Review basis', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { review_id: 'CRV-51082', source: 'TravelGauge', supplier: 'Northway Rentals', location_id: 'SFO-T1', rating: 4.2, rating_scale_max: 5, review_title: 'Quick pickup process', review_text: 'The counter was easy to find and the pickup process was straightforward.', language: 'en', review_date: '2026-10-28', observed_at: '2026-11-12T15:00:00Z' },
      { review_id: 'CRV-72194', source: 'RoadReview', supplier: 'Cedar Mobility', location_id: 'SEA-DT-02', rating: 3.8, rating_scale_max: 5, review_title: 'Vehicle was clean', review_text: 'The car was clean, though the return instructions could have been clearer.', language: 'en', review_date: '2026-11-01', observed_at: '2026-11-12T15:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Review and Rating',
        desc: 'Public review text and score captured with source-scale details.',
        fields: [
          { name: 'Review ID', type: 'String', desc: 'Source review identifier or stable normalized key.' },
          { name: 'Rating / Scale Maximum', type: 'Decimal', desc: 'Published score and the maximum score for that source.' },
          { name: 'Review Title / Text', type: 'String', desc: 'Public review content, subject to source terms.' },
          { name: 'Review Date / Language', type: 'Date / String', desc: 'Source review date and detected or provided language.' },
        ],
      },
      {
        title: 'Supplier and Provenance',
        desc: 'Provider and branch context associated with customer feedback.',
        fields: [
          { name: 'Supplier', type: 'String', desc: 'Rental company or marketplace reviewed.' },
          { name: 'Location ID', type: 'String', desc: 'Branch or pickup location when identified by the source.' },
          { name: 'Source', type: 'String', desc: 'Public platform where the review was observed.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the review record was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are customer reviews verified as completed rental experiences?', a: 'The dataset captures source-published reviews and verification indicators when available. It does not independently confirm reviewer identity or rental completion.' },
      { q: 'Are rating scales standardized?', a: 'Source scores and scale maximums are retained. They should not be treated as directly equivalent without an explicit normalization method.' },
      { q: 'Can reviews be tied to a specific rental branch?', a: 'Yes, when the source identifies a branch or pickup location. Otherwise the review remains associated with the supplier at the available level.' },
      { q: 'Can original review text and language be included?', a: 'Public text and detected or source-provided language can be included, subject to source terms and the project’s delivery requirements.' },
    ],
  },
};