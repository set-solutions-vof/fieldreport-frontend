import { translations } from '@/lib/translations'
import type { ReportStatus } from '@/types/report'
import type { ReportDetailHeaderBlockProps } from '@/types/reportDetailView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportReference } from '../lib/reportDetailView'
import { reportStatusLabel } from '../lib/reportLabels'

export function ReportDetailHeaderBlock({
  report,
  reportStatus,
}: ReportDetailHeaderBlockProps) {
  return (
    <header className="fr-report-detail-page-header">
      <div className="fr-report-detail-title-group">
        <span className="fr-report-detail-status-pill">
          {reportStatusLabel(reportStatus)}
        </span>
        <h1>
          {report.metadata.address} — {reportTitleSuffix(reportStatus)}
        </h1>
        <p className="fr-report-detail-meta-line">
          <strong>{report.metadata.client_name}</strong> · {reportReference(report.id)} ·{' '}
          {formatDutchShortDate(report.inspection_date)} ·{' '}
          <strong>{report.inspector_name}</strong>
        </p>
      </div>
      <HeaderLegend />
    </header>
  )
}

function reportTitleSuffix(status: ReportStatus): string {
  if (status === 'approved') {
    return translations.report_detail.header.approved_title_suffix
  }

  return translations.report_detail.header.draft_title_suffix
}

function HeaderLegend() {
  return (
    <div
      className="fr-report-detail-legend"
      aria-label={translations.report_detail.header.legend_aria_label}
    >
      <span>
        <i className="fr-report-detail-legend-swatch" />
        {translations.report_detail.header.legend_event}
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--warn" />
        {translations.report_detail.header.legend_review}
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--alert" />
        {translations.report_detail.header.legend_low_confidence}
      </span>
      <span className="fr-report-detail-legend-review">
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--open" />
        {translations.report_detail.header.legend_open}
      </span>
      <span>
        <i className="fr-report-detail-legend-swatch fr-report-detail-legend-swatch--approved" />
        {translations.report_detail.header.legend_approved}
      </span>
    </div>
  )
}
