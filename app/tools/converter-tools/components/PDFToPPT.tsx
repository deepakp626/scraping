"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function PDFToPPT() {
  return (
    <ConverterTemplate
      title="PDF to PowerPoint"
      desc="Convert PDF documents into editable PowerPoint (.pptx) presentation slides."
      sourceExts={[".pdf"]}
      targetExt="pptx"
    />
  );
}
