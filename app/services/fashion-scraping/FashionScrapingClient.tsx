"use client";
import ServiceTemplate from "../components/ServiceTemplate";
import { fashionData } from "./fashionData";

export default function FashionScrapingClient() {
  return <ServiceTemplate {...fashionData} />;
}
