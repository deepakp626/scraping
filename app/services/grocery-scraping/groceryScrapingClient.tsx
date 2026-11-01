"use client";
import ServiceTemplate from "../components/ServiceTemplate";
import { groceryScrapingData } from "./groceryScrapingData";

export default function GroceryScrapingClient() {
  return <ServiceTemplate {...groceryScrapingData} />;
}
