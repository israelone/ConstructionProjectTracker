import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopHeader } from '../components/TopHeader'

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar collapsed={collapsed} />

        <div className="min-h-screen flex-1">
          <TopHeader collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} />

          <main className="px-5 py-6 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
