'use client';

import DatasetTemplate, { type SiblingDataset } from '../components/DatasetTemplate';
import { carRentalDatasets, type CarRentalDatasetKey } from './carRentalDatasetData';

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

export default function CarRentalDatasetPage({ datasetKey }: { datasetKey: CarRentalDatasetKey }) {
  const dataset = carRentalDatasets[datasetKey];
  const siblingDatasets: SiblingDataset[] = Object.values(carRentalDatasets).map((sibling) => ({
    name: sibling.name,
    slug: `/datasets/car-rental/${sibling.slug}`,
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
        { label: 'Car Rental', href: '/datasets/car-rental' },
        { label: dataset.name },
      ]}
      hubBannerText="Explore structured car rental datasets for fleet inventory, rates, locations, availability, specifications, vendors, comparisons, and reviews."
      hubServiceLink="/services/car-rental-data-scraping"
      hubServiceLinkLabel="Car Rental Data Services"
      badgeText={`Car Rental ${dataset.badge}`}
      badgeSubtext={dataset.badgeSubtext}
      title={dataset.title}
      description={dataset.heroDescription}
      featurePoints={dataset.featurePoints}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/car-rental-data-scraping"
      customPipelineLabel="Need a Custom Rental Data Feed?"
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
      jsonFilename={`car_rental_${dataset.slug.replace(/-/g, '_')}_sample.json`}
      csvFilename={`car_rental_${dataset.slug.replace(/-/g, '_')}_sample.csv`}
      sampleRecordCount="2 sample records"
      dictionarySectionTitle={`${dataset.name} Fields & Specifications`}
      dictionarySectionDescription={dataset.description}
      attributeGroups={dataset.attributeGroups}
      siblingCategoryOverline="Car Rental Data"
      siblingSectionTitle="Explore Car Rental Datasets"
      siblingSectionDescription="Connect fleet, rates, locations, availability, vehicle specifications, suppliers, price benchmarks, and customer feedback."
      siblingViewAllLink="/datasets/car-rental"
      siblingViewAllLabel="View All Car Rental Datasets"
      siblingDatasets={siblingDatasets}
      faqSectionTitle={`${dataset.name} FAQs`}
      faqs={dataset.faqs}
    />
  );
}