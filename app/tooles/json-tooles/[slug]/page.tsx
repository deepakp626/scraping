import React from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const componentsMap: Record<
  string,
  { title: string; subtitle: string; component: any }
> = {
  "json-formatter": {
    title: "JSON Formatter",
    subtitle: "Format, clean, and indent raw JSON data strings.",
    component: dynamic(() => import("../components/JSONFormatter")),
  },
  "json-formatter-online": {
    title: "JSON Formatter Online",
    subtitle: "Free online JSON formatter tool to structure and beautify JSON in your browser.",
    component: dynamic(() => import("../components/JSONFormatter")),
  },
  "json-validator": {
    title: "JSON Validator",
    subtitle: "Validate JSON syntax and check structural health.",
    component: dynamic(() => import("../components/JSONValidator")),
  },
  "json-viewer": {
    title: "JSON Viewer",
    subtitle: "Explore interactive, collapsible JSON object trees.",
    component: dynamic(() => import("../components/JSONViewer")),
  },
  "json-beautifier": {
    title: "JSON Beautifier",
    subtitle: "Beautify compressed and messy JSON strings into readable code.",
    component: dynamic(() => import("../components/JSONBeautifier")),
  },
  "json-editor": {
    title: "JSON Editor",
    subtitle: "Edit JSON values visually or with code.",
    component: dynamic(() => import("../components/JSONEditor")),
  },
  "json-parser": {
    title: "JSON Parser",
    subtitle: "Parse JSON strings and inspect keys and data types.",
    component: dynamic(() => import("../components/JSONParser")),
  },
  "json-minifier": {
    title: "JSON Minifier",
    subtitle: "Minify and compress JSON strings by stripping whitespace.",
    component: dynamic(() => import("../components/JSONMinifier")),
  },
  "json-to-csv": {
    title: "JSON to CSV Converter",
    subtitle: "Convert JSON array payloads into tabular CSV files.",
    component: dynamic(() => import("../components/JSONToCSV")),
  },
  "json-to-xml": {
    title: "JSON to XML Converter",
    subtitle: "Convert JSON objects to XML document syntax.",
    component: dynamic(() => import("../components/JSONToXML")),
  },
  "json-to-yaml": {
    title: "JSON to YAML Converter",
    subtitle: "Convert JSON structures to YAML config format.",
    component: dynamic(() => import("../components/JSONToYAML")),
  },
  "json-pretty-print": {
    title: "JSON Pretty Print",
    subtitle: "Pretty print JSON with customizable indentation spaces.",
    component: dynamic(() => import("../components/JSONPrettyPrint")),
  },
  "json-compare": {
    title: "JSON Compare",
    subtitle: "Compare two JSON objects side-by-side to highlight differences.",
    component: dynamic(() => import("../components/JSONCompare")),
  },
  "json-diff": {
    title: "JSON Diff",
    subtitle: "Line-by-line diff tool for JSON files.",
    component: dynamic(() => import("../components/JSONDiff")),
  },
  "json-tree": {
    title: "JSON Tree Viewer",
    subtitle: "Explore nested JSON structures as visual tree nodes.",
    component: dynamic(() => import("../components/JSONTreeViewer")),
  },
  "json-tree-viewer": {
    title: "JSON Tree Viewer",
    subtitle: "Explore nested JSON structures as visual tree nodes.",
    component: dynamic(() => import("../components/JSONTreeViewer")),
  },
  "json-repair": {
    title: "JSON Repair",
    subtitle: "Fix invalid JSON formatting errors automatically.",
    component: dynamic(() => import("../components/JSONRepair")),
  },
  "json-to-excel": {
    title: "JSON to Excel Converter",
    subtitle: "Export JSON arrays into Excel spreadsheet files.",
    component: dynamic(() => import("../components/JSONToExcel")),
  },
  // "json-to-typescript": {
  //   title: "JSON to TypeScript",
  //   subtitle: "Generate TypeScript interfaces from JSON objects.",
  //   component: dynamic(() => import("../components/JSONToTypeScript")),
  // },
  // "json-to-java": {
  //   title: "JSON to Java POJO",
  //   subtitle: "Generate Java POJO classes from JSON payloads.",
  //   component: dynamic(() => import("../components/JSONToJava")),
  // },
  // "json-to-go": {
  //   title: "JSON to Go Struct",
  //   subtitle: "Generate Go structs with JSON tags from JSON data.",
  //   component: dynamic(() => import("../components/JSONToGo")),
  // },
  "csv-to-json": {
    title: "CSV to JSON Converter",
    subtitle: "Convert CSV spreadsheets into JSON object arrays.",
    component: dynamic(() => import("../components/CSVToJSON")),
  },
  "xml-to-json": {
    title: "XML to JSON Converter",
    subtitle: "Convert XML data tags into JSON object structures.",
    component: dynamic(() => import("../components/XMLToJSON")),
  },
  "yaml-to-json": {
    title: "YAML to JSON Converter",
    subtitle: "Convert YAML text files into valid JSON objects.",
    component: dynamic(() => import("../components/YAMLToJSON")),
  },
  // "json-to-python": {
  //   title: "JSON to Python Dataclass",
  //   subtitle: "Generate Python dataclasses from JSON objects.",
  //   component: dynamic(() => import("../components/JSONToPython")),
  // },
  "json-schema-generator": {
    title: "JSON Schema Generator",
    subtitle: "Generate draft-07 JSON Schemas from JSON objects.",
    component: dynamic(() => import("../components/JSONSchemaGenerator")),
  },
  "json-schema-validator": {
    title: "JSON Schema Validator",
    subtitle: "Validate JSON payloads against JSON Schemas.",
    component: dynamic(() => import("../components/JSONSchemaValidator")),
  },
  "jsonpath-evaluator": {
    title: "JSONPath Evaluator",
    subtitle: "Query JSON nodes using JSONPath expressions.",
    component: dynamic(() => import("../components/JSONPathEvaluator")),
  },
  "json-escape": {
    title: "JSON Escape / Unescape",
    subtitle: "Escape or unescape JSON string characters.",
    component: dynamic(() => import("../components/JSONEscape")),
  },
  "json-base64": {
    title: "JSON Base64 Converter",
    subtitle: "Encode JSON to Base64 or decode Base64 to JSON.",
    component: dynamic(() => import("../components/JSONBase64")),
  },
  "json-redactor": {
    title: "JSON Redactor",
    subtitle: "Mask sensitive fields in JSON object payloads.",
    component: dynamic(() => import("../components/JSONRedactor")),
  },
  "json-to-html-table": {
    title: "JSON to HTML Table",
    subtitle: "Convert JSON array payloads into HTML table markup.",
    component: dynamic(() => import("../components/JSONToHTMLTable")),
  },
  "json-key-sorter": {
    title: "JSON Key Sorter",
    subtitle: "Sort JSON object keys alphabetically.",
    component: dynamic(() => import("../components/JSONKeySorter")),
  },
  "json-mock-generator": {
    title: "JSON Mock Generator",
    subtitle: "Generate mock JSON data arrays for API prototyping.",
    component: dynamic(() => import("../components/JSONMockGenerator")),
  },
};

export default async function JsonToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = componentsMap[slug];

  if (!tool) {
    return (
      <section className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-slate-800">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">404 - Tool Not Found</h1>
          <p className="text-slate-600">The requested JSON tool does not exist or is under construction.</p>
          <Link
            href="/tooles/json-tooles"
            className="inline-block bg-primary-theme hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl transition-all"
          >
            Back to JSON Tools
          </Link>
        </div>
      </section>
    );
  }

  const DynamicComponent = tool.component;

  return (
    <section className="min-h-screen bg-white text-slate-900 py-20 px-4 md:px-6">
      <div className="mx-auto max-w-7xl bg-white border border-slate-200 rounded-[2rem] p-5 md:p-10 shadow-sm relative">
        <Link
          href="/tooles/json-tooles"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-theme font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all JSON tools
        </Link>

        <div className="space-y-3 mb-8">
          {/* <div className="inline-flex rounded-full bg-primary-theme/10 px-4 py-1.5 text-xs font-bold text-primary-theme uppercase tracking-wider">
            JSON Tool
          </div> */}
          {/* <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            {tool.title}
          </h1>
          <p className="text-base text-slate-500">{tool.subtitle}</p> */}
        </div>

        <div>
          <DynamicComponent />
        </div>
      </div>
    </section>
  );
}
