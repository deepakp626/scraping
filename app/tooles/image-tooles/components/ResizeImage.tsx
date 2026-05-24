export default function ResizeImage() {
  return (
    <div className="rounded-3xl border p-6">
      <h2 className="text-2xl font-bold">Resize Image Tool</h2>

      <input type="file" className="mt-4" />

      <div className="mt-4 flex gap-4">
        <input
          type="number"
          placeholder="Width"
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Height"
          className="border p-2 rounded"
        />
      </div>

      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Resize Image
      </button>
    </div>
  );
}