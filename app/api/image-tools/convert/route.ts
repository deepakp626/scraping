import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const format = formData.get("format") as string | null;
    const qualityStr = formData.get("quality") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!format) {
      return NextResponse.json({ error: "No target format specified" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pipeline = sharp(buffer);
    const quality = qualityStr ? parseInt(qualityStr, 10) : 80;

    // Determine target format extension and mime type
    // input format is like "image/webp"
    let targetExt = format.split("/")[1];
    if (targetExt === "jpeg") targetExt = "jpg";
    if (targetExt === "svg+xml") targetExt = "svg";
    if (targetExt === "x-icon") targetExt = "ico";

    // Configure sharp for the target format
    switch (targetExt) {
      case "jpg":
      case "jpeg":
        pipeline = pipeline.jpeg({ quality });
        break;
      case "png":
        pipeline = pipeline.png();
        break;
      case "webp":
        pipeline = pipeline.webp({ quality });
        break;
      case "avif":
        pipeline = pipeline.avif({ quality });
        break;
      case "heic":
      case "heif":
        // sharp uses 'heif' for both HEIC and HEIF
        pipeline = pipeline.heif({ quality });
        break;
      case "gif":
        pipeline = pipeline.gif();
        break;
      case "tiff":
        pipeline = pipeline.tiff({ quality });
        break;
      case "bmp":
        // @ts-ignore - bmp might not be in types but is supported in recent sharp
        if (typeof pipeline.bmp === 'function') {
            pipeline = (pipeline as any).bmp();
        }
        break;
      default:
        // For other formats, sharp might support them via toFormat or just by extension
        try {
            pipeline = pipeline.toFormat(targetExt as any, { quality });
        } catch (e) {
            // fallback if toFormat fails
        }
    }

    const outputBuffer = await pipeline.toBuffer();

    const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
    
    // Special handling for SVG: Wrap raster in SVG tag to make it a valid XML document
    if (targetExt === "svg") {
      const metadata = await sharp(outputBuffer).metadata();
      const base64 = outputBuffer.toString("base64");
      const mimeType = `image/${metadata.format === 'jpeg' ? 'jpeg' : metadata.format}`;
      
      const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${metadata.width}" height="${metadata.height}" viewBox="0 0 ${metadata.width} ${metadata.height}">
  <image width="${metadata.width}" height="${metadata.height}" xlink:href="data:${mimeType};base64,${base64}" />
</svg>`;

      const responseHeaders = new Headers();
      responseHeaders.set("Content-Type", "image/svg+xml");
      responseHeaders.set(
        "Content-Disposition",
        `attachment; filename="${originalNameWithoutExt}.svg"`
      );

      return new NextResponse(svgString, {
        status: 200,
        headers: responseHeaders,
      });
    }

    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", format);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${originalNameWithoutExt}.${targetExt}"`
    );

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Conversion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to convert image" },
      { status: 500 }
    );
  }
}
