"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function VideoConverter() {
  return (
    <ConverterTemplate
      title="Video Converter"
      desc="Convert video formats between MP4, AVI, MKV, MOV, and WebM formats instantly."
      sourceExts={[".mp4", ".avi", ".mkv", ".mov", ".webm"]}
      targetExt="mp4"
    />
  );
}
