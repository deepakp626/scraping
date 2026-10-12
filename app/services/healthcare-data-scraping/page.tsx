"use client";
import ServiceTemplate from "../components/ServiceTemplate";
import { healthcareDataScrapingData } from "./healthcareDataScrapingData";

export default function HealthcareDataScrapingPage() {
  return <ServiceTemplate {...healthcareDataScrapingData} />;
}
