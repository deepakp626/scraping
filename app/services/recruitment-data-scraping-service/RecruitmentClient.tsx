"use client";
import React from "react";
import ServiceTemplate from "../components/ServiceTemplate";
import { recruitmentScrapingData } from "./recruitmentScrapingData";

export default function RecruitmentClient() {
  return <ServiceTemplate {...recruitmentScrapingData} />;
}
