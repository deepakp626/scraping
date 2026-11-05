"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function JSONToExcel() {
  return (
    <ConverterTemplate
      title="JSON to Excel"
      desc="Convert JSON data (.json) to Excel spreadsheets (.xlsx) instantly."
      sourceExts={[".json"]}
      targetExt="xlsx"
    />
  );
}
