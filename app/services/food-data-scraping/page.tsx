"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { foodScrapingData } from "./foodScrapingData";

export default function GroceryScrapingPage() {
  return <ServiceTemplate {...foodScrapingData} />;
}
