"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function SplitCSV() {
  return (
    <ConverterTemplate
      title="Split CSV"
      desc="Split a large CSV file (.csv) into multiple smaller CSV files."
      sourceExts={[".csv"]}
      targetExt="zip"
    />
  );
}
