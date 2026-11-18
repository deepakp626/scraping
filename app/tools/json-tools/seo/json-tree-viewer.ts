import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/json-tree-viewer';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-tree-viewer-og-image.png';
const pageTitle = 'Free Online JSON Tree Viewer | CompilePilot';
const pageDescription =
  'Explore JSON online with CompilePilot’s JSON tree viewer. View nested JSON data in a structured tree layout to make complex data easier to navigate.';
const socialTitle = 'JSON Tree Viewer Online | Explore JSON Data – CompilePilot';
const socialDescription =
  'Inspect nested JSON data in a structured tree layout with CompilePilot’s online JSON tree viewer.';

export const jsonTreeViewerMetadata: Metadata = {
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
        alt: 'CompilePilot JSON tree viewer',
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

export function buildJsonTreeViewerSchema() {
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
        name: 'CompilePilot JSON Tree Viewer',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online viewer for exploring JSON data in a structured tree layout.',
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
