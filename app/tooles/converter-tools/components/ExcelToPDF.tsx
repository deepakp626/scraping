"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function ExcelToPDF() {
  return (
    <ConverterTemplate
      title="Excel to PDF"
      desc="Convert Excel worksheets (.xlsx, .xls) to PDF documents instantly."
      sourceExts={[".xlsx", ".xls"]}
      targetExt="pdf"
    />
  );
}
