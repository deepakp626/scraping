"use client";

import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { jsPDF } from "jspdf";

export default function ImageToPDF() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const pdfName = "converted-images";
  const [pageMargin, setPageMargin] = useState(24);

  // Handle image upload
  const handleFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files;

  if (!files || files.length === 0) return;

  try {
    setLoading(true);

    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      // Compress image in browser
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 2500,
        useWebWorker: true,
      });

      const imageUrl = URL.createObjectURL(compressedFile);

      newImages.push(imageUrl);
    }

    // Append new images instead of replacing old ones
    setImages((prev) => [...prev, ...newImages]);
  } catch (error) {
    console.error("Image processing failed:", error);
  } finally {
    setLoading(false);

    // Reset input so same image can be selected again
    e.target.value = "";
  }
};

  // Convert images to PDF
  const convertToPDF = async () => {
    if (images.length === 0) return;

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const img = new Image();

        img.src = image;

        await new Promise<void>((resolve) => {
          img.onload = () => {
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const contentWidth = pdfWidth - pageMargin * 2;
            const contentHeight = pdfHeight - pageMargin * 2;

            // Maintain aspect ratio
            const ratio = Math.min(
              contentWidth / img.width,
              contentHeight / img.height
            );

            const imgWidth = img.width * ratio;
            const imgHeight = img.height * ratio;

            const x = pageMargin + (contentWidth - imgWidth) / 2;
            const y = pageMargin + (contentHeight - imgHeight) / 2;

            if (i > 0) {
              pdf.addPage();
            }

            pdf.addImage(
              img,
              "PNG",
              x,
              y,
              imgWidth,
              imgHeight
            );

            resolve();
          };
        });
      }

      // Direct download
      pdf.save(`${pdfName}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Image to PDF
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Convert JPG, PNG, and WebP images into a PDF directly in your browser.
      </p>

      {/* Upload Area */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="pdf-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFileChange}
        />

        <label
          htmlFor="pdf-upload"
          className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500"
        >
          {loading ? "Processing..." : "Upload image files"}
        </label>

        <span className="text-xs text-slate-400 mt-1">
          PNG, JPG, WebP up to 15MB
        </span>
      </div>

          {/* PDF Page Margin and Previews */}
      {images.length > 0 && (
        <>
          <div className="mt-6">
            <label
              htmlFor="pdf-page-margin"
              className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700"
            >
              <span>PDF page margin</span>
              <span>{pageMargin} px</span>
            </label>
            <input
              id="pdf-page-margin"
              type="range"
              min="0"
              max="80"
              step="4"
              value={pageMargin}
              onChange={(event) => setPageMargin(Number(event.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="h-40 w-full object-cover"
                />

                <button
                  onClick={() =>
                    setImages((prev) =>
                      prev.filter((_, imageIndex) => imageIndex !== index)
                    )
                  }
                  className="absolute right-2 top-2 cursor-pointer rounded-lg border border-slate-200 bg-white/90 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Convert Button */}
      <button
        onClick={convertToPDF}
        disabled={images.length === 0}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
      >
        Convert & Download PDF
      </button>
    </div>
  );
}