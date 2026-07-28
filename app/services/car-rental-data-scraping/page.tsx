"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { carRentalData } from "./carRentalData";

export default function CarRentalScrapingPage() {
  return <ServiceTemplate {...carRentalData} />;
}
