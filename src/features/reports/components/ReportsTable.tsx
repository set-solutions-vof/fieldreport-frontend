import { Badge, Button, Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ReportsTableProps } from '@/types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import './ReportsTable.css'

export function ReportsTable({
  reports,
  emptyMessage,
  unknownAddress,
  onOpenReport,
}: ReportsTableProps) {
  return (
    <Card padding="none">
      {reports.length === 0 ? (
        <p className="fr-dashboard-reports-empty">{emptyMessage}</p>
      ) : (
        <table className="fr-dashboard-table">
          <thead>
            <tr>
              <th>{translations.dashboard.reports_table.address_header}</th>
              <th>{translations.dashboard.reports_table.date_header}</th>
              <th>{translations.dashboard.reports_table.edited_header}</th>
              <th>{translations.dashboard.reports_table.status_header}</th>
              {onOpenReport !== undefined && (
                <th>{translations.dashboard.reports_table.action_header}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.metadata.address ?? unknownAddress}</td>
                <td>{formatDutchShortDate(report.inspection_date)}</td>
                <td>-</td>
                <td>
                  <Badge variant={report.status}>
                    {reportStatusLabel(report.status)}
                  </Badge>
                </td>
                {onOpenReport !== undefined && (
                  <td>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => onOpenReport(report.id)}
                    >
                      {translations.dashboard.reports_table.open_button}
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  )
}
