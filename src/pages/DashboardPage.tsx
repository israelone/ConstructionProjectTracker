import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge } from '../components/ui/StatusBadge'
import { activityFeed, issues, projects, scheduleItems, tasks } from '../data/mockData'
import { projectStatusTone } from '../utils/badges'
import { daysUntil, labelize, prettyDate } from '../utils/format'

export const DashboardPage = () => {
  const activeProjects = projects.filter((project) => ['active', 'delayed', 'on_hold'].includes(project.status))
  const projectsAtRisk = projects.filter((project) => project.health === 'at_risk').length
  const completedMilestonesThisWeek = projects.reduce(
    (count, project) =>
      count + project.milestones.filter((milestone) => milestone.status === 'complete' && milestone.targetDate >= '2026-03-24').length,
    0,
  )
  const overdueTasks = tasks.filter((task) => task.status !== 'complete' && daysUntil(task.dueDate) < 0).length
  const openIssues = issues.filter((issue) => issue.status !== 'resolved').length
  const pendingInspections = projects.reduce((count, project) => count + project.pendingInspections, 0)

  const attentionProjects = projects
    .filter((project) => project.health !== 'on_track' && project.status !== 'completed')
    .sort((a, b) => a.percentComplete - b.percentComplete)

  const upcomingDeadlines = scheduleItems
    .filter((item) => item.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)

  return (
    <div>
      <PageHeader
        title="Operations Dashboard"
        description="Snapshot of project health, delivery risk, and near-term schedule pressure across active jobs."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Active Projects" value={activeProjects.length} helper="Excludes planning and completed projects" />
        <StatCard label="Projects At Risk" value={projectsAtRisk} helper="Health flag based on schedule, issue load, and blockers" />
        <StatCard label="Completed Milestones (This Week)" value={completedMilestonesThisWeek} helper="Milestones closed in last 7 days" />
        <StatCard label="Overdue Tasks" value={overdueTasks} helper="Tasks past due date and not marked complete" />
        <StatCard label="Open Issues" value={openIssues} helper="Open, monitoring, and mitigating risk records" />
        <StatCard label="Pending Inspections" value={pendingInspections} helper="Inspections not yet completed" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr,1fr]">
        <Card title="Projects Needing Attention" subtitle="Delayed, on hold, or at-risk projects ranked by completion">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3">Project</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Progress</th>
                  <th className="pb-3">Manager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attentionProjects.map((project) => (
                  <tr key={project.id} className="align-top">
                    <td className="py-3 pr-4">
                      <Link className="font-semibold text-slate-900 hover:text-sky-700" to={`/projects/${project.id}`}>
                        {project.name}
                      </Link>
                      <p className="text-xs text-slate-500">{project.client}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge label={labelize(project.status)} tone={projectStatusTone(project.status)} />
                    </td>
                    <td className="py-3 pr-4">
                      <ProgressBar value={project.percentComplete} tone={project.health === 'at_risk' ? 'critical' : 'warn'} />
                    </td>
                    <td className="py-3 text-slate-700">{project.projectManager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Upcoming Deadlines" subtitle="Next inspections and schedule-critical dates">
          <ul className="space-y-3">
            {upcomingDeadlines.map((item) => {
              const project = projects.find((projectEntry) => projectEntry.id === item.projectId)
              const delta = daysUntil(item.date)

              return (
                <li key={item.id} className="rounded-md border border-slate-200 px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{project?.name}</p>
                    </div>
                    <StatusBadge
                      label={delta < 0 ? `${Math.abs(delta)}d overdue` : `${delta}d`}
                      tone={delta < 0 ? 'rose' : delta <= 3 ? 'amber' : 'blue'}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{prettyDate(item.date)}</p>
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr,1fr]">
        <Card title="Recent Activity Feed" subtitle="Latest field, schedule, and quality updates">
          <ul className="space-y-3">
            {activityFeed.map((item) => (
              <li key={item.id} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{item.projectName}</p>
                  <StatusBadge label={labelize(item.type)} tone="slate" />
                </div>
                <p className="mt-1 text-sm text-slate-700">{item.message}</p>
                <p className="mt-1 text-xs text-slate-500">{new Date(item.timestamp).toLocaleString('en-US')}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Progress Summary By Project" subtitle="Quick view of percent complete across all jobs">
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">{project.name}</p>
                  <p className="text-xs text-slate-500">{project.percentComplete}%</p>
                </div>
                <ProgressBar
                  value={project.percentComplete}
                  tone={project.health === 'at_risk' ? 'critical' : project.status === 'completed' ? 'success' : 'default'}
                />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
