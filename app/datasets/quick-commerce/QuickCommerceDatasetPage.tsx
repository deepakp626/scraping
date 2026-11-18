'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { quickCommerceDatasets, type QuickCommerceDatasetKey } from './quickCommerceDatasetData';

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

export default function QuickCommerceDatasetPage({ datasetKey }: { datasetKey: QuickCommerceDatasetKey }) {
  const dataset = quickCommerceDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(quickCommerceDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/quick-commerce/${sibling.slug}`,
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
        { label: 'Quick Commerce', href: '/datasets' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured quick-commerce datasets covering fulfillment locations, delivery options, pricing, availability, and market signals."
      hubServiceLink="/services/quick-commerce-scraping"
      hubServiceLinkLabel="Quick-Commerce Data Services"
      badgeText={`Quick Commerce ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/quick-commerce-scraping"
      customPipelineLabel="Need a Custom Quick-Commerce Feed?"
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
      jsonFilename={`quick_commerce_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`quick_commerce_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Quick-Commerce Data"
      siblingSectionTitle="Explore Quick-Commerce Datasets"
      siblingSectionDescription="Connect fulfillment, delivery, pricing, brand, availability, platform, and demand signals for a broader view of rapid-delivery markets."
      siblingViewAllLink="/datasets"
      siblingViewAllLabel="View All Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={[
        dataset.faq,
        {
          q: 'How often are quick-commerce datasets refreshed?',
          a: 'Refresh cadence depends on platform coverage, the selected fields, and source availability. Scheduled snapshots can be configured to support daily, weekly, or other agreed collection intervals.',
        },
        {
          q: 'Which delivery formats are available?',
          a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery to a preferred storage destination or data platform can be scoped for a custom feed.',
        },
      ]}
    />
  );
}