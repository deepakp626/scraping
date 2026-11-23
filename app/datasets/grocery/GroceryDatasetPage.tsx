'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { groceryDatasets, type GroceryDatasetKey } from './groceryDatasetData';

function toCsv(records: Record<string, string | number | boolean | string[]>[]) {
  const headers = Object.keys(records[0] ?? {});
  const rows = records.map((record) =>
    headers
      .map((header) => {
        const value = record[header];
        const text = Array.isArray(value) ? value.join('; ') : String(value ?? '');
        return `"${text.replace(/"/g, '""')}"`;
      })
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

export default function GroceryDatasetPage({ datasetKey }: { datasetKey: GroceryDatasetKey }) {
  const dataset = groceryDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(groceryDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/grocery/${sibling.slug}`,
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
        { label: 'Grocery', href: '/datasets' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured grocery catalog, price, availability, and market datasets."
      hubServiceLink="/services/grocery-scraping"
      hubServiceLinkLabel="Grocery Data Services"
      badgeText={`Grocery ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/grocery-scraping"
      customPipelineLabel="Need a Custom Grocery Feed?"
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
      jsonFilename={`grocery_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`grocery_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Grocery Data"
      siblingSectionTitle="Explore Grocery Datasets"
      siblingSectionDescription="Connect product, pricing, availability, promotion, nutrition, store, brand, and category data for a fuller view of grocery markets."
      siblingViewAllLink="/datasets"
      siblingViewAllLabel="View All Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={[
        dataset.faq,
        {
          q: 'How often is this grocery dataset updated?',
          a: 'Update cadence depends on retailer coverage and the fields selected. Daily and weekly refreshes are common, with custom schedules available for priority sources.',
        },
        {
          q: 'Which delivery formats are available?',
          a: 'Standard deliveries include CSV, JSON, and Parquet. Scheduled exports and secure delivery to cloud storage or data platforms can be arranged for a custom feed.',
        },
      ]}
    />
  );
}