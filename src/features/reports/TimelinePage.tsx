import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useReport } from '@/features/reports/hooks/useReport'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/Button'
import type { ReportSection, SectionSource } from '@/types'

type TimelineEntry = {
  source: SectionSource
  section: ReportSection
  sortKey: number // milliseconds epoch for sorting
}

function buildTimeline(sections: ReportSection[]): TimelineEntry[] {
  const entries: TimelineEntry[] = []
  for (const section of sections) {
    for (const source of section.sources) {
      const sortKey =
        source.type === 'audio' && source.timestamp_start !== undefined
          ? source.timestamp_start * 1000
          : source.capture_time
            ? new Date(source.capture_time).getTime()
            : 0
      entries.push({ source, section, sortKey })
    }
  }
  return entries.sort((a, b) => a.sortKey - b.sortKey)
}

function formatTimestamp(source: SectionSource): string {
  if (source.type === 'audio' && source.timestamp_start !== undefined) {
    const mins = Math.floor(source.timestamp_start / 60)
      .toString()
      .padStart(2, '0')
    const secs = (source.timestamp_start % 60).toString().padStart(2, '0')
    const endPart =
      source.timestamp_end !== undefined
        ? ` – ${Math.floor(source.timestamp_end / 60)
            .toString()
            .padStart(
              2,
              '0',
            )}:${(source.timestamp_end % 60).toString().padStart(2, '0')}`
        : ''
    return `${mins}:${secs}${endPart}`
  }
  if (source.capture_time) {
    return new Intl.DateTimeFormat('nl-NL', {
      timeStyle: 'short',
      dateStyle: 'short',
    }).format(new Date(source.capture_time))
  }
  return '—'
}

function TimelineItem({
  entry,
  highlighted,
  onClick,
}: {
  entry: TimelineEntry
  highlighted: boolean
  onClick: () => void
}) {
  const isAudio = entry.source.type === 'audio'

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border-2 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${highlighted ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${isAudio ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}
        >
          {isAudio ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4zm-1 6a1 1 0 10-2 0 6 6 0 0012 0 1 1 0 10-2 0 5 5 0 01-10 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono text-gray-400">
              {formatTimestamp(entry.source)}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {entry.section.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-700 leading-relaxed">
            {entry.source.content_summary}
          </p>
        </div>
      </div>
    </button>
  )
}

export function TimelinePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const reportId = id ?? ''
  const { state } = useReport(reportId)

  // ?section=<section_key> — set when user clicks a timeline item; also used to receive
  // highlight from the report detail page
  const highlightedSectionKey = searchParams.get('section')

  function handleItemClick(sectionKey: string) {
    if (sectionKey === highlightedSectionKey) {
      setSearchParams({}, { replace: true })
    } else {
      setSearchParams({ section: sectionKey }, { replace: true })
    }
  }

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" label="Tijdlijn laden…" />
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600">
          Tijdlijn kon niet geladen worden: {state.message}
        </p>
        <Button
          variant="secondary"
          onClick={() => navigate(`/reports/${reportId}`)}
        >
          Terug naar rapport
        </Button>
      </div>
    )
  }

  const { report } = state
  const timeline = buildTimeline(report.sections)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <button
            onClick={() => navigate(`/reports/${reportId}`)}
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
            Rapport
          </button>
          <h1 className="text-base font-bold text-gray-900">FieldReport</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Tijdlijn</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {report.client_name ?? 'Onbekende klant'} — {timeline.length}{' '}
              {timeline.length === 1 ? 'fragment' : 'fragmenten'}
            </p>
          </div>

          {/* Section filter legend + link back to report with highlight */}
          {highlightedSectionKey && (
            <div className="flex items-center gap-3 rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-700">
              <span>
                Gefilterd op:{' '}
                <strong>
                  {report.sections.find(
                    (s) => s.section_key === highlightedSectionKey,
                  )?.label ?? highlightedSectionKey}
                </strong>
              </span>
              <Link
                to={`/reports/${reportId}?section=${highlightedSectionKey}`}
                className="underline hover:no-underline"
              >
                Ga naar sectie →
              </Link>
              <button
                onClick={() => setSearchParams({}, { replace: true })}
                className="ml-1 font-medium hover:text-blue-900"
                aria-label="Filter verwijderen"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {timeline.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            Dit rapport heeft geen bronfragmenten.
          </p>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-gray-200 -z-10" />

            <ul className="flex flex-col gap-3">
              {timeline.map((entry, i) => (
                <li key={i} className="pl-10 relative">
                  {/* Dot on the line */}
                  <div
                    className={`absolute left-3 top-4 h-4 w-4 rounded-full border-2 border-white shadow ${entry.source.type === 'audio' ? 'bg-purple-400' : 'bg-amber-400'}`}
                  />
                  <TimelineItem
                    entry={entry}
                    highlighted={
                      highlightedSectionKey === entry.section.section_key
                    }
                    onClick={() => handleItemClick(entry.section.section_key)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
