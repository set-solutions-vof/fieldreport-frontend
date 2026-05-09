import { Button } from '@/design-system'
import type { ReportDetailHeaderProps } from '@/types/reportView'
import { formatDutchShortDate } from '../lib/formatReportDate'

export function ReportDetailHeader({
  report,
  onBackToDashboard,
}: ReportDetailHeaderProps) {
  const reportReference = `LK-${report.id.slice(0, 8).toUpperCase()}`

  return (
    <section className="fr-report-detail-header">
      <div className="fr-report-detail-header-main">
        <Button type="button" variant="ghost" onClick={onBackToDashboard}>
          ← Terug
        </Button>
        <div>
          <h1>{report.address}</h1>
          <p className="fr-report-detail-meta-line">
            {report.client_name} · {reportReference} ·{' '}
            {formatDutchShortDate(report.inspection_date)} ·{' '}
            {report.inspector_name}
          </p>
        </div>
      </div>
      <Button type="button" variant="primary" disabled title="Komt binnenkort">
        Versturen naar klant
      </Button>
    </section>
  )
}
