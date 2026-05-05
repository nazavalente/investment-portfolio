import { useEffect, useState } from "react";
import { ASSET_TYPES } from "../../constants";

function AssetForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    asset_name: "",
    asset_code: "",
    asset_type: "",
    platform: "",
    current_price: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        asset_name: initialData.asset_name || "",
        asset_code: initialData.asset_code || "",
        asset_type: initialData.asset_type || "",
        platform: initialData.platform || "",
        current_price: initialData.current_price || "",
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

      await onSubmit({
        ...form,
        current_price: form.current_price === "" ? 0 : Number(form.current_price),
      });
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Nama Aset
          </label>
          <input
            type="text"
            name="asset_name"
            value={form.asset_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contoh: SAHAM BCA"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Kode Aset
          </label>
          <input
            type="text"
            name="asset_code"
            value={form.asset_code}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contoh: BBCA"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Jenis Aset
          </label>
          <select
            name="asset_type"
            value={form.asset_type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Pilih jenis aset</option>
            {ASSET_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Platform
          </label>
          <input
            type="text"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contoh: Bibit, Ajaib, Tokocrypto"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Harga Saat Ini
          </label>
          <input
            type="number"
            step="any"
            name="current_price"
            value={form.current_price}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan harga saat ini"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`${inputClass} min-h-[120px] resize-none`}
            placeholder="Tambahkan deskripsi singkat aset"
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

export default AssetForm;