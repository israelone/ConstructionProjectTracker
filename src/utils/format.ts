import type { BudgetStatus, Priority, ProjectStatus, TaskStatus } from '../types'

export const currency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const prettyDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const daysUntil = (value: string) => {
  const now = new Date('2026-03-30T12:00:00')
  const target = new Date(`${value}T00:00:00`)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const labelize = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char: string) => char.toUpperCase())

export const statusOrder: ProjectStatus[] = ['planning', 'active', 'delayed', 'on_hold', 'completed']

export const priorityWeight: Record<Priority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}

export const taskStatusWeight: Record<TaskStatus, number> = {
  blocked: 4,
  in_progress: 3,
  not_started: 2,
  complete: 1,
}

export const budgetStatusLabel: Record<BudgetStatus, string> = {
  under_budget: 'Under Budget',
  on_budget: 'On Budget',
  over_budget: 'Over Budget',
}
