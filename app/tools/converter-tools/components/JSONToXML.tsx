"use client";

import React from "react";
import ConverterTemplate from "./ConverterTemplate";

export default function JSONToXML() {
  return (
    <ConverterTemplate
      title="JSON to XML"
      desc="Convert JSON structured files (.json) to structured XML format."
      sourceExts={[".json"]}
      targetExt="xml"
    />
  );
}
