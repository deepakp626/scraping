import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-mock-generator';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-mock-generator-og-image.png';
const pageTitle = 'Free Online JSON Mock Data Generator | CompilePilot';
const pageDescription =
  'Generate mock JSON data online with CompilePilot. Create sample JSON output for testing and development workflows using supported generation options.';
const socialTitle = 'JSON Mock Data Generator Online – CompilePilot';
const socialDescription =
  'Generate sample JSON data for testing and development with CompilePilot’s online mock data generator.';

export const jsonMockGeneratorMetadata: Metadata = {
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
        alt: 'CompilePilot JSON mock data generator',
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

export function buildJsonMockGeneratorSchema() {
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
        name: 'CompilePilot JSON Mock Data Generator',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online tool for generating sample or mock JSON data.',
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
