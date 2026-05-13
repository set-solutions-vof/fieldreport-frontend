import { Badge, Card } from '@/design-system'
import type { RecentReportsTableProps } from '../types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import './RecentReportsTable.css'

export function RecentReportsTable({ reports }: RecentReportsTableProps) {
  return (
    <section className="fr-dashboard-section">
      <div className="fr-dashboard-section-header">
        <h2>Recente rapporten</h2>
        <button className="fr-dashboard-link" type="button">
          Alle rapporten
        </button>
      </div>
      <Card padding="none">
        <table className="fr-dashboard-table">
          <thead>
            <tr>
              <th>Adres</th>
              <th>Type</th>
              <th>Datum</th>
              <th>Bewerkt</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.address ?? 'Adres onbekend'}</td>
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
