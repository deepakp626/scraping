'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { realEstateDatasets, type RealEstateDatasetKey } from './realEstateDatasetData';

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

export default function RealEstateDatasetPage({ datasetKey }: { datasetKey: RealEstateDatasetKey }) {
  const dataset = realEstateDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(realEstateDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/real-estate/${sibling.slug}`,
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
        { label: 'Real Estate', href: '/datasets/real-estate' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured real estate datasets for property listings, pricing, location, agents, rental yields, projects, market reports, and availability."
      hubServiceLink="/services/real-estate-property-data-scraping"
      hubServiceLinkLabel="Real Estate Data Services"
      badgeText={`Real Estate ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/real-estate-property-data-scraping"
      customPipelineLabel="Need a Custom Property Feed?"
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
      jsonFilename={`real_estate_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`real_estate_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Real Estate Data"
      siblingSectionTitle="Explore Real Estate Datasets"
      siblingSectionDescription="Connect property inventory, prices, geography, professional profiles, rental indicators, development projects, market summaries, and listing status."
      siblingViewAllLink="/datasets/real-estate"
      siblingViewAllLabel="View All Real Estate Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}