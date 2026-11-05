import Link from "next/link";
import { 
  Terminal, 
  Play, 
  SquareCode, 
  Code, 
  Palette, 
  Database, 
  FileJson, 
  FileCode, 
  Cpu, 
  Coffee, 
  Zap, 
  Hammer, 
  Gem, 
  BookOpen, 
  Hash, 
  Feather, 
  Layers, 
  Braces, 
  Brackets, 
  RefreshCw 
} from "lucide-react";

export function CodingToolsSection() {
  const tools = [
    { name: "Python Playground", icon: Terminal, link: "/tools/coding-tools/python" },
    { name: "JavaScript Runner", icon: Play, link: "/tools/coding-tools/javascript" },
    { name: "TypeScript Playground", icon: SquareCode, link: "/tools/coding-tools/typescript" },
    { name: "HTML Beautifier", icon: Code, link: "/tools/coding-tools/html" },
    { name: "CSS Formatter", icon: Palette, link: "/tools/coding-tools/css" },
    { name: "SQL Formatter", icon: Database, link: "/tools/coding-tools/sql" },
    { name: "JSON Formatter & Validator", icon: FileJson, link: "/tools/coding-tools/json" },
    { name: "XML Parser & Formatter", icon: FileCode, link: "/tools/coding-tools/xml" },
    { name: "C++ Playground", icon: Cpu, link: "/tools/coding-tools/cpp" },
    { name: "Java Playground", icon: Coffee, link: "/tools/coding-tools/java" },
    { name: "Go Playground", icon: Zap, link: "/tools/coding-tools/go" },
    { name: "Rust Compiler", icon: Hammer, link: "/tools/coding-tools/rust" },
    { name: "PHP Playground", icon: FileCode, link: "/tools/coding-tools/php" },
    { name: "Ruby Playground", icon: Gem, link: "/tools/coding-tools/ruby" },
    { name: "Markdown Editor", icon: BookOpen, link: "/tools/coding-tools/markdown" },
    { name: "Bash Shell Runner", icon: Terminal, link: "/tools/coding-tools/bash" },
    { name: "C# Playground", icon: Hash, link: "/tools/coding-tools/csharp" },
    { name: "Swift Playground", icon: Feather, link: "/tools/coding-tools/swift" },
    { name: "Kotlin Playground", icon: Layers, link: "/tools/coding-tools/kotlin" },
    { name: "YAML Formatter", icon: Brackets, link: "/tools/coding-tools/yaml" },
    { name: "JSON to YAML", icon: RefreshCw, link: "/tools/coding-tools/json-to-yaml" },
    { name: "YAML to JSON", icon: RefreshCw, link: "/tools/coding-tools/yaml-to-json" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Editor Hero Section */}
      {/* <section className="bg-editor-bg py-12 px-4 md:px-10 border-b border-editor-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Online Code Editor & Runner
            </h1>
            <p className="text-lg text-editor-muted max-w-2xl mx-auto">
              Write, compile, and run code in 20+ languages directly in your browser.
              No setup required.
            </p>
          </div>
          
          <CodeRunEditor height="700px" />
        </div>
      </section> */}

      {/* Tools Grid Section */}
      <section className="py-12 px-4 md:px-10 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
            Explore Specific Coding Tooles
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={index}
                  href={tool.link}
                  className="group flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
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
    </div>
  );
}

export default CodingToolsSection;
