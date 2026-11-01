import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Resources from "./components/Resources";
import WhatsAppChatIcon from "./components/WhatsAppChatIcon";
import ConditionalContact from "./components/ConditionalContact";
import Review from "./components/Review";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://compilepilot.com"),
  title: {
    default: "Professional Web Scraping & Data Extraction | CompilePilot",
    template: "%s | CompilePilot",
  },

  description:
    "Get professional web scraping and data extraction services from CompilePilot. Collect publicly available web data and receive clean, structured datasets tailored to your business needs.",

  keywords: [
    "web scraping",
    "data extraction",
    "web scraping services",
    "data extraction services",
    "custom datasets",
    "public web data",
    "ecommerce data scraping",
    "structured datasets",
    "automated web scraping",
    "web crawling services",
    "data scraping tools",
    "enterprise web scraping",
    "CompilePilot",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://compilepilot.com/",
    siteName: "CompilePilot",
    title: "Professional Web Scraping & Data Extraction | CompilePilot",
    description:
      "Unlock the power of publicly available web data with CompilePilot. Get custom data extraction from websites, organized into clean, structured datasets for your business, research, or projects.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot Web Scraping and Data Extraction Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Professional Web Scraping & Data Extraction | CompilePilot",
    description:
      "Unlock publicly available web data with CompilePilot. Get custom data extraction and structured datasets tailored to your needs.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-white`}
      >
        <NextTopLoader color={'#f97316'} showSpinner={false} />
        <Navbar />
        {children}
        <CTA />
        <FAQ />
        <Resources />
        <Review />
        <ConditionalContact />
        <Footer />
        <WhatsAppChatIcon />
        
        {/* GoogleAnalytics moved inside <body> */}
        {gaId && (
          <GoogleAnalytics
            gaId={gaId}
            debugMode={process.env.NODE_ENV === "development"}
          />
        )}
      </body>
    </html>
  );
}