import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects } from '../data/mockData'
import type { Priority, ProjectStatus } from '../types'
import { budgetTone, priorityTone, projectStatusTone } from '../utils/badges'
import { budgetStatusLabel, labelize, prettyDate, priorityWeight } from '../utils/format'

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
          project.client.toLowerCase().includes(searchTerm.toLowerCase())
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
        description="Track active and planned construction jobs with status, budget, and completion details."
      />

      <Card className="mb-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Project name or client"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-500 focus:ring"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as ProjectStatus | 'all')}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-500 focus:ring"
            >
              <option value="all">All statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="delayed">Delayed</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</span>
            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value as Priority | 'all')}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-500 focus:ring"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-sky-500 focus:ring"
            >
              <option value="estimatedCompletionDate">Completion Date</option>
              <option value="percentComplete">Percent Complete</option>
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 pb-3">Project</th>
                <th className="px-2 pb-3">Client</th>
                <th className="px-2 pb-3">Location</th>
                <th className="px-2 pb-3">PM</th>
                <th className="px-2 pb-3">Status</th>
                <th className="px-2 pb-3">Priority</th>
                <th className="px-2 pb-3">Budget</th>
                <th className="px-2 pb-3">Progress</th>
                <th className="px-2 pb-3">Start</th>
                <th className="px-2 pb-3">Estimated End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="align-top">
                  <td className="px-2 py-3">
                    <Link to={`/projects/${project.id}`} className="font-semibold text-slate-900 hover:text-sky-700">
                      {project.name}
                    </Link>
                  </td>
                  <td className="px-2 py-3 text-slate-700">{project.client}</td>
                  <td className="px-2 py-3 text-slate-700">{project.location}</td>
                  <td className="px-2 py-3 text-slate-700">{project.projectManager}</td>
                  <td className="px-2 py-3">
                    <StatusBadge label={labelize(project.status)} tone={projectStatusTone(project.status)} />
                  </td>
                  <td className="px-2 py-3">
                    <StatusBadge label={labelize(project.priority)} tone={priorityTone(project.priority)} />
                  </td>
                  <td className="px-2 py-3">
                    <StatusBadge label={budgetStatusLabel[project.budgetStatus]} tone={budgetTone(project.budgetStatus)} />
                  </td>
                  <td className="px-2 py-3 min-w-40">
                    <ProgressBar value={project.percentComplete} />
                  </td>
                  <td className="px-2 py-3 text-slate-700">{prettyDate(project.startDate)}</td>
                  <td className="px-2 py-3 text-slate-700">{prettyDate(project.estimatedCompletionDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
