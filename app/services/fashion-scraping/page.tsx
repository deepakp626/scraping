"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { fashionData } from "./fashionData";

export default function FashionScrapingPage() {
  return <ServiceTemplate {...fashionData} />;
}
