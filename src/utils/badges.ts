import type {
    BudgetStatus,
    IssueStatus,
    Priority,
    ProjectStatus,
    Severity,
    TaskStatus,
    Workload,
} from '../types'
import { labelize } from './format'

export const projectStatusTone = (status: ProjectStatus) => {
  switch (status) {
    case 'planning':
      return 'blue'
    case 'active':
      return 'emerald'
    case 'delayed':
      return 'rose'
    case 'on_hold':
      return 'amber'
    case 'completed':
      return 'teal'
    default:
      return 'slate'
  }
}

export const priorityTone = (priority: Priority) => {
  switch (priority) {
    case 'low':
      return 'slate'
    case 'medium':
      return 'blue'
    case 'high':
      return 'amber'
    case 'critical':
      return 'rose'
    default:
      return 'slate'
  }
}

export const taskStatusTone = (status: TaskStatus) => {
  switch (status) {
    case 'not_started':
      return 'slate'
    case 'in_progress':
      return 'blue'
    case 'blocked':
      return 'rose'
    case 'complete':
      return 'emerald'
    default:
      return 'slate'
  }
}

export const severityTone = (severity: Severity) => {
  switch (severity) {
    case 'low':
      return 'slate'
    case 'medium':
      return 'blue'
    case 'high':
      return 'amber'
    case 'critical':
      return 'rose'
    default:
      return 'slate'
  }
}

export const issueStatusTone = (status: IssueStatus) => {
  switch (status) {
    case 'open':
      return 'rose'
    case 'monitoring':
      return 'blue'
    case 'mitigating':
      return 'amber'
    case 'resolved':
      return 'emerald'
    default:
      return 'slate'
  }
}

export const budgetTone = (status: BudgetStatus) => {
  switch (status) {
    case 'under_budget':
      return 'emerald'
    case 'on_budget':
      return 'blue'
    case 'over_budget':
      return 'rose'
    default:
      return 'slate'
  }
}

export const workloadTone = (workload: Workload) => {
  switch (workload) {
    case 'low':
      return 'slate'
    case 'balanced':
      return 'emerald'
    case 'high':
      return 'amber'
    case 'overloaded':
      return 'rose'
    default:
      return 'slate'
  }
}

export const readable = (value: string) => labelize(value)
