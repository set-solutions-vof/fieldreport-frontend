import { PageHeader } from '@/components/PageHeader'
import { translations } from '@/lib/translations'
import type { ReportStatus } from '@/typing/report'
import type { ReportDetailHeaderBlockProps } from '@/typing/reportDetailView'
import { formatDutchShortDate } from '../lib/formatReportDate'
import { reportReference } from '../lib/reportDetailView'
import { reportStatusLabel } from '../lib/reportLabels'

export function ReportDetailHeaderBlock({
  report,
  reportStatus,
}: ReportDetailHeaderBlockProps) {
  return (
    <header className="flex items-end justify-between [gap:var(--fr-space-6)] [padding:var(--fr-space-4)_var(--fr-space-7)_var(--fr-space-3)]">
      <div className="grid [min-width:var(--fr-space-0)] [gap:var(--fr-space-1)]">
        <PageHeader
          eyebrowLabel={reportStatusLabel(reportStatus)}
          title={
            <>
              {report.metadata.address} — {reportTitleSuffix(reportStatus)}
            </>
          }
          metadata={
            <>
              <strong>{report.metadata.client_name}</strong> ·{' '}
              {reportReference(report.id)} ·{' '}
              {formatDutchShortDate(report.inspection_date)} ·{' '}
              <strong>{report.inspector_name}</strong>
            </>
          }
        />
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
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-signal-warn-border)] [border-radius:var(--fr-radius-full)] [background:var(--fr-signal-warn-bg)]" />
        {translations.report_detail.header.legend_review}
      </span>
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-signal-alert-border)] [border-radius:var(--fr-radius-full)] [background:var(--fr-signal-alert-bg)]" />
        {translations.report_detail.header.legend_low_confidence}
      </span>
      <span className="[padding-left:var(--fr-space-4)] [border-left:1px_solid_var(--fr-border)]">
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)] [background:var(--fr-surface)]" />
        {translations.report_detail.header.legend_open}
      </span>
      <span>
        <i className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] [border:1.5px_solid_var(--fr-status-approved-border)] [border-radius:var(--fr-radius-full)] relative [background:var(--fr-status-approved-bg)] [&::after]:[content:'✓'] [&::after]:absolute [&::after]:[inset:var(--fr-space-0)] [&::after]:grid [&::after]:place-items-center [&::after]:[font-size:7px] [&::after]:[font-weight:var(--fr-weight-bold)] [&::after]:[line-height:1] [&::after]:[color:var(--fr-status-approved-fg)]" />
        {translations.report_detail.header.legend_approved}
      </span>
    </div>
  )
}
