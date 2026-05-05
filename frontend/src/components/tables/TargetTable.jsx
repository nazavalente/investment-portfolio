import { formatCurrency } from "../../utils/formatCurrency";
import { DEFAULT_CURRENCY } from "../../constants";

function TargetTable({ targets = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1E293B] bg-[#111827] shadow-[0_10px_25px_rgba(2,6,23,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#0F172A]">
            <tr className="border-b border-[#1E293B]">
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Nama Target
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Nominal Target
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Progres Saat Ini
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Deadline
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {targets.map((target, index) => (
              <tr
                key={target.id}
                className={`border-b border-[#1E293B] ${
                  index % 2 === 0 ? "bg-[#111827]" : "bg-[#0F172A]"
                }`}
              >
                <td className="px-6 py-5 text-lg font-medium text-[#E2E8F0]">
                  {target.target_name}
                </td>
                <td className="px-6 py-5 text-lg text-[#10B981]">
                  {formatCurrency(target.target_amount, DEFAULT_CURRENCY)}
                </td>
                <td className="px-6 py-5 text-lg text-[#CBD5E1]">
                  {formatCurrency(target.current_progress, DEFAULT_CURRENCY)}
                </td>
                <td className="px-6 py-5 text-lg text-[#CBD5E1]">
                  {target.deadline
                    ? new Date(target.deadline).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(target)}
                      className="rounded-xl bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5558E8]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(target)}
                      className="rounded-xl bg-[#EF4444] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#DC2626]"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TargetTable;