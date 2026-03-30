import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AIInsightsPanel } from '../components/ui/AIInsightsPanel'
import { Card } from '../components/ui/Card'
import { DetailItem } from '../components/ui/DetailItem'
import { PageHeader } from '../components/ui/PageHeader'
import { ProgressBar } from '../components/ui/ProgressBar'
import { StatusBadge } from '../components/ui/StatusBadge'
import { issues, tasks, teamAssignments } from '../data/mockData'
import { budgetTone, healthTone, priorityTone, projectStatusTone, readable, taskStatusTone } from '../utils/badges'
import { buildProjectStory } from '../utils/projectStory'
import { budgetStatusLabel, compactCurrency, currency, prettyDate, signedDays, signedPercent } from '../utils/format'

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

  const story = projectId ? buildProjectStory(projectId) : null
  const project = story?.project

  if (!project || !story) {
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

  return (
    <div>
      <PageHeader
        title={project.name}
        description="A project-controls view of current status, near-term risk, and what needs to happen next to keep the job moving."
        actions={
          <Link to="/projects" className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Back to Projects
          </Link>
        }
      />

      <section className="mb-6 grid gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Phase</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{project.currentPhase}</p>
              <p className="mt-1 text-sm text-slate-500">{readable(project.marketSector)} work</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Schedule</p>
              <p className={`mt-2 text-lg font-semibold ${project.scheduleVarianceDays > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {signedDays(project.scheduleVarianceDays)}
              </p>
              <p className="mt-1 text-sm text-slate-500">{story.overdueTasks} overdue tasks</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Risk Load</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{story.openIssues}</p>
              <p className="mt-1 text-sm text-slate-500">Open issues and blockers</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="eyebrow">Crew Coverage</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{project.workforceOnsite} onsite</p>
              <p className="mt-1 text-sm text-slate-500">{story.atCapacityCount} leads at capacity</p>
            </div>
          </div>
        </Card>

        <Card title="Reviewer Notes" subtitle="Signals intentionally modeled in mock data">
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="rounded-xl bg-slate-50 px-3 py-2">Inspection pressure and permit dependencies are surfaced as first-class UI states.</li>
            <li className="rounded-xl bg-slate-50 px-3 py-2">Crew allocation and blocked tasks are shown beside budget and schedule, not hidden below the fold.</li>
            <li className="rounded-xl bg-slate-50 px-3 py-2">AI guidance is static mock data only, with no API calls or hidden backend behavior.</li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr,1fr]">
        <Card title="Project Story" subtitle={`${readable(project.status)} status | ${readable(project.health)} health`}>
          <p className="text-base font-semibold text-slate-900">{story.brief.headline}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{story.brief.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge label={readable(project.status)} tone={projectStatusTone(project.status)} />
            <StatusBadge label={readable(project.priority)} tone={priorityTone(project.priority)} />
            <StatusBadge label={budgetStatusLabel[project.budgetStatus]} tone={budgetTone(project.budgetStatus)} />
            <StatusBadge label={readable(project.health)} tone={healthTone(project.health)} />
          </div>

          <div className="mt-5">
            <ProgressBar value={project.percentComplete} tone={project.health === 'at_risk' ? 'critical' : 'default'} />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <DetailItem label="Client" value={project.client} />
            <DetailItem label="Address" value={project.address} />
            <DetailItem label="Project Manager" value={project.projectManager} />
            <DetailItem label="Superintendent" value={project.superintendent} />
            <DetailItem label="Contract Value" value={currency(project.contractValue)} />
            <DetailItem label="Planned End Date" value={prettyDate(project.estimatedCompletionDate)} />
          </div>
        </Card>

        <Card title="Controls Snapshot" subtitle="Budget, billing, staffing, and constraint signal">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Cost Variance</span>
              <strong className={project.costVariance > 0 ? 'text-rose-600' : 'text-emerald-600'}>{signedPercent(project.costVariance)}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Pending Billing</span>
              <strong>{compactCurrency(project.billingPending)}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Pending Inspections</span>
              <strong>{project.pendingInspections}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Blocked Tasks</span>
              <strong>{story.blockedTasks}</strong>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span>Leads At Capacity</span>
              <strong>{story.atCapacityCount}</strong>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-6">
        <AIInsightsPanel
          headline={story.brief.headline}
          summary={story.brief.summary}
          watchItems={story.brief.watchItems}
          recommendedActions={story.brief.recommendedActions}
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr,1fr]">
        <Card title="Next 14 Days" subtitle="What the team needs to protect next">
          <ul className="space-y-3">
            {story.lookAhead.map((item) => (
              <li key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{readable(item.type)}</p>
                  </div>
                  <StatusBadge label={readable(item.status)} tone={item.status === 'overdue' ? 'rose' : item.type === 'inspection' ? 'blue' : 'amber'} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{prettyDate(item.date)}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Milestone Timeline">
          <ol className="space-y-3">
            {project.milestones.map((milestone) => (
              <li key={milestone.phase} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{phaseLabelMap[milestone.phase]}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Target {prettyDate(milestone.targetDate)}</p>
                </div>
                <StatusBadge label={readable(milestone.status)} tone={milestone.status === 'blocked' ? 'rose' : milestone.status === 'complete' ? 'emerald' : milestone.status === 'in_progress' ? 'blue' : 'slate'} />
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr,1fr]">
        <Card
          title="Task List"
          subtitle="Action items tied to permits, inspections, turnover, and field execution"
          action={
            <button
              type="button"
              onClick={() => setShowAllTasks((value) => !value)}
              className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 hover:bg-slate-100"
            >
              {showAllTasks ? 'Show Less' : 'Show All'}
            </button>
          }
        >
          <div className="space-y-3">
            {visibleTasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">Owner {task.owner}</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <StatusBadge label={readable(task.status)} tone={taskStatusTone(task.status)} />
                    <StatusBadge label={readable(task.priority)} tone={priorityTone(task.priority)} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600">Due {prettyDate(task.dueDate)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Crew And Constraint Notes" subtitle="Allocation, inspections, and blocker ownership">
          <div className="space-y-3">
            {assignedTeam.map((member) => (
              <div key={member.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{member.role}</p>
                  </div>
                  <StatusBadge
                    label={readable(member.currentWorkload)}
                    tone={member.currentWorkload === 'overloaded' ? 'rose' : member.currentWorkload === 'high' ? 'amber' : member.currentWorkload === 'balanced' ? 'emerald' : 'slate'}
                  />
                </div>
                <p className="mt-2 text-sm text-slate-600">Assigned tasks: {member.assignedTaskIds.length}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Open Issues / Blockers" subtitle="Problems currently shaping execution">
          <div className="space-y-3">
            {projectIssues.length === 0 && <p className="text-sm text-slate-600">No active blockers.</p>}
            {projectIssues.map((issue) => (
              <div key={issue.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{issue.title}</p>
                  <StatusBadge label={readable(issue.severity)} tone={issue.severity === 'critical' ? 'rose' : issue.severity === 'high' ? 'amber' : 'blue'} />
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-slate-500">Owner {issue.owner}</p>
                <p className="mt-2 text-sm text-slate-700">{issue.mitigationNote}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Notes And Updates" subtitle="Latest project context from the team">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Project Notes</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {project.notes.map((note) => (
                  <li key={note} className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Recent Updates</p>
              <ul className="space-y-2 text-sm text-slate-700">
                {project.updates.map((update) => (
                  <li key={update} className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                    {update}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
