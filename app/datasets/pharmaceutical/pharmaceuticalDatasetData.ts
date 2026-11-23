import {
  AlertCircle,
  BarChart2,
  Building2,
  DollarSign,
  Pill,
  Search,
  ShieldCheck,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type PharmaceuticalDatasetKey =
  | 'drugListings'
  | 'priceComparison'
  | 'availability'
  | 'manufacturerData'
  | 'approvalStatus'
  | 'therapeuticClass'
  | 'marketTrends'
  | 'substituteDrugs';

interface PharmaceuticalDataset {
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

export const pharmaceuticalDatasets: Record<PharmaceuticalDatasetKey, PharmaceuticalDataset> = {
  drugListings: {
    name: 'Drug Listings',
    slug: 'drug-listings',
    icon: Pill,
    badge: 'Medicine Catalog',
    badgeSubtext: 'Product and package reference records',
    title: 'Pharmaceutical Drug Listings Dataset',
    overviewCardTitle: 'Drug Listing Catalog',
    description: 'Structured medicine product listings with ingredient labels, brand, dosage form, package identifiers, manufacturer, and source context.',
    heroDescription: 'Create a normalized reference of publicly listed pharmaceutical products. Connect brand and ingredient labels to package identifiers and retain market, source, and regulatory-reference context for catalog research.',
    featurePoints: ['Product and package identifiers', 'Brand and ingredient labels', 'Dosage form and strength fields', 'Source and market context'],
    stats: [
      { label: 'Catalog Fields', value: '35+', subtext: 'Product and package attributes' },
      { label: 'Identifiers', value: 'Multi-ID', subtext: 'Source and product codes' },
      { label: 'Coverage', value: 'Market-based', subtext: 'Countries set per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on sources' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and package listing' },
      { label: 'Catalog basis', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { product_id: 'SYN-RX-00182', brand_name: 'SampleWell A', ingredient_label: 'Sample Compound A', strength_label: '10 mg', dosage_form: 'tablet', package_description: '30-count pack', market: 'US', manufacturer_id: 'MFR-SYN-014', source_product_code: 'SW-A-10-30', observed_at: '2026-11-12T08:30:00Z' },
      { product_id: 'SYN-OTC-00417', brand_name: 'SampleWell B', ingredient_label: 'Sample Compound B', strength_label: '5 mg / 5 mL', dosage_form: 'oral solution', package_description: '100 mL bottle', market: 'US', manufacturer_id: 'MFR-SYN-021', source_product_code: 'SW-B-5-100', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product Identity',
        desc: 'Brand, ingredient, and package identifiers for public product listings.',
        fields: [
          { name: 'Product ID / Source Product Code', type: 'String', desc: 'Normalized product key and source-specific package identifier.' },
          { name: 'Brand Name', type: 'String', desc: 'Brand label as presented in the source listing.' },
          { name: 'Ingredient Label', type: 'String', desc: 'Ingredient text captured from public product information.' },
          { name: 'Manufacturer ID', type: 'String', desc: 'Linked manufacturer reference key where identified.' },
        ],
      },
      {
        title: 'Product Presentation',
        desc: 'Listing-level formulation and market attributes, not usage directions.',
        fields: [
          { name: 'Strength Label', type: 'String', desc: 'Strength text as stated by the product source.' },
          { name: 'Dosage Form', type: 'String', desc: 'Tablet, solution, capsule, or source-listed presentation.' },
          { name: 'Package Description', type: 'String', desc: 'Pack size or package wording from the listing.' },
          { name: 'Market / Observed At', type: 'String / ISO-8601', desc: 'Country or market and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are the example medicine records real products?', a: 'No. The sample records use synthetic names and identifiers for demonstration and should not be used to identify, select, or obtain a medicine.' },
      { q: 'Does the dataset provide prescribing or dosing instructions?', a: 'No. It contains catalog and package-reference fields only. It is not medical advice and does not provide instructions for using a medicine.' },
      { q: 'Are product identifiers available for every listing?', a: 'Identifier coverage depends on the source and market. Available source codes can be retained alongside normalized product keys.' },
      { q: 'How often are listings refreshed?', a: 'Refresh cadence depends on selected sources, markets, and fields. Scheduled snapshots can be configured for an agreed collection interval.' },
    ],
  },
  priceComparison: {
    name: 'Price Comparison',
    slug: 'price-comparison',
    icon: DollarSign,
    badge: 'Pharmaceutical Price Intelligence',
    badgeSubtext: 'Public price observations by package',
    title: 'Pharmaceutical Price Comparison Dataset',
    overviewCardTitle: 'Price Comparison Feed',
    description: 'Public medicine price observations across sellers and markets, with package identifiers, currency, unit context, and capture time.',
    heroDescription: 'Compare publicly displayed medicine package prices across sources and regions. Keep package size, currency, seller, and observation context intact so comparisons remain descriptive and do not imply clinical equivalence.',
    featurePoints: ['Seller and package-level prices', 'Currency and market fields', 'Package-aware unit context', 'Timestamped price history'],
    stats: [
      { label: 'Price Fields', value: '20+', subtext: 'Amount and package context' },
      { label: 'Comparison', value: 'Package-aware', subtext: 'Product identifiers retained' },
      { label: 'History', value: 'Timestamped', subtext: 'Snapshots by refresh plan' },
      { label: 'Currency', value: 'Source-aware', subtext: 'Original currency retained' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Package, seller, market' },
      { label: 'Price basis', value: 'Publicly displayed', isHighlight: true },
    ],
    records: [
      { product_id: 'SYN-RX-00182', package_description: '30-count pack', seller: 'Example Pharmacy North', market: 'US-CA', listed_price: 18.4, currency: 'USD', unit_price: 0.613, unit_basis: 'per tablet', discount_label: 'none shown', observed_at: '2026-11-12T09:00:00Z' },
      { product_id: 'SYN-RX-00182', package_description: '30-count pack', seller: 'Example Pharmacy West', market: 'US-CA', listed_price: 17.95, currency: 'USD', unit_price: 0.598, unit_basis: 'per tablet', discount_label: 'member price shown', observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Observed Price',
        desc: 'Publicly displayed amounts and seller context at capture time.',
        fields: [
          { name: 'Listed Price', type: 'Decimal', desc: 'Displayed package price as observed on the source.' },
          { name: 'Currency', type: 'ISO 4217 String', desc: 'Currency code associated with the listed amount.' },
          { name: 'Unit Price / Basis', type: 'Decimal / String', desc: 'Calculated amount per package unit where package detail allows.' },
          { name: 'Discount Label', type: 'String', desc: 'Public seller label for a promotion or member price, if shown.' },
        ],
      },
      {
        title: 'Package and Source',
        desc: 'Product package identifiers needed for responsible price comparison.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Normalized package-level product identifier.' },
          { name: 'Package Description', type: 'String', desc: 'Pack size and wording as shown by the seller.' },
          { name: 'Seller / Market', type: 'String', desc: 'Public seller and market associated with the observation.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the price observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a lower listed price mean two products are interchangeable?', a: 'No. Price similarity does not establish therapeutic equivalence, suitability, or interchangeability. Compare only matching public package information and consult a qualified healthcare professional about treatment decisions.' },
      { q: 'Are prices final checkout amounts?', a: 'Not necessarily. Taxes, delivery, eligibility, seller terms, and availability may affect the final amount. The dataset captures public price disclosures at observation time.' },
      { q: 'How are package sizes compared?', a: 'Package identifiers and descriptions are retained, and unit values may be calculated when sufficient package details are available. Different formulations should not be treated as equivalent based on unit price.' },
      { q: 'Can historical prices be analyzed?', a: 'Timestamped observations can support descriptive price history for the selected sellers, markets, collection cadence, and retention period.' },
    ],
  },
  availability: {
    name: 'Availability',
    slug: 'availability',
    icon: AlertCircle,
    badge: 'Supply Availability Signals',
    badgeSubtext: 'Product and seller status snapshots',
    title: 'Pharmaceutical Availability Dataset',
    overviewCardTitle: 'Availability Signal Feed',
    description: 'Public product availability observations by seller and market, with source status wording, package identifiers, and capture time.',
    heroDescription: 'Monitor source-reported catalog availability across selected sellers and markets. Preserve the original status label and observation timestamp; these records describe online listing signals, not supply guarantees or clinical access.',
    featurePoints: ['Package and seller identifiers', 'Market-level status signals', 'Source wording retained', 'Timestamped availability history'],
    stats: [
      { label: 'Status Values', value: 'Normalized', subtext: 'Original labels preserved' },
      { label: 'Granularity', value: 'Package + seller', subtext: 'Market-specific observations' },
      { label: 'Signal Basis', value: 'Online listing', subtext: 'Not a supply guarantee' },
      { label: 'Refresh', value: 'Configurable', subtext: 'Based on source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product package and seller' },
      { label: 'Status basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { product_id: 'SYN-RX-00182', seller: 'Example Pharmacy North', market: 'US-CA', availability_status: 'listed', source_status_label: 'Available online', fulfillment_type: 'ship-to-home', estimated_fulfillment_days: 3, observed_at: '2026-11-12T10:00:00Z' },
      { product_id: 'SYN-OTC-00417', seller: 'Example Pharmacy West', market: 'US-WA', availability_status: 'unavailable', source_status_label: 'Currently unavailable', fulfillment_type: 'pickup', estimated_fulfillment_days: 0, observed_at: '2026-11-12T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Seller',
        desc: 'Package and seller keys connecting availability observations.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Normalized product or package identifier.' },
          { name: 'Seller', type: 'String', desc: 'Public seller associated with the listing.' },
          { name: 'Market', type: 'String', desc: 'Country, region, or configured market for the check.' },
          { name: 'Fulfillment Type', type: 'Enum', desc: 'Shipping, pickup, or other source-displayed channel.' },
        ],
      },
      {
        title: 'Availability Observation',
        desc: 'Source-reported listing state and freshness metadata.',
        fields: [
          { name: 'Availability Status', type: 'Enum', desc: 'Normalized listed, unavailable, or source-specific state.' },
          { name: 'Source Status Label', type: 'String', desc: 'Original wording presented by the seller.' },
          { name: 'Estimated Fulfillment Days', type: 'Integer', desc: 'Seller-displayed estimate when provided.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC time when the status was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does an available listing guarantee that a medicine is in stock?', a: 'No. It records an online status shown by a seller at capture time and is not a real-time inventory guarantee or confirmation of access.' },
      { q: 'Can availability be analyzed by seller and market?', a: 'Yes. Seller and market fields support descriptive comparisons where the source exposes those dimensions.' },
      { q: 'Does the dataset indicate whether a product is appropriate for a person?', a: 'No. Availability is catalog metadata only and says nothing about whether a medicine is appropriate. Medical decisions should be discussed with a qualified healthcare professional.' },
      { q: 'How current are availability observations?', a: 'Each record includes a capture timestamp. Refresh cadence depends on source access, and status may change between observations.' },
    ],
  },
  manufacturerData: {
    name: 'Manufacturer Data',
    slug: 'manufacturer-data',
    icon: Building2,
    badge: 'Manufacturer Reference',
    badgeSubtext: 'Organization and product relationships',
    title: 'Pharmaceutical Manufacturer Dataset',
    overviewCardTitle: 'Manufacturer Profile Feed',
    description: 'Public pharmaceutical manufacturer and labeler records with organization identifiers, product relationships, locations, and source context.',
    heroDescription: 'Normalize public information about pharmaceutical manufacturers and product labelers. Link organizations to catalog records while retaining market and source identifiers for business and supply-chain research.',
    featurePoints: ['Organization identifiers', 'Manufacturer and labeler roles', 'Product portfolio links', 'Public location information'],
    stats: [
      { label: 'Profile Fields', value: '30+', subtext: 'Organization attributes' },
      { label: 'Relationships', value: 'Org → Product', subtext: 'Catalog links normalized' },
      { label: 'Coverage', value: 'Market-based', subtext: 'Countries configured per request' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Public profile changes tracked' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Organization and product link' },
      { label: 'Profile basis', value: 'Public source records', isHighlight: true },
    ],
    records: [
      { manufacturer_id: 'MFR-SYN-014', organization_name: 'Samplewell Laboratories', organization_role: 'labeler', country: 'US', public_identifier: 'SYN-ORG-014', product_count_observed: 26, public_website: 'https://samplewell.example', source: 'Public Product Registry', observed_at: '2026-11-12T11:00:00Z' },
      { manufacturer_id: 'MFR-SYN-021', organization_name: 'Northstar Therapeutics Example', organization_role: 'manufacturer', country: 'CA', public_identifier: 'SYN-ORG-021', product_count_observed: 18, public_website: 'https://northstar-example.test', source: 'Public Product Registry', observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Organization Identity',
        desc: 'Public organization identifiers and roles in pharmaceutical product records.',
        fields: [
          { name: 'Manufacturer ID / Name', type: 'String', desc: 'Normalized organization key and published organization name.' },
          { name: 'Organization Role', type: 'Enum', desc: 'Manufacturer, labeler, distributor, or source-defined role.' },
          { name: 'Country', type: 'ISO 3166 String', desc: 'Country associated with the organization record.' },
          { name: 'Public Identifier', type: 'String', desc: 'Public registry or source organization code where available.' },
        ],
      },
      {
        title: 'Portfolio and Provenance',
        desc: 'Observed product links and public profile source details.',
        fields: [
          { name: 'Product Count Observed', type: 'Integer', desc: 'Count of linked catalog products in the configured scope.' },
          { name: 'Public Website', type: 'URL', desc: 'Organization website where identified in public sources.' },
          { name: 'Source', type: 'String', desc: 'Public registry or listing source for the organization record.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the profile observation.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are manufacturer profiles officially verified?', a: 'The dataset organizes public source information and is not an independent regulatory verification. Confirm organization and product details with authoritative sources for compliance decisions.' },
      { q: 'Can manufacturers be distinguished from labelers or distributors?', a: 'Yes, when source information identifies an organization role. The original source role can be retained alongside a normalized category.' },
      { q: 'Does product count reflect an organization’s complete portfolio?', a: 'No. Counts represent linked products observed within the configured sources and markets, not necessarily every product an organization makes or distributes.' },
      { q: 'Can organization records connect to drug listings?', a: 'Yes. Normalized organization identifiers and public product codes can link manufacturer records to product catalog entries where the source supports a match.' },
    ],
  },
  approvalStatus: {
    name: 'Approval Status',
    slug: 'approval-status',
    icon: ShieldCheck,
    badge: 'Regulatory Reference',
    badgeSubtext: 'Public approval and listing records',
    title: 'Pharmaceutical Approval Status Dataset',
    overviewCardTitle: 'Approval Reference Feed',
    description: 'Public regulatory reference records with product identifiers, jurisdiction, status label, application references, and effective dates.',
    heroDescription: 'Organize publicly available regulatory status information by product and jurisdiction. Preserve authority, source reference, and effective date so users can verify records against the relevant regulator before relying on them.',
    featurePoints: ['Jurisdiction-specific status', 'Product and application identifiers', 'Authority and source references', 'Effective date tracking'],
    stats: [
      { label: 'Status Fields', value: '25+', subtext: 'Jurisdiction and reference data' },
      { label: 'Coverage', value: 'Authority-based', subtext: 'Jurisdictions configured' },
      { label: 'References', value: 'Traceable', subtext: 'Public source links retained' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Regulatory records monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and jurisdiction record' },
      { label: 'Status basis', value: 'Authority-attributed', isHighlight: true },
    ],
    records: [
      { product_id: 'SYN-RX-00182', jurisdiction: 'US', authority: 'Example Public Registry', application_reference: 'SYN-APP-78014', status_label: 'listed in reference source', status_effective_date: '2026-04-15', source_record_id: 'SYN-REG-552801', source_url: 'https://registry.example.test/records/SYN-REG-552801', observed_at: '2026-11-12T12:00:00Z' },
      { product_id: 'SYN-OTC-00417', jurisdiction: 'CA', authority: 'Example Health Registry', application_reference: 'SYN-APP-92107', status_label: 'record located', status_effective_date: '2025-12-02', source_record_id: 'SYN-REG-661240', source_url: 'https://health-registry.example.test/records/SYN-REG-661240', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product and Regulatory Reference',
        desc: 'Keys connecting a product record to a public authority reference.',
        fields: [
          { name: 'Product ID', type: 'String', desc: 'Normalized catalog identifier for the referenced product.' },
          { name: 'Jurisdiction', type: 'ISO 3166 String', desc: 'Country or regulatory market applicable to the record.' },
          { name: 'Authority', type: 'String', desc: 'Public agency or registry attributed by the source.' },
          { name: 'Application / Source Record ID', type: 'String', desc: 'Public filing or registry identifiers where available.' },
        ],
      },
      {
        title: 'Status and Effective Dates',
        desc: 'Source-reported status labels and dates for verification.',
        fields: [
          { name: 'Status Label', type: 'String', desc: 'Status wording captured from the public reference source.' },
          { name: 'Status Effective Date', type: 'Date', desc: 'Effective or decision date when stated by the source.' },
          { name: 'Source URL', type: 'URL', desc: 'Public reference link where available.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the record was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a status label in this dataset constitute regulatory advice?', a: 'No. It is a structured representation of a public source record, not a regulatory determination or authorization to market, prescribe, dispense, or use a product.' },
      { q: 'Are approval statuses harmonized across jurisdictions?', a: 'Original authority wording and jurisdiction are retained. Regulatory terms and processes differ, so statuses should not be treated as directly equivalent across countries.' },
      { q: 'How should a status be verified?', a: 'Use the authority and source reference to consult the current official registry. Records include an observation timestamp and may not reflect later changes.' },
      { q: 'Are sample regulatory records real?', a: 'No. The sample records use synthetic products, authorities, and identifiers for demonstration and should not be interpreted as actual approvals or listings.' },
    ],
  },
  therapeuticClass: {
    name: 'Therapeutic Class',
    slug: 'therapeutic-class',
    icon: Tag,
    badge: 'Classification Reference',
    badgeSubtext: 'Product-to-class taxonomy mappings',
    title: 'Pharmaceutical Therapeutic Class Dataset',
    overviewCardTitle: 'Therapeutic Class Reference',
    description: 'Product classification mappings to public therapeutic or pharmacologic class taxonomies with source labels and version context.',
    heroDescription: 'Connect public product records to classification terms from selected reference sources. Retain the source taxonomy, classification level, and mapping context; these records are intended for data organization, not treatment selection.',
    featurePoints: ['Product and class identifiers', 'Source taxonomy attribution', 'Hierarchical class mappings', 'Version and confidence context'],
    stats: [
      { label: 'Class Fields', value: '20+', subtext: 'Labels and taxonomy links' },
      { label: 'Hierarchy', value: 'Multi-level', subtext: 'Source depth retained' },
      { label: 'Mappings', value: 'Traceable', subtext: 'Source and version linked' },
      { label: 'Refresh', value: 'Versioned', subtext: 'Taxonomy changes tracked' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Product and class mapping' },
      { label: 'Classification basis', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { product_id: 'SYN-RX-00182', ingredient_label: 'Sample Compound A', classification_source: 'Example Classification Index', taxonomy_code: 'SYN-CAT-014', class_label: 'Example Class Alpha', hierarchy_level: 3, parent_class_code: 'SYN-CAT-010', mapping_confidence: 0.94, taxonomy_version: '2026.1', observed_at: '2026-11-12T13:00:00Z' },
      { product_id: 'SYN-OTC-00417', ingredient_label: 'Sample Compound B', classification_source: 'Example Classification Index', taxonomy_code: 'SYN-CAT-221', class_label: 'Example Class Beta', hierarchy_level: 2, parent_class_code: 'SYN-CAT-200', mapping_confidence: 0.91, taxonomy_version: '2026.1', observed_at: '2026-11-12T13:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Product Classification Link',
        desc: 'Product identifiers and class assignments from a named reference source.',
        fields: [
          { name: 'Product ID / Ingredient Label', type: 'String', desc: 'Catalog product key and source ingredient wording.' },
          { name: 'Classification Source', type: 'String', desc: 'Public taxonomy or classification reference used.' },
          { name: 'Taxonomy Code / Class Label', type: 'String', desc: 'Source class code and descriptive label.' },
          { name: 'Hierarchy Level / Parent Code', type: 'Integer / String', desc: 'Taxonomy depth and parent node where available.' },
        ],
      },
      {
        title: 'Mapping Provenance',
        desc: 'Version and confidence context for maintaining reproducible mappings.',
        fields: [
          { name: 'Mapping Confidence', type: 'Decimal (0-1)', desc: 'Confidence value when assisted or normalized mapping is used.' },
          { name: 'Taxonomy Version', type: 'String', desc: 'Version of the source classification definitions.' },
          { name: 'Jurisdiction', type: 'String', desc: 'Market context for the product classification, if applicable.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp for the mapping record.' },
        ],
      },
    ],
    faqs: [
      { q: 'Can therapeutic class mappings be used to choose a medicine?', a: 'No. Classifications are reference metadata for organizing records and do not determine treatment suitability, safety, efficacy, or substitution. Consult a qualified healthcare professional.' },
      { q: 'Are class labels consistent across sources?', a: 'No. Taxonomies can differ in terminology, scope, hierarchy, and version. The dataset retains source attribution and taxonomy version.' },
      { q: 'How are uncertain mappings represented?', a: 'Mapping confidence and source context can be included. Ambiguous assignments should be reviewed against the underlying reference source.' },
      { q: 'Are sample products and classes real?', a: 'No. Sample product names, codes, and class labels are synthetic demonstration values.' },
    ],
  },
  marketTrends: {
    name: 'Market Trends',
    slug: 'market-trends',
    icon: BarChart2,
    badge: 'Pharmaceutical Market Signals',
    badgeSubtext: 'Public price and catalog indicators',
    title: 'Pharmaceutical Market Trends Dataset',
    overviewCardTitle: 'Market Trends Feed',
    description: 'Time-series summaries of observed public product listings, price points, seller coverage, and availability signals by market.',
    heroDescription: 'Analyze descriptive changes in publicly visible pharmaceutical catalogs and prices. Trend records document the underlying observation scope and methodology; they are not clinical, prescribing, or verified sales measures.',
    featurePoints: ['Market and category time series', 'Public listing and price indicators', 'Seller and package context', 'Sample and methodology details'],
    stats: [
      { label: 'Trend Measures', value: '20+', subtext: 'Price and catalog indicators' },
      { label: 'Dimensions', value: 'Market + class', subtext: 'Configured scope' },
      { label: 'Frequency', value: 'Period-based', subtext: 'Weekly or monthly summaries' },
      { label: 'Interpretation', value: 'Descriptive', subtext: 'Not clinical or sales data' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Market, product group, period' },
      { label: 'Trend basis', value: 'Observed public listings', isHighlight: true },
    ],
    records: [
      { market: 'US-CA', product_group: 'Synthetic class group A', period: '2026-10', active_listing_count: 428, median_listed_price: 18.2, currency: 'USD', seller_count_observed: 37, availability_rate_percent: 88.4, methodology_version: '1.0', observed_at: '2026-11-12T14:00:00Z' },
      { market: 'US-WA', product_group: 'Synthetic class group B', period: '2026-10', active_listing_count: 286, median_listed_price: 12.6, currency: 'USD', seller_count_observed: 24, availability_rate_percent: 91.1, methodology_version: '1.0', observed_at: '2026-11-12T14:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Market and Product Group',
        desc: 'Geographic and catalog dimensions for descriptive trend summaries.',
        fields: [
          { name: 'Market', type: 'String', desc: 'Country, region, or configured market grouping.' },
          { name: 'Product Group', type: 'String', desc: 'Configured product or classification grouping.' },
          { name: 'Period', type: 'Date / String', desc: 'Week, month, or other reporting interval.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of aggregation definitions and calculation rules.' },
        ],
      },
      {
        title: 'Observed Indicators',
        desc: 'Public catalog, listed price, seller, and availability summaries.',
        fields: [
          { name: 'Active Listing Count', type: 'Integer', desc: 'Observed product listings meeting the defined scope.' },
          { name: 'Median Listed Price / Currency', type: 'Decimal / String', desc: 'Median observed public price and currency.' },
          { name: 'Seller Count Observed', type: 'Integer', desc: 'Distinct sellers with qualifying listings.' },
          { name: 'Availability Rate', type: 'Decimal (%)', desc: 'Share of sampled listings with an available status.' },
        ],
      },
    ],
    faqs: [
      { q: 'Do market trends indicate medicine sales or patient demand?', a: 'No. The dataset summarizes public listing, price, seller, and availability observations. It does not represent verified sales, prescriptions, or patient demand.' },
      { q: 'Can trends be compared between markets?', a: 'Comparisons require aligned product scope, package definitions, currency treatment, sources, and collection periods. Methodology and sample details should be reviewed.' },
      { q: 'How are price summaries calculated?', a: 'Price indicators are aggregated from observed public listings within the defined scope. The methodology version and currency context accompany the summaries.' },
      { q: 'What time periods are available?', a: 'Weekly or monthly summaries may be available depending on source history and collection cadence.' },
    ],
  },
  substituteDrugs: {
    name: 'Substitute Drugs',
    slug: 'substitute-drugs',
    icon: Search,
    badge: 'Product Relationship Reference',
    badgeSubtext: 'Source-linked related product records',
    title: 'Pharmaceutical Related Products Dataset',
    overviewCardTitle: 'Related Product Reference',
    description: 'Source-attributed relationships between medicine product records, including relationship labels, package identifiers, and jurisdiction context.',
    heroDescription: 'Organize public cross-reference links between pharmaceutical product listings. Preserve the source’s relationship wording and product identifiers; a catalog relationship does not establish clinical equivalence or suitability for substitution.',
    featurePoints: ['Product-to-product relationships', 'Source relationship labels', 'Package and market context', 'Reference provenance retained'],
    stats: [
      { label: 'Relationship Fields', value: '20+', subtext: 'Product and source context' },
      { label: 'Link Basis', value: 'Source-labeled', subtext: 'Original relationship retained' },
      { label: 'Granularity', value: 'Package-aware', subtext: 'Product identifiers preserved' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Reference changes monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Related product pair' },
      { label: 'Relationship basis', value: 'Source-attributed only', isHighlight: true },
    ],
    records: [
      { relationship_id: 'REL-SYN-00041', source_product_id: 'SYN-RX-00182', related_product_id: 'SYN-RX-00317', source_relationship_label: 'same ingredient listing', relationship_type: 'catalog_reference', source: 'Example Product Index', jurisdiction: 'US', review_required: true, observed_at: '2026-11-12T15:00:00Z' },
      { relationship_id: 'REL-SYN-00092', source_product_id: 'SYN-OTC-00417', related_product_id: 'SYN-OTC-00528', source_relationship_label: 'related catalog entry', relationship_type: 'source_cross_reference', source: 'Example Product Index', jurisdiction: 'CA', review_required: true, observed_at: '2026-11-12T15:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Related Product Pair',
        desc: 'Product identifiers for a source-published relationship.',
        fields: [
          { name: 'Relationship ID', type: 'String', desc: 'Stable key for the linked product pair.' },
          { name: 'Source Product ID', type: 'String', desc: 'Identifier for the starting catalog product.' },
          { name: 'Related Product ID', type: 'String', desc: 'Identifier for the linked catalog record.' },
          { name: 'Jurisdiction', type: 'ISO 3166 String', desc: 'Market context associated with the source relationship.' },
        ],
      },
      {
        title: 'Relationship Provenance',
        desc: 'Source wording and review context for interpreting product links.',
        fields: [
          { name: 'Source Relationship Label', type: 'String', desc: 'Original wording used by the public reference source.' },
          { name: 'Relationship Type', type: 'Enum', desc: 'Normalized catalog cross-reference category.' },
          { name: 'Source', type: 'String', desc: 'Public directory or source providing the relationship.' },
          { name: 'Review Required / Observed At', type: 'Boolean / ISO-8601', desc: 'Review flag and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does a related-product link mean the products can be substituted clinically?', a: 'No. A catalog relationship is not a clinical recommendation and does not establish therapeutic equivalence, safety, dose equivalence, or suitability. Consult a qualified healthcare professional or pharmacist.' },
      { q: 'What relationship types are included?', a: 'The dataset records source-published cross-references and may normalize their labels for organization. Original wording and source attribution are retained.' },
      { q: 'Are package and strength differences considered?', a: 'Product identifiers and public package attributes can be included to support reference review, but the dataset does not assess whether products are medically interchangeable.' },
      { q: 'Are the related-product sample records real?', a: 'No. Sample products, sources, and identifiers are synthetic demonstration values and do not refer to actual medicines.' },
    ],
  },
};