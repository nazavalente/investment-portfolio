const accentColorMap = {
  primary: "#42d7ff",
  accent: "#7c8cff",
  success: "#76d39b",
  danger: "#FB7185",
};

function StatCard({
  title,
  value,
  description,
  accent = "primary",
  valueClassName = "",
}) {
  const accentColor = accentColorMap[accent] || accentColorMap.primary;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#263450] bg-[#182238] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="absolute -right-10 -top-12 h-28 w-28 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8794ad]">
            {title}
          </p>

          <h3
            className={`break-words text-[clamp(1.65rem,2vw,2.15rem)] font-extrabold leading-tight tracking-tight text-white ${valueClassName}`}
          >
            {value}
          </h3>

          {description && (
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#9aa6bb]">
              {description}
            </p>
          )}
        </div>

        <span
          className="mt-1 h-3 w-3 flex-shrink-0 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
}

export default StatCard;
