"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { liquorScrapingData } from "./liquorScrapingData";

export default function LiquorScrapingPage() {
  return <ServiceTemplate {...liquorScrapingData} />;
}
