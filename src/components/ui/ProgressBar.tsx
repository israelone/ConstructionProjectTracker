interface ProgressBarProps {
  value: number
  tone?: 'default' | 'warn' | 'critical' | 'success'
}

const toneClasses: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  default: 'bg-sky-600',
  warn: 'bg-amber-500',
  critical: 'bg-rose-600',
  success: 'bg-emerald-600',
}

export const ProgressBar = ({ value, tone = 'default' }: ProgressBarProps) => (
  <div>
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${toneClasses[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
    <p className="mt-1 text-xs font-medium text-slate-600">{value}% complete</p>
  </div>
)
