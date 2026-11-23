'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { pharmaceuticalDatasets, type PharmaceuticalDatasetKey } from './pharmaceuticalDatasetData';

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

export default function PharmaceuticalDatasetPage({ datasetKey }: { datasetKey: PharmaceuticalDatasetKey }) {
  const dataset = pharmaceuticalDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(pharmaceuticalDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/pharmaceutical/${sibling.slug}`,
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
        { label: 'Pharmaceutical', href: '/datasets/pharmaceutical' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured pharmaceutical reference datasets for product listings, public prices, availability, manufacturers, regulatory records, classifications, market signals, and product links."
      hubServiceLink="/services/healthcare-data-scraping"
      hubServiceLinkLabel="Healthcare Data Services"
      badgeText={`Pharmaceutical ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/healthcare-data-scraping"
      customPipelineLabel="Need a Custom Healthcare Data Feed?"
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
      jsonFilename={`pharmaceutical_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`pharmaceutical_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 synthetic sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Pharmaceutical Data"
      siblingSectionTitle="Explore Pharmaceutical Datasets"
      siblingSectionDescription="Connect public product catalogs, prices, availability, manufacturers, regulatory references, classification labels, market signals, and source-linked product relationships."
      siblingViewAllLink="/datasets/pharmaceutical"
      siblingViewAllLabel="View All Pharmaceutical Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}