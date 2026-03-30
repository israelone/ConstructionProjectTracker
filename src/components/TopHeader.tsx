interface TopHeaderProps {
  onToggleSidebar: () => void
  collapsed: boolean
}

export const TopHeader = ({ onToggleSidebar, collapsed }: TopHeaderProps) => (
  <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-6 py-3 backdrop-blur">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          {collapsed ? 'Expand Menu' : 'Collapse Menu'}
        </button>
        <p className="text-sm text-slate-600">Construction Operations Command Center</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
        >
          Notifications (3)
        </button>
        <div className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white">PM Office</div>
      </div>
    </div>
  </header>
)
