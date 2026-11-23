'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { travelDatasets, type TravelDatasetKey } from './travelDatasetData';

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

export default function TravelDatasetPage({ datasetKey }: { datasetKey: TravelDatasetKey }) {
  const dataset = travelDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(travelDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/travel/${sibling.slug}`,
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
        { label: 'Travel', href: '/datasets/travel' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured travel datasets for flight schedules, fares, hotel rates, reviews, route networks, and package offers."
      hubServiceLink="/services/travel-data-scraping"
      hubServiceLinkLabel="Travel Data Services"
      badgeText={`Travel ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/travel-data-scraping"
      customPipelineLabel="Need a Custom Travel Feed?"
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
      jsonFilename={`travel_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`travel_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Travel Data"
      siblingSectionTitle="Explore Travel Datasets"
      siblingSectionDescription="Connect schedules, fares, accommodation, reviews, route networks, inventory, carrier profiles, and package offers for a fuller travel-market view."
      siblingViewAllLink="/datasets/travel"
      siblingViewAllLabel="View All Travel Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={[
        dataset.faq,
        {
          q: 'How often are travel datasets refreshed?',
          a: 'Refresh cadence depends on source availability, the selected markets, and the fields requested. Scheduled snapshots can be configured for daily, weekly, or other agreed intervals.',
        },
        {
          q: 'Which delivery formats are available?',
          a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery to a preferred storage destination or data platform can be scoped for a custom feed.',
        },
      ]}
    />
  );
}