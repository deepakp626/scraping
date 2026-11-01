"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { foodScrapingData } from "./foodScrapingData";

export default function FoodClient() {
  return <ServiceTemplate {...foodScrapingData} />;
}
