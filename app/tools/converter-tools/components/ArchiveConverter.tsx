"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function ArchiveConverter() {
  return (
    <ConverterTemplate
      title="Archive Converter"
      desc="Convert archive files between ZIP, RAR, TAR, and 7Z formats instantly."
      sourceExts={[".zip", ".rar", ".tar", ".7z"]}
      targetExt="zip"
    />
  );
}
