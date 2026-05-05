function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_25%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            InvestTracker
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#64748B]">
            Financial Analysis Workspace
          </p>
        </div>

        <div className="rounded-3xl border border-[#1E293B] bg-[#0B1220]/95 p-8 shadow-[0_20px_50px_rgba(2,6,23,0.55)] backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-base leading-7 text-[#94A3B8]">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          {footer && <div className="mt-6 text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthShell;