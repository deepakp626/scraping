"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function PPTToPDF() {
  return (
    <ConverterTemplate
      title="PowerPoint to PDF"
      desc="Convert PowerPoint presentations (.pptx, .ppt) to PDF documents."
      sourceExts={[".pptx", ".ppt"]}
      targetExt="pdf"
    />
  );
}
