import { translations } from '@/lib/translations'
import type { ValidationReportsSectionProps } from '../types/reportView'
import { ReportsTable } from './ReportsTable'

export function ValidationReportsSection({
  reports,
  onOpenReport,
}: ValidationReportsSectionProps) {
  return (
    <section className="fr-dashboard-section">
      <div className="fr-dashboard-section-header">
        <h2>{translations.dashboard.queue.title}</h2>
      </div>
      <ReportsTable
        reports={reports}
        emptyMessage={translations.dashboard.queue.empty}
        unknownAddress={translations.dashboard.reports_table.unknown_address}
        onOpenReport={onOpenReport}
      />
    </section>
  )
}
