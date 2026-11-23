"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function EPUBToPDF() {
  return (
    <ConverterTemplate
      title="EPUB to PDF"
      desc="Convert open EPUB eBook files (.epub) to printable PDF documents."
      sourceExts={[".epub"]}
      targetExt="pdf"
    />
  );
}
