"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function MP4Converter() {
  return (
    <ConverterTemplate
      title="MP4 Converter"
      desc="Convert any video format (AVI, MKV, MOV, FLV, WMV) to standard MP4 format."
      sourceExts={[".avi", ".mkv", ".mov", ".flv", ".wmv", ".webm"]}
      targetExt="mp4"
    />
  );
}
