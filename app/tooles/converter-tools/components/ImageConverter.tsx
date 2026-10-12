"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function ImageConverter() {
  return (
    <ConverterTemplate
      title="Image Format Converter"
      desc="Convert image formats between PNG, JPG, WebP, GIF, and BMP instantly."
      sourceExts={[".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"]}
      targetExt="png"
    />
  );
}
