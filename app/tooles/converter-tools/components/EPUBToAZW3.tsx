"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function EPUBToAZW3() {
  return (
    <ConverterTemplate
      title="EPUB to AZW3"
      desc="Convert open EPUB eBook files (.epub) to Amazon Kindle AZW3 format."
      sourceExts={[".epub"]}
      targetExt="azw3"
    />
  );
}
