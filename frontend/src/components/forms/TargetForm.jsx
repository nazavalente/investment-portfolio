import { useEffect, useState } from "react";

function TargetForm({ initialData = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    target_name: "",
    target_amount: "",
    current_progress: "",
    deadline: "",
    description: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        target_name: initialData.target_name || "",
        target_amount: initialData.target_amount || "",
        current_progress: initialData.current_progress || "",
        deadline: initialData.deadline
          ? new Date(initialData.deadline).toISOString().split("T")[0]
          : "",
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
        target_amount: form.target_amount === "" ? 0 : Number(form.target_amount),
        current_progress:
          form.current_progress === "" ? 0 : Number(form.current_progress),
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
            Nama Target
          </label>
          <input
            type="text"
            name="target_name"
            value={form.target_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Contoh: Dana Darurat"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Nominal Target
          </label>
          <input
            type="number"
            step="any"
            name="target_amount"
            value={form.target_amount}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan nominal target"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Progres Saat Ini
          </label>
          <input
            type="number"
            step="any"
            name="current_progress"
            value={form.current_progress}
            onChange={handleChange}
            className={inputClass}
            placeholder="Masukkan progres saat ini"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#CBD5E1]">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className={inputClass}
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
            placeholder="Tambahkan deskripsi target"
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

export default TargetForm;