"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function ExcelToCSV() {
  return (
    <ConverterTemplate
      title="Excel to CSV"
      desc="Convert Excel worksheets (.xlsx, .xls) to comma-separated values (.csv) format."
      sourceExts={[".xlsx", ".xls"]}
      targetExt="csv"
    />
  );
}
