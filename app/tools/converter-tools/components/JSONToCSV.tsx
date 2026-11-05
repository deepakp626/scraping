"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function JSONToCSV() {
  return (
    <ConverterTemplate
      title="JSON to CSV"
      desc="Convert JSON data (.json) to comma-separated values (.csv) format."
      sourceExts={[".json"]}
      targetExt="csv"
    />
  );
}
