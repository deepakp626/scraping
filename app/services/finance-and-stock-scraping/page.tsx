"use client";
import ServiceTemplate from "../components/ServiceTemplate";
import { financeAndStockScrapingData } from "./financeAndStockScrapingData";

export default function FinanceAndStockScrapingPage() {
  return <ServiceTemplate {...financeAndStockScrapingData} />;
}
