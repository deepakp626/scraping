import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const widthStr = formData.get("width") as string | null;
    const heightStr = formData.get("height") as string | null;
    const format = formData.get("format") as string | null;
    const qualityStr = formData.get("quality") as string | null;
    const fit = (formData.get("fit") as string | null) || "inside";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pipeline = sharp(buffer);

    // Get metadata to calculate dimensions if only one is specified
    const metadata = await pipeline.metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    let width = widthStr ? parseInt(widthStr, 10) : null;
    let height = heightStr ? parseInt(heightStr, 10) : null;
    const quality = qualityStr ? parseInt(qualityStr, 10) : 80;

    // Handle 0 or NaN values
    if (width === 0 || isNaN(Number(width))) width = null;
    if (height === 0 || isNaN(Number(height))) height = null;

    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: fit as any,
        withoutEnlargement: false,
      });
    }

    // Determine target format
    let targetFormat = format || file.type.split("/")[1] || "jpeg";
    if (targetFormat === "jpg") targetFormat = "jpeg";

    if (targetFormat === "jpeg") {
      pipeline = pipeline.jpeg({ quality });
    } else if (targetFormat === "png") {
      pipeline = pipeline.png(); // PNG is lossless, ignores quality slider or we can specify compressionLevel
    } else if (targetFormat === "webp") {
      pipeline = pipeline.webp({ quality });
    }

    const outputBuffer = await pipeline.toBuffer();

    // Create the response headers with custom filename
    const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
    const finalExt = targetFormat === "jpeg" ? "jpg" : targetFormat;
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", `image/${targetFormat}`);
    responseHeaders.set(
      "Content-Disposition",
      `attachment; filename="${originalNameWithoutExt}_resized.${finalExt}"`
    );

    return new NextResponse(new Uint8Array(outputBuffer), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Resizing error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to resize image" },
      { status: 500 }
    );
  }
}
