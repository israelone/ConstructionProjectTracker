import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects, scheduleItems } from '../data/mockData'
import { prettyDate } from '../utils/format'

export const SchedulePage = () => {
  const groupedItems = scheduleItems
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .reduce<Record<string, typeof scheduleItems>>((accumulator, item) => {
      if (!accumulator[item.date]) {
        accumulator[item.date] = []
      }

      accumulator[item.date].push(item)
      return accumulator
    }, {})

  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Upcoming milestones, inspections, and deadlines with overdue visibility."
      />

      <section className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card title="Timeline View" subtitle="Grouped by date">
          <div className="space-y-5">
            {Object.entries(groupedItems).map(([date, items]) => (
              <div key={date} className="rounded-md border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-2">
                  <p className="text-sm font-semibold text-slate-900">{prettyDate(date)}</p>
                </div>
                <ul className="space-y-2 p-3">
                  {items.map((item) => {
                    const project = projects.find((entry) => entry.id === item.projectId)
                    return (
                      <li key={item.id} className="rounded-md border border-slate-200 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                          <div className="flex items-center gap-2">
                            <StatusBadge
                              label={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              tone={item.type === 'inspection' ? 'blue' : item.type === 'milestone' ? 'teal' : 'amber'}
                            />
                            <StatusBadge
                              label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                              tone={item.status === 'overdue' ? 'rose' : item.status === 'completed' ? 'emerald' : 'slate'}
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">{project?.name}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Overdue Items" subtitle="Immediate follow-up required">
          <ul className="space-y-3">
            {scheduleItems
              .filter((item) => item.status === 'overdue')
              .map((item) => {
                const project = projects.find((entry) => entry.id === item.projectId)
                return (
                  <li key={item.id} className="rounded-md border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-900">{item.title}</p>
                    <p className="mt-1 text-xs text-rose-800">{project?.name}</p>
                    <p className="mt-1 text-xs text-rose-700">Due {prettyDate(item.date)}</p>
                  </li>
                )
              })}
          </ul>
        </Card>
      </section>
    </div>
  )
}
