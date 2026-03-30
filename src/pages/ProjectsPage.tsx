import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { FilterField } from '../components/ui/FilterField'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects } from '../data/mockData'
import type { Priority, ProjectStatus } from '../types'
import { budgetTone, healthTone, priorityTone, projectStatusTone } from '../utils/badges'
import { budgetStatusLabel, currency, labelize, prettyDate, priorityWeight, signedDays, signedPercent } from '../utils/format'

type SortBy = 'estimatedCompletionDate' | 'percentComplete'

export const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortBy>('estimatedCompletionDate')

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.location.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter
        const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter

        return matchesSearch && matchesStatus && matchesPriority
      })
      .sort((a, b) => {
        if (sortBy === 'estimatedCompletionDate') {
          return a.estimatedCompletionDate.localeCompare(b.estimatedCompletionDate)
        }

        if (a.percentComplete === b.percentComplete) {
          return priorityWeight[b.priority] - priorityWeight[a.priority]
        }

        return b.percentComplete - a.percentComplete
      })
  }, [searchTerm, statusFilter, priorityFilter, sortBy])

  return (
    <div>
      <PageHeader
        title="Projects List"
        description="Track active and planned jobs with clearer portfolio context around phase, financial pressure, staffing, and completion."
      />

      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FilterField label="Search">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Project, client, or location"
              className="app-input"
            />
          </FilterField>

          <FilterField label="Status">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as ProjectStatus | 'all')}
              className="app-select"
            >
              <option value="all">All statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </FilterField>

          <FilterField label="Priority">
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as Priority | 'all')}
              className="app-select"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </FilterField>

          <FilterField label="Sort">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="app-select"
            >
              <option value="estimatedCompletionDate">Completion Date</option>
              <option value="percentComplete">Percent Complete</option>
            </select>
          </FilterField>
        </div>
      </Card>

      <Card subtitle={`${filteredProjects.length} projects shown`}>
        <DataTable columns={['Project', 'Ops Snapshot', 'Status', 'Budget', 'Progress', 'Dates']}>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td className="min-w-[260px]">
                <Link to={`/projects/${project.id}`} className="font-semibold text-slate-900 hover:text-sky-700">
                  {project.name}
                </Link>
                <p className="mt-1 text-sm text-slate-600">{project.client}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                  {labelize(project.marketSector)} • {project.location}
                </p>
              </td>
              <td className="min-w-[220px]">
                <p className="font-semibold text-slate-900">{project.currentPhase}</p>
                <p className="mt-1 text-sm text-slate-600">{project.projectManager} / {project.superintendent}</p>
                <p className="mt-1 text-xs text-slate-500">{project.workforceOnsite} onsite • Billing {currency(project.billingPending)}</p>
              </td>
              <td>
                <div className="space-y-2">
                  <StatusBadge label={labelize(project.status)} tone={projectStatusTone(project.status)} />
                  <StatusBadge label={labelize(project.priority)} tone={priorityTone(project.priority)} />
                  <StatusBadge label={labelize(project.health)} tone={healthTone(project.health)} />
                </div>
              </td>
              <td className="min-w-[150px]">
                <StatusBadge label={budgetStatusLabel[project.budgetStatus]} tone={budgetTone(project.budgetStatus)} />
                <p className={`mt-2 text-xs font-semibold ${project.costVariance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  Cost variance {signedPercent(project.costVariance)}
                </p>
                <p className={`mt-1 text-xs font-semibold ${project.scheduleVarianceDays > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  Schedule {signedDays(project.scheduleVarianceDays)}
                </p>
              </td>
              <td className="min-w-[180px]">
                <ProgressBar value={project.percentComplete} />
              </td>
              <td className="min-w-[170px]">
                <p className="text-sm text-slate-700">Start {prettyDate(project.startDate)}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">End {prettyDate(project.estimatedCompletionDate)}</p>
              </td>
            </tr>
          ))}
        </DataTable>
      </Card>
    </div>
  )
}
