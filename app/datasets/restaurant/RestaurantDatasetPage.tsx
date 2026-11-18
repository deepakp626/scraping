'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { restaurantDatasets, type RestaurantDatasetKey } from './restaurantDatasetData';

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

export default function RestaurantDatasetPage({ datasetKey }: { datasetKey: RestaurantDatasetKey }) {
  const dataset = restaurantDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(restaurantDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/restaurant/${sibling.slug}`,
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
        { label: 'Restaurant', href: '/datasets/restaurant' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured restaurant datasets for menus, reviews, locations, cuisine, pricing, hours, chains, and delivery coverage."
      hubServiceLink="/services/food-data-scraping"
      hubServiceLinkLabel="Restaurant Data Services"
      badgeText={`Restaurant ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/food-data-scraping"
      customPipelineLabel="Need a Custom Restaurant Feed?"
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
      jsonFilename={`restaurant_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`restaurant_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Restaurant Data"
      siblingSectionTitle="Explore Restaurant Datasets"
      siblingSectionDescription="Connect menus, guest feedback, locations, cuisine, operating schedules, price signals, chain profiles, and delivery channels for a fuller restaurant-market view."
      siblingViewAllLink="/datasets/restaurant"
      siblingViewAllLabel="View All Restaurant Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={[
        dataset.faq,
        {
          q: 'How often are restaurant datasets refreshed?',
          a: 'Refresh cadence depends on the selected sources, market coverage, and fields. Scheduled snapshots can be configured for daily, weekly, or another agreed interval.',
        },
        {
          q: 'Which delivery formats are available?',
          a: 'Standard exports include CSV, JSON, and Parquet. Scheduled delivery to a preferred storage destination or data platform can be scoped for a custom feed.',
        },
      ]}
    />
  );
}