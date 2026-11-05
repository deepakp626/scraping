import Link from "next/link";
import {
  FileCode,
  CheckCircle2,
  Minimize2,
  Eye,
  Network,
  Table,
  FileSpreadsheet,
  Code2,
  FileType,
  FileText,
  FileJson,
  SquareCode,
  Zap,
  Terminal,
  Coffee,
  Layers,
  ShieldCheck,
  Search,
  GitCompare,
  Quote,
  Binary,
  EyeOff,
  LayoutGrid,
  ArrowUpDown,
  Sparkles,
  Wrench,
  Printer,
  Edit3,
  Code,
  Globe,
} from "lucide-react";

export function JsonToolsSection() {
  const tools = [
    { name: "JSON Formatter", icon: FileCode, link: "/tools/json-tools/json-formatter" },
    { name: "JSON Formatter Online", icon: Globe, link: "/tools/json-tools/json-formatter-online" },
    { name: "JSON Validator", icon: CheckCircle2, link: "/tools/json-tools/json-validator" },
    { name: "JSON Viewer", icon: Eye, link: "/tools/json-tools/json-viewer" },
    { name: "JSON Beautifier", icon: Sparkles, link: "/tools/json-tools/json-beautifier" },
    { name: "JSON Editor", icon: Edit3, link: "/tools/json-tools/json-editor" },
    { name: "JSON Parser", icon: Code, link: "/tools/json-tools/json-parser" },
    { name: "JSON Minifier", icon: Minimize2, link: "/tools/json-tools/json-minifier" },
    { name: "JSON to CSV", icon: Table, link: "/tools/json-tools/json-to-csv" },
    { name: "JSON to XML", icon: Code2, link: "/tools/json-tools/json-to-xml" },
    { name: "JSON to YAML", icon: FileText, link: "/tools/json-tools/json-to-yaml" },
    { name: "JSON Pretty Print", icon: Printer, link: "/tools/json-tools/json-pretty-print" },
    { name: "JSON Compare", icon: GitCompare, link: "/tools/json-tools/json-compare" },
    { name: "JSON Diff", icon: GitCompare, link: "/tools/json-tools/json-diff" },
    { name: "JSON Tree Viewer", icon: Network, link: "/tools/json-tools/json-tree-viewer" },
    { name: "JSON Repair", icon: Wrench, link: "/tools/json-tools/json-repair" },
    { name: "JSON to Excel", icon: FileSpreadsheet, link: "/tools/json-tools/json-to-excel" },
    // { name: "JSON to TypeScript", icon: SquareCode, link: "/tools/json-tools/json-to-typescript" },
    // { name: "JSON to Java POJO", icon: Coffee, link: "/tools/json-tools/json-to-java" },
    // { name: "JSON to Go Struct", icon: Zap, link: "/tools/json-tools/json-to-go" },
    { name: "CSV to JSON", icon: FileSpreadsheet, link: "/tools/json-tools/csv-to-json" },
    { name: "XML to JSON", icon: FileType, link: "/tools/json-tools/xml-to-json" },
    { name: "YAML to JSON", icon: FileJson, link: "/tools/json-tools/yaml-to-json" },
    // { name: "JSON to Python Model", icon: Terminal, link: "/tools/json-tools/json-to-python" },
    { name: "JSON Schema Generator", icon: Layers, link: "/tools/json-tools/json-schema-generator" },
    { name: "JSON Schema Validator", icon: ShieldCheck, link: "/tools/json-tools/json-schema-validator" },
    { name: "JSONPath Evaluator", icon: Search, link: "/tools/json-tools/jsonpath-evaluator" },
    { name: "JSON Escape / Unescape", icon: Quote, link: "/tools/json-tools/json-escape" },
    { name: "JSON Base64", icon: Binary, link: "/tools/json-tools/json-base64" },
    { name: "JSON Redactor", icon: EyeOff, link: "/tools/json-tools/json-redactor" },
    { name: "JSON to HTML Table", icon: LayoutGrid, link: "/tools/json-tools/json-to-html-table" },
    { name: "JSON Key Sorter", icon: ArrowUpDown, link: "/tools/json-tools/json-key-sorter" },
    { name: "JSON Mock Generator", icon: Sparkles, link: "/tools/json-tools/json-mock-generator" },
  ];

  return (
    <section className="py-12 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
          Explore Our JSON Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={index}
                href={tool.link}
                className="group flex flex-col items-center justify-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-primary-theme transition">
                  <Icon className="w-8 h-8 text-primary-theme group-hover:text-black animate-none group-hover:scale-110 duration-200" />
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-primary-theme transition">
                  {tool.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default JsonToolsSection;
