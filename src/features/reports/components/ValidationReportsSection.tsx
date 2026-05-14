import { Badge, Button, Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ValidationReportsSectionProps } from '../types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import './ValidationReportsSection.css'

export function ValidationReportsSection({
  reports,
  onOpenReport,
}: ValidationReportsSectionProps) {
  return (
    <section className="fr-dashboard-section">
      <div className="fr-dashboard-section-header">
        <h2>{translations.dashboard.queue.title}</h2>
      </div>
      <Card padding="none">
        {reports.length === 0 ? (
          <p className="fr-dashboard-queue-empty">
            {translations.dashboard.queue.empty}
          </p>
        ) : (
          <table className="fr-dashboard-table">
            <thead>
              <tr>
                <th>{translations.dashboard.queue.address_header}</th>
                <th>{translations.dashboard.queue.date_header}</th>
                <th>{translations.dashboard.queue.edited_header}</th>
                <th>{translations.dashboard.queue.status_header}</th>
                <th>{translations.dashboard.queue.action_header}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    {report.address ??
                      translations.dashboard.queue.unknown_address}
                  </td>
                  <td>{formatDutchShortDate(report.inspection_date)}</td>
                  <td>-</td>
                  <td>
                    <Badge variant={report.status}>
                      {reportStatusLabel(report.status)}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => onOpenReport(report.id)}
                    >
                      {translations.dashboard.queue.open_button}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </section>
  )
}
