# Construction Project Tracker

Construction Project Tracker is a frontend-only React application that simulates an internal project controls dashboard for a commercial construction company. It is designed to feel like software a project manager, superintendent, or operations lead could actually use to review job health, staffing pressure, inspections, and risk before a weekly coordination meeting.

## What This Demonstrates

This project was built as a portfolio piece for internal business application work, with an emphasis on product judgment as much as code quality.

- Turning operational domain details into readable dashboards and decision-support views
- Designing a credible internal tool instead of a generic admin template
- Structuring a React + TypeScript codebase around reusable UI primitives and shared data formatting
- Modeling construction-specific fake data that feels more believable than placeholder lorem ipsum admin content
- Building dense tables, filters, and project detail views that stay legible under real business-style information volume

## Product Framing

The interface is intentionally oriented around day-to-day construction operations:

- Portfolio-level dashboard with staffing, billing, schedule, and risk pressure
- Project list with phase, workforce, financial variance, and completion context
- Project detail page with milestone tracking, controls signals, team coverage, and blockers
- Issues / Risks review table with mitigation notes and ownership
- Schedule page with a look-ahead view and overdue follow-up section
- Team assignments page focused on workload visibility and capacity risk

Rather than aiming for a flashy SaaS marketing look, the app leans into a more grounded internal-tool aesthetic: structured surfaces, tighter data spacing, stronger typography hierarchy, and content that reflects real construction workflows.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Notable Frontend Decisions

- Shared UI primitives:
  Reusable cards, badges, progress bars, filter fields, detail items, and data-table scaffolding keep the pages visually consistent and reduce repeated page-level styling.
- Domain-shaped mock data:
  Projects include phase, staffing, billing exposure, schedule variance, and cost variance so the UI can present more realistic operational signals.
- Utility-driven formatting:
  Currency, dates, labels, and variance formatting are centralized to keep business-facing language consistent.
- Internal-tool information hierarchy:
  Tables, list density, muted surfaces, and compact metadata are tuned for scanning rather than for marketing visuals.

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

## Reviewer Quick Tour

- Start with `src/pages/DashboardPage.tsx` for the portfolio-level product thinking
- Open `src/pages/ProjectDetailPage.tsx` for the strongest operations storytelling
- Check `src/components/ui/` for the reusable building blocks used across screens
- Look at `src/data/mockData.ts` and `src/utils/projectStory.ts` to see how the construction-specific mock data drives the UI

## Local Development

1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Create a production build with `npm run build`
4. Preview the production build with `npm run preview`

## GitHub Pages Base Path

This project keeps the GitHub Pages base path in one place:

- `site.config.ts`

If the repository name changes later, update the exported value in `site.config.ts` to match the new repo name.

Example:

```ts
export const githubPagesBasePath = '/my-new-repo-name/'
```

For a user or organization site instead of a project site, set it to:

```ts
export const githubPagesBasePath = '/'
```

For routing, this project uses `HashRouter` instead of `BrowserRouter`.
That is the simplest and most reliable GitHub Pages setup for a frontend portfolio app because deep links and refreshes continue to work without server-side rewrite rules.

Example deployed URLs will look like:

```text
https://yourusername.github.io/Construction-Project-Tracker/#/projects/p-101
```

Because of that router choice, a custom `public/404.html` fallback is not required for route compatibility.
