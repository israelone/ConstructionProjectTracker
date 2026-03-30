import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { FilterField } from '../components/ui/FilterField'
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
        description="Monitor active blockers, mitigation plans, and risk ownership with a denser operations-style review table."
      />

      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterField label="Severity">
            <select
              value={severityFilter}
              onChange={(event) => setSeverityFilter(event.target.value as Severity | 'all')}
              className="app-select"
            >
              <option value="all">All severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </FilterField>

          <FilterField label="Project">
            <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} className="app-select">
              <option value="all">All projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Status">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as IssueStatus | 'all')}
              className="app-select"
            >
              <option value="all">All statuses</option>
              <option value="open">Open</option>
              <option value="monitoring">Monitoring</option>
              <option value="mitigating">Mitigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </FilterField>

          <FilterField label="Category">
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as IssueCategory | 'all')}
              className="app-select"
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
          </FilterField>
        </div>
      </Card>

      <Card subtitle={`${filteredIssues.length} active records in view`}>
        <DataTable columns={['Issue', 'Project', 'Severity', 'Owner', 'Opened', 'Status', 'Mitigation']}>
          {filteredIssues.map((issue) => (
            <tr key={issue.id}>
              <td className="min-w-[240px]">
                <p className="font-semibold text-slate-900">{issue.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{readable(issue.category)}</p>
              </td>
              <td className="min-w-[220px] text-slate-700">{projects.find((project) => project.id === issue.projectId)?.name}</td>
              <td><StatusBadge label={readable(issue.severity)} tone={severityTone(issue.severity)} /></td>
              <td className="text-slate-700">{issue.owner}</td>
              <td className="text-slate-700">{prettyDate(issue.dateOpened)}</td>
              <td><StatusBadge label={readable(issue.status)} tone={issueStatusTone(issue.status)} /></td>
              <td className="min-w-[280px] text-slate-700">{issue.mitigationNote}</td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </div>
  )
}
