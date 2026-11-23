import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-formatter-online';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-formatter-online-og-image.png';
const pageTitle = 'Free Online JSON Formatter | CompilePilot';
const pageDescription =
  'Format JSON online with CompilePilot. Improve readability with consistent indentation and use the available tools to work with your formatted JSON.';
const socialTitle = 'JSON Formatter Online | Format JSON Data – CompilePilot';
const socialDescription =
  'Format JSON online with CompilePilot. Make structured data easier to read with consistent indentation and a simple browser-based workflow.';

export const jsonFormatterOnlineMetadata: Metadata = {
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
        alt: 'CompilePilot online JSON formatter',
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

export function buildJsonFormatterOnlineSchema() {
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
        name: 'CompilePilot JSON Formatter',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online JSON formatting tool that helps make JSON data easier to read using consistent indentation.',
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