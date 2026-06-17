import { Badge, Button, Card } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { ReportsTableProps } from '@/types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import {
  reportStatusBadgeVariant,
  reportStatusLabel,
} from '../lib/reportLabels'

export function ReportsTable({
  reports,
  emptyMessage,
  unknownAddress,
  onOpenReport,
}: ReportsTableProps) {
  return (
    <Card padding="none">
      {reports.length === 0 ? (
        <p className="[margin:var(--fr-space-0)] [padding:var(--fr-space-5)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">{emptyMessage}</p>
      ) : (
        <table className="w-full [border-collapse:collapse] [&_th]:[padding:var(--fr-space-4)] [&_th]:[border-bottom:1px_solid_var(--fr-border)] [&_th]:text-left [&_th]:[vertical-align:middle] [&_td]:[padding:var(--fr-space-4)] [&_td]:[border-bottom:1px_solid_var(--fr-border)] [&_td]:text-left [&_td]:[vertical-align:middle] [&_th]:[font-size:var(--fr-text-sm)] [&_th]:[font-weight:var(--fr-weight-semibold)] [&_th]:[color:var(--fr-text-secondary)] [&_th]:uppercase [&_td]:[font-size:var(--fr-text-base)] [&_td]:[font-weight:var(--fr-weight-medium)] [&_td]:[color:var(--fr-text-primary)]">
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
                  <Badge variant={reportStatusBadgeVariant(report.status)}>
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
