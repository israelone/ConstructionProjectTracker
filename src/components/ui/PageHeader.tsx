import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
  <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
    <div>
      <p className="eyebrow">Construction Operations Suite</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
    </div>
    {actions}
  </div>
)
