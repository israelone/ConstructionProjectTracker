import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
    <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
    <p className="mt-2 text-sm text-slate-600">The page you requested does not exist in this demo app.</p>
    <Link to="/" className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
      Back to Dashboard
    </Link>
  </div>
)
