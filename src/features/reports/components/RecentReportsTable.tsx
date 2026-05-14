import { Badge, Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { RecentReportsTableProps } from '../types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import './RecentReportsTable.css'

export function RecentReportsTable({ reports }: RecentReportsTableProps) {
  return (
    <section className="fr-dashboard-section">
      <div className="fr-dashboard-section-header">
        <h2>{translations.dashboard.recent_reports.title}</h2>
        <button className="fr-dashboard-link" type="button">
          {translations.dashboard.recent_reports.all_reports_button}
        </button>
      </div>
      <Card padding="none">
        <table className="fr-dashboard-table">
          <thead>
            <tr>
              <th>{translations.dashboard.recent_reports.address_header}</th>
              <th>{translations.dashboard.recent_reports.type_header}</th>
              <th>{translations.dashboard.recent_reports.date_header}</th>
              <th>{translations.dashboard.recent_reports.edited_header}</th>
              <th>{translations.dashboard.recent_reports.status_header}</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  {report.address ??
                    translations.dashboard.recent_reports.unknown_address}
                </td>
                <td>-</td>
                <td>{formatDutchShortDate(report.inspection_date)}</td>
                <td>-</td>
                <td>
                  <Badge variant={report.status}>
                    {reportStatusLabel(report.status)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
