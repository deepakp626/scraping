import {
  CalendarRange,
  Database,
  Film,
  Globe,
  Layers,
  Star,
  Tag,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { DataDictionaryGroup, FAQItem } from '../components/DatasetTemplate';

export type OttMediaDatasetKey =
  | 'contentCatalog'
  | 'ratingsReviews'
  | 'platformCoverage'
  | 'genreMetadata'
  | 'castCrew'
  | 'releaseDates'
  | 'trendingTitles'
  | 'languageData';

interface OttMediaDataset {
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

export const ottMediaDatasets: Record<OttMediaDatasetKey, OttMediaDataset> = {
  contentCatalog: {
    name: 'Content Catalog',
    slug: 'content-catalog',
    icon: Film,
    badge: 'Streaming Catalog',
    badgeSubtext: 'Titles and availability attributes',
    title: 'OTT Content Catalog Dataset',
    overviewCardTitle: 'Content Catalog Feed',
    description: 'Structured film and series records with title identifiers, format, synopsis, runtime, release year, content rating, and platform context.',
    heroDescription: 'Build a normalized catalog of movies, series, and episodes across streaming platforms. Link source-specific title records to stable content identifiers while preserving release, format, and availability context.',
    featurePoints: ['Title and platform identifiers', 'Film, series, and episode types', 'Release and runtime attributes', 'Synopsis and content ratings'],
    stats: [
      { label: 'Catalog Fields', value: '40+', subtext: 'Title and availability attributes' },
      { label: 'Content Types', value: 'Multi-format', subtext: 'Films, series, episodes' },
      { label: 'Coverage', value: 'Platform-based', subtext: 'Markets selected per project' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Cadence based on sources' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title, series, or episode' },
      { label: 'Catalog basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', platform_title_id: 'SV-CT-41028', title: 'The Glass Orchard', content_type: 'film', release_year: 2024, original_language: 'en', runtime_minutes: 112, content_rating: 'PG-13', platform: 'StreamVista', synopsis: 'A botanist returns to her coastal hometown to restore a historic greenhouse.', observed_at: '2026-11-12T08:30:00Z' },
      { content_id: 'OTT-SER-194520', platform_title_id: 'PL-TS-82017', title: 'Signal Harbor', content_type: 'series', release_year: 2023, original_language: 'en', runtime_minutes: 48, content_rating: 'TV-14', platform: 'PineLine', synopsis: 'A small radio station uncovers a mystery in its remote island community.', observed_at: '2026-11-12T08:45:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Title Identity and Format',
        desc: 'Content identifiers and format details for matching across platforms.',
        fields: [
          { name: 'Content ID / Platform Title ID', type: 'String', desc: 'Normalized content key and source-specific title identifier.' },
          { name: 'Title', type: 'String', desc: 'Displayed title as published by the platform.' },
          { name: 'Content Type', type: 'Enum', desc: 'Film, series, season, or episode classification.' },
          { name: 'Release Year', type: 'Integer', desc: 'Year associated with the content release.' },
        ],
      },
      {
        title: 'Catalog Details',
        desc: 'Runtime, language, content rating, and descriptive attributes.',
        fields: [
          { name: 'Original Language', type: 'ISO 639 String', desc: 'Original production language where identified.' },
          { name: 'Runtime', type: 'Integer (minutes)', desc: 'Displayed runtime for the title or episode.' },
          { name: 'Content Rating', type: 'String', desc: 'Age or suitability classification shown by the source.' },
          { name: 'Platform / Observed At', type: 'String / ISO-8601', desc: 'Streaming service and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'How are the same titles matched across platforms?', a: 'Matching can use external identifiers, title, release year, format, episode details, and other metadata. Platform-specific IDs remain available, and uncertain matches can be flagged.' },
      { q: 'Does a catalog listing guarantee a title is currently playable?', a: 'No. The record reflects source-observed catalog information at capture time. Playback eligibility can vary by region, subscription, and account.' },
      { q: 'Can the catalog distinguish films, series, seasons, and episodes?', a: 'Yes, when the platform exposes that structure. Series and episode relationships can be represented with parent identifiers and source metadata.' },
      { q: 'How often is catalog information refreshed?', a: 'Refresh cadence depends on selected platforms, regions, and source availability. Scheduled snapshots can be configured for an agreed scope.' },
    ],
  },
  ratingsReviews: {
    name: 'Ratings & Reviews',
    slug: 'ratings-reviews',
    icon: Star,
    badge: 'Audience Feedback',
    badgeSubtext: 'Public title ratings and reviews',
    title: 'OTT Ratings & Reviews Dataset',
    overviewCardTitle: 'Ratings and Reviews Feed',
    description: 'Public audience and critic review records with title, platform, rating scale, review date, language, and source context.',
    heroDescription: 'Analyze public reactions to films and series across review platforms and streaming services. Preserve each rating scale and source attribution so audience scores, critic reviews, and platform ratings are not conflated.',
    featurePoints: ['Title and review identifiers', 'Source-specific rating scales', 'Review text and dates', 'Audience and critic context'],
    stats: [
      { label: 'Review Fields', value: '25+', subtext: 'Score and provenance data' },
      { label: 'Rating Context', value: 'Scale included', subtext: 'Source values preserved' },
      { label: 'Granularity', value: 'Title-level', subtext: 'Review records by source' },
      { label: 'Refresh', value: 'Periodic', subtext: 'Subject to source access' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Individual public review' },
      { label: 'Review basis', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { review_id: 'REV-770214', content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', source: 'ScreenLedger', reviewer_type: 'audience', rating_value: 8.1, rating_scale_max: 10, review_title: 'A quietly moving story', review_text: 'A thoughtful film with a strong central performance and beautiful production design.', language: 'en', review_date: '2026-10-28', observed_at: '2026-11-12T09:00:00Z' },
      { review_id: 'REV-881037', content_id: 'OTT-SER-194520', title: 'Signal Harbor', source: 'Viewers Circle', reviewer_type: 'critic', rating_value: 4, rating_scale_max: 5, review_title: 'Patient and atmospheric', review_text: 'The series takes its time, building a compelling sense of place.', language: 'en', review_date: '2026-11-01', observed_at: '2026-11-12T09:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Review and Rating',
        desc: 'Public review content and score values with source scale details.',
        fields: [
          { name: 'Review ID', type: 'String', desc: 'Source review identifier or stable normalized key.' },
          { name: 'Rating Value / Scale', type: 'Decimal', desc: 'Score and maximum value used by the source.' },
          { name: 'Reviewer Type', type: 'Enum', desc: 'Audience, critic, or other source-defined reviewer category.' },
          { name: 'Review Title / Text', type: 'String', desc: 'Public review content, subject to source terms.' },
        ],
      },
      {
        title: 'Title and Provenance',
        desc: 'Content identity and source context for feedback analysis.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized title identifier and display name.' },
          { name: 'Source', type: 'String', desc: 'Public review platform or rating publisher.' },
          { name: 'Language / Review Date', type: 'String / Date', desc: 'Review language and source publication date.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the record was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are review scores normalized across platforms?', a: 'Original scores and scale maxima are preserved. Different platforms should not be assumed equivalent unless a separate, documented normalization method is applied.' },
      { q: 'Are reviews independently verified as genuine viewers?', a: 'No. The dataset captures source-published content and metadata; it does not independently verify reviewer identity or viewing history.' },
      { q: 'Can critic and audience ratings be separated?', a: 'Yes. Reviewer type is retained when the source provides it, allowing critic, audience, and other rating categories to be analyzed separately.' },
      { q: 'Can original review language be preserved?', a: 'Public text can be retained with a source-provided or detected language code, subject to source terms and the requested collection scope.' },
    ],
  },
  platformCoverage: {
    name: 'Platform Coverage',
    slug: 'platform-coverage',
    icon: Globe,
    badge: 'Streaming Availability',
    badgeSubtext: 'Title and market coverage matrix',
    title: 'OTT Platform Coverage Dataset',
    overviewCardTitle: 'Platform Coverage Map',
    description: 'Title availability observations across streaming platforms and markets, including access type and last-seen timestamps where available.',
    heroDescription: 'Map where films and series appear across streaming catalogs. Coverage records connect normalized titles to platforms and regions, while distinguishing subscription, rental, purchase, and other observed access types.',
    featurePoints: ['Title-to-platform relationships', 'Region-specific coverage', 'Access type and status', 'Coverage observation timestamps'],
    stats: [
      { label: 'Coverage Keys', value: '3 levels', subtext: 'Title, platform, region' },
      { label: 'Access Types', value: 'Multi-mode', subtext: 'Subscription, rental, purchase' },
      { label: 'Presence', value: 'Observed', subtext: 'Scope documented per feed' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Coverage snapshots' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title, platform, region' },
      { label: 'Availability basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'StreamVista', region: 'US', coverage_status: 'available', access_type: 'subscription', audio_languages_count: 3, subtitle_languages_count: 14, last_observed_at: '2026-11-12T10:00:00Z' },
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'PineLine', region: 'CA', coverage_status: 'available', access_type: 'rental', audio_languages_count: 2, subtitle_languages_count: 9, last_observed_at: '2026-11-12T10:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Title and Platform Coverage',
        desc: 'Content, service, and geographic keys defining an availability record.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized title key and display name.' },
          { name: 'Platform', type: 'String', desc: 'Streaming service where the title was observed.' },
          { name: 'Region', type: 'ISO 3166 String', desc: 'Country or market where the catalog was checked.' },
          { name: 'Coverage Status', type: 'Enum', desc: 'Observed available, unavailable, or other source state.' },
        ],
      },
      {
        title: 'Access and Freshness',
        desc: 'Viewing access type and localization counts where exposed.',
        fields: [
          { name: 'Access Type', type: 'Enum', desc: 'Subscription, rental, purchase, free, or source-defined mode.' },
          { name: 'Audio Languages Count', type: 'Integer', desc: 'Number of audio language options shown for the title.' },
          { name: 'Subtitle Languages Count', type: 'Integer', desc: 'Number of subtitle languages shown for the title.' },
          { name: 'Last Observed At', type: 'ISO-8601', desc: 'UTC timestamp of the latest platform-region check.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does missing coverage mean a title is unavailable in a region?', a: 'Not necessarily. Missing records can reflect configured scope, source visibility, or collection timing. Interpret coverage with its status and last-observed timestamp.' },
      { q: 'Can availability distinguish subscription from rental or purchase?', a: 'Yes, when the platform exposes access type. The source mode is captured separately from the title’s general presence.' },
      { q: 'Does platform coverage guarantee playback?', a: 'No. Playback can depend on subscription tier, account, device, and changing regional rights. The data records catalog observations, not playback authorization.' },
      { q: 'How frequently is platform coverage refreshed?', a: 'Refresh cadence depends on selected platforms and regions. Scheduled checks can be configured for the requested coverage scope.' },
    ],
  },
  genreMetadata: {
    name: 'Genre Metadata',
    slug: 'genre-metadata',
    icon: Tag,
    badge: 'Content Taxonomy',
    badgeSubtext: 'Genre and thematic classification',
    title: 'OTT Genre Metadata Dataset',
    overviewCardTitle: 'Genre Metadata Catalog',
    description: 'Normalized genre, subgenre, and theme labels for films and series, with original platform tags and title associations.',
    heroDescription: 'Unify content discovery labels across streaming catalogs. Preserve each platform’s original genre wording alongside normalized taxonomy assignments for search, catalog analysis, and cross-service comparison.',
    featurePoints: ['Hierarchical genre taxonomy', 'Original platform tags retained', 'Title-level mappings', 'Versioned classification context'],
    stats: [
      { label: 'Taxonomy Levels', value: '4+', subtext: 'Genre and subgenre depth' },
      { label: 'Mapping', value: 'Cross-platform', subtext: 'Source labels preserved' },
      { label: 'Classification', value: 'Multi-label', subtext: 'Multiple genres per title' },
      { label: 'Versioning', value: 'Documented', subtext: 'Taxonomy changes traceable' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title and genre mapping' },
      { label: 'Taxonomy basis', value: 'Source labels retained', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'StreamVista', source_genre_label: 'Drama, Coming-of-Age', normalized_genre: 'Drama', normalized_subgenre: 'Coming of Age', theme_tag: 'Family', mapping_confidence: 0.96, taxonomy_version: '2026.1', observed_at: '2026-11-12T11:00:00Z' },
      { content_id: 'OTT-SER-194520', title: 'Signal Harbor', platform: 'PineLine', source_genre_label: 'Mystery; Small Town Stories', normalized_genre: 'Mystery', normalized_subgenre: 'Small Town Mystery', theme_tag: 'Community', mapping_confidence: 0.91, taxonomy_version: '2026.1', observed_at: '2026-11-12T11:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Source Genre Labels',
        desc: 'Platform and original category terminology associated with a title.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized content key and displayed title.' },
          { name: 'Platform', type: 'String', desc: 'Streaming catalog providing the genre label.' },
          { name: 'Source Genre Label', type: 'String', desc: 'Original genre wording or tag from the platform.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the metadata was captured.' },
        ],
      },
      {
        title: 'Normalized Taxonomy',
        desc: 'Mapped genre hierarchy and taxonomy provenance.',
        fields: [
          { name: 'Normalized Genre / Subgenre', type: 'String', desc: 'Standardized genre and narrower classification.' },
          { name: 'Theme Tag', type: 'String', desc: 'Optional theme descriptor separate from genre.' },
          { name: 'Mapping Confidence', type: 'Decimal (0-1)', desc: 'Confidence score when automated or assisted mapping is used.' },
          { name: 'Taxonomy Version', type: 'String', desc: 'Version of the normalized genre definitions.' },
        ],
      },
    ],
    faqs: [
      { q: 'Can a title have more than one genre?', a: 'Yes. Titles commonly have multiple source tags and normalized genre associations. Each mapping can be retained as a separate record.' },
      { q: 'Are platform genre labels replaced by normalized labels?', a: 'No. Original source terms are retained alongside normalized values so users can distinguish publisher wording from taxonomy mapping.' },
      { q: 'How are ambiguous genre labels handled?', a: 'Mappings can include confidence and taxonomy version. Ambiguous values can be flagged for review rather than presented as certain.' },
      { q: 'Can genre definitions change over time?', a: 'Yes. Taxonomy versioning and observation timestamps support tracking definition and mapping changes.' },
    ],
  },
  castCrew: {
    name: 'Cast & Crew',
    slug: 'cast-crew',
    icon: Database,
    badge: 'People and Credits',
    badgeSubtext: 'Title-level cast and production roles',
    title: 'OTT Cast & Crew Dataset',
    overviewCardTitle: 'Cast and Crew Feed',
    description: 'Content credits linking people to films and series with character, department, role, billing order, and source identifiers.',
    heroDescription: 'Structure on-screen and production credits across streaming catalogs. Link people and titles through normalized identifiers while retaining original role descriptions and source ordering.',
    featurePoints: ['Person and title identifiers', 'Cast and crew roles', 'Character and department data', 'Source billing order'],
    stats: [
      { label: 'Credit Fields', value: '20+', subtext: 'Person, title, and role data' },
      { label: 'Credit Types', value: 'Multi-role', subtext: 'Cast and production crew' },
      { label: 'Relationships', value: 'Person → Title', subtext: 'Credits linked by source' },
      { label: 'Refresh', value: 'On change', subtext: 'Catalog updates monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Person-title credit' },
      { label: 'Credit basis', value: 'Source-attributed', isHighlight: true },
    ],
    records: [
      { credit_id: 'CRD-88102', content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', person_id: 'PERS-40182', person_name: 'Mara Venn', credit_type: 'cast', role_name: 'Elena Vale', department: 'Acting', billing_order: 1, source_credit_id: 'SV-C-1041', observed_at: '2026-11-12T12:00:00Z' },
      { credit_id: 'CRD-91744', content_id: 'OTT-SER-194520', title: 'Signal Harbor', person_id: 'PERS-20817', person_name: 'Dev Patelson', credit_type: 'crew', role_name: 'Director', department: 'Directing', billing_order: 2, source_credit_id: 'PL-C-2290', observed_at: '2026-11-12T12:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Person and Title Identity',
        desc: 'Normalized people and content identifiers associated with each credit.',
        fields: [
          { name: 'Person ID / Name', type: 'String', desc: 'Normalized person key and source-displayed name.' },
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized content key and title name.' },
          { name: 'Credit ID', type: 'String', desc: 'Stable key for the person-title-role relationship.' },
          { name: 'Source Credit ID', type: 'String', desc: 'Credit identifier from the contributing platform.' },
        ],
      },
      {
        title: 'Credit Role',
        desc: 'Cast or crew designation and source ordering context.',
        fields: [
          { name: 'Credit Type', type: 'Enum', desc: 'Cast, crew, or other source-defined credit category.' },
          { name: 'Role Name', type: 'String', desc: 'Character name or production role as published.' },
          { name: 'Department', type: 'String', desc: 'Production department where available.' },
          { name: 'Billing Order / Observed At', type: 'Integer / ISO-8601', desc: 'Source order and UTC capture timestamp.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are cast and crew credits complete for every title?', a: 'Credit coverage varies by platform and title. Records reflect credits exposed by the selected sources and should not be assumed to represent a complete production roll.' },
      { q: 'How are people with the same name distinguished?', a: 'Matching may use source person IDs, known title credits, and other public metadata. Source identifiers are retained, and uncertain identity matches can be flagged.' },
      { q: 'Does billing order represent a contractual credit order?', a: 'No. It records the ordering presented by the source and does not establish contractual billing terms.' },
      { q: 'Can credits be linked to series episodes?', a: 'Yes, when the source provides episode-level credit data and episode identifiers. Otherwise the credit may be associated with the series or season.' },
    ],
  },
  releaseDates: {
    name: 'Release Dates',
    slug: 'release-dates',
    icon: CalendarRange,
    badge: 'Release Calendar',
    badgeSubtext: 'Regional and platform launch dates',
    title: 'OTT Release Dates Dataset',
    overviewCardTitle: 'Release Calendar Feed',
    description: 'Title release and availability dates by platform and region, including premiere type, release status, and source context.',
    heroDescription: 'Track when films and series premiere, arrive on a streaming service, or become available in different regions. Distinguish original release dates from platform launch dates and retain timezone and source information where published.',
    featurePoints: ['Title and platform dates', 'Region-specific launch timing', 'Premiere type and status', 'Date-source provenance'],
    stats: [
      { label: 'Release Fields', value: '20+', subtext: 'Date and launch context' },
      { label: 'Granularity', value: 'Title × region', subtext: 'Platform-specific dates' },
      { label: 'Date Types', value: 'Multiple', subtext: 'Premiere, catalog, episode' },
      { label: 'Refresh', value: 'Scheduled', subtext: 'Upcoming dates monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title, platform, region' },
      { label: 'Date basis', value: 'Source-published', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'StreamVista', region: 'US', release_date: '2026-12-04', release_type: 'platform_premiere', release_status: 'scheduled', timezone: 'America/Los_Angeles', source_announcement_date: '2026-10-20', observed_at: '2026-11-12T13:00:00Z' },
      { content_id: 'OTT-SER-194520', title: 'Signal Harbor', platform: 'PineLine', region: 'CA', release_date: '2026-12-11', release_type: 'season_premiere', release_status: 'scheduled', timezone: 'America/Toronto', source_announcement_date: '2026-10-27', observed_at: '2026-11-12T13:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Title and Release Event',
        desc: 'Content identity and event type associated with each date.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized content identifier and display title.' },
          { name: 'Release Type', type: 'Enum', desc: 'Original premiere, platform launch, season, or episode release.' },
          { name: 'Release Date', type: 'Date', desc: 'Date announced or observed for the release event.' },
          { name: 'Release Status', type: 'Enum', desc: 'Scheduled, released, delayed, or source-defined status.' },
        ],
      },
      {
        title: 'Platform and Region Context',
        desc: 'Streaming service, market, and announcement provenance.',
        fields: [
          { name: 'Platform', type: 'String', desc: 'Streaming service associated with the release event.' },
          { name: 'Region', type: 'ISO 3166 String', desc: 'Country or region where the date applies.' },
          { name: 'Timezone', type: 'IANA String', desc: 'Timezone context when the source specifies one.' },
          { name: 'Announcement Date / Observed At', type: 'Date / ISO-8601', desc: 'Source announcement and UTC capture timestamps.' },
        ],
      },
    ],
    faqs: [
      { q: 'Are announced release dates guaranteed?', a: 'No. Dates can be changed or delayed by distributors and platforms. Records include status and observation time to show when the date was last confirmed in a source.' },
      { q: 'Does the release date mean the title is available worldwide?', a: 'Not necessarily. Availability can vary by region and platform. Regional context is captured when the source provides it.' },
      { q: 'Can original premieres be distinguished from streaming launches?', a: 'Yes. Release type distinguishes original release, platform premiere, season, and episode events when identified by the source.' },
      { q: 'How are dates handled when a source uses a timezone?', a: 'The date and timezone are retained where available. Dates without timezone detail are not assigned an assumed local time.' },
    ],
  },
  trendingTitles: {
    name: 'Trending Titles',
    slug: 'trending-titles',
    icon: TrendingUp,
    badge: 'Popularity Signals',
    badgeSubtext: 'Platform-specific trend observations',
    title: 'OTT Trending Titles Dataset',
    overviewCardTitle: 'Trending Titles Feed',
    description: 'Time-stamped title rankings and popularity indicators by streaming platform, region, chart type, and observation period.',
    heroDescription: 'Track how titles appear on platform charts and public trending surfaces. Preserve rank, chart type, market, and capture time so changes can be interpreted without treating rankings as verified viewing or subscriber data.',
    featurePoints: ['Chart rank and title keys', 'Platform and regional context', 'Chart type and period', 'Timestamped rank history'],
    stats: [
      { label: 'Trend Fields', value: '18+', subtext: 'Rank and chart context' },
      { label: 'Dimensions', value: 'Platform + region', subtext: 'Chart-specific observations' },
      { label: 'History', value: 'Timestamped', subtext: 'Position changes over time' },
      { label: 'Interpretation', value: 'Directional', subtext: 'Not viewership measurement' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title, chart, platform' },
      { label: 'Trend basis', value: 'Observed rank signals', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'StreamVista', region: 'US', chart_type: 'Top Movies', chart_period: 'daily', rank_position: 4, previous_rank: 7, rank_change: 3, chart_date: '2026-11-12', methodology_version: '1.0', observed_at: '2026-11-12T14:00:00Z' },
      { content_id: 'OTT-SER-194520', title: 'Signal Harbor', platform: 'PineLine', region: 'CA', chart_type: 'Popular Series', chart_period: 'weekly', rank_position: 8, previous_rank: 5, rank_change: -3, chart_date: '2026-11-12', methodology_version: '1.0', observed_at: '2026-11-12T14:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Title and Chart Position',
        desc: 'Title identity and observed rank on the specified discovery surface.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized content identifier and title name.' },
          { name: 'Chart Type', type: 'String', desc: 'Chart or trending surface where the title appeared.' },
          { name: 'Rank Position', type: 'Integer', desc: 'Observed position in the captured chart.' },
          { name: 'Previous Rank / Rank Change', type: 'Integer', desc: 'Prior observed rank and calculated movement where available.' },
        ],
      },
      {
        title: 'Platform and Observation Context',
        desc: 'Platform, region, period, and methodology context for each trend signal.',
        fields: [
          { name: 'Platform / Region', type: 'String', desc: 'Streaming service and market associated with the chart.' },
          { name: 'Chart Period / Date', type: 'String / Date', desc: 'Daily, weekly, or source-defined chart interval.' },
          { name: 'Methodology Version', type: 'String', desc: 'Version of any normalized rank aggregation.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when the chart was captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Do trending ranks represent actual view counts?', a: 'No. A chart position is a platform-specific popularity signal. It does not provide verified streams, watch time, subscribers, or revenue unless those metrics are separately supplied by an authorized source.' },
      { q: 'Can ranks be compared across platforms?', a: 'Rankings are most meaningful within the same platform, chart type, region, and time period. Different platforms may use different ranking methods.' },
      { q: 'How often are trending charts captured?', a: 'Capture frequency depends on platform visibility and the project scope. Daily or weekly snapshots can be configured where available.' },
      { q: 'What does rank change measure?', a: 'It compares the current observed position with a prior captured position for the same chart context; it is not a measure of audience growth.' },
    ],
  },
  languageData: {
    name: 'Language Data',
    slug: 'language-data',
    icon: Layers,
    badge: 'Localization Metadata',
    badgeSubtext: 'Audio, subtitle, and original language',
    title: 'OTT Language Data Dataset',
    overviewCardTitle: 'Language Availability Feed',
    description: 'Title-level language metadata covering original language, available audio tracks, subtitles, and platform-region context.',
    heroDescription: 'Compare localization options for streaming titles across services and markets. Distinguish a title’s original language from platform-provided audio and subtitle options, preserving the region and source where each option was observed.',
    featurePoints: ['Original production language', 'Audio track availability', 'Subtitle language options', 'Platform and region context'],
    stats: [
      { label: 'Language Fields', value: '20+', subtext: 'Audio and subtitle metadata' },
      { label: 'Granularity', value: 'Title × region', subtext: 'Platform-specific options' },
      { label: 'Language Codes', value: 'Standardized', subtext: 'Source labels preserved' },
      { label: 'Refresh', value: 'On change', subtext: 'Catalog updates monitored' },
    ],
    metadataItems: [
      { label: 'Formats', value: 'CSV, JSON, Parquet' },
      { label: 'Granularity', value: 'Title, platform, language' },
      { label: 'Language basis', value: 'Source-observed', isHighlight: true },
    ],
    records: [
      { content_id: 'OTT-FLM-882104', title: 'The Glass Orchard', platform: 'StreamVista', region: 'US', original_language: 'en', audio_language: 'en', audio_type: 'original', subtitle_language: 'es', subtitle_type: 'closed_caption', accessibility_track: false, observed_at: '2026-11-12T15:00:00Z' },
      { content_id: 'OTT-SER-194520', title: 'Signal Harbor', platform: 'PineLine', region: 'CA', original_language: 'en', audio_language: 'fr', audio_type: 'dubbed', subtitle_language: 'en', subtitle_type: 'subtitle', accessibility_track: true, observed_at: '2026-11-12T15:10:00Z' },
    ],
    attributeGroups: [
      {
        title: 'Title and Language',
        desc: 'Content identity and original production language context.',
        fields: [
          { name: 'Content ID / Title', type: 'String', desc: 'Normalized content identifier and display title.' },
          { name: 'Original Language', type: 'ISO 639 String', desc: 'Language of the original production where identified.' },
          { name: 'Platform / Region', type: 'String', desc: 'Streaming service and catalog market for the observation.' },
          { name: 'Language Label', type: 'String', desc: 'Original platform wording where standard code mapping is uncertain.' },
        ],
      },
      {
        title: 'Audio and Subtitle Options',
        desc: 'Localization tracks and accessibility indicators shown by the platform.',
        fields: [
          { name: 'Audio Language / Type', type: 'ISO 639 / Enum', desc: 'Audio language and original, dubbed, or descriptive type.' },
          { name: 'Subtitle Language / Type', type: 'ISO 639 / Enum', desc: 'Subtitle language and subtitle or caption designation.' },
          { name: 'Accessibility Track', type: 'Boolean', desc: 'Indicates an accessibility-specific track where identified.' },
          { name: 'Observed At', type: 'ISO-8601', desc: 'UTC timestamp when language options were captured.' },
        ],
      },
    ],
    faqs: [
      { q: 'Does original language mean that audio track is available on every platform?', a: 'No. Original language and platform audio options are separate attributes. A platform may not offer every track in every region.' },
      { q: 'Are subtitles and closed captions distinguished?', a: 'They are separated when the source identifies track type. If the platform provides only a language label, the type is not inferred.' },
      { q: 'How are language names standardized?', a: 'Language labels can be mapped to standard codes while preserving the original platform wording for review and localization-specific variants.' },
      { q: 'Can accessibility tracks be identified?', a: 'Accessibility indicators such as descriptive audio or closed captions can be included when explicitly identified by the platform.' },
    ],
  },
};