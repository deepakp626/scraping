'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { ottMediaDatasets, type OttMediaDatasetKey } from './ottMediaDatasetData';

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

export default function OttMediaDatasetPage({ datasetKey }: { datasetKey: OttMediaDatasetKey }) {
  const dataset = ottMediaDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(ottMediaDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/ott-media/${sibling.slug}`,
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
        { label: 'OTT Media', href: '/datasets/ott-media' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured streaming datasets for content catalogs, reviews, platform coverage, genres, credits, release dates, trends, and languages."
      hubServiceLink="/services/ott-streaming-data-scraping-service"
      hubServiceLinkLabel="OTT Data Services"
      badgeText={`OTT Media ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ott-streaming-data-scraping-service"
      customPipelineLabel="Need a Custom Streaming Feed?"
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
      jsonFilename={`ott_media_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`ott_media_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="OTT Media Data"
      siblingSectionTitle="Explore Streaming Datasets"
      siblingSectionDescription="Connect title catalogs, audience feedback, regional platform presence, genre labels, credits, release events, popularity signals, and localization options."
      siblingViewAllLink="/datasets/ott-media"
      siblingViewAllLabel="View All OTT Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}