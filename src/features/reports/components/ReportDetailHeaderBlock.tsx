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
    <header className="flex items-end justify-between [gap:var(--fr-space-6)] [padding:var(--fr-space-4)_var(--fr-space-7)_var(--fr-space-3)] [&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:20px] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_h1]:[letter-spacing:-0.015em]">
      <div className="grid [min-width:var(--fr-space-0)] [gap:var(--fr-space-1)]">
        <span className="[justify-self:start] [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:1] [color:var(--fr-text-secondary)] [background:var(--fr-surface-active)]">
          {reportStatusLabel(reportStatus)}
        </span>
        <h1>
          {report.metadata.address} — {reportTitleSuffix(reportStatus)}
        </h1>
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)] [&_strong]:[font-weight:var(--fr-weight-medium)] [&_strong]:[color:var(--fr-text-primary)]">
          <strong>{report.metadata.client_name}</strong> ·{' '}
          {reportReference(report.id)} ·{' '}
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
      className="flex flex-wrap items-center justify-end [gap:var(--fr-space-4)] [font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)] [&_span]:inline-flex [&_span]:items-center [&_span]:[gap:var(--fr-space-2)] [&_span]:whitespace-nowrap"
      aria-label={translations.report_detail.header.legend_aria_label}
    >
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)]" />
        {translations.report_detail.header.legend_event}
      </span>
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)] [border-color:var(--fr-color-amber-700)] [background:var(--fr-color-amber-50)]" />
        {translations.report_detail.header.legend_review}
      </span>
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)] [border-color:var(--fr-color-red-700)] [background:var(--fr-color-red-50)]" />
        {translations.report_detail.header.legend_low_confidence}
      </span>
      <span className="[padding-left:var(--fr-space-4)] [border-left:1px_solid_var(--fr-border)]">
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)] [background:var(--fr-surface)]" />
        {translations.report_detail.header.legend_open}
      </span>
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)] relative [border-color:var(--fr-text-primary)] [background:var(--fr-text-primary)] [&::after]:[content:'✓'] [&::after]:absolute [&::after]:[inset:var(--fr-space-0)] [&::after]:grid [&::after]:place-items-center [&::after]:[font-size:7px] [&::after]:[font-weight:var(--fr-weight-bold)] [&::after]:[line-height:1] [&::after]:[color:var(--fr-text-on-accent)]" />
        {translations.report_detail.header.legend_approved}
      </span>
    </div>
  )
}
