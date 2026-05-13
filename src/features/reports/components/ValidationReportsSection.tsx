import { Card } from '@/design-system'
import type { ValidationReportsSectionProps } from '../types/reportView'
import { formatReportCount } from '../lib/formatReportCount'
import { ReportCard } from './ReportCard'
import './ValidationReportsSection.css'

export function ValidationReportsSection({
  reports,
  onOpenReport,
}: ValidationReportsSectionProps) {
  return (
    <section className="fr-dashboard-section">
      <Card className="fr-dashboard-queue" padding="none">
        <div className="fr-dashboard-queue-header">
          <div className="fr-dashboard-queue-title">
            <h2>Wachtrij</h2>
            <span>{formatReportCount(reports.length)}</span>
          </div>
        </div>
        {reports.length === 0 ? (
          <p className="fr-dashboard-queue-empty">
            Er staan geen rapporten in de wachtrij.
          </p>
        ) : (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onOpenReport={onOpenReport}
            />
          ))
        )}
      </Card>
    </section>
  )
}
