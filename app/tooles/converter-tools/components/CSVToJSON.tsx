"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function CSVToJSON() {
  return (
    <ConverterTemplate
      title="CSV to JSON"
      desc="Convert comma-separated values (.csv) to JSON data objects instantly."
      sourceExts={[".csv"]}
      targetExt="json"
    />
  );
}
