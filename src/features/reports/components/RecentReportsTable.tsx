import { translations } from '@/lib/translations'
import type { RecentReportsTableProps } from '@/types/reportView'
import { ReportsTable } from './ReportsTable'

export function RecentReportsTable({
  reports,
  onOpenReports,
}: RecentReportsTableProps) {
  return (
    <section className="flex flex-col [gap:var(--fr-space-4)]">
      <div className="flex items-center justify-between [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-xl)] [&_h2]:[font-weight:var(--fr-weight-semibold)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
        <h2>{translations.dashboard.recent_reports.title}</h2>
        <button
          className="[padding:var(--fr-space-0)] [font:inherit] [font-weight:var(--fr-weight-medium)] [color:var(--fr-accent)] cursor-pointer bg-transparent border-0"
          type="button"
          onClick={onOpenReports}
        >
          {translations.dashboard.recent_reports.all_reports_button}
        </button>
      </div>
      <ReportsTable
        reports={reports}
        emptyMessage={translations.dashboard.recent_reports.empty}
        unknownAddress={translations.dashboard.reports_table.unknown_address}
      />
    </section>
  )
}
