"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { foodDeliveryDataScrapingData } from "./foodDeliveryDataScrapingData";

export default function FoodDeliveryClient() {
  return <ServiceTemplate {...foodDeliveryDataScrapingData} />;
}
