import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  helper?: string
  icon?: ReactNode
}

export const StatCard = ({ label, value, helper, icon }: StatCardProps) => (
  <article className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <div className="text-slate-400">{icon}</div>
    </div>
    <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
    {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
  </article>
)
