"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function VideoCompressor() {
  return (
    <ConverterTemplate
      title="Video Compressor"
      desc="Compress large video files (MP4, MKV, AVI, MOV) while preserving quality."
      sourceExts={[".mp4", ".mkv", ".avi", ".mov", ".webm"]}
      targetExt="mp4"
    />
  );
}
