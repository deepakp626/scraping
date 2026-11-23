import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-to-xml';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-to-xml-og-image.png';
const pageTitle = 'Free JSON to XML Converter Online | CompilePilot';
const pageDescription =
  'Convert JSON to XML online with CompilePilot. Transform supported JSON data into XML for structured data exchange and integration workflows.';
const socialTitle = 'JSON to XML Converter Online – CompilePilot';
const socialDescription =
  'Use CompilePilot’s online JSON to XML converter to transform supported JSON data into XML format.';

export const jsonToXmlMetadata: Metadata = {
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
        alt: 'CompilePilot JSON to XML converter',
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

export function buildJsonToXmlSchema() {
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
        name: 'CompilePilot JSON to XML Converter',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online converter for transforming supported JSON data into XML format.',
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
