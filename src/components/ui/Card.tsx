import type { PropsWithChildren, ReactNode } from 'react'

interface CardProps extends PropsWithChildren {
  title?: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export const Card = ({ title, subtitle, action, className = '', children }: CardProps) => (
  <section className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
    {(title || subtitle || action) && (
      <header className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
        <div>
          {title && <h3 className="text-sm font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    <div className="px-5 py-4">{children}</div>
  </section>
)
