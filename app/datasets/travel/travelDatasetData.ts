import {
  Building2,
  CalendarRange,
  DollarSign,
  Globe,
  Hotel,
  Package,
  Plane,
  Star,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type TravelDatasetKey =
  | 'flightSchedules'
  | 'fareTracker'
  | 'hotelRates'
  | 'reviews'
  | 'routeCoverage'
  | 'seatAvailability'
  | 'airlineProfiles'
  | 'holidayPackages';

interface TravelDataset {
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

export const travelDatasets: Record<TravelDatasetKey, TravelDataset> = {
  flightSchedules: {
    name: 'Flight Schedules',
    slug: 'flight-schedules',
    icon: Plane,
    badge: 'Schedule Intelligence',
    badgeSubtext: 'Published flight timetable records',
    title: 'Flight Schedules Dataset',
    overviewCardTitle: 'Flight Schedule Feed',
    description: 'Structured airline schedule observations covering routes, operating times, flight identifiers, and aircraft details where published.',
    heroDescription: 'Build a consistent view of published flight schedules across airlines and markets. Normalize departure and arrival times, airport codes, operating days, and schedule changes for travel planning and network analysis.',
    featurePoints: ['Airport and route identifiers', 'Local departure and arrival times', 'Operating-day patterns', 'Schedule change observations'],
    stats: [
      { label: 'Schedule Fields', value: '25+', subtext: 'Route and service attributes' },
      { label: 'Time Context', value: 'Local + UTC', subtext: 'Timezone-aware values' },
      { label: 'Coverage', value: 'Route-based', subtext: 'Airlines and markets selected' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence set per project' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Flight and operating date' },
      { label: 'Schedule basis', value: 'Published timetable', isHighlight: true },
    ],
    records: [
      { airline: 'Northstar Air', flight_number: 'NS214', origin_iata: 'JFK', destination_iata: 'LHR', departure_local: '2026-12-01T21:40:00-05:00', arrival_local: '2026-12-02T09:35:00Z', operating_days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', aircraft_code: 'A350', observed_at: '2026-11-12T08:00:00Z' },
      { airline: 'Coastal Airways', flight_number: 'CA508', origin_iata: 'SFO', destination_iata: 'SEA', departure_local: '2026-12-01T10:15:00-08:00', arrival_local: '2026-12-01T12:25:00-08:00', operating_days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun', aircraft_code: '737-800', observed_at: '2026-11-12T08:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Flight and Route Identity',
        desc: 'Identifiers connecting each schedule to its airline and airport pair.',
        fields: [
          { name: 'Airline', type: 'String', desc: 'Operating or marketing carrier associated with the schedule.' },
          { name: 'Flight Number', type: 'String', desc: 'Published flight designator, including carrier code.' },
          { name: 'Origin / Destination IATA', type: 'String', desc: 'Three-letter airport codes for the scheduled route.' },
          { name: 'Aircraft Code', type: 'String', desc: 'Aircraft type when included in the published schedule.' },
        ],
      },
      {
        title: 'Timing and Operation',
        desc: 'Timezone-aware timing and operating-day context for planning.',
        fields: [
          { name: 'Departure / Arrival', type: 'ISO-8601', desc: 'Published local times with timezone offsets when available.' },
          { name: 'Operating Days', type: 'String', desc: 'Days of week on which the schedule is listed to operate.' },
          { name: 'Schedule Status', type: 'Enum', desc: 'Observed status such as scheduled, changed, or withdrawn.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the schedule was captured.' },
        ],
      },
    ],
    faq: {
      q: 'Are published schedules guaranteed to operate as listed?',
      a: 'No. The dataset reflects published schedule information at capture time. Airlines can change or cancel services, so records are not a guarantee of operation or a substitute for live confirmation.',
    },
  },
  fareTracker: {
    name: 'Fare Tracker',
    slug: 'fare-tracker',
    icon: DollarSign,
    badge: 'Airfare Intelligence',
    badgeSubtext: 'Timestamped fare observations',
    title: 'Airfare Tracker Dataset',
    overviewCardTitle: 'Fare Tracking Feed',
    description: 'Timestamped airfare observations with route, travel dates, fare conditions, currency, and booking-source context.',
    heroDescription: 'Monitor displayed airfare changes across routes and travel dates. Standardized fare observations preserve cabin, itinerary, baggage, and change-rule context so that comparisons account for more than the headline price.',
    featurePoints: ['Route and travel-date keys', 'Cabin and fare brand context', 'Currency-aware prices', 'Timestamped price history'],
    stats: [
      { label: 'Fare Fields', value: '30+', subtext: 'Price and condition details' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
      { label: 'Comparison', value: 'Itinerary-level', subtext: 'Stops and cabin included' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Displayed currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Itinerary and travel date' },
      { label: 'Price basis', value: 'Displayed fare', isHighlight: true },
    ],
    records: [
      { airline: 'Northstar Air', origin_iata: 'JFK', destination_iata: 'LHR', departure_date: '2026-12-01', return_date: '2026-12-08', cabin: 'Economy', fare_brand: 'Standard', total_price: 684.5, currency: 'USD', stops: 0, baggage_included: true, observed_at: '2026-11-12T10:00:00Z' },
      { airline: 'Coastal Airways', origin_iata: 'SFO', destination_iata: 'SEA', departure_date: '2026-12-04', return_date: '', cabin: 'Economy', fare_brand: 'Basic', total_price: 128, currency: 'USD', stops: 0, baggage_included: false, observed_at: '2026-11-12T10:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Itinerary Details',
        desc: 'Route and travel-date context for like-for-like fare comparisons.',
        fields: [
          { name: 'Origin / Destination', type: 'IATA String', desc: 'Airport codes defining the observed itinerary.' },
          { name: 'Departure / Return Date', type: 'Date', desc: 'Travel dates included in the displayed fare.' },
          { name: 'Stops', type: 'Integer', desc: 'Number of connections shown for the itinerary.' },
          { name: 'Cabin', type: 'String', desc: 'Cabin class associated with the fare.' },
        ],
      },
      {
        title: 'Price and Conditions',
        desc: 'Displayed fare and purchase conditions captured with the offer.',
        fields: [
          { name: 'Total Price', type: 'Decimal', desc: 'Displayed itinerary price before any unlisted checkout changes.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the displayed amount.' },
          { name: 'Fare Brand', type: 'String', desc: 'Named fare family or brand where shown.' },
          { name: 'Baggage Included', type: 'Boolean', desc: 'Indicates whether the observed fare includes the stated baggage allowance.' },
        ],
      },
    ],
    faq: {
      q: 'Can the tracked fare be booked at the displayed price?',
      a: 'A fare is a time-stamped observation and can change before booking. The record includes its observation time and available itinerary conditions, but availability and final checkout price must be confirmed with the seller.',
    },
  },
  hotelRates: {
    name: 'Hotel Rates',
    slug: 'hotel-rates',
    icon: Hotel,
    badge: 'Accommodation Pricing',
    badgeSubtext: 'Property and stay-level rates',
    title: 'Hotel Rates Dataset',
    overviewCardTitle: 'Hotel Rate Monitor',
    description: 'Comparable property-rate observations with stay dates, room context, occupancy, cancellation terms, and source currency.',
    heroDescription: 'Compare hotel prices across properties, channels, and travel dates while retaining room and rate-plan details. Timestamped observations help analysts follow changes without losing the conditions attached to each offer.',
    featurePoints: ['Property and stay-date keys', 'Room and occupancy details', 'Cancellation terms', 'Tax and currency context'],
    stats: [
      { label: 'Rate Fields', value: '25+', subtext: 'Price and room attributes' },
      { label: 'Stay Context', value: 'Check-in/out', subtext: 'Nights and occupancy' },
      { label: 'Rate Plans', value: 'Conditioned', subtext: 'Refund terms retained' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Configurable monitoring' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Property, room, stay' },
      { label: 'Rate basis', value: 'Displayed offer', isHighlight: true },
    ],
    records: [
      { property_id: 'HTL-LON-0082', property_name: 'Westbridge House', city: 'London', check_in: '2026-12-01', check_out: '2026-12-04', room_type: 'Queen Room', occupancy: 2, nightly_rate: 214, total_price: 642, currency: 'GBP', refundable: true, observed_at: '2026-11-12T11:00:00Z' },
      { property_id: 'HTL-TYO-0147', property_name: 'Mori Central Hotel', city: 'Tokyo', check_in: '2026-12-10', check_out: '2026-12-12', room_type: 'Twin Room', occupancy: 2, nightly_rate: 16800, total_price: 33600, currency: 'JPY', refundable: false, observed_at: '2026-11-12T11:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Property and Stay',
        desc: 'Property identity and dates defining the rate search context.',
        fields: [
          { name: 'Property ID / Name', type: 'String', desc: 'Stable property key and displayed property name.' },
          { name: 'City', type: 'String', desc: 'Destination market associated with the property.' },
          { name: 'Check-in / Check-out', type: 'Date', desc: 'Stay dates used to retrieve the rate.' },
          { name: 'Room Type / Occupancy', type: 'String / Integer', desc: 'Displayed room category and guest count.' },
        ],
      },
      {
        title: 'Rate and Conditions',
        desc: 'Price breakdown context and cancellation terms for the offer.',
        fields: [
          { name: 'Nightly / Total Price', type: 'Decimal', desc: 'Displayed per-night rate and stay total when available.' },
          { name: 'Currency', type: 'String', desc: 'Currency code shown by the booking source.' },
          { name: 'Refundable', type: 'Boolean', desc: 'Whether the displayed rate indicates refundable terms.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the offer was captured.' },
        ],
      },
    ],
    faq: {
      q: 'Do hotel rate records include all taxes and fees?',
      a: 'The dataset captures the price breakdown and tax or fee disclosures when the source provides them. A displayed total may still differ at checkout, so tax inclusion and rate conditions should be checked for each record.',
    },
  },
  reviews: {
    name: 'Traveller Reviews',
    slug: 'reviews',
    icon: Star,
    badge: 'Guest Feedback',
    badgeSubtext: 'Public review observations',
    title: 'Traveller Reviews Dataset',
    overviewCardTitle: 'Traveller Review Feed',
    description: 'Structured public traveller reviews with property or service context, ratings, review dates, and source attribution.',
    heroDescription: 'Analyze public travel feedback across lodging, transport, and booking sources. Review text and rating records can be normalized by source, language, travel date, and subject while preserving original attribution.',
    featurePoints: ['Review and source identifiers', 'Rating scale context', 'Review and travel dates', 'Language and response status'],
    stats: [
      { label: 'Review Fields', value: '20+', subtext: 'Rating and context attributes' },
      { label: 'Source Context', value: 'Attributed', subtext: 'Source retained per record' },
      { label: 'Language', value: 'Detected', subtext: 'Original text preserved' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Subject to source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Individual review' },
      { label: 'Content', value: 'Publicly available reviews', isHighlight: true },
    ],
    records: [
      { review_id: 'RVW-80421', source: 'TravelBoard', subject_id: 'HTL-LON-0082', subject_name: 'Westbridge House', rating: 4.5, rating_scale: 5, review_title: 'Comfortable stay near the station', review_text: 'The room was quiet and the staff were helpful. Easy walk to transit.', language: 'en', review_date: '2026-10-28', verified_stay: true, observed_at: '2026-11-12T12:00:00Z' },
      { review_id: 'RVW-91506', source: 'GuestVoice', subject_id: 'HTL-TYO-0147', subject_name: 'Mori Central Hotel', rating: 4, rating_scale: 5, review_title: 'Convenient location', review_text: 'Clean room and convenient access to local restaurants.', language: 'en', review_date: '2026-10-30', verified_stay: false, observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Review Content',
        desc: 'Review text and rating values captured with their source scale.',
        fields: [
          { name: 'Review ID', type: 'String', desc: 'Source review identifier or stable derived key.' },
          { name: 'Review Title / Text', type: 'String', desc: 'Publicly displayed review text, subject to source terms.' },
          { name: 'Rating / Rating Scale', type: 'Decimal / Integer', desc: 'Score and maximum scale shown by the source.' },
          { name: 'Language', type: 'String', desc: 'Detected or source-provided language code.' },
        ],
      },
      {
        title: 'Subject and Provenance',
        desc: 'Property or travel-service context and review provenance fields.',
        fields: [
          { name: 'Subject ID / Name', type: 'String', desc: 'Property, carrier, or travel service the review concerns.' },
          { name: 'Source', type: 'String', desc: 'Public platform where the review was observed.' },
          { name: 'Review Date', type: 'Date', desc: 'Date associated with the review on its source.' },
          { name: 'Verified Stay', type: 'Boolean', desc: 'Verification indicator only when explicitly supplied by the source.' },
        ],
      },
    ],
    faq: {
      q: 'Are traveller reviews independently verified?',
      a: 'The dataset records public review content and source-provided indicators. It does not independently verify a traveller’s identity or the truth of a review; any verification flag is preserved only when the source provides it.',
    },
  },
  routeCoverage: {
    name: 'Route Coverage',
    slug: 'route-coverage',
    icon: Globe,
    badge: 'Network Intelligence',
    badgeSubtext: 'Airline and destination footprint',
    title: 'Travel Route Coverage Dataset',
    overviewCardTitle: 'Route Coverage Map',
    description: 'A structured view of observed airline routes, airport pairs, service frequency, and market coverage over selected periods.',
    heroDescription: 'Map airline network reach across origin-destination pairs and markets. Route records connect airports, carriers, service frequency, and observation windows to support coverage analysis and route comparisons.',
    featurePoints: ['Origin and destination airports', 'Operating carrier context', 'Frequency by period', 'Route observation dates'],
    stats: [
      { label: 'Route Keys', value: 'Airport pairs', subtext: 'Directional routes preserved' },
      { label: 'Carrier Detail', value: 'Multi-airline', subtext: 'Configurable coverage scope' },
      { label: 'Frequency', value: 'By period', subtext: 'Schedule-derived counts' },
      { label: 'Coverage', value: 'Observed', subtext: 'Collection scope documented' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, GeoJSON' },
      { label: 'Granularity', value: 'Carrier and route' },
      { label: 'Route basis', value: 'Published schedule data', isHighlight: true },
    ],
    records: [
      { airline: 'Northstar Air', origin_iata: 'JFK', origin_city: 'New York', destination_iata: 'LHR', destination_city: 'London', route_type: 'international', flights_per_week: 14, period_start: '2026-12-01', period_end: '2026-12-31', observed_at: '2026-11-12T13:00:00Z' },
      { airline: 'Coastal Airways', origin_iata: 'SFO', origin_city: 'San Francisco', destination_iata: 'SEA', destination_city: 'Seattle', route_type: 'domestic', flights_per_week: 28, period_start: '2026-12-01', period_end: '2026-12-31', observed_at: '2026-11-12T13:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Route Definition',
        desc: 'Airport pair and market dimensions for each observed route.',
        fields: [
          { name: 'Origin / Destination IATA', type: 'String', desc: 'Airport codes defining the directional route.' },
          { name: 'Origin / Destination City', type: 'String', desc: 'City labels associated with each airport.' },
          { name: 'Route Type', type: 'Enum', desc: 'Domestic, international, or other configured classification.' },
          { name: 'Airline', type: 'String', desc: 'Carrier associated with the observed service.' },
        ],
      },
      {
        title: 'Frequency and Period',
        desc: 'Schedule-derived service counts over a specified date window.',
        fields: [
          { name: 'Flights per Week', type: 'Integer', desc: 'Estimated scheduled weekly frequency for the period.' },
          { name: 'Period Start / End', type: 'Date', desc: 'Date window used to calculate route coverage.' },
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed status within the configured collection scope.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when route coverage was last captured.' },
        ],
      },
    ],
    faq: {
      q: 'Does route coverage confirm a flight is operating today?',
      a: 'No. Coverage summarizes route and schedule observations for a defined period. Individual flight operation can change, so current schedules should be confirmed with the carrier or booking source.',
    },
  },
  seatAvailability: {
    name: 'Seat Availability',
    slug: 'seat-availability',
    icon: CalendarRange,
    badge: 'Inventory Signals',
    badgeSubtext: 'Fare and date availability snapshots',
    title: 'Travel Seat Availability Dataset',
    overviewCardTitle: 'Seat Availability Feed',
    description: 'Time-stamped observations of seat or fare-bucket availability for selected flights, routes, and travel dates.',
    heroDescription: 'Track availability signals across flight searches while retaining flight, cabin, fare class, and observation context. These snapshots describe what a source displayed at capture time and are not inventory reservations.',
    featurePoints: ['Flight and travel-date keys', 'Cabin and fare-class context', 'Source availability labels', 'Capture-time history'],
    stats: [
      { label: 'Availability Fields', value: '18+', subtext: 'Flight and inventory context' },
      { label: 'Granularity', value: 'Flight + date', subtext: 'Cabin where available' },
      { label: 'Observation', value: 'Snapshot', subtext: 'Not a seat hold' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Flight and fare class' },
      { label: 'Availability', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { airline: 'Northstar Air', flight_number: 'NS214', origin_iata: 'JFK', destination_iata: 'LHR', travel_date: '2026-12-01', cabin: 'Economy', fare_class: 'M', availability_status: 'available', seats_remaining_band: '6-9', observed_at: '2026-11-12T14:00:00Z' },
      { airline: 'Coastal Airways', flight_number: 'CA508', origin_iata: 'SFO', destination_iata: 'SEA', travel_date: '2026-12-04', cabin: 'Economy', fare_class: 'Q', availability_status: 'limited', seats_remaining_band: '1-3', observed_at: '2026-11-12T14:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Flight Selection',
        desc: 'Identifiers tying an availability observation to a specific service.',
        fields: [
          { name: 'Airline / Flight Number', type: 'String', desc: 'Carrier and published flight designator.' },
          { name: 'Origin / Destination', type: 'IATA String', desc: 'Airport pair for the selected flight.' },
          { name: 'Travel Date', type: 'Date', desc: 'Date of the flight associated with the snapshot.' },
          { name: 'Cabin / Fare Class', type: 'String', desc: 'Cabin and booking class when exposed by the source.' },
        ],
      },
      {
        title: 'Availability Observation',
        desc: 'Source-displayed inventory signals and their capture context.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Observed state such as available, limited, or unavailable.' },
          { name: 'Seats Remaining Band', type: 'String', desc: 'Source-exposed quantity or a documented range where available.' },
          { name: 'Source', type: 'String', desc: 'Booking or airline source where the signal was observed.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC capture time; the record does not hold inventory.' },
        ],
      },
    ],
    faq: {
      q: 'Can seat availability be used to hold or book inventory?',
      a: 'No. These are point-in-time observations of source-displayed availability, not reservations. Inventory may change immediately and must be reconfirmed through the booking channel.',
    },
  },
  airlineProfiles: {
    name: 'Airline Profiles',
    slug: 'airline-profiles',
    icon: Building2,
    badge: 'Carrier Intelligence',
    badgeSubtext: 'Airline identity and service attributes',
    title: 'Airline Profiles Dataset',
    overviewCardTitle: 'Airline Profile Catalog',
    description: 'Normalized airline profiles with carrier identifiers, operating regions, public service details, and network context.',
    heroDescription: 'Bring airline identity and public service attributes into a consistent reference dataset. Carrier identifiers, operating regions, fleet details, and route context can support travel search, benchmarking, and market analysis.',
    featurePoints: ['Carrier codes and legal names', 'Operating region context', 'Public fleet attributes', 'Network and service metadata'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Identity and service details' },
      { label: 'Identifiers', value: 'IATA / ICAO', subtext: 'When published' },
      { label: 'Coverage', value: 'Global-ready', subtext: 'Scope configured per request' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Profile changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Airline or operating carrier' },
      { label: 'Profile data', value: 'Public source-attributed', isHighlight: true },
    ],
    records: [
      { airline_id: 'AIR-NS', airline_name: 'Northstar Air', iata_code: 'NS', icao_code: 'NSA', headquarters_country: 'United States', operating_regions: 'North America, Europe', fleet_size_published: 86, website: 'https://northstar.example', observed_at: '2026-11-12T15:00:00Z' },
      { airline_id: 'AIR-CA', airline_name: 'Coastal Airways', iata_code: 'CA', icao_code: 'CST', headquarters_country: 'United States', operating_regions: 'North America', fleet_size_published: 42, website: 'https://coastal.example', observed_at: '2026-11-12T15:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Carrier Identity',
        desc: 'Names and codes used to identify an airline across travel sources.',
        fields: [
          { name: 'Airline ID', type: 'String', desc: 'Stable normalized identifier for the carrier profile.' },
          { name: 'Airline Name', type: 'String', desc: 'Published carrier or airline name.' },
          { name: 'IATA / ICAO Code', type: 'String', desc: 'Carrier codes when available from public sources.' },
          { name: 'Headquarters Country', type: 'String', desc: 'Country associated with the airline headquarters.' },
        ],
      },
      {
        title: 'Operations and Network',
        desc: 'Publicly listed scope and operational profile attributes.',
        fields: [
          { name: 'Operating Regions', type: 'String', desc: 'Regions where service is listed or marketed.' },
          { name: 'Published Fleet Size', type: 'Integer', desc: 'Fleet count when published; source attribution is retained.' },
          { name: 'Website', type: 'URL', desc: 'Official website URL where identified.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time of the latest profile observation.' },
        ],
      },
    ],
    faq: {
      q: 'Are airline fleet and network details guaranteed current?',
      a: 'No. Profile attributes are collected from public sources and may change. The observation timestamp and available source attribution help users assess freshness and verify critical information.',
    },
  },
  holidayPackages: {
    name: 'Holiday Packages',
    slug: 'holiday-packages',
    icon: Package,
    badge: 'Travel Packages',
    badgeSubtext: 'Itinerary and offer details',
    title: 'Holiday Packages Dataset',
    overviewCardTitle: 'Holiday Package Feed',
    description: 'Structured holiday package listings with destinations, itinerary length, included services, travel dates, and displayed pricing.',
    heroDescription: 'Compare packaged travel offers with itinerary and inclusion details alongside the displayed price. Normalize destinations, trip duration, travel windows, and provider information for travel-market research.',
    featurePoints: ['Destination and itinerary data', 'Travel windows and duration', 'Included service context', 'Displayed package prices'],
    stats: [
      { label: 'Package Fields', value: '25+', subtext: 'Offer and itinerary attributes' },
      { label: 'Trip Context', value: 'Dated', subtext: 'Duration and travel window' },
      { label: 'Price Basis', value: 'Source shown', subtext: 'Occupancy context retained' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Offer windows monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Package offer' },
      { label: 'Offer context', value: 'Inclusions captured when shown', isHighlight: true },
    ],
    records: [
      { package_id: 'PKG-IT-311', provider: 'OpenRoad Holidays', package_name: 'Northern Italy by Rail', destination: 'Milan, Verona, Venice', duration_nights: 6, departure_date: '2027-04-12', inclusions: 'Rail pass; 3-star hotels; breakfast', price_per_person: 1890, currency: 'EUR', observed_at: '2026-11-12T16:00:00Z' },
      { package_id: 'PKG-JP-208', provider: 'Harborlight Travel', package_name: 'Tokyo and Kyoto Highlights', destination: 'Tokyo, Kyoto', duration_nights: 7, departure_date: '2027-05-03', inclusions: 'Hotels; city transfer; guided day tour', price_per_person: 2450, currency: 'USD', observed_at: '2026-11-12T16:15:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Package and Itinerary',
        desc: 'Offer identifiers and trip details for comparing package scope.',
        fields: [
          { name: 'Package ID / Name', type: 'String', desc: 'Source identifier and consumer-facing package title.' },
          { name: 'Provider', type: 'String', desc: 'Travel provider or seller offering the package.' },
          { name: 'Destination', type: 'String', desc: 'Cities, regions, or destinations included in the itinerary.' },
          { name: 'Duration / Departure Date', type: 'Integer / Date', desc: 'Trip length and departure date when specified.' },
        ],
      },
      {
        title: 'Price and Inclusions',
        desc: 'Displayed offer amount and included services as presented by the source.',
        fields: [
          { name: 'Price per Person', type: 'Decimal', desc: 'Displayed per-person amount with occupancy context where available.' },
          { name: 'Currency', type: 'String', desc: 'Currency code associated with the displayed package price.' },
          { name: 'Inclusions', type: 'String', desc: 'Published lodging, transport, meals, tours, or other included items.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the package offer was captured.' },
        ],
      },
    ],
    faq: {
      q: 'Does the package price include every travel cost?',
      a: 'The feed captures the displayed price and published inclusions where available. Exclusions, taxes, optional upgrades, and final availability can vary by offer and must be confirmed with the provider.',
    },
  },
};