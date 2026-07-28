"use client";
import ServiceTemplate from "../components/ServiceTemplate";
import { fmcgScrapingData } from "./fmcgScrapingData";

export default function QuickCommerceFmcgDataScrapingPage() {
  return <ServiceTemplate {...fmcgScrapingData} />;
}
