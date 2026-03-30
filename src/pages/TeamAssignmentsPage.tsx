import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects, tasks, teamAssignments } from '../data/mockData'
import { readable, workloadTone } from '../utils/badges'

export const TeamAssignmentsPage = () => {
  return (
    <div>
      <PageHeader
        title="Team / Assignments"
        description="Monitor staffing load, role coverage, and task ownership across all projects."
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-2 pb-3">Employee</th>
                <th className="px-2 pb-3">Role</th>
                <th className="px-2 pb-3">Assigned Project</th>
                <th className="px-2 pb-3">Current Workload</th>
                <th className="px-2 pb-3">Assigned Tasks</th>
                <th className="px-2 pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamAssignments.map((member) => {
                const project = projects.find((entry) => entry.id === member.assignedProjectId)
                const memberTasks = tasks.filter((task) => member.assignedTaskIds.includes(task.id))

                return (
                  <tr
                    key={member.id}
                    className={member.currentWorkload === 'overloaded' ? 'bg-rose-50/70 align-top' : 'align-top'}
                  >
                    <td className="px-2 py-3 font-semibold text-slate-900">{member.name}</td>
                    <td className="px-2 py-3 text-slate-700">{member.role}</td>
                    <td className="px-2 py-3 text-slate-700">{project?.name}</td>
                    <td className="px-2 py-3">
                      <StatusBadge label={readable(member.currentWorkload)} tone={workloadTone(member.currentWorkload)} />
                    </td>
                    <td className="px-2 py-3">
                      <ul className="space-y-1">
                        {memberTasks.map((task) => (
                          <li key={task.id} className="text-xs text-slate-700">
                            {task.title}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-2 py-3">
                      <StatusBadge
                        label={readable(member.status)}
                        tone={member.status === 'at_capacity' ? 'rose' : member.status === 'active' ? 'blue' : 'slate'}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
