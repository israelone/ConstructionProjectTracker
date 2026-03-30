import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/issues-risks', label: 'Issues / Risks' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/team', label: 'Team / Assignments' },
]

interface SidebarProps {
  collapsed: boolean
}

export const Sidebar = ({ collapsed }: SidebarProps) => (
  <aside
    className={`sticky top-0 h-screen border-r border-slate-800/80 bg-[linear-gradient(180deg,#162534_0%,#13212f_42%,#0f1a26_100%)] text-slate-100 transition-all duration-200 ${
      collapsed ? 'w-[88px]' : 'w-[260px]'
    }`}
  >
    <div className="border-b border-slate-800/90 px-4 py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Field Ops</p>
      <h2 className={`mt-2 font-semibold leading-tight text-white ${collapsed ? 'text-sm' : 'text-lg'}`}>
        {collapsed ? 'CPT' : 'Project Controls'}
      </h2>
      {!collapsed && <p className="mt-2 text-sm text-slate-400">Internal delivery dashboard for active construction work.</p>}
    </div>

    <nav className="space-y-1.5 px-3 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-slate-700/90 text-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.1)]' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`
          }
        >
          {collapsed ? item.label.split(' ')[0] : item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
