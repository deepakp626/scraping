"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function CSVToExcel() {
  return (
    <ConverterTemplate
      title="CSV to Excel"
      desc="Convert comma-separated values (.csv) to Excel spreadsheets (.xlsx) instantly."
      sourceExts={[".csv"]}
      targetExt="xlsx"
    />
  );
}
