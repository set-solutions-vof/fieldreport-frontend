import type {
  ReportDetailTabButtonProps,
  ReportDetailTabsProps,
} from '../types/reportDetailView'

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
          label="Rapport"
          onClick={() => onActiveTabChange('report')}
        />
        <TabButton
          active={activeTab === 'transcript'}
          count="–"
          label="Transcript"
          onClick={() => onActiveTabChange('transcript')}
        />
        <TabButton
          active={activeTab === 'evidence'}
          count={String(evidenceCount)}
          label="Bewijsmateriaal"
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
      {label}
      <span>{count}</span>
    </button>
  )
}
