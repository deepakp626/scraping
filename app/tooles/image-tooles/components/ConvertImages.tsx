"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const FORMATS = [
  { label: "JPG", value: "image/jpeg", ext: "jpg" },
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "WEBP", value: "image/webp", ext: "webp" },
];

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [convertedUrl, setConvertedUrl] = useState("");
  const [format, setFormat] = useState("image/webp");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setConvertedUrl("");
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 4000,
        useWebWorker: true,
        fileType: format,
      };

      const convertedFile = await imageCompression(
        selectedFile,
        options
      );

      const url = URL.createObjectURL(convertedFile);

      setConvertedUrl(url);
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const getExtension = () => {
    return (
      FORMATS.find((item) => item.value === format)?.ext || "webp"
    );
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Image Converter</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div style={{ marginTop: "20px" }}>
        <label>Select Format:</label>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          {FORMATS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        {loading ? "Converting..." : "Convert Image"}
      </button>

      {convertedUrl && (
        <div style={{ marginTop: "30px" }}>
          <h3>Preview</h3>

          <img
            src={convertedUrl}
            alt="Converted"
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          />

          <a
            href={convertedUrl}
            download={`converted.${getExtension()}`}
            style={{
              display: "block",
              marginTop: "15px",
              textAlign: "center",
              padding: "12px",
              border: "1px solid #000",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}