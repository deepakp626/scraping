import Link from 'next/link';
import { ottMediaDatasets } from './ottMediaDatasetData';

export default function OttMediaDatasetsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-500">
            <Link href="/" className="hover:text-orange-700">Home</Link>
            <span className="px-2">/</span>
            <Link href="/datasets" className="hover:text-orange-700">Datasets</Link>
            <span className="px-2">/</span>
            <span aria-current="page" className="font-medium text-slate-800">OTT Media</span>
          </nav>
          <p className="text-sm font-semibold uppercase text-orange-700">OTT Media Data</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">OTT Media Datasets</h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Browse structured streaming data covering content catalogs, ratings, platform coverage, genres, cast and crew, release dates, trends, and language options.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(ottMediaDatasets).map((dataset) => {
            const Icon = dataset.icon;
            return (
              <Link
                key={dataset.slug}
                href={`/datasets/ott-media/${dataset.slug}`}
                className="group flex min-h-48 flex-col border border-slate-200 bg-white p-5 transition-colors hover:border-orange-400 hover:bg-orange-50/40"
              >
                <span className="mb-4 inline-flex h-9 w-9 items-center justify-center bg-orange-50 text-orange-700 group-hover:bg-orange-100">
                  <Icon size={18} />
                </span>
                <span className="font-semibold text-slate-900 group-hover:text-orange-800">{dataset.name}</span>
                <span className="mt-2 text-sm leading-relaxed text-slate-600">{dataset.description}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}