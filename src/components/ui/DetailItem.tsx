interface DetailItemProps {
  label: string
  value: string
}

export const DetailItem = ({ label, value }: DetailItemProps) => (
  <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
  </div>
)
