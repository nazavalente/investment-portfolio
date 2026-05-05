import { useEffect, useState } from "react";

function TransactionForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    asset_name: "",
    transaction_type: "Beli",
    quantity: "",
    price_per_unit: "",
    fee: "",
    transaction_date: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        asset_name: initialData.asset_name || "",
        transaction_type: initialData.transaction_type || "Beli",
        quantity: initialData.quantity || "",
        price_per_unit: initialData.price_per_unit || "",
        fee: initialData.fee || "",
        transaction_date: initialData.transaction_date
          ? new Date(initialData.transaction_date).toISOString().split("T")[0]
          : "",
        notes: initialData.notes || "",
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
        quantity: Number(form.quantity),
        price_per_unit: Number(form.price_per_unit),
        fee: form.fee === "" ? 0 : Number(form.fee),
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
            Jenis Transaksi
          </label>
          <select
            name="transaction_type"
            value={form.transaction_type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Beli">Beli</option>
            <option value="Jual">Jual</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Jumlah
          </label>
          <input
            type="number"
            step="any"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan jumlah"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Harga per Unit
          </label>
          <input
            type="number"
            step="any"
            name="price_per_unit"
            value={form.price_per_unit}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan harga per unit"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Fee/Biaya Admin
          </label>
          <input
            type="number"
            step="any"
            name="fee"
            value={form.fee}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan fee atau biaya admin"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Tanggal
          </label>
          <input
            type="date"
            name="transaction_date"
            value={form.transaction_date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Catatan
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className={`${inputClass} min-h-[120px] resize-none`}
            placeholder="Tambahkan catatan transaksi"
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

export default TransactionForm;