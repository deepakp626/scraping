"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { groceryScrapingData } from "./groceryScrapingData";

export default function GroceryScrapingPage() {
  return <ServiceTemplate {...groceryScrapingData} />;
}
