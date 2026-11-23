import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const ottMediaUrl = `${siteUrl}/datasets/ott-media`;
const datasetCatalogUrl = `${siteUrl}/dataset`;

const ottMediaSeo = {
  "content-catalog": {
    name: "OTT Media Content Catalog",
    title: "OTT Media Content Catalog Dataset | CompilePilot Data",
    description:
      "Explore OTT media content catalog data, including titles, genres, release dates, languages, and content attributes for streaming market research and analysis.",
    image: "ott-media-content-catalog-1200x630.webp",
    variableMeasured: [
      "content title",
      "content type",
      "genre",
      "release date",
      "original language",
      "available languages",
      "content duration",
      "content rating",
    ],
  },
  "ratings-reviews": {
    name: "OTT Media Ratings and Reviews",
    title: "OTT Media Ratings and Reviews Dataset | CompilePilot Data",
    description:
      "Explore OTT media ratings and reviews data, including audience scores, review text, content titles, and platform attributes for streaming research and analysis.",
    image: "ott-media-ratings-reviews-1200x630.webp",
    variableMeasured: [
      "content title",
      "audience rating",
      "review text",
      "review date",
      "platform",
      "content identifier",
    ],
  },
  "platform-coverage": {
    name: "OTT Media Platform Coverage",
    title: "OTT Media Platform Coverage Dataset | CompilePilot Data",
    description:
      "Explore OTT media platform coverage data, including streaming services, content availability, regions, and platform attributes for market research and analysis.",
    image: "ott-media-platform-coverage-1200x630.webp",
    variableMeasured: [
      "platform name",
      "content identifier",
      "content availability",
      "region",
      "country",
      "availability period",
    ],
  },
  "genre-metadata": {
    name: "OTT Media Genre Metadata",
    title: "OTT Media Genre Metadata Dataset | CompilePilot Data",
    description:
      "Explore OTT media genre metadata, including content titles, genre classifications, subgenres, and related descriptive attributes for streaming research.",
    image: "ott-media-genre-metadata-1200x630.webp",
    variableMeasured: [
      "content title",
      "genre",
      "subgenre",
      "content type",
      "content identifier",
      "genre classification",
    ],
  },
  "cast-crew": {
    name: "OTT Media Cast and Crew",
    title: "OTT Media Cast and Crew Dataset | CompilePilot Data",
    description:
      "Explore OTT media cast and crew data, including titles, performer names, crew roles, and production credits for entertainment research and analysis.",
    image: "ott-media-cast-crew-1200x630.webp",
    variableMeasured: [
      "content title",
      "person name",
      "cast or crew role",
      "character name",
      "production credit",
      "content identifier",
    ],
  },
  "release-dates": {
    name: "OTT Media Release Dates",
    title: "OTT Media Release Dates Dataset | CompilePilot Data",
    description:
      "Explore OTT media release date data, including content titles, premiere dates, release regions, and platform attributes for streaming market research.",
    image: "ott-media-release-dates-1200x630.webp",
    variableMeasured: [
      "content title",
      "release date",
      "premiere date",
      "release region",
      "platform",
      "content identifier",
    ],
  },
  "trending-titles": {
    name: "OTT Media Trending Titles",
    title: "OTT Media Trending Titles Dataset | CompilePilot Data",
    description:
      "Explore OTT media trending titles data, including content names, ranking positions, trend periods, platforms, and engagement indicators for research.",
    image: "ott-media-trending-titles-1200x630.webp",
    variableMeasured: [
      "content title",
      "ranking position",
      "trend date",
      "platform",
      "trend period",
      "engagement indicator",
    ],
  },
  "language-data": {
    name: "OTT Media Language Data",
    title: "OTT Media Language Data Dataset | CompilePilot Data",
    description:
      "Explore OTT media language data, including original languages, audio options, subtitle languages, content titles, and platform attributes for streaming research.",
    image: "ott-media-language-data-1200x630.webp",
    variableMeasured: [
      "content title",
      "original language",
      "audio languages",
      "subtitle languages",
      "platform",
      "content identifier",
    ],
  },
} as const;

export type OttMediaDatasetSlug = keyof typeof ottMediaSeo;

function getPageUrl(slug: OttMediaDatasetSlug) {
  return `${ottMediaUrl}/${slug}`;
}

export function getOttMediaDatasetMetadata(
  slug: OttMediaDatasetSlug,
): Metadata {
  const dataset = ottMediaSeo[slug];
  const url = getPageUrl(slug);
  const image = `${ottMediaUrl}/${dataset.image}`;

  return {
    title: { absolute: dataset.title },
    description: dataset.description,
    alternates: { canonical: url },
    openGraph: {
      title: dataset.title,
      description: dataset.description,
      url,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: dataset.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.title,
      description: dataset.description,
      images: [image],
    },
  };
}

export function buildOttMediaDatasetSchema(
  slug: OttMediaDatasetSlug,
) {
  const dataset = ottMediaSeo[slug];
  const url = getPageUrl(slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: dataset.title,
        description: dataset.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${url}#dataset` },
      },
      {
        "@type": "Dataset",
        "@id": `${url}#dataset`,
        name: dataset.name,
        description: dataset.description,
        url,
        creator: {
          "@type": "Organization",
          name: "CompilePilot",
          url: siteUrl,
        },
        includedInDataCatalog: {
          "@type": "DataCatalog",
          name: "CompilePilot Datasets",
          url: datasetCatalogUrl,
        },
        variableMeasured: [...dataset.variableMeasured],
        isPartOf: {
          "@type": "DataCatalog",
          name: "OTT Media Datasets",
          url: ottMediaUrl,
        },
      },
    ],
  };
}
