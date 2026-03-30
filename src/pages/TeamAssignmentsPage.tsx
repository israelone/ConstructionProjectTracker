import { Card } from '../components/ui/Card'
import { DataTable } from '../components/ui/DataTable'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects, tasks, teamAssignments } from '../data/mockData'
import { readable, workloadTone } from '../utils/badges'

export const TeamAssignmentsPage = () => {
  return (
    <div>
      <PageHeader
        title="Team / Assignments"
        description="Staffing view for project controls, highlighting workload, role coverage, and who needs support before the week gets away from the team."
      />

      <Card subtitle={`${teamAssignments.filter((member) => member.currentWorkload === 'overloaded').length} team members flagged at capacity`}>
        <DataTable columns={['Employee', 'Role / Project', 'Workload', 'Assigned Tasks', 'Status']}>
          {teamAssignments.map((member) => {
            const project = projects.find((entry) => entry.id === member.assignedProjectId)
            const memberTasks = tasks.filter((task) => member.assignedTaskIds.includes(task.id))

            return (
              <tr key={member.id}>
                <td className="min-w-[190px]">
                  <p className="font-semibold text-slate-900">{member.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                </td>
                <td className="min-w-[240px]">
                  <p className="font-semibold text-slate-900">{project?.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{project?.currentPhase}</p>
                </td>
                <td>
                  <StatusBadge label={readable(member.currentWorkload)} tone={workloadTone(member.currentWorkload)} />
                </td>
                <td className="min-w-[320px]">
                  <ul className="space-y-1.5">
                    {memberTasks.map((task) => (
                      <li key={task.id} className="text-sm text-slate-700">
                        {task.title}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <StatusBadge
                    label={readable(member.status)}
                    tone={member.status === 'at_capacity' ? 'rose' : member.status === 'active' ? 'blue' : 'slate'}
                  />
                </td>
              </tr>
            )
          })}
        </DataTable>
      </Card>
    </div>
  )
}
