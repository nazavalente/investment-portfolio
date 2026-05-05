import { formatCurrency } from "../../utils/formatCurrency";
import { DEFAULT_CURRENCY } from "../../constants";

function WatchlistTable({ watchlist = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1E293B] bg-[#111827] shadow-[0_10px_25px_rgba(2,6,23,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#0F172A]">
            <tr className="border-b border-[#1E293B]">
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Nama Aset
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Kode
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Target Beli
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Harga Saat Ini
              </th>
              <th className="px-6 py-5 text-left text-lg font-semibold text-[#E2E8F0]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {watchlist.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-[#1E293B] ${
                  index % 2 === 0 ? "bg-[#111827]" : "bg-[#0F172A]"
                }`}
              >
                <td className="px-6 py-5 text-lg font-medium text-[#E2E8F0]">
                  {item.asset_name}
                </td>
                <td className="px-6 py-5 text-lg text-[#CBD5E1]">
                  {item.asset_code || "-"}
                </td>
                <td className="px-6 py-5 text-lg text-[#6366F1]">
                  {formatCurrency(item.target_buy_price, DEFAULT_CURRENCY)}
                </td>
                <td className="px-6 py-5 text-lg text-[#10B981]">
                  {formatCurrency(item.current_price, DEFAULT_CURRENCY)}
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-xl bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5558E8]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item)}
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

export default WatchlistTable;