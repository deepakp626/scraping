import type { Metadata } from "next";

const siteUrl = "https://compilepilot.com";
const travelUrl = `${siteUrl}/datasets/travel`;

const travelSeo = {
  "flight-schedules": {
    name: "Travel Flight Schedules Dataset",
    title:
      "Travel Flight Schedules Dataset | Airline Timetable Data – CompilePilot",
    description:
      "Explore structured travel flight schedule data for travel, aviation, and logistics research. Review flight identifiers, airline and route references, scheduled departure and arrival details, airport information, and recorded schedule data in supported formats.",
    openGraphTitle:
      "Travel Flight Schedules Dataset – Airline Timetable Intelligence | CompilePilot",
    openGraphDescription:
      "Explore flight schedule records with airline and flight references, origin and destination airports, scheduled departure and arrival times, and related timetable details.",
    twitterTitle:
      "Travel Flight Schedules Dataset – Airline Timetable Intelligence | CompilePilot",
    twitterDescription:
      "Explore flight schedule records with airline and flight references, origin and destination airports, scheduled departure and arrival times, and related timetable details.",
    image: "travel-flight-schedules-og-image.webp",
    variableMeasured: [
      "Flight number or flight identifier",
      "Airline name or carrier identifier",
      "Origin airport and destination airport",
      "Scheduled departure date and time",
      "Scheduled arrival date and time",
      "Flight route reference",
      "Schedule status or schedule version, where available",
      "Source or record identifier",
    ],
  },
  "fare-tracker": {
    name: "Travel Fare Tracker Dataset",
    title:
      "Travel Fare Tracker Dataset | Flight and Travel Price Data – CompilePilot",
    description:
      "Explore structured travel fare tracking data for travel research and price analysis. Review available fare observations, carrier or provider references, route details, currency values, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Travel Fare Tracker Dataset – Fare Price Intelligence | CompilePilot",
    openGraphDescription:
      "Explore travel fare records with route and provider references, observed prices, currency details, and timestamped observations.",
    twitterTitle:
      "Travel Fare Tracker Dataset – Fare Price Intelligence | CompilePilot",
    twitterDescription:
      "Explore travel fare records with route and provider references, observed prices, currency details, and timestamped observations.",
    image: "travel-fare-tracker-og-image.webp",
    variableMeasured: [
      "Fare or price observation identifier",
      "Origin and destination reference",
      "Airline or travel provider reference, where available",
      "Observed fare amount and currency, where available",
      "Travel date or fare validity period, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
  },
  "hotel-rates": {
    name: "Travel Hotel Rates Dataset",
    title: "Travel Hotel Rates Dataset | Hotel Pricing Data – CompilePilot",
    description:
      "Explore structured hotel rate data for travel, hospitality, and market research. Review property references, room or rate details, pricing and currency observations, stay dates, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Travel Hotel Rates Dataset – Hotel Pricing Intelligence | CompilePilot",
    openGraphDescription:
      "Explore hotel rate records with property and room references, observed prices, stay dates, and timestamped rate details.",
    twitterTitle:
      "Travel Hotel Rates Dataset – Hotel Pricing Intelligence | CompilePilot",
    twitterDescription:
      "Explore hotel rate records with property and room references, observed prices, stay dates, and timestamped rate details.",
    image: "travel-hotel-rates-og-image.webp",
    variableMeasured: [
      "Hotel or property identifier",
      "Property name and location reference, where available",
      "Room type or rate-plan reference, where available",
      "Observed rate amount and currency, where available",
      "Check-in and check-out dates, where available",
      "Occupancy or guest details, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
  },
  reviews: {
    name: "Travel Reviews Dataset",
    title:
      "Travel Reviews Dataset | Hotel and Travel Feedback Data – CompilePilot",
    description:
      "Explore structured travel review data for tourism, hospitality, and customer research. Organize review references, property or travel-service associations, ratings, review dates, and source details in supported formats.",
    openGraphTitle:
      "Travel Reviews Dataset – Travel Feedback Intelligence | CompilePilot",
    openGraphDescription:
      "Explore travel review records with service or property references, rating observations, review dates, and source details.",
    twitterTitle:
      "Travel Reviews Dataset – Travel Feedback Intelligence | CompilePilot",
    twitterDescription:
      "Explore travel review records with service or property references, rating observations, review dates, and source details.",
    image: "travel-reviews-og-image.webp",
    variableMeasured: [
      "Review identifier",
      "Property, destination, or travel-service reference",
      "Rating value and rating scale, where available",
      "Review text or summary, where available",
      "Review publication date",
      "Reviewer or source reference, where available",
      "Language or locale, where available",
      "Source or record identifier",
    ],
  },
  "route-coverage": {
    name: "Travel Route Coverage Dataset",
    title:
      "Travel Route Coverage Dataset | Airline Route Network Data – CompilePilot",
    description:
      "Explore structured travel route coverage data for aviation and transportation research. Review origin and destination references, carrier associations, route identifiers, service indicators, and recorded observations in supported formats.",
    openGraphTitle:
      "Travel Route Coverage Dataset – Route Network Intelligence | CompilePilot",
    openGraphDescription:
      "Explore route coverage records with origin and destination airports, carrier references, route identifiers, and service details.",
    twitterTitle:
      "Travel Route Coverage Dataset – Route Network Intelligence | CompilePilot",
    twitterDescription:
      "Explore route coverage records with origin and destination airports, carrier references, route identifiers, and service details.",
    image: "travel-route-coverage-og-image.webp",
    variableMeasured: [
      "Route identifier",
      "Origin airport or location reference",
      "Destination airport or location reference",
      "Airline or carrier reference, where available",
      "Service or route status, where available",
      "Schedule or observation period, where available",
      "Source or record identifier",
    ],
  },
  "seat-availability": {
    name: "Travel Seat Availability Dataset",
    title:
      "Travel Seat Availability Dataset | Airline Seat Inventory Data – CompilePilot",
    description:
      "Explore structured travel seat availability observations for aviation and travel research. Review flight and route references, cabin or fare-class details, availability indicators, travel dates, and recorded timestamps in supported formats.",
    openGraphTitle:
      "Travel Seat Availability Dataset – Airline Inventory Intelligence | CompilePilot",
    openGraphDescription:
      "Explore seat availability observations with flight and route references, cabin details, travel dates, and timestamped inventory records.",
    twitterTitle:
      "Travel Seat Availability Dataset – Airline Inventory Intelligence | CompilePilot",
    twitterDescription:
      "Explore seat availability observations with flight and route references, cabin details, travel dates, and timestamped inventory records.",
    image: "travel-seat-availability-og-image.webp",
    variableMeasured: [
      "Flight or service identifier",
      "Origin and destination reference",
      "Travel date",
      "Cabin, class, or fare-bucket reference, where available",
      "Seat availability indicator or count, where available",
      "Observation timestamp",
      "Source or record identifier",
    ],
  },
  "airline-profiles": {
    name: "Travel Airline Profiles Dataset",
    title:
      "Travel Airline Profiles Dataset | Airline Company Data – CompilePilot",
    description:
      "Explore structured airline profile data for aviation, travel, and market research. Review carrier identifiers, airline names, operating details, country or headquarters references, and other profile attributes available in supported formats.",
    openGraphTitle:
      "Travel Airline Profiles Dataset – Carrier Profile Intelligence | CompilePilot",
    openGraphDescription:
      "Explore airline profile records with carrier identifiers, company details, geographic references, and available operating attributes.",
    twitterTitle:
      "Travel Airline Profiles Dataset – Carrier Profile Intelligence | CompilePilot",
    twitterDescription:
      "Explore airline profile records with carrier identifiers, company details, geographic references, and available operating attributes.",
    image: "travel-airline-profiles-og-image.webp",
    variableMeasured: [
      "Airline name",
      "Airline or carrier code, where available",
      "Company or operator identifier",
      "Country or headquarters reference, where available",
      "Website or contact reference, where available",
      "Operating or profile status, where available",
      "Source or record identifier",
    ],
  },
  "holiday-packages": {
    name: "Travel Holiday Packages Dataset",
    title:
      "Travel Holiday Packages Dataset | Tour and Vacation Package Data – CompilePilot",
    description:
      "Explore structured holiday package data for travel planning and tourism market research. Review package and provider references, destination details, itinerary or duration information, pricing observations, and recorded validity details in supported formats.",
    openGraphTitle:
      "Travel Holiday Packages Dataset – Vacation Package Intelligence | CompilePilot",
    openGraphDescription:
      "Explore holiday package records with provider and destination references, itinerary details, pricing observations, and validity information.",
    twitterTitle:
      "Travel Holiday Packages Dataset – Vacation Package Intelligence | CompilePilot",
    twitterDescription:
      "Explore holiday package records with provider and destination references, itinerary details, pricing observations, and validity information.",
    image: "travel-holiday-packages-og-image.webp",
    variableMeasured: [
      "Package identifier or name",
      "Travel provider or operator reference",
      "Destination or itinerary reference",
      "Trip duration or travel dates, where available",
      "Included services or package features, where available",
      "Observed price and currency, where available",
      "Validity period or observation timestamp",
      "Source or record identifier",
    ],
  },
} as const;

export type TravelDatasetSlug = keyof typeof travelSeo;

function getTravelDatasetUrl(slug: TravelDatasetSlug) {
  return `${travelUrl}/${slug}`;
}

export function getTravelDatasetMetadata(slug: TravelDatasetSlug): Metadata {
  const dataset = travelSeo[slug];
  const url = getTravelDatasetUrl(slug);
  const image = `${travelUrl}/${dataset.image}`;

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

export function buildTravelDatasetSchema(slug: TravelDatasetSlug) {
  const dataset = travelSeo[slug];
  const url = getTravelDatasetUrl(slug);

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
