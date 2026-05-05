import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import { DEFAULT_CURRENCY } from "../../constants";

const COLORS = ["#42d7ff", "#7c8cff", "#76d39b", "#FB7185", "#A8B3C7"];

function PortfolioPieChart({ data = [] }) {
  return (
    <div className="rounded-2xl border border-[#263450] bg-[#182238] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#2b3854] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#42d7ff]">
            Allocation
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">
            Alokasi Portofolio
          </h3>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-[#9aa6bb]">
          Belum ada data alokasi portofolio.
        </div>
      ) : (
        <div className="grid items-center gap-5 lg:grid-cols-[1fr_0.95fr]">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={98}
                  paddingAngle={2}
                  stroke="#182238"
                  strokeWidth={3}
                  label={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value, DEFAULT_CURRENCY)}
                  contentStyle={{
                    backgroundColor: "#0d1628",
                    borderRadius: "12px",
                    border: "1px solid #263450",
                    color: "#E7EEF8",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.35)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border border-[#263450] bg-[#121a2d] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-semibold text-white">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#a8b3c7]">
                  {formatCurrency(item.value, DEFAULT_CURRENCY)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPieChart;
