import { StatusBadge } from './StatusBadge'

interface AIInsightsPanelProps {
  headline: string
  summary: string
  watchItems: string[]
  recommendedActions: string[]
}

export const AIInsightsPanel = ({ headline, summary, watchItems, recommendedActions }: AIInsightsPanelProps) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="eyebrow">AI Insights</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{headline}</p>
      </div>
      <StatusBadge label="Mock Only" tone="slate" />
    </div>

    <p className="mt-2 text-sm text-slate-600">{summary}</p>

    <div className="mt-4 grid gap-3 md:grid-cols-2">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Watch Items</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {watchItems.map((item) => (
            <li key={item} className="rounded-xl bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Recommended Actions</p>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {recommendedActions.map((item) => (
            <li key={item} className="rounded-xl bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)
