export type ProjectStatus = 'planning' | 'active' | 'delayed' | 'on_hold' | 'completed'

export type Priority = 'low' | 'medium' | 'high' | 'critical'

export type BudgetStatus = 'under_budget' | 'on_budget' | 'over_budget'

export type PhaseStatus = 'not_started' | 'in_progress' | 'complete' | 'blocked'

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'complete'

export type Severity = 'low' | 'medium' | 'high' | 'critical'

export type IssueCategory =
  | 'weather_delay'
  | 'permit_issue'
  | 'subcontractor_delay'
  | 'supply_chain'
  | 'safety_concern'
  | 'equipment_issue'
  | 'inspection_failed'

export type IssueStatus = 'open' | 'monitoring' | 'mitigating' | 'resolved'

export type Workload = 'low' | 'balanced' | 'high' | 'overloaded'

export interface Milestone {
  phase:
    | 'permitting'
    | 'site_prep'
    | 'foundation'
    | 'framing'
    | 'mep'
    | 'interior'
    | 'final_inspection'
    | 'closeout'
  targetDate: string
  completedDate?: string
  status: PhaseStatus
}

export interface Project {
  id: string
  name: string
  client: string
  location: string
  address: string
  projectManager: string
  superintendent: string
  status: ProjectStatus
  priority: Priority
  budgetStatus: BudgetStatus
  percentComplete: number
  startDate: string
  estimatedCompletionDate: string
  contractValue: number
  health: 'on_track' | 'watch' | 'at_risk'
  pendingInspections: number
  notes: string[]
  updates: string[]
  milestones: Milestone[]
}

export interface Task {
  id: string
  projectId: string
  title: string
  owner: string
  dueDate: string
  status: TaskStatus
  priority: Priority
}

export interface IssueRisk {
  id: string
  projectId: string
  title: string
  severity: Severity
  category: IssueCategory
  owner: string
  dateOpened: string
  status: IssueStatus
  mitigationNote: string
}

export interface TeamAssignment {
  id: string
  name: string
  role: string
  assignedProjectId: string
  currentWorkload: Workload
  assignedTaskIds: string[]
  status: 'available' | 'active' | 'at_capacity'
}

export interface ActivityFeedItem {
  id: string
  projectId: string
  projectName: string
  timestamp: string
  message: string
  type: 'task' | 'issue' | 'milestone' | 'inspection' | 'note'
}

export interface ScheduleItem {
  id: string
  projectId: string
  title: string
  date: string
  type: 'milestone' | 'inspection' | 'deadline'
  status: 'upcoming' | 'overdue' | 'completed'
}
