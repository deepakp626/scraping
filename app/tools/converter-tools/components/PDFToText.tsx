"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function PDFToText() {
  return (
    <ConverterTemplate
      title="PDF to Text"
      desc="Extract plain text content (.txt) from PDF documents instantly."
      sourceExts={[".pdf"]}
      targetExt="txt"
    />
  );
}
