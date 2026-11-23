import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const restaurantUrl = `${siteUrl}/datasets/restaurant`;

const restaurantSeo = {
  "menu-data": {
    name: "Restaurant Menu Data Dataset",
    title:
      "Restaurant Menu Data Dataset | Restaurant Menu Intelligence – CompilePilot",
    description:
      "Explore structured restaurant menu data for foodservice, hospitality, and market research. Review restaurant and menu item references, dish names, category details, descriptions, pricing observations, and dietary or availability attributes where provided.",
    openGraphTitle:
      "Restaurant Menu Data Dataset – Menu and Pricing Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant menu records with venue references, dish and category details, descriptions, price observations, and available menu attributes.",
    twitterTitle:
      "Restaurant Menu Data Dataset – Menu and Pricing Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant menu records with venue references, dish and category details, descriptions, price observations, and available menu attributes.",
    image: "restaurant-menu-data-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name and location reference, where available",
      "Menu item identifier or name",
      "Menu category or section",
      "Menu item description, where available",
      "Listed price and currency, where available",
      "Dietary, allergen, or ingredient attributes, where available",
      "Availability or menu status, where available",
      "Source or observation timestamp, where available",
    ],
  },
  "ratings-reviews": {
    name: "Restaurant Ratings and Reviews Dataset",
    title:
      "Restaurant Ratings and Reviews Dataset | Customer Feedback Data – CompilePilot",
    description:
      "Explore structured restaurant ratings and review data for hospitality and market research. Review venue references, rating observations, review text or summaries, review dates, and source details in supported formats.",
    openGraphTitle:
      "Restaurant Ratings and Reviews Dataset – Customer Feedback Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant feedback records with venue references, rating observations, review details, dates, and source information.",
    twitterTitle:
      "Restaurant Ratings and Reviews Dataset – Customer Feedback Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant feedback records with venue references, rating observations, review details, dates, and source information.",
    image: "restaurant-ratings-reviews-og-image.webp",
    variableMeasured: [
      "Review or feedback identifier",
      "Restaurant or venue identifier",
      "Restaurant name or location reference, where available",
      "Rating value and rating scale, where available",
      "Review text or summary, where available",
      "Review publication date",
      "Reviewer, platform, or source reference, where available",
      "Language or locale, where available",
      "Source or record identifier",
    ],
  },
  "location-data": {
    name: "Restaurant Location Data Dataset",
    title:
      "Restaurant Location Data Dataset | Restaurant Geographic Data – CompilePilot",
    description:
      "Explore structured restaurant location data for hospitality, mapping, and market research. Review venue identifiers, address and geographic references, location attributes, and available regional details in supported formats.",
    openGraphTitle:
      "Restaurant Location Data Dataset – Geographic Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant location records with venue identifiers, address details, geographic references, and regional attributes.",
    twitterTitle:
      "Restaurant Location Data Dataset – Geographic Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant location records with venue identifiers, address details, geographic references, and regional attributes.",
    image: "restaurant-location-data-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name",
      "Street address, where available",
      "City, region, and country references, where available",
      "Latitude and longitude, where available",
      "Postal code or neighborhood reference, where available",
      "Location or venue status, where available",
      "Source or record identifier",
    ],
  },
  "cuisine-tags": {
    name: "Restaurant Cuisine Tags Dataset",
    title:
      "Restaurant Cuisine Tags Dataset | Cuisine Classification Data – CompilePilot",
    description:
      "Explore structured restaurant cuisine tag data for foodservice and market research. Review restaurant references, cuisine labels, category associations, classification attributes, and available source details in supported formats.",
    openGraphTitle:
      "Restaurant Cuisine Tags Dataset – Cuisine Classification Intelligence | CompilePilot",
    openGraphDescription:
      "Explore cuisine classification records with restaurant references, cuisine labels, category associations, and source details.",
    twitterTitle:
      "Restaurant Cuisine Tags Dataset – Cuisine Classification Intelligence | CompilePilot",
    twitterDescription:
      "Explore cuisine classification records with restaurant references, cuisine labels, category associations, and source details.",
    image: "restaurant-cuisine-tags-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name, where available",
      "Cuisine tag or label",
      "Cuisine category or taxonomy reference, where available",
      "Primary or secondary cuisine indicator, where available",
      "Tag source or classification method, where available",
      "Observation timestamp, where available",
      "Source or record identifier",
    ],
  },
  "operating-hours": {
    name: "Restaurant Operating Hours Dataset",
    title:
      "Restaurant Operating Hours Dataset | Business Hours Data – CompilePilot",
    description:
      "Explore structured restaurant operating hours data for hospitality and local market research. Review venue references, opening and closing times, day-of-week schedules, special-hours details, and timezone information where provided.",
    openGraphTitle:
      "Restaurant Operating Hours Dataset – Business Schedule Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant schedule records with venue references, daily opening and closing times, and available special-hours details.",
    twitterTitle:
      "Restaurant Operating Hours Dataset – Business Schedule Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant schedule records with venue references, daily opening and closing times, and available special-hours details.",
    image: "restaurant-operating-hours-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name and location reference, where available",
      "Day of week",
      "Opening time and closing time, where available",
      "Timezone reference, where available",
      "Closed-day or split-shift indicator, where available",
      "Holiday or special-hours information, where available",
      "Observation timestamp or source identifier",
    ],
  },
  "price-range": {
    name: "Restaurant Price Range Dataset",
    title:
      "Restaurant Price Range Dataset | Dining Cost Data – CompilePilot",
    description:
      "Explore structured restaurant price range data for dining, hospitality, and market research. Review venue references, price indicators, currency and regional context, pricing categories, and observation details where available.",
    openGraphTitle:
      "Restaurant Price Range Dataset – Dining Price Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant price range records with venue references, price indicators, currency details, and regional context.",
    twitterTitle:
      "Restaurant Price Range Dataset – Dining Price Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant price range records with venue references, price indicators, currency details, and regional context.",
    image: "restaurant-price-range-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name and location reference, where available",
      "Price range or price tier",
      "Observed price amount or average spend, where available",
      "Currency",
      "Meal or pricing basis, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
  },
  "chain-profiles": {
    name: "Restaurant Chain Profiles Dataset",
    title:
      "Restaurant Chain Profiles Dataset | Restaurant Brand Data – CompilePilot",
    description:
      "Explore structured restaurant chain profile data for hospitality and competitive research. Review chain and brand identifiers, company details, geographic presence, outlet references, and available profile attributes in supported formats.",
    openGraphTitle:
      "Restaurant Chain Profiles Dataset – Brand and Company Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant chain records with brand identifiers, company profile details, geographic references, and available outlet information.",
    twitterTitle:
      "Restaurant Chain Profiles Dataset – Brand and Company Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant chain records with brand identifiers, company profile details, geographic references, and available outlet information.",
    image: "restaurant-chain-profiles-og-image.webp",
    variableMeasured: [
      "Restaurant chain or brand identifier",
      "Chain or brand name",
      "Parent company or operator reference, where available",
      "Headquarters or country reference, where available",
      "Website or public profile reference, where available",
      "Outlet count or location references, where available",
      "Cuisine or service category, where available",
      "Profile status or observation timestamp, where available",
      "Source or record identifier",
    ],
  },
  "delivery-partners": {
    name: "Restaurant Delivery Partners Dataset",
    title:
      "Restaurant Delivery Partners Dataset | Food Delivery Platform Data – CompilePilot",
    description:
      "Explore structured restaurant delivery partner data for foodservice and platform research. Review restaurant and delivery provider references, partnership associations, service-area details, and available delivery-channel attributes in supported formats.",
    openGraphTitle:
      "Restaurant Delivery Partners Dataset – Delivery Platform Intelligence | CompilePilot",
    openGraphDescription:
      "Explore restaurant delivery partner records with venue and platform references, partnership associations, and available service-area details.",
    twitterTitle:
      "Restaurant Delivery Partners Dataset – Delivery Platform Intelligence | CompilePilot",
    twitterDescription:
      "Explore restaurant delivery partner records with venue and platform references, partnership associations, and available service-area details.",
    image: "restaurant-delivery-partners-og-image.webp",
    variableMeasured: [
      "Restaurant or venue identifier",
      "Restaurant name, where available",
      "Delivery platform or partner name and identifier",
      "Partnership or listing association",
      "Service-area or geographic reference, where available",
      "Delivery channel or service type, where available",
      "Partnership or listing status, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
  },
} as const;

export type RestaurantDatasetSlug = keyof typeof restaurantSeo;

function getRestaurantDatasetUrl(slug: RestaurantDatasetSlug) {
  return `${restaurantUrl}/${slug}`;
}

export function getRestaurantDatasetMetadata(
  slug: RestaurantDatasetSlug,
): Metadata {
  const dataset = restaurantSeo[slug];
  const url = getRestaurantDatasetUrl(slug);
  const image = `${restaurantUrl}/${dataset.image}`;

  return {
    title: { absolute: dataset.title },
    description: dataset.description,
    alternates: { canonical: url },
    openGraph: {
      title: dataset.openGraphTitle,
      description: dataset.openGraphDescription,
      url,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${dataset.name} - CompilePilot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dataset.twitterTitle,
      description: dataset.twitterDescription,
      images: [image],
    },
  };
}

export function buildRestaurantDatasetSchema(slug: RestaurantDatasetSlug) {
  const dataset = restaurantSeo[slug];
  const url = getRestaurantDatasetUrl(slug);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: dataset.name,
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
          url: `${siteUrl}/`,
        },
        isPartOf: { "@id": `${siteUrl}/#website` },
        variableMeasured: dataset.variableMeasured,
      },
    ],
  };
}
