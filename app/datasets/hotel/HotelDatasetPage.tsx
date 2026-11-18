'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { hotelDatasets, type HotelDatasetKey } from './hotelDatasetData';

function toCsv(records: Record<string, string | number | boolean>[]) {
  const headers = Object.keys(records[0] ?? {});
  const rows = records.map((record) =>
    headers
      .map((header) => {
        const value = String(record[header] ?? '');
        return `"${value.replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

export default function HotelDatasetPage({ datasetKey }: { datasetKey: HotelDatasetKey }) {
  const dataset = hotelDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(hotelDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/hotel/${sibling.slug}`,
    desc: sibling.description,
    icon: sibling.icon,
    badge: sibling.badge,
    active: sibling.slug === dataset.slug,
  }));

  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'Hotel', href: '/datasets/hotel' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured hotel datasets for property listings, rate parity, guest feedback, room availability, amenities, and channel coverage."
      hubServiceLink="/services/travel-data-scraping"
      hubServiceLinkLabel="Hotel Data Services"
      badgeText={`Hotel ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/travel-data-scraping"
      customPipelineLabel="Need a Custom Hotel Feed?"
      overviewCardTitle={dataset.overviewCardTitle}
      stats={dataset.stats}
      metadataItems={dataset.metadataItems}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline={`${dataset.name} Sample`}
      sampleSectionTitle={`Explore the ${dataset.name} Schema`}
      sampleSectionDescription={dataset.description}
      jsonSample={dataset.records}
      csvSample={toCsv(dataset.records)}
      jsonFilename={`hotel_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`hotel_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Hotel Data"
      siblingSectionTitle="Explore Hotel Datasets"
      siblingSectionDescription="Connect property profiles, rates, reviews, availability, facilities, channel presence, locations, and rating signals for a fuller hospitality-market view."
      siblingViewAllLink="/datasets/hotel"
      siblingViewAllLabel="View All Hotel Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}