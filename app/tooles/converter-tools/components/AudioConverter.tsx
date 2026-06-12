"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function AudioConverter() {
  return (
    <ConverterTemplate
      title="Audio Converter"
      desc="Convert audio tracks between MP3, WAV, OGG, FLAC, and M4A formats instantly."
      sourceExts={[".mp3", ".wav", ".ogg", ".flac", ".m4a"]}
      targetExt="mp3"
    />
  );
}
