'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { liquorDatasets, type LiquorDatasetKey } from './liquorDatasetData';

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

export default function LiquorDatasetPage({ datasetKey }: { datasetKey: LiquorDatasetKey }) {
  const dataset = liquorDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(liquorDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/liquor/${sibling.slug}`,
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
        { label: 'Liquor & Alcohol', href: '/datasets/liquor' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured beverage datasets for product catalogs, pricing, availability, ratings, brands, categories, trends, and retailers."
      hubServiceLink="/services/liquor-or-alchol-data-scraping"
      hubServiceLinkLabel="Beverage Data Services"
      badgeText={`Liquor & Alcohol ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/liquor-or-alchol-data-scraping"
      customPipelineLabel="Need a Custom Beverage Feed?"
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
      jsonFilename={`liquor_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`liquor_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Liquor & Alcohol Data"
      siblingSectionTitle="Explore Beverage Datasets"
      siblingSectionDescription="Connect product catalogs, retail prices, availability, expert opinions, brands, category taxonomies, market signals, and retailer coverage."
      siblingViewAllLink="/datasets/liquor"
      siblingViewAllLabel="View All Beverage Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}