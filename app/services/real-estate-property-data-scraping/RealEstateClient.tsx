"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { realEstatePropertyDataScrapingData } from "./realEstatePropertyDataScrapingData";

export default function RealEstateClient() {
  return <ServiceTemplate {...realEstatePropertyDataScrapingData} />;
}
