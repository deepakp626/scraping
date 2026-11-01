"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { travelDataScrapingData } from "./travelDataScrapingData";

export default function TravelClient() {
  return <ServiceTemplate {...travelDataScrapingData} />;
}
