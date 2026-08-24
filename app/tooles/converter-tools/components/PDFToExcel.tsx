"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function PDFToExcel() {
  return (
    <ConverterTemplate
      title="PDF to Excel"
      desc="Extract tabular data from PDF files directly into editable Excel (.xlsx) spreadsheets."
      sourceExts={[".pdf"]}
      targetExt="xlsx"
    />
  );
}
