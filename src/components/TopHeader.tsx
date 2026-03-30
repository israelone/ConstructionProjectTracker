interface TopHeaderProps {
  onToggleSidebar: () => void
  collapsed: boolean
}

export const TopHeader = ({ onToggleSidebar, collapsed }: TopHeaderProps) => (
  <header className="sticky top-0 z-20 border-b border-white/50 bg-white/80 px-6 py-3 backdrop-blur-xl">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          {collapsed ? 'Expand Nav' : 'Collapse Nav'}
        </button>
        <div>
          <p className="text-sm font-semibold text-slate-800">Construction Operations Command Center</p>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Daily coordination view for PM office and field leadership</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right sm:block">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Report Date</p>
          <p className="text-sm font-semibold text-slate-800">Mar 30, 2026</p>
        </div>
        <div className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">PM Office</div>
      </div>
    </div>
  </header>
)
