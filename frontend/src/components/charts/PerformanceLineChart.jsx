import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import { DEFAULT_CURRENCY } from "../../constants";

const formatCompactCurrency = (value) => {
  const numericValue = Number(value);

  if (numericValue >= 1_000_000_000) {
    return `Rp ${(numericValue / 1_000_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    })} M`;
  }

  if (numericValue >= 1_000_000) {
    return `Rp ${(numericValue / 1_000_000).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    })} jt`;
  }

  if (numericValue >= 1_000) {
    return `Rp ${(numericValue / 1_000).toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    })} rb`;
  }

  return `Rp ${numericValue.toLocaleString("id-ID")}`;
};

function PerformanceLineChart({ data = [] }) {
  return (
    <div className="rounded-2xl border border-[#263450] bg-[#182238] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#2b3854] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#42d7ff]">
            Performance
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">
            Performa Portofolio
          </h3>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-[#9aa6bb]">
          Belum ada data performa portofolio.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              <CartesianGrid stroke="#2b3854" strokeDasharray="4 4" />
              <XAxis
                dataKey="asset_name"
                tick={{ fill: "#9aa6bb", fontSize: 12 }}
                axisLine={{ stroke: "#2b3854" }}
                tickLine={{ stroke: "#2b3854" }}
              />
              <YAxis
                width={75}
                tickFormatter={formatCompactCurrency}
                tick={{ fill: "#9aa6bb", fontSize: 12 }}
                axisLine={{ stroke: "#2b3854" }}
                tickLine={{ stroke: "#2b3854" }}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value, DEFAULT_CURRENCY)}
                labelFormatter={(label) => `Aset: ${label}`}
                contentStyle={{
                  backgroundColor: "#0d1628",
                  borderRadius: "12px",
                  border: "1px solid #263450",
                  color: "#E7EEF8",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.35)",
                }}
              />
              <Line
                type="monotone"
                dataKey="current_value"
                stroke="#42d7ff"
                strokeWidth={3}
                dot={{ r: 4, fill: "#42d7ff" }}
                activeDot={{ r: 6, fill: "#76d39b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PerformanceLineChart;
