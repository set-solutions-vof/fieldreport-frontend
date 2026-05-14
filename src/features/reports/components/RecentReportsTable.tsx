import { translations } from '@/lib/translations'
import type { RecentReportsTableProps } from '../types/reportView'
import { ReportsTable } from './ReportsTable'
import './RecentReportsTable.css'

export function RecentReportsTable({
  reports,
  onOpenReports,
}: RecentReportsTableProps) {
  return (
    <section className="fr-dashboard-section">
      <div className="fr-dashboard-section-header">
        <h2>{translations.dashboard.recent_reports.title}</h2>
        <button
          className="fr-dashboard-link"
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
