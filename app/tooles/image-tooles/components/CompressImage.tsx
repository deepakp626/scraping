export default function CompressImage() {
  return (
    <div className="rounded-3xl border p-6">
      <h2 className="text-2xl font-bold">Compress Image Tool</h2>

      <input type="file" className="mt-4" />

      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Compress Image
      </button>
    </div>
  );
}