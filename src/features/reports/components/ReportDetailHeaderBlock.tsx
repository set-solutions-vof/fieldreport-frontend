import type { ReportDetailHeaderBlockProps } from '../types/reportDetailView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportReference } from '../lib/reportDetailView'

export function ReportDetailHeaderBlock({
  report,
}: ReportDetailHeaderBlockProps) {
  return (
    <header className="fr-report-detail-page-header">
      <div className="fr-report-detail-title-group">
        <span className="fr-report-detail-status-pill">Concept</span>
        <h1>{report.address} — concept-rapport</h1>
        <p className="fr-report-detail-meta-line">
          <strong>{report.client_name}</strong> · {reportReference(report.id)} ·{' '}
          {formatDutchShortDate(report.inspection_date)} ·{' '}
          <strong>{report.inspector_name}</strong>
        </p>
      </div>
      <HeaderLegend />
    </header>
  )
}

function HeaderLegend() {
  return (
    <div className="fr-report-detail-legend" aria-label="Legenda">
      <span>
        <i className="fr-report-detail-legend-swatch" />
        Gebeurtenis
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--warn" />
        Controleren
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--alert" />
        Lage zekerheid
      </span>
      <span className="fr-report-detail-legend-review">
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--open" />
        Open
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--approved" />
        Goedgekeurd
      </span>
    </div>
  )
}
