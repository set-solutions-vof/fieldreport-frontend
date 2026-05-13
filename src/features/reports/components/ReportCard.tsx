import { Badge, Card } from '@/design-system'
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
      <strong>{report.address ?? 'Adres onbekend'}</strong>
      <span>{report.client_name ?? 'Onbekende klant'}</span>
      <span>{formatDutchShortDate(report.inspection_date)}</span>
      <div className="fr-dashboard-report-actions">
        <Badge variant={report.status}>
          {reportStatusLabel(report.status)}
        </Badge>
        <span className="fr-dashboard-open-indicator">Openen</span>
      </div>
    </Card>
  )
}
