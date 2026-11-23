import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-to-yaml';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-to-yaml-og-image.png';
const pageTitle = 'Free JSON to YAML Converter Online | CompilePilot';
const pageDescription =
  'Convert JSON to YAML online with CompilePilot. Transform supported JSON data into readable YAML for configuration and data workflows.';
const socialTitle = 'JSON to YAML Converter Online – CompilePilot';
const socialDescription =
  'Convert supported JSON data into YAML with CompilePilot’s online JSON to YAML converter.';

export const jsonToYamlMetadata: Metadata = {
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
        alt: 'CompilePilot JSON to YAML converter',
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

export function buildJsonToYamlSchema() {
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
        name: 'CompilePilot JSON to YAML Converter',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online converter for transforming supported JSON data into YAML format.',
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
