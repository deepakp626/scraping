import { audioConverterSeo } from "./audio-converter";
import { base64Seo } from "./base64";
import { csvToExcelSeo } from "./csv-to-excel";
import { csvToJsonSeo } from "./csv-to-json";
import { epubToMobiSeo } from "./epub-to-mobi";
import { excelToPdfSeo } from "./excel-to-pdf";
import { jsonToXmlSeo } from "./json-to-xml";
import { qrCodeSeo } from "./qr-code";
import { unitConverterSeo } from "./unit-converter";
import { urlEncoderSeo } from "./url-encoder";
import { videoConverterSeo } from "./video-converter";
import { xmlToCsvSeo } from "./xml-to-csv";

const converterToolSeo = {
  "audio-converter": audioConverterSeo,
  base64: base64Seo,
  "csv-to-excel": csvToExcelSeo,
  "csv-to-json": csvToJsonSeo,
  "epub-to-mobi": epubToMobiSeo,
  "excel-to-pdf": excelToPdfSeo,
  "json-to-xml": jsonToXmlSeo,
  "qr-code": qrCodeSeo,
  "unit-converter": unitConverterSeo,
  "url-encoder": urlEncoderSeo,
  "video-converter": videoConverterSeo,
  "xml-to-csv": xmlToCsvSeo,
};

export function getConverterToolSeo(slug: string) {
  return converterToolSeo[slug as keyof typeof converterToolSeo];
}

export {
  buildConverterToolsLandingSchema,
  converterToolsLandingMetadata,
} from "./landing";
