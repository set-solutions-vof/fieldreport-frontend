import { translations } from '@/lib/translations'
import type {
  ReportDetailTabButtonProps,
  ReportDetailTabsProps,
} from '../types/reportDetailView'
import { ReportDetailTabIcon } from './ReportDetailTabIcon'

export function ReportDetailTabs({
  activeTab,
  reportCount,
  evidenceCount,
  onActiveTabChange,
}: ReportDetailTabsProps) {
  return (
    <div className="fr-report-detail-tabs-wrap">
      <div className="fr-report-detail-tabs" role="tablist">
        <TabButton
          active={activeTab === 'report'}
          count={String(reportCount)}
          label={translations.report_detail.tabs.report}
          tab="report"
          onClick={() => onActiveTabChange('report')}
        />
        <TabButton
          active={activeTab === 'transcript'}
          count="–"
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
        'fr-report-detail-tab',
        active && 'fr-report-detail-tab--active',
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
