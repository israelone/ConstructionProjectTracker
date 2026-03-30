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
    className={`sticky top-0 h-screen border-r border-slate-200 bg-slate-900 text-slate-100 transition-all duration-200 ${
      collapsed ? 'w-[88px]' : 'w-[260px]'
    }`}
  >
    <div className="border-b border-slate-800 px-4 py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Internal Tool</p>
      <h2 className={`mt-2 font-semibold leading-tight text-white ${collapsed ? 'text-sm' : 'text-lg'}`}>
        {collapsed ? 'CPT' : 'Construction Project Tracker'}
      </h2>
    </div>

    <nav className="space-y-1 px-3 py-4">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          {collapsed ? item.label.split(' ')[0] : item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
