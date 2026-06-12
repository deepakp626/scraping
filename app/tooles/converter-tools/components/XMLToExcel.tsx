"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function XMLToExcel() {
  return (
    <ConverterTemplate
      title="XML to Excel"
      desc="Convert XML structured files (.xml) to Excel spreadsheets (.xlsx) instantly."
      sourceExts={[".xml"]}
      targetExt="xlsx"
    />
  );
}
