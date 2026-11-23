'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { foodDeliveryDatasets, type FoodDeliveryDatasetKey } from './foodDeliveryDatasetData';

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

export default function FoodDeliveryDatasetPage({ datasetKey }: { datasetKey: FoodDeliveryDatasetKey }) {
  const dataset = foodDeliveryDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(foodDeliveryDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/food-delivery/${sibling.slug}`,
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
        { label: 'Food Delivery', href: '/datasets/food-delivery' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured food-delivery datasets for restaurant listings, fees, activity, menu prices, ETAs, promotions, rankings, and zones."
      hubServiceLink="/services/food-delivery-data-scraping-service"
      hubServiceLinkLabel="Food Delivery Data Services"
      badgeText={`Food Delivery ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/food-delivery-data-scraping-service"
      customPipelineLabel="Need a Custom Food Delivery Feed?"
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
      jsonFilename={`food_delivery_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`food_delivery_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Food Delivery Data"
      siblingSectionTitle="Explore Food Delivery Datasets"
      siblingSectionDescription="Connect restaurant listings, delivery costs, activity signals, menu prices, ETAs, offers, rankings, and service zones for a fuller channel view."
      siblingViewAllLink="/datasets/food-delivery"
      siblingViewAllLabel="View All Food Delivery Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}