function PageHeader({ title, subtitle, action = null }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#42d7ff]">
          Portfolio Overview
        </p>

        <h1 className="text-[clamp(2rem,3vw,2.55rem)] font-extrabold tracking-tight text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-base leading-7 text-[#9aa6bb]">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default PageHeader;
