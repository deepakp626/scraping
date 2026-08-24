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
    { name: "JSON Formatter", icon: FileCode, link: "/tooles/json-tooles/json-formatter" },
    { name: "JSON Formatter Online", icon: Globe, link: "/tooles/json-tooles/json-formatter-online" },
    { name: "JSON Validator", icon: CheckCircle2, link: "/tooles/json-tooles/json-validator" },
    { name: "JSON Viewer", icon: Eye, link: "/tooles/json-tooles/json-viewer" },
    { name: "JSON Beautifier", icon: Sparkles, link: "/tooles/json-tooles/json-beautifier" },
    { name: "JSON Editor", icon: Edit3, link: "/tooles/json-tooles/json-editor" },
    { name: "JSON Parser", icon: Code, link: "/tooles/json-tooles/json-parser" },
    { name: "JSON Minifier", icon: Minimize2, link: "/tooles/json-tooles/json-minifier" },
    { name: "JSON to CSV", icon: Table, link: "/tooles/json-tooles/json-to-csv" },
    { name: "JSON to XML", icon: Code2, link: "/tooles/json-tooles/json-to-xml" },
    { name: "JSON to YAML", icon: FileText, link: "/tooles/json-tooles/json-to-yaml" },
    { name: "JSON Pretty Print", icon: Printer, link: "/tooles/json-tooles/json-pretty-print" },
    { name: "JSON Compare", icon: GitCompare, link: "/tooles/json-tooles/json-compare" },
    { name: "JSON Diff", icon: GitCompare, link: "/tooles/json-tooles/json-diff" },
    { name: "JSON Tree Viewer", icon: Network, link: "/tooles/json-tooles/json-tree-viewer" },
    { name: "JSON Repair", icon: Wrench, link: "/tooles/json-tooles/json-repair" },
    { name: "JSON to Excel", icon: FileSpreadsheet, link: "/tooles/json-tooles/json-to-excel" },
    // { name: "JSON to TypeScript", icon: SquareCode, link: "/tooles/json-tooles/json-to-typescript" },
    // { name: "JSON to Java POJO", icon: Coffee, link: "/tooles/json-tooles/json-to-java" },
    // { name: "JSON to Go Struct", icon: Zap, link: "/tooles/json-tooles/json-to-go" },
    { name: "CSV to JSON", icon: FileSpreadsheet, link: "/tooles/json-tooles/csv-to-json" },
    { name: "XML to JSON", icon: FileType, link: "/tooles/json-tooles/xml-to-json" },
    { name: "YAML to JSON", icon: FileJson, link: "/tooles/json-tooles/yaml-to-json" },
    // { name: "JSON to Python Model", icon: Terminal, link: "/tooles/json-tooles/json-to-python" },
    { name: "JSON Schema Generator", icon: Layers, link: "/tooles/json-tooles/json-schema-generator" },
    { name: "JSON Schema Validator", icon: ShieldCheck, link: "/tooles/json-tooles/json-schema-validator" },
    { name: "JSONPath Evaluator", icon: Search, link: "/tooles/json-tooles/jsonpath-evaluator" },
    { name: "JSON Escape / Unescape", icon: Quote, link: "/tooles/json-tooles/json-escape" },
    { name: "JSON Base64", icon: Binary, link: "/tooles/json-tooles/json-base64" },
    { name: "JSON Redactor", icon: EyeOff, link: "/tooles/json-tooles/json-redactor" },
    { name: "JSON to HTML Table", icon: LayoutGrid, link: "/tooles/json-tooles/json-to-html-table" },
    { name: "JSON Key Sorter", icon: ArrowUpDown, link: "/tooles/json-tooles/json-key-sorter" },
    { name: "JSON Mock Generator", icon: Sparkles, link: "/tooles/json-tooles/json-mock-generator" },
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
