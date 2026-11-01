import React from "react";

export interface ServiceSchemaProps {
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
}

export default function ServiceSchema({
  pageUrl,
  pageName,
  pageDescription,
  serviceName,
  serviceType,
  serviceDescription,}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        mainEntity: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        serviceType: serviceType,
        description: serviceDescription,
        url: pageUrl,
        provider: {
          "@id": "https://compilepilot.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
