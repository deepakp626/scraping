"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { quickCommerceScrapingData } from "./quickCommerceScrapingData";

export default function QuickCommerceScrapingPage() {
  return <ServiceTemplate {...quickCommerceScrapingData} />;
}
