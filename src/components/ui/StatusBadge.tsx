interface StatusBadgeProps {
  label: string
  tone:
    | 'slate'
    | 'blue'
    | 'amber'
    | 'rose'
    | 'emerald'
    | 'violet'
    | 'orange'
    | 'teal'
}

const toneClassMap: Record<StatusBadgeProps['tone'], string> = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  blue: 'bg-blue-100 text-blue-700 ring-blue-200',
  amber: 'bg-amber-100 text-amber-700 ring-amber-200',
  rose: 'bg-rose-100 text-rose-700 ring-rose-200',
  emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  violet: 'bg-violet-100 text-violet-700 ring-violet-200',
  orange: 'bg-orange-100 text-orange-700 ring-orange-200',
  teal: 'bg-teal-100 text-teal-700 ring-teal-200',
}

export const StatusBadge = ({ label, tone }: StatusBadgeProps) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClassMap[tone]}`}
  >
    {label}
  </span>
)
