import type { Metadata } from 'next';

const pageUrl = 'https://compilepilot.com/tools/json-tools/jsonpath-evaluator';
const siteUrl = 'https://compilepilot.com/';
const ogImage = 'https://compilepilot.com/tools/json-tools/jsonpath-evaluator-og-image.png';
const pageTitle = 'Free Online JSONPath Evaluator | CompilePilot';
const pageDescription =
  'Evaluate JSONPath expressions online with CompilePilot. Query supported JSON data to find and extract values using JSONPath expressions.';
const socialTitle = 'JSONPath Evaluator Online | Test JSONPath Expressions – CompilePilot';
const socialDescription =
  'Test JSONPath expressions and query JSON data with CompilePilot’s online JSONPath evaluator.';

export const jsonPathEvaluatorMetadata: Metadata = {
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
        alt: 'CompilePilot JSONPath evaluator',
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

export function buildJsonPathEvaluatorSchema() {
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
        name: 'CompilePilot JSONPath Evaluator',
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        description: 'An online tool for evaluating JSONPath expressions against JSON data.',
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
