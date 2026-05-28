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
    { name: "Python Playground", icon: Terminal, link: "/tooles/coding-tooles/python" },
    { name: "JavaScript Runner", icon: Play, link: "/tooles/coding-tooles/javascript" },
    { name: "TypeScript Playground", icon: SquareCode, link: "/tooles/coding-tooles/typescript" },
    { name: "HTML Beautifier", icon: Code, link: "/tooles/coding-tooles/html" },
    { name: "CSS Formatter", icon: Palette, link: "/tooles/coding-tooles/css" },
    { name: "SQL Formatter", icon: Database, link: "/tooles/coding-tooles/sql" },
    { name: "JSON Formatter & Validator", icon: FileJson, link: "/tooles/coding-tooles/json" },
    { name: "XML Parser & Formatter", icon: FileCode, link: "/tooles/coding-tooles/xml" },
    { name: "C++ Playground", icon: Cpu, link: "/tooles/coding-tooles/cpp" },
    { name: "Java Playground", icon: Coffee, link: "/tooles/coding-tooles/java" },
    { name: "Go Playground", icon: Zap, link: "/tooles/coding-tooles/go" },
    { name: "Rust Compiler", icon: Hammer, link: "/tooles/coding-tooles/rust" },
    { name: "PHP Playground", icon: FileCode, link: "/tooles/coding-tooles/php" },
    { name: "Ruby Playground", icon: Gem, link: "/tooles/coding-tooles/ruby" },
    { name: "Markdown Editor", icon: BookOpen, link: "/tooles/coding-tooles/markdown" },
    { name: "Bash Shell Runner", icon: Terminal, link: "/tooles/coding-tooles/bash" },
    { name: "C# Playground", icon: Hash, link: "/tooles/coding-tooles/csharp" },
    { name: "Swift Playground", icon: Feather, link: "/tooles/coding-tooles/swift" },
    { name: "Kotlin Playground", icon: Layers, link: "/tooles/coding-tooles/kotlin" },
    { name: "YAML Formatter", icon: Brackets, link: "/tooles/coding-tooles/yaml" },
    { name: "JSON to YAML", icon: RefreshCw, link: "/tooles/coding-tooles/json-to-yaml" },
    { name: "YAML to JSON", icon: RefreshCw, link: "/tooles/coding-tooles/yaml-to-json" },
  ];

  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
          Explore Our Coding Tools
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
  );
}

export default CodingToolsSection;
