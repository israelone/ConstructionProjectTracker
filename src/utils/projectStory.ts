import { aiProjectBriefsById, issues, projects, scheduleItems, tasks, teamAssignments } from '../data/mockData'

export const buildProjectStory = (projectId: string) => {
  const project = projects.find((entry) => entry.id === projectId)

  if (!project) {
    return null
  }

  const projectTasks = tasks.filter((task) => task.projectId === projectId)
  const projectIssues = issues.filter((issue) => issue.projectId === projectId && issue.status !== 'resolved')
  const assignedTeam = teamAssignments.filter((member) => member.assignedProjectId === projectId)
  const lookAhead = scheduleItems
    .filter((item) => item.projectId === projectId && item.status !== 'completed')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return {
    project,
    brief: aiProjectBriefsById[projectId],
    // Keep the page-level storytelling derivations in one place so reviewers can
    // quickly understand how operational signals are assembled from mock data.
    blockedTasks: projectTasks.filter((task) => task.status === 'blocked').length,
    overdueTasks: projectTasks.filter((task) => task.status !== 'complete' && task.dueDate < '2026-03-30').length,
    openIssues: projectIssues.length,
    atCapacityCount: assignedTeam.filter((member) => member.status === 'at_capacity' || member.currentWorkload === 'overloaded').length,
    lookAhead,
  }
}
