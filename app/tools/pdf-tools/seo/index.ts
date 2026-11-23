import { addWatermarkSeo } from "./add-watermark";
import { compressPdfSeo } from "./compress-pdf";
import { extractPagesSeo } from "./extract-pages";
import { extractImagesFromPdfSeo } from "./extract-images-from-pdf";
import { imageToPdfSeo } from "./image-to-pdf";
import { mergePdfSeo } from "./merge-pdf";
import { lockPdfSeo } from "./lock-pdf";
import { ocrPdfSeo } from "./ocr-pdf";
import { pageNumbersSeo } from "./page-numbers";
import { pdfToImageSeo } from "./pdf-to-image";
import { pdfToHtmlSeo } from "./pdf-to-html";
import { pdfToWordSeo } from "./pdf-to-word";
import { removePagesSeo } from "./remove-pages";
import { rotateLeftSeo } from "./rotate-left";
import { rotatePdfSeo } from "./rotate-pdf";
import { searchPdfSeo } from "./search-pdf";
import { signPdfSeo } from "./sign-pdf";
import { splitPdfSeo } from "./split-pdf";
import { unlockPdfSeo } from "./unlock-pdf";
import { wordToPdfSeo } from "./word-to-pdf";

const pdfToolSeo = {
  "add-watermark": addWatermarkSeo,
  "compress-pdf": compressPdfSeo,
  "extract-pages": extractPagesSeo,
  "extract-images-from-pdf": extractImagesFromPdfSeo,
  "image-to-pdf": imageToPdfSeo,
  "merge-pdf": mergePdfSeo,
  "lock-pdf": lockPdfSeo,
  "ocr-pdf": ocrPdfSeo,
  "page-numbers": pageNumbersSeo,
  "pdf-to-image": pdfToImageSeo,
  "pdf-to-html": pdfToHtmlSeo,
  "pdf-to-word": pdfToWordSeo,
  "remove-pages": removePagesSeo,
  "rotate-left": rotateLeftSeo,
  "rotate-pdf": rotatePdfSeo,
  "search-pdf": searchPdfSeo,
  "sign-pdf": signPdfSeo,
  "split-pdf": splitPdfSeo,
  "unlock-pdf": unlockPdfSeo,
  "word-to-pdf": wordToPdfSeo,
};

export function getPdfToolSeo(slug: string) {
  return pdfToolSeo[slug as keyof typeof pdfToolSeo];
}
