import { translations } from '@/lib/translations'
import type {
  ReportDetailTabButtonProps,
  ReportDetailTabsProps,
} from '@/types/reportDetailView'
import { ReportDetailTabIcon } from './icons/ReportDetailTabIcon'

export function ReportDetailTabs({
  activeTab,
  reportCount,
  transcriptCount,
  evidenceCount,
  onActiveTabChange,
}: ReportDetailTabsProps) {
  return (
    <div className="[padding:var(--fr-space-0)_var(--fr-space-7)] [border-bottom:1px_solid_var(--fr-border)] [background:var(--fr-background)]">
      <div className="flex items-end [gap:var(--fr-space-1)]" role="tablist">
        <TabButton
          active={activeTab === 'report'}
          count={String(reportCount)}
          label={translations.report_detail.tabs.report}
          tab="report"
          onClick={() => onActiveTabChange('report')}
        />
        <TabButton
          active={activeTab === 'transcript'}
          count={String(transcriptCount)}
          label={translations.report_detail.tabs.transcript}
          tab="transcript"
          onClick={() => onActiveTabChange('transcript')}
        />
        <TabButton
          active={activeTab === 'evidence'}
          count={String(evidenceCount)}
          label={translations.report_detail.tabs.evidence}
          tab="evidence"
          onClick={() => onActiveTabChange('evidence')}
        />
      </div>
    </div>
  )
}

function TabButton({
  active,
  count,
  label,
  tab,
  onClick,
}: ReportDetailTabButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center [gap:var(--fr-space-2)] [margin-bottom:-1px] [padding:11px_var(--fr-space-4)] border-0 [border-bottom:2px_solid_transparent] [font:inherit] [font-size:13.5px] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)] bg-transparent cursor-pointer hover:[color:var(--fr-text-primary)] [&_span]:inline-flex [&_span]:items-center [&_span]:[min-width:var(--fr-space-4)] [&_span]:[height:var(--fr-space-4)] [&_span]:justify-center [&_span]:[padding:var(--fr-space-0)_var(--fr-space-2)] [&_span]:[border-radius:var(--fr-radius-full)] [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[background:var(--fr-surface-active)] [&_span]:[font-variant-numeric:tabular-nums]',
        active && '[color:var(--fr-text-primary)] [border-color:var(--fr-text-primary)] [&_span]:[color:var(--fr-text-on-accent)] [&_span]:[background:var(--fr-text-primary)]',
      ]
        .filter(Boolean)
        .join(' ')}
      role="tab"
      aria-selected={active}
      onClick={onClick}
    >
      <ReportDetailTabIcon tab={tab} />
      {label}
      <span>{count}</span>
    </button>
  )
}
