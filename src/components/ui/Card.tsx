import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export const Card = ({ title, subtitle, action, className = '', children }: CardProps) => (
  <section className={`rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.35)] ${className}`}>
    {(title || subtitle || action) && (
      <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div>
          {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    <div className="px-5 py-5">{children}</div>
  </section>
)
