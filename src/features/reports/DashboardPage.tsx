import { useNavigate } from 'react-router-dom'
import { useReports } from '@/features/reports/hooks/useReports'
import { useAuth } from '@/features/auth/useAuth'
import { Badge } from '@/components/Badge'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/Button'
import type { Report } from '@/types'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(
    new Date(iso),
  )
}

function ReportCard({
  report,
  onClick,
}: {
  report: Report
  onClick: () => void
}) {
  const isActionable = report.status === 'draft' || report.status === 'approved'

  return (
    <button
      onClick={onClick}
      disabled={!isActionable}
      className={`w-full rounded-lg border bg-white p-5 text-left shadow-sm transition-shadow ${isActionable ? 'hover:shadow-md cursor-pointer' : 'opacity-60 cursor-default'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {report.client_name ?? 'Onbekende klant'}
          </p>
          <p className="mt-0.5 text-sm text-gray-500 truncate">
            {report.address ?? 'Adres onbekend'}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {formatDate(report.inspection_date)}
          </p>
        </div>
        <Badge status={report.status} />
      </div>
    </button>
  )
}

export function DashboardPage() {
  const state = useReports()
  const { logout, state: authState } = useAuth()
  const navigate = useNavigate()

  const inspectorName =
    authState.status === 'authenticated' ? authState.user.id : 'Inspecteur'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">FieldReport</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{inspectorName}</span>
            <Button variant="ghost" onClick={logout} className="text-sm">
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Mijn inspecties
        </h2>

        {state.status === 'loading' && (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" label="Inspecties laden…" />
          </div>
        )}

        {state.status === 'error' && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Kon inspecties niet laden: {state.message}
          </div>
        )}

        {state.status === 'success' && state.reports.length === 0 && (
          <p className="py-12 text-center text-gray-400">
            Geen inspecties gevonden.
          </p>
        )}

        {state.status === 'success' && state.reports.length > 0 && (
          <ul className="flex flex-col gap-3">
            {state.reports.map((report) => (
              <li key={report.id}>
                <ReportCard
                  report={report}
                  onClick={() => navigate(`/reports/${report.id}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
