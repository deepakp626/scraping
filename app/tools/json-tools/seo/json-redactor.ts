import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-redactor';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-redactor-og-image.png';
const pageTitle = 'Free Online JSON Redactor | CompilePilot';
const pageDescription =
  'Redact sensitive values in JSON online with CompilePilot. Replace selected JSON values with redaction text to prepare data for safer sharing.';
const socialTitle = 'JSON Redactor Online | Redact Sensitive JSON Data – CompilePilot';
const socialDescription =
  'Use CompilePilot’s JSON redactor to replace selected values before sharing JSON data.';

export const jsonRedactorMetadata: Metadata = {
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
        alt: 'CompilePilot JSON redactor',
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

export function buildJsonRedactorSchema() {
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
        name: 'CompilePilot JSON Redactor',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online tool for redacting selected values in JSON data.',
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
