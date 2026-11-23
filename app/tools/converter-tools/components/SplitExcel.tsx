"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function SplitExcel() {
  return (
    <ConverterTemplate
      title="Split Excel"
      desc="Split a large Excel worksheet (.xlsx, .xls) into separate Excel files."
      sourceExts={[".xlsx", ".xls"]}
      targetExt="zip"
    />
  );
}
