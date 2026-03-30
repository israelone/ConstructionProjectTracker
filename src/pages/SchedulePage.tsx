import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusBadge } from '../components/ui/StatusBadge'
import { projects, scheduleItems } from '../data/mockData'
import { labelize, prettyDate } from '../utils/format'

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
        description="Near-term commitments organized like an internal look-ahead board, with separate visibility for overdue items and field-critical dates."
      />

      <section className="grid gap-6 lg:grid-cols-[1.45fr,1fr]">
        <Card title="Three-Week Look Ahead" subtitle="Grouped by scheduled date">
          <div className="space-y-5">
            {Object.entries(groupedItems).map(([date, items]) => (
              <div key={date} className="rounded-2xl border border-slate-200/90 bg-slate-50/60">
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{prettyDate(date)}</p>
                </div>
                <ul className="space-y-3 p-4">
                  {items.map((item) => {
                    const project = projects.find((entry) => entry.id === item.projectId)

                    return (
                      <li key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-sm text-slate-600">{project?.name}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{project?.currentPhase}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusBadge
                              label={labelize(item.type)}
                              tone={item.type === 'inspection' ? 'blue' : item.type === 'milestone' ? 'teal' : 'amber'}
                            />
                            <StatusBadge
                              label={labelize(item.status)}
                              tone={item.status === 'overdue' ? 'rose' : item.status === 'completed' ? 'emerald' : 'slate'}
                            />
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Overdue Follow-Up" subtitle="Items needing immediate coordination">
          <ul className="space-y-3">
            {scheduleItems
              .filter((item) => item.status === 'overdue')
              .map((item) => {
                const project = projects.find((entry) => entry.id === item.projectId)
                return (
                  <li key={item.id} className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-rose-900">{item.title}</p>
                        <p className="mt-1 text-sm text-rose-800">{project?.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-rose-700">{project?.projectManager}</p>
                      </div>
                      <StatusBadge label="Overdue" tone="rose" />
                    </div>
                    <p className="mt-2 text-xs text-rose-700">Due {prettyDate(item.date)}</p>
                  </li>
                )
              })}
          </ul>
        </Card>
      </section>
    </div>
  )
}
