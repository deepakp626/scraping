import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-to-html-table';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-to-html-table-og-image.png';
const pageTitle = 'Free JSON to HTML Table Converter | CompilePilot';
const pageDescription =
  'Convert JSON to an HTML table online with CompilePilot. Turn supported JSON data into a table layout for easier viewing and presentation.';
const socialTitle = 'JSON to HTML Table Converter Online – CompilePilot';
const socialDescription =
  'Create an HTML table from supported JSON data with CompilePilot’s online JSON to HTML table converter.';

export const jsonToHtmlTableMetadata: Metadata = {
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
        alt: 'CompilePilot JSON to HTML table converter',
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

export function buildJsonToHtmlTableSchema() {
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
        name: 'CompilePilot JSON to HTML Table Converter',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online converter for rendering supported JSON data as an HTML table.',
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
