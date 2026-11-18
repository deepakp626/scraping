import {
  buildJsonFormatterSchema,
  jsonFormatterMetadata,
} from './json-formatter';
import {
  buildJsonFormatterOnlineSchema,
  jsonFormatterOnlineMetadata,
} from './json-formatter-online';
import {
  buildJsonValidatorSchema,
  jsonValidatorMetadata,
} from './json-validator';
import {
  buildJsonViewerSchema,
  jsonViewerMetadata,
} from './json-viewer';
import {
  buildJsonBeautifierSchema,
  jsonBeautifierMetadata,
} from './json-beautifier';
import {
  buildJsonEditorSchema,
  jsonEditorMetadata,
} from './json-editor';
import {
  buildJsonParserSchema,
  jsonParserMetadata,
} from './json-parser';
import {
  buildJsonMinifierSchema,
  jsonMinifierMetadata,
} from './json-minifier';
import {
  buildJsonToCsvSchema,
  jsonToCsvMetadata,
} from './json-to-csv';
import {
  buildJsonToXmlSchema,
  jsonToXmlMetadata,
} from './json-to-xml';
import {
  buildJsonToYamlSchema,
  jsonToYamlMetadata,
} from './json-to-yaml';
import {
  buildJsonPrettyPrintSchema,
  jsonPrettyPrintMetadata,
} from './json-pretty-print';
import {
  buildJsonCompareSchema,
  jsonCompareMetadata,
} from './json-compare';
import {
  buildJsonDiffSchema,
  jsonDiffMetadata,
} from './json-diff';
import {
  buildJsonTreeViewerSchema,
  jsonTreeViewerMetadata,
} from './json-tree-viewer';
import {
  buildJsonRepairSchema,
  jsonRepairMetadata,
} from './json-repair';
import {
  buildJsonToExcelSchema,
  jsonToExcelMetadata,
} from './json-to-excel';
import {
  buildCsvToJsonSchema,
  csvToJsonMetadata,
} from './csv-to-json';
import {
  buildXmlToJsonSchema,
  xmlToJsonMetadata,
} from './xml-to-json';
import {
  buildJsonSchemaGeneratorSchema,
  jsonSchemaGeneratorMetadata,
} from './json-schema-generator';
import {
  buildJsonSchemaValidatorSchema,
  jsonSchemaValidatorMetadata,
} from './json-schema-validator';
import {
  buildYamlToJsonSchema,
  yamlToJsonMetadata,
} from './yaml-to-json';
import {
  buildJsonPathEvaluatorSchema,
  jsonPathEvaluatorMetadata,
} from './jsonpath-evaluator';
import {
  buildJsonEscapeSchema,
  jsonEscapeMetadata,
} from './json-escape';
import {
  buildJsonBase64Schema,
  jsonBase64Metadata,
} from './json-base64';
import {
  buildJsonRedactorSchema,
  jsonRedactorMetadata,
} from './json-redactor';
import {
  buildJsonKeySorterSchema,
  jsonKeySorterMetadata,
} from './json-key-sorter';
import {
  buildJsonMockGeneratorSchema,
  jsonMockGeneratorMetadata,
} from './json-mock-generator';
import {
  buildJsonToHtmlTableSchema,
  jsonToHtmlTableMetadata,
} from './json-to-html-table';

const jsonToolSeo = {
  'json-formatter': {
    metadata: jsonFormatterMetadata,
    buildSchema: buildJsonFormatterSchema,
  },
  'json-formatter-online': {
    metadata: jsonFormatterOnlineMetadata,
    buildSchema: buildJsonFormatterOnlineSchema,
  },
  'json-validator': {
    metadata: jsonValidatorMetadata,
    buildSchema: buildJsonValidatorSchema,
  },
  'json-viewer': {
    metadata: jsonViewerMetadata,
    buildSchema: buildJsonViewerSchema,
  },
  'json-beautifier': {
    metadata: jsonBeautifierMetadata,
    buildSchema: buildJsonBeautifierSchema,
  },
  'json-editor': {
    metadata: jsonEditorMetadata,
    buildSchema: buildJsonEditorSchema,
  },
  'json-parser': {
    metadata: jsonParserMetadata,
    buildSchema: buildJsonParserSchema,
  },
  'json-minifier': {
    metadata: jsonMinifierMetadata,
    buildSchema: buildJsonMinifierSchema,
  },
  'json-to-csv': {
    metadata: jsonToCsvMetadata,
    buildSchema: buildJsonToCsvSchema,
  },
  'json-to-xml': {
    metadata: jsonToXmlMetadata,
    buildSchema: buildJsonToXmlSchema,
  },
  'json-to-yaml': {
    metadata: jsonToYamlMetadata,
    buildSchema: buildJsonToYamlSchema,
  },
  'json-pretty-print': {
    metadata: jsonPrettyPrintMetadata,
    buildSchema: buildJsonPrettyPrintSchema,
  },
  'json-compare': {
    metadata: jsonCompareMetadata,
    buildSchema: buildJsonCompareSchema,
  },
  'json-diff': {
    metadata: jsonDiffMetadata,
    buildSchema: buildJsonDiffSchema,
  },
  'json-tree-viewer': {
    metadata: jsonTreeViewerMetadata,
    buildSchema: buildJsonTreeViewerSchema,
  },
  'json-repair': {
    metadata: jsonRepairMetadata,
    buildSchema: buildJsonRepairSchema,
  },
  'json-to-excel': {
    metadata: jsonToExcelMetadata,
    buildSchema: buildJsonToExcelSchema,
  },
  'csv-to-json': {
    metadata: csvToJsonMetadata,
    buildSchema: buildCsvToJsonSchema,
  },
  'xml-to-json': {
    metadata: xmlToJsonMetadata,
    buildSchema: buildXmlToJsonSchema,
  },
  'json-schema-generator': {
    metadata: jsonSchemaGeneratorMetadata,
    buildSchema: buildJsonSchemaGeneratorSchema,
  },
  'json-schema-validator': {
    metadata: jsonSchemaValidatorMetadata,
    buildSchema: buildJsonSchemaValidatorSchema,
  },
  'yaml-to-json': {
    metadata: yamlToJsonMetadata,
    buildSchema: buildYamlToJsonSchema,
  },
  'jsonpath-evaluator': {
    metadata: jsonPathEvaluatorMetadata,
    buildSchema: buildJsonPathEvaluatorSchema,
  },
  'json-escape': {
    metadata: jsonEscapeMetadata,
    buildSchema: buildJsonEscapeSchema,
  },
  'json-base64': {
    metadata: jsonBase64Metadata,
    buildSchema: buildJsonBase64Schema,
  },
  'json-redactor': {
    metadata: jsonRedactorMetadata,
    buildSchema: buildJsonRedactorSchema,
  },
  'json-key-sorter': {
    metadata: jsonKeySorterMetadata,
    buildSchema: buildJsonKeySorterSchema,
  },
  'json-mock-generator': {
    metadata: jsonMockGeneratorMetadata,
    buildSchema: buildJsonMockGeneratorSchema,
  },
  'json-to-html-table': {
    metadata: jsonToHtmlTableMetadata,
    buildSchema: buildJsonToHtmlTableSchema,
  },
};

export function getJsonToolSeo(slug: string) {
  return jsonToolSeo[slug as keyof typeof jsonToolSeo];
}