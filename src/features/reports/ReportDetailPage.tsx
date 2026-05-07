import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useReport } from '@/features/reports/hooks/useReport'
import { SectionCard } from '@/features/reports/components/SectionCard'
import { PdfExportButton } from '@/features/reports/components/PdfExportButton'
import { Badge } from '@/components/Badge'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/Button'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(
    new Date(iso),
  )
}

export function ReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const reportId = id ?? ''
  const { state, updateSectionContent, approveSection } = useReport(reportId)

  // ?section=<section_key> is set by the timeline page for bidirectional highlighting
  const highlightedSection = searchParams.get('section')

  function handleHighlight(sectionKey: string | null) {
    if (sectionKey && sectionKey !== highlightedSection) {
      setSearchParams({ section: sectionKey }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Rapport laden…" />
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600">
          Rapport kon niet geladen worden: {state.message}
        </p>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Terug naar overzicht
        </Button>
      </div>
    )
  }

  const { report } = state
  const approvedCount = report.sections.filter((s) => s.is_approved).length
  const totalCount = report.sections.length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Overzicht
          </button>
          <h1 className="text-base font-bold text-gray-900">FieldReport</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Report header */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {report.client_name ?? 'Onbekende klant'}
                </h2>
                <Badge status={report.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {report.address ?? 'Adres onbekend'}
              </p>
              <p className="text-sm text-gray-400">
                {formatDate(report.inspection_date)}
              </p>
            </div>
            <PdfExportButton
              reportId={report.id}
              reportApproved={report.status === 'approved'}
            />
          </div>

          {/* Progress bar */}
          {totalCount > 0 && (
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>Voortgang goedkeuring</span>
                <span>
                  {approvedCount} / {totalCount} secties
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${(approvedCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Timeline link */}
          {report.sections.some((s) => s.sources.length > 0) && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <Link
                to={`/reports/${report.id}/timeline`}
                className="text-sm text-blue-600 hover:underline"
              >
                Bekijk tijdlijn van bronnen →
              </Link>
            </div>
          )}
        </div>

        {/* Sections */}
        {report.sections.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            Geen secties beschikbaar.
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {report.sections.map((section) => (
              <li key={section.id}>
                <SectionCard
                  section={section}
                  highlighted={highlightedSection === section.section_key}
                  onContentChange={updateSectionContent}
                  onApprove={approveSection}
                  onHighlight={handleHighlight}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
