import Link from 'next/link';
import { jsonTools } from '../jsonTools';

export function JsonToolsSection() {
  return (
    <section className="py-12 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center tracking-tight text-slate-900 mb-10">
          Explore Our JSON Tools
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {jsonTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.link}
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