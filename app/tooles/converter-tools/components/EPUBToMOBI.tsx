"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function EPUBToMOBI() {
  return (
    <ConverterTemplate
      title="EPUB to MOBI"
      desc="Convert open EPUB eBook files (.epub) to Amazon Kindle MOBI format."
      sourceExts={[".epub"]}
      targetExt="mobi"
    />
  );
}
