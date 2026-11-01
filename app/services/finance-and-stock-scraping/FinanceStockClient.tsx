"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { financeAndStockScrapingData } from "./financeAndStockScrapingData";

export default function FinanceStockClient() {
  return <ServiceTemplate {...financeAndStockScrapingData} />;
}
