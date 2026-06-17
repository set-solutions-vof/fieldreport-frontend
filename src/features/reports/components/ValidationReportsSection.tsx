import { Button } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { ValidationReportsSectionProps } from '@/typing/reportView'
import { ReportsTable } from './ReportsTable'

export function ValidationReportsSection({
  reports,
  onOpenReport,
  onOpenNewReport,
}: ValidationReportsSectionProps) {
  return (
    <section className="flex flex-col [gap:var(--fr-space-4)]">
      <div className="flex items-center justify-between [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
        <h2>{translations.dashboard.queue.title}</h2>
        <Button type="button" variant="primary" onClick={onOpenNewReport}>
          {translations.dashboard.actions.new_report}
        </Button>
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
