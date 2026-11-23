import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-to-excel';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-to-excel-og-image.png';
const pageTitle = 'Free JSON to Excel Converter Online | CompilePilot';
const pageDescription =
  'Convert JSON to Excel online with CompilePilot. Transform supported JSON data into an Excel spreadsheet for reviewing and working with structured data.';
const socialTitle = 'JSON to Excel Converter Online – CompilePilot';
const socialDescription =
  'Convert supported JSON data into an Excel spreadsheet with CompilePilot’s online JSON to Excel converter.';

export const jsonToExcelMetadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    url: pageUrl,
    siteName: 'CompilePilot',
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'CompilePilot JSON to Excel converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description: socialDescription,
    images: [ogImage],
  },
};

export function buildJsonToExcelSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': `${siteUrl}#website` },
        mainEntity: { '@id': `${pageUrl}#webapp` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#webapp`,
        name: 'CompilePilot JSON to Excel Converter',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online converter for transforming supported JSON data into an Excel spreadsheet.',
        browserRequirements: 'Requires a modern web browser.',
        isPartOf: { '@id': `${siteUrl}#website` },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: 'CompilePilot',
      },
    ],
  };
}
