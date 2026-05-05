function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#111827] px-6 py-12 text-center shadow-[0_10px_25px_rgba(2,6,23,0.35)]">
      <h3 className="text-3xl font-bold tracking-tight text-[#F8FAFC]">
        {title}
      </h3>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#94A3B8]">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;