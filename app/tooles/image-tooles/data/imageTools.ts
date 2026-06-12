export interface ImageTool {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  actionLabel: string;
  component: string;
}

export const imageTools: Record<string, ImageTool> = {
  "compress-image": {
    title: "Compress Image",
    subtitle: "Reduce image file size",
    description: "Compress images without losing quality",
    features: ["High quality", "Fast compression", "Instant download"],
    actionLabel: "Compress Now",
    component: "CompressImage"
  },
  "resize-image": {
    title: "Resize Image",
    subtitle: "Resize your image easily",
    description: "Resize image dimensions dynamically",
    features: ["Custom size", "Maintain ratio", "Fast processing"],
    actionLabel: "Resize Now",
    component: "ResizeImage"
  },
  "crop-image": {
    title: "Crop Image",
    subtitle: "Crop images to desired proportions",
    description: "Trim edges and focus on specific parts of your image.",
    features: ["Aspect ratio lock", "Free-form cropping", "HD output"],
    actionLabel: "Crop Now",
    component: "CropImage"
  },
  "convert-jpg": {
    title: "Convert to JPG",
    subtitle: "Convert images to JPG format",
    description: "Convert any image format into a high-quality JPG.",
    features: ["Fast conversion", "Batch processing", "Lossless color mapping"],
    actionLabel: "Convert Now",
    component: "ConvertJpg"
  },
  "convert-png": {
    title: "Convert to PNG",
    subtitle: "Convert images to PNG format",
    description: "Convert any image format into a transparent PNG.",
    features: ["Transparency support", "Lossless format", "Alpha channel preservation"],
    actionLabel: "Convert Now",
    component: "ConvertPng"
  },
  "convert-webp": {
    title: "Convert to WebP",
    subtitle: "Convert images to WebP format",
    description: "Convert images to WebP for modern web performance.",
    features: ["Superior compression", "Animation support", "Fast page loads"],
    actionLabel: "Convert Now",
    component: "ConvertWebp"
  },
  "rotate-image": {
    title: "Rotate Image",
    subtitle: "Rotate image orientation",
    description: "Rotate images clockwise or counter-clockwise dynamically.",
    features: ["90°/180°/270° rotation", "Custom angle support", "No resolution loss"],
    actionLabel: "Rotate Now",
    component: "RotateImage"
  },
  "flip-horizontal": {
    title: "Flip Horizontal",
    subtitle: "Mirror image horizontally",
    description: "Flip your image horizontally to get a mirrored effect.",
    features: ["One-click flip", "Immediate preview", "Retain metadata"],
    actionLabel: "Flip Now",
    component: "FlipHorizontal"
  },
  "flip-vertical": {
    title: "Flip Vertical",
    subtitle: "Mirror image vertically",
    description: "Flip your image vertically (upside down).",
    features: ["One-click flip", "Precise alignment", "Original scale"],
    actionLabel: "Flip Now",
    component: "FlipVertical"
  },
  "image-to-pdf": {
    title: "Image to PDF",
    subtitle: "Convert images to PDF document",
    description: "Combine or convert images into a clean PDF document.",
    features: ["Merge multiple images", "Adjust margins", "Vector quality preservation"],
    actionLabel: "Convert Now",
    component: "ImageToPdf"
  },
  "remove-bg": {
    title: "Remove Background",
    subtitle: "Erase background from image",
    description: "Isolate subjects and automatically remove image background.",
    features: ["AI background detection", "Clean cutout edges", "Download transparent PNG"],
    actionLabel: "Remove Now",
    component: "RemoveBg"
  },
  "enhance-image": {
    title: "Enhance Image",
    subtitle: "Improve image visual quality",
    description: "Auto-enhance lighting, details, contrast, and colors.",
    features: ["One-click AI boost", "Reduce noise", "Auto contrast correction"],
    actionLabel: "Enhance Now",
    component: "EnhanceImage"
  },
  "add-watermark": {
    title: "Add Watermark",
    subtitle: "Protect images with watermarks",
    description: "Overlay customizable text or logo watermarks on your images.",
    features: ["Custom transparency", "Positioning grid", "Tile/repeating watermark option"],
    actionLabel: "Watermark Now",
    component: "AddWatermark"
  },
  "blur-image": {
    title: "Blur Image",
    subtitle: "Apply blur effect to image",
    description: "Soften details or hide areas with customizable blur filters.",
    features: ["Adjustable blur intensity", "Radial & linear blur", "Selective focus preservation"],
    actionLabel: "Blur Now",
    component: "BlurImage"
  },
  "sharpen-image": {
    title: "Sharpen Image",
    subtitle: "Enhance edge definition",
    description: "Sharpen blurry details and improve crispness of your photos.",
    features: ["Intelligent detail mapping", "Control threshold", "Reduce fuzziness"],
    actionLabel: "Sharpen Now",
    component: "SharpenImage"
  },
  "change-format": {
    title: "Change Format",
    subtitle: "Change image file format",
    description: "Easily switch your image extension to JPG, PNG, WebP, GIF, etc.",
    features: ["Multi-format support", "Quality tuning slider", "Secure processing"],
    actionLabel: "Change Now",
    component: "ChangeFormat"
  },
  "color-adjust": {
    title: "Color Adjust",
    subtitle: "Adjust colors and tone",
    description: "Calibrate saturation, brightness, contrast, hue, and exposure.",
    features: ["Sliders for key metrics", "Live color histograms", "Reset to original anytime"],
    actionLabel: "Adjust Now",
    component: "ColorAdjust"
  },
  "merge-images": {
    title: "Merge Images",
    subtitle: "Combine images together",
    description: "Merge multiple images side-by-side or stacked vertically.",
    features: ["Grid layouts", "Custom border size", "Drag-and-drop ordering"],
    actionLabel: "Merge Now",
    component: "MergeImages"
  },
  "split-image": {
    title: "Split Image",
    subtitle: "Slice image into parts",
    description: "Divide a single image into multiple grid-based tiles.",
    features: ["Custom rows & columns", "Perfect for social grids", "Batch ZIP download"],
    actionLabel: "Split Now",
    component: "SplitImage"
  },
  "add-text": {
    title: "Add Text to Image",
    subtitle: "Overlay text on image",
    description: "Add customized captions, annotations, and text styling to your images.",
    features: ["Rich font library", "Color picker & styling", "Drag to reposition"],
    actionLabel: "Add Text Now",
    component: "AddText"
  },
  "pdf-to-images": {
    title: "PDF to Images",
    subtitle: "Convert PDF pages to images",
    description: "Extract individual pages from PDF files and convert them into high-quality images.",
    features: ["Extract all pages", "Adjust image resolution", "PDF to PNG/JPG conversion"],
    actionLabel: "Convert Now",
    component: "PdfToImages"
  }
};