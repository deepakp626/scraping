"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function XMLToCSV() {
  return (
    <ConverterTemplate
      title="XML to CSV"
      desc="Convert XML structured files (.xml) to comma-separated values (.csv) format."
      sourceExts={[".xml"]}
      targetExt="csv"
    />
  );
}
