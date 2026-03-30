import type { PropsWithChildren } from 'react'

interface FilterFieldProps extends PropsWithChildren {
  label: string
}

export const FilterField = ({ label, children }: FilterFieldProps) => (
  <label className="space-y-2">
    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</span>
    {children}
  </label>
)
