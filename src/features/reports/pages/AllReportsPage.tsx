import { translations } from '@/lib/translations'
import {
  ShellContentError,
  ShellContentLoader,
} from '@/components/ShellContentState'
import { ReportsTable } from '../components/ReportsTable'
import type { AllReportsPageProps } from '@/typing/reportView'

export function AllReportsPage({
  reportList,
  onOpenReport,
}: AllReportsPageProps) {
  const { reports, isLoading, isError, errorMessage, retry } = reportList

  if (isLoading) {
    return <ShellContentLoader />
  }

  if (isError) {
    return (
      <ShellContentError
        title={translations.dashboard.states.reports_load_failed_title}
        message={errorMessage}
        onRetry={retry}
      />
    )
  }

  return (
    <section className="flex flex-col [gap:var(--fr-space-4)]">
      <div className="flex items-center justify-between [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
        <h2>{translations.dashboard.all_reports.title}</h2>
      </div>
      <ReportsTable
        reports={reports}
        emptyMessage={translations.dashboard.all_reports.empty}
        unknownAddress={translations.dashboard.reports_table.unknown_address}
        onOpenReport={onOpenReport}
      />
    </section>
  )
}
