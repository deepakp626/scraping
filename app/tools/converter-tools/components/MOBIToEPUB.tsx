"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function MOBIToEPUB() {
  return (
    <ConverterTemplate
      title="MOBI to EPUB"
      desc="Convert Amazon Kindle MOBI eBook files (.mobi) to open EPUB format."
      sourceExts={[".mobi"]}
      targetExt="epub"
    />
  );
}
