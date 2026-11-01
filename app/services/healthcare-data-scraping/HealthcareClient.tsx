"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { healthcareDataScrapingData } from "./healthcareDataScrapingData";

export default function HealthcareClient() {
  return <ServiceTemplate {...healthcareDataScrapingData} />;
}
