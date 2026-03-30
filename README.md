# Construction Project Tracker

## Project Overview
Construction Project Tracker is a frontend-only internal business application demo designed for a construction company. It helps project managers, coordinators, and office teams monitor active jobs, schedule health, risks, team assignments, and project progress from a single interface.

The app uses realistic local mock data (no backend) to simulate day-to-day operations across municipal, commercial, restoration, and infrastructure projects.

## Why This Project Was Built
This portfolio project was built to demonstrate practical frontend engineering for internal operations software:
- building useful dashboards for business decision-making
- creating maintainable component-based React architecture
- modeling realistic domain data in TypeScript
- delivering a polished, credible admin-style UX suitable for internal users

## Features
- Dashboard with operational metrics:
  - total active projects
  - projects at risk
  - completed milestones this week
  - overdue tasks
  - open issues
  - pending inspections
- Recent activity feed
- Projects needing attention table
- Upcoming deadlines panel
- Visual project progress summary
- Projects List page with:
  - search by project or client
  - status filtering
  - priority filtering
  - sorting by completion date or percent complete
- Project Detail page with:
  - overview and key metadata
  - progress indicators
  - milestone timeline
  - assigned team members
  - task list
  - open blockers
  - notes and recent updates
  - mock AI insights panel (static recommendations, no API)
- Issues / Risks page with filters for severity, project, status, and category
- Schedule page with grouped timeline, inspections, deadlines, and overdue section
- Team / Assignments page with workload visibility and overloaded staffing indicators

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Project Structure
```text
src/
  components/
    ui/
  data/
  layouts/
  pages/
  types/
  utils/
```

## Local Mock Data Included
- 8 projects
- 28 tasks
- 12 issues/risks
- 10 team members
- milestone timelines for every project
- recent activity feed items
- schedule and deadline records

## How To Run Locally
1. Install dependencies:
   npm install
2. Start development server:
   npm run dev
3. Build for production:
   npm run build
4. Preview production build:
   npm run preview

## Relevance For Internal Business Application Developer Role
This project intentionally mirrors real internal operations software requirements:
- data-heavy interfaces with filters, sorting, and status context
- clear information hierarchy for fast operational decisions
- consistent UI patterns for long-term maintainability
- business-oriented language and workflows instead of consumer-oriented styling

## Future Improvements
- Add backend APIs for persistent project/task/issue records
- Add authentication and role-based permissions
- Add project audit logs and change history
- Add notification center and reminders
- Add deeper AI insights using model-backed recommendations
- Add PostgreSQL integration for structured project operations data
- Add file/document management for permits, RFIs, and inspection reports
