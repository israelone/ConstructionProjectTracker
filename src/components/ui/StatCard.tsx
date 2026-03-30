import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  helper?: string
  icon?: ReactNode
}

export const StatCard = ({ label, value, helper, icon }: StatCardProps) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.8)]">
    <div className="flex items-start justify-between gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      {icon ? <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500">{icon}</div> : null}
    </div>
    <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
    {helper && <p className="mt-1 text-sm text-slate-500">{helper}</p>}
  </article>
)
