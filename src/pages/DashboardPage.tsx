import { Link } from 'react-router-dom'
import { AIInsightsPanel } from '../components/ui/AIInsightsPanel'
import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatCard } from '../components/ui/StatCard'
import { StatusBadge } from '../components/ui/StatusBadge'
import { activityFeed, aiProjectBriefsById, issues, projects, scheduleItems, tasks } from '../data/mockData'
import { healthTone, projectStatusTone } from '../utils/badges'
import { compactCurrency, currency, daysUntil, labelize, prettyDate, signedDays, signedPercent } from '../utils/format'

export const DashboardPage = () => {
  const liveProjects = projects.filter((project) => project.status !== 'completed')
  const activeProjects = projects.filter((project) => ['active', 'delayed', 'on_hold'].includes(project.status))
  const activeWorkforce = activeProjects.reduce((count, project) => count + project.workforceOnsite, 0)
  const billingPending = activeProjects.reduce((total, project) => total + project.billingPending, 0)
  const projectsAtRisk = liveProjects.filter((project) => project.health === 'at_risk').length
  const overdueTasks = tasks.filter((task) => task.status !== 'complete' && daysUntil(task.dueDate) < 0).length
  const openIssues = issues.filter((issue) => issue.status !== 'resolved').length
  const pendingInspections = projects.reduce((count, project) => count + project.pendingInspections, 0)
  const averageCostVariance = activeProjects.reduce((sum, project) => sum + project.costVariance, 0) / activeProjects.length

  const attentionProjects = liveProjects
    .filter((project) => project.health !== 'on_track' || project.scheduleVarianceDays > 0 || project.costVariance > 0)
    .sort((a, b) => b.scheduleVarianceDays - a.scheduleVarianceDays || b.costVariance - a.costVariance)
    .slice(0, 5)

  const upcomingDeadlines = scheduleItems
    .filter((item) => item.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)

  const issueSummary = [
    { label: 'Critical Risks', value: issues.filter((issue) => issue.severity === 'critical' && issue.status !== 'resolved').length, tone: 'rose' as const },
    { label: 'Monitor Closely', value: issues.filter((issue) => issue.status === 'monitoring').length, tone: 'blue' as const },
    { label: 'Mitigation In Flight', value: issues.filter((issue) => issue.status === 'mitigating').length, tone: 'amber' as const },
  ]

  const riskiestProject = attentionProjects[0]
  const riskiestProjectBrief = riskiestProject ? aiProjectBriefsById[riskiestProject.id] : null

  return (
    <div>
      <PageHeader
        title="Operations Dashboard"
        description="Portfolio health across active jobs, near-term commitments, and the issues most likely to affect production this week."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live Jobs" value={activeProjects.length} helper={`${projectsAtRisk} at risk / ${pendingInspections} inspections pending`} icon="Portfolio" />
        <StatCard label="Field Workforce" value={activeWorkforce} helper="Craft and supervisory staff scheduled onsite today" icon="Staffing" />
        <StatCard label="Billing Pending" value={compactCurrency(billingPending)} helper="Open billings expected in current draw cycle" icon="Finance" />
        <StatCard label="Overdue Tasks" value={overdueTasks} helper={`${openIssues} open risk records and blockers`} icon="Action" />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr,1fr]">
        <Card
          title="Portfolio Snapshot"
          subtitle="Operational readout for project executives and PM office"
          action={<StatusBadge label={`${signedPercent(averageCostVariance)} avg cost variance`} tone={averageCostVariance > 0 ? 'rose' : 'emerald'} />}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Health Mix</p>
              <div className="mt-3 space-y-2">
                {(['on_track', 'watch', 'at_risk'] as const).map((health) => (
                  <div key={health} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{labelize(health)}</span>
                    <StatusBadge label={`${liveProjects.filter((project) => project.health === health).length} jobs`} tone={healthTone(health)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Schedule Pressure</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{liveProjects.filter((project) => project.scheduleVarianceDays > 0).length}</p>
              <p className="mt-1 text-sm text-slate-500">Jobs carrying positive schedule variance</p>
              <p className="mt-4 text-sm text-slate-700">Worst exposure: {signedDays(Math.max(...liveProjects.map((project) => project.scheduleVarianceDays)))}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Risk Queue</p>
              <div className="mt-3 space-y-2">
                {issueSummary.map((entry) => (
                  <div key={entry.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">{entry.label}</span>
                    <StatusBadge label={String(entry.value)} tone={entry.tone} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Upcoming Commitments" subtitle="Inspections, milestones, and response dates in the next cycle">
          <ul className="space-y-3">
            {upcomingDeadlines.map((item) => {
              const project = projects.find((projectEntry) => projectEntry.id === item.projectId)
              const delta = daysUntil(item.date)

              return (
                <li key={item.id} className="rounded-xl border border-slate-200 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{labelize(item.type)} | {project?.currentPhase}</p>
                      <p className="mt-2 text-sm text-slate-600">{project?.name}</p>
                    </div>
                    <StatusBadge
                      label={delta < 0 ? `${Math.abs(delta)}d overdue` : `${delta}d`}
                      tone={delta < 0 ? 'rose' : delta <= 3 ? 'amber' : 'blue'}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{prettyDate(item.date)}</p>
                </li>
              )
            })}
          </ul>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr,1fr]">
        <Card title="Projects Requiring Intervention" subtitle="Highest schedule and cost exposure across active work">
          <DataTable columns={['Project', 'Health', 'Variance', 'Workforce', 'Next Billing']}>
            {attentionProjects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link className="font-semibold text-slate-900 hover:text-sky-700" to={`/projects/${project.id}`}>
                    {project.name}
                  </Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                    {labelize(project.marketSector)} | {project.currentPhase}
                  </p>
                </td>
                <td>
                  <div className="space-y-2">
                    <StatusBadge label={labelize(project.health)} tone={healthTone(project.health)} />
                    <StatusBadge label={labelize(project.status)} tone={projectStatusTone(project.status)} />
                  </div>
                </td>
                <td>
                  <p className="font-semibold text-slate-900">{signedDays(project.scheduleVarianceDays)}</p>
                  <p className={`mt-1 text-xs ${project.costVariance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    Cost {signedPercent(project.costVariance)}
                  </p>
                </td>
                <td>
                  <p className="font-semibold text-slate-900">{project.workforceOnsite}</p>
                  <p className="mt-1 text-xs text-slate-500">onsite today</p>
                </td>
                <td>
                  <p className="font-semibold text-slate-900">{currency(project.billingPending)}</p>
                  <p className="mt-1 text-xs text-slate-500">{project.projectManager}</p>
                </td>
              </tr>
            ))}
          </DataTable>
        </Card>

        <Card title="Recent Field Activity" subtitle="Latest schedule, quality, and coordination updates">
          <ul className="space-y-3">
            {activityFeed.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{item.projectName}</p>
                  <StatusBadge label={labelize(item.type)} tone="slate" />
                </div>
                <p className="mt-2 text-sm text-slate-700">{item.message}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">
                  {new Date(item.timestamp).toLocaleString('en-US')}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {riskiestProject && riskiestProjectBrief ? (
        <section className="mt-6">
          <AIInsightsPanel
            headline={`${riskiestProject.name}: ${riskiestProjectBrief.headline}`}
            summary={riskiestProjectBrief.summary}
            watchItems={riskiestProjectBrief.watchItems}
            recommendedActions={riskiestProjectBrief.recommendedActions}
          />
        </section>
      ) : null}

      <section className="mt-6">
        <Card title="Production Progress" subtitle="Percent complete across the full portfolio">
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl border border-slate-200 p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{project.currentPhase}</p>
                  </div>
                  <StatusBadge label={project.workforceOnsite ? `${project.workforceOnsite} onsite` : 'Closed out'} tone={project.workforceOnsite ? 'blue' : 'slate'} />
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
