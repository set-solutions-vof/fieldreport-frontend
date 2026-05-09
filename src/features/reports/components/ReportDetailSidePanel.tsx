import type { ReactNode } from 'react'
import { Card } from '@/design-system'
import type {
  DetailPanelTab,
  ReportDetailSidePanelProps,
} from '@/types/reportView'
import type { ReportSection as ReportSectionModel } from '@/types/report'
import { TimelinePanel } from './TimelinePanel'

export function ReportDetailSidePanel({
  activeTab,
  sections,
  onActiveTabChange,
}: ReportDetailSidePanelProps) {
  return (
    <aside className="fr-report-detail-side-panel" aria-label="Rapportcontext">
      <div
        className="fr-report-detail-tabs"
        role="tablist"
        aria-label="Rapportcontext tabs"
      >
        <button
          className={tabClassName(activeTab, 'timeline')}
          type="button"
          role="tab"
          aria-selected={activeTab === 'timeline'}
          onClick={() => onActiveTabChange('timeline')}
        >
          Tijdlijn
        </button>
        <button
          className={tabClassName(activeTab, 'photos')}
          type="button"
          role="tab"
          aria-selected={activeTab === 'photos'}
          onClick={() => onActiveTabChange('photos')}
        >
          Foto's
        </button>
        <button
          className={tabClassName(activeTab, 'stats')}
          type="button"
          role="tab"
          aria-selected={activeTab === 'stats'}
          onClick={() => onActiveTabChange('stats')}
        >
          Stats
        </button>
      </div>
      <div className="fr-report-detail-tab-panel">
        {detailPanel(activeTab, sections)}
      </div>
    </aside>
  )
}

function tabClassName(activeTab: DetailPanelTab, tab: DetailPanelTab): string {
  return [
    'fr-report-detail-tab',
    activeTab === tab && 'fr-report-detail-tab--active',
  ]
    .filter(Boolean)
    .join(' ')
}

function detailPanel(
  activeTab: DetailPanelTab,
  sections: ReportSectionModel[],
): ReactNode {
  if (activeTab === 'timeline') {
    return <TimelinePanel sections={sections} />
  }

  if (activeTab === 'photos') {
    return (
      <Card padding="md">
        <p className="fr-report-detail-empty">
          Foto-overzicht komt binnenkort.
        </p>
      </Card>
    )
  }

  return (
    <Card padding="md">
      <p className="fr-report-detail-empty">Statistieken komen binnenkort.</p>
    </Card>
  )
}
