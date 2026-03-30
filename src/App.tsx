import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { IssuesRisksPage } from './pages/IssuesRisksPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SchedulePage } from './pages/SchedulePage'
import { TeamAssignmentsPage } from './pages/TeamAssignmentsPage'

const App = () => (
  <Routes>
    <Route element={<AppLayout />} path="/">
      <Route index element={<DashboardPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:projectId" element={<ProjectDetailPage />} />
      <Route path="issues-risks" element={<IssuesRisksPage />} />
      <Route path="schedule" element={<SchedulePage />} />
      <Route path="team" element={<TeamAssignmentsPage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default App
