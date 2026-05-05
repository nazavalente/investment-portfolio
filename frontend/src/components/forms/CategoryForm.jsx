import { useEffect, useState } from "react";

function CategoryForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    category_name: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        category_name: initialData.category_name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#1E293B] bg-[#0F172A] px-4 py-3 text-[#E2E8F0] outline-none transition placeholder:text-[#64748B] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#1E293B] bg-[#111827] p-6 shadow-[0_10px_25px_rgba(2,6,23,0.35)]"
    >
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Nama Kategori
          </label>
          <input
            type="text"
            name="category_name"
            value={form.category_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contoh: Saham, Kripto, Reksa Dana"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`${inputClass} min-h-[130px] resize-none`}
            placeholder="Tambahkan deskripsi kategori"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-[#6366F1] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5558E8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-[#334155] bg-[#0F172A] px-5 py-3 text-sm font-semibold text-[#CBD5E1] transition hover:bg-[#172033]"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;