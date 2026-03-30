import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { issues, projects } from '../data/mockData'
import type { IssueCategory, IssueStatus, Severity } from '../types'
import { issueStatusTone, readable, severityTone } from '../utils/badges'
import { prettyDate } from '../utils/format'

export const IssuesRisksPage = () => {
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all')

  const filteredIssues = useMemo(
    () =>
      issues.filter((issue) => {
        const severityMatch = severityFilter === 'all' || issue.severity === severityFilter
        const projectMatch = projectFilter === 'all' || issue.projectId === projectFilter
        const statusMatch = statusFilter === 'all' || issue.status === statusFilter
        const categoryMatch = categoryFilter === 'all' || issue.category === categoryFilter

        return severityMatch && projectMatch && statusMatch && categoryMatch
      }),
    [severityFilter, projectFilter, statusFilter, categoryFilter],
  )

  return (
    <div>
      <PageHeader
        title="Issues / Risks"
        description="Track blockers, severity, mitigation actions, and ownership across all projects."
      />

      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Severity</span>
            <select
              value={severityFilter}
              onChange={(event) => setSeverityFilter(event.target.value as Severity | 'all')}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">All severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Project</span>
            <select
              value={projectFilter}
              onChange={(event) => setProjectFilter(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">All projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as IssueStatus | 'all')}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="monitoring">Monitoring</option>
              <option value="mitigating">Mitigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as IssueCategory | 'all')}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">All categories</option>
              <option value="weather_delay">Weather Delay</option>
              <option value="permit_issue">Permit Issue</option>
              <option value="subcontractor_delay">Subcontractor Delay</option>
              <option value="supply_chain">Supply Chain</option>
              <option value="safety_concern">Safety Concern</option>
              <option value="equipment_issue">Equipment Issue</option>
              <option value="inspection_failed">Inspection Failed</option>
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 pb-3">Title</th>
                <th className="px-2 pb-3">Project</th>
                <th className="px-2 pb-3">Severity</th>
                <th className="px-2 pb-3">Category</th>
                <th className="px-2 pb-3">Owner</th>
                <th className="px-2 pb-3">Date Opened</th>
                <th className="px-2 pb-3">Status</th>
                <th className="px-2 pb-3">Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="align-top">
                  <td className="px-2 py-3 font-semibold text-slate-900">{issue.title}</td>
                  <td className="px-2 py-3 text-slate-700">
                    {projects.find((project) => project.id === issue.projectId)?.name}
                  </td>
                  <td className="px-2 py-3">
                    <StatusBadge label={readable(issue.severity)} tone={severityTone(issue.severity)} />
                  </td>
                  <td className="px-2 py-3 text-slate-700">{readable(issue.category)}</td>
                  <td className="px-2 py-3 text-slate-700">{issue.owner}</td>
                  <td className="px-2 py-3 text-slate-700">{prettyDate(issue.dateOpened)}</td>
                  <td className="px-2 py-3">
                    <StatusBadge label={readable(issue.status)} tone={issueStatusTone(issue.status)} />
                  </td>
                  <td className="px-2 py-3 text-slate-700">{issue.mitigationNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
