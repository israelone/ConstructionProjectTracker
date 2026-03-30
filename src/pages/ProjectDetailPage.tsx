import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusBadge } from '../components/ui/StatusBadge'
import { aiInsightsByProjectId, issues, projects, tasks, teamAssignments } from '../data/mockData'
import { budgetTone, priorityTone, projectStatusTone, readable, taskStatusTone } from '../utils/badges'
import { budgetStatusLabel, currency, prettyDate } from '../utils/format'

const phaseLabelMap: Record<string, string> = {
  permitting: 'Permitting',
  site_prep: 'Site Prep',
  foundation: 'Foundation',
  framing: 'Framing',
  mep: 'MEP',
  interior: 'Interior',
  final_inspection: 'Final Inspection',
  closeout: 'Closeout',
}

export const ProjectDetailPage = () => {
  const { projectId } = useParams()
  const [showAllTasks, setShowAllTasks] = useState(false)

  const project = projects.find((entry) => entry.id === projectId)

  if (!project) {
    return (
      <Card>
        <p className="text-sm text-slate-700">Project not found.</p>
        <Link className="mt-2 inline-block text-sm font-medium text-sky-700" to="/projects">
          Back to projects
        </Link>
      </Card>
    )
  }

  const projectTasks = tasks.filter((task) => task.projectId === project.id)
  const visibleTasks = showAllTasks ? projectTasks : projectTasks.slice(0, 6)
  const projectIssues = issues.filter((issue) => issue.projectId === project.id && issue.status !== 'resolved')
  const assignedTeam = teamAssignments.filter((member) => member.assignedProjectId === project.id)
  const aiInsights = aiInsightsByProjectId[project.id] ?? []

  return (
    <div>
      <PageHeader
        title={project.name}
        description="Project overview, milestones, assignments, and active blockers."
        actions={
          <Link to="/projects" className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Back to Projects
          </Link>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1.3fr,1fr]">
        <Card title="Project Overview">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Client</p>
              <p className="text-sm font-medium text-slate-900">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
              <p className="text-sm font-medium text-slate-900">{project.address}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Project Manager</p>
              <p className="text-sm font-medium text-slate-900">{project.projectManager}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Superintendent</p>
              <p className="text-sm font-medium text-slate-900">{project.superintendent}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Contract Value</p>
              <p className="text-sm font-medium text-slate-900">{currency(project.contractValue)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Planned End Date</p>
              <p className="text-sm font-medium text-slate-900">{prettyDate(project.estimatedCompletionDate)}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge label={readable(project.status)} tone={projectStatusTone(project.status)} />
            <StatusBadge label={readable(project.priority)} tone={priorityTone(project.priority)} />
            <StatusBadge label={budgetStatusLabel[project.budgetStatus]} tone={budgetTone(project.budgetStatus)} />
          </div>

          <div className="mt-4">
            <ProgressBar value={project.percentComplete} tone={project.health === 'at_risk' ? 'critical' : 'default'} />
          </div>
        </Card>

        <Card title="Budget Summary">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Contract Value</span>
              <strong>{currency(project.contractValue)}</strong>
            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Budget Status</span>
              <StatusBadge label={budgetStatusLabel[project.budgetStatus]} tone={budgetTone(project.budgetStatus)} />
            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Pending Inspections</span>
              <strong>{project.pendingInspections}</strong>
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI Insights (Mock)</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              {aiInsights.map((insight) => (
                <li key={insight} className="rounded-md bg-white px-3 py-2">
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Milestone Timeline">
          <ol className="space-y-3">
            {project.milestones.map((milestone) => (
              <li key={milestone.phase} className="flex items-start justify-between gap-3 rounded-md border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{phaseLabelMap[milestone.phase]}</p>
                  <p className="text-xs text-slate-500">Target: {prettyDate(milestone.targetDate)}</p>
                </div>
                <StatusBadge label={readable(milestone.status)} tone={milestone.status === 'blocked' ? 'rose' : milestone.status === 'complete' ? 'emerald' : milestone.status === 'in_progress' ? 'blue' : 'slate'} />
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Assigned Team Members">
          <ul className="space-y-3">
            {assignedTeam.map((member) => (
              <li key={member.id} className="rounded-md border border-slate-200 p-3">
                <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                <p className="text-xs text-slate-600">{member.role}</p>
                <p className="mt-1 text-xs text-slate-500">Assigned Tasks: {member.assignedTaskIds.length}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr,1fr]">
        <Card
          title="Task List"
          action={
            <button
              type="button"
              onClick={() => setShowAllTasks((value) => !value)}
              className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              {showAllTasks ? 'Show Less' : 'Show All'}
            </button>
          }
        >
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <div key={task.id} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500">Owner: {task.owner}</p>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge label={readable(task.status)} tone={taskStatusTone(task.status)} />
                    <StatusBadge label={readable(task.priority)} tone={priorityTone(task.priority)} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600">Due: {prettyDate(task.dueDate)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Open Issues / Blockers">
          <div className="space-y-3">
            {projectIssues.length === 0 && <p className="text-sm text-slate-600">No active blockers.</p>}
            {projectIssues.map((issue) => (
              <div key={issue.id} className="rounded-md border border-slate-200 p-3">
                <p className="text-sm font-semibold text-slate-900">{issue.title}</p>
                <p className="mt-1 text-xs text-slate-600">Owner: {issue.owner}</p>
                <p className="mt-1 text-xs text-slate-600">Mitigation: {issue.mitigationNote}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Project Notes">
          <details open className="rounded-md border border-slate-200 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">View Notes</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {project.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </details>
        </Card>

        <Card title="Recent Updates">
          <details open className="rounded-md border border-slate-200 p-3">
            <summary className="cursor-pointer text-sm font-semibold text-slate-800">View Updates</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {project.updates.map((update) => (
                <li key={update}>{update}</li>
              ))}
            </ul>
          </details>
        </Card>
      </section>
    </div>
  )
}
