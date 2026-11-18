import type { Metadata } from 'next';
import type { JsonTool } from '../jsonTools';

const pageUrl = 'https://compilepilot.com/tools/json-tools';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/json-tools-og-image.png';
const pageTitle = 'Free Online JSON Tools | CompilePilot';
const pageDescription =
  'Explore JSON tools online with CompilePilot. Find utilities for common JSON formatting, conversion, and data-handling tasks, with tool-specific features and workflows.';
const socialTitle = 'Online JSON Tools | CompilePilot';
const socialDescription =
  'Explore CompilePilot JSON tools for common data formatting and development tasks. Choose a tool to view its available features and use its supported workflow.';

export const jsonToolsLandingMetadata: Metadata = {
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
        alt: 'CompilePilot online JSON tools',
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

export function buildJsonToolsLandingSchema(tools: readonly JsonTool[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': `${siteUrl}#website` },
        mainEntity: { '@id': `${pageUrl}#itemlist` },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'CompilePilot JSON Tools',
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: new URL(tool.link, siteUrl).toString(),
        })),
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