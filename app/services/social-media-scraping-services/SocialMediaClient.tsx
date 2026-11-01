"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { socialMediaScrapingData } from "./socialMediaScrapingData";

export default function SocialMediaClient() {
  return <ServiceTemplate {...socialMediaScrapingData} />;
}
