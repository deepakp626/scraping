"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { fmcgScrapingData } from "./fmcgScrapingData";

export default function FmcgClient() {
  return <ServiceTemplate {...fmcgScrapingData} />;
}
