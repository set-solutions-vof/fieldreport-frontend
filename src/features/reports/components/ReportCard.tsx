import { Badge, Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ReportCardProps } from '../types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportStatusLabel } from '../lib/reportLabels'
import './ReportCard.css'

export function ReportCard({ report, onOpenReport }: ReportCardProps) {
  return (
    <Card
      className={`fr-dashboard-report-card fr-dashboard-report-card--${report.status}`}
      interactive
      padding="none"
      onClick={() => onOpenReport(report.id)}
    >
      <strong>
        {report.address ?? translations.dashboard.report_card.unknown_address}
      </strong>
      <span>
        {report.client_name ??
          translations.dashboard.report_card.unknown_client}
      </span>
      <span>{formatDutchShortDate(report.inspection_date)}</span>
      <div className="fr-dashboard-report-actions">
        <Badge variant={report.status}>
          {reportStatusLabel(report.status)}
        </Badge>
        <span className="fr-dashboard-open-indicator">
          {translations.dashboard.report_card.open_button}
        </span>
      </div>
    </Card>
  )
}
