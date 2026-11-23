import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-formatter';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-formatter-og-image.png';
const pageTitle = 'Free Online JSON Formatter | CompilePilot';
const pageDescription =
  'Format JSON online with CompilePilot. Make JSON data easier to read with consistent indentation, then use the available options to copy or download the formatted result.';
const socialTitle = 'JSON Formatter Online | Format JSON Data – CompilePilot';
const socialDescription =
  'Make JSON easier to read with CompilePilot’s online JSON formatter. Format JSON with clear indentation and use the available output options.';

export const jsonFormatterMetadata: Metadata = {
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
        alt: 'Format JSON online with CompilePilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter Online | CompilePilot',
    description:
      'Format JSON online with CompilePilot. Improve readability with consistent indentation and use the available output options.',
    images: [ogImage],
  },
};

export function buildJsonFormatterSchema() {
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
        operatingSystem: 'Web',
        description: 'An online JSON formatting utility that applies readable indentation to JSON data.',
        browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
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