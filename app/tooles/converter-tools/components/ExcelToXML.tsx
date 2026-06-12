"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function ExcelToXML() {
  return (
    <ConverterTemplate
      title="Excel to XML"
      desc="Convert Excel worksheets (.xlsx, .xls) to structured XML files."
      sourceExts={[".xlsx", ".xls"]}
      targetExt="xml"
    />
  );
}
