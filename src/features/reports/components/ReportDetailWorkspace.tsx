import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { UpdateReportSectionResponse } from '@/types/report'
import { AppShell } from '@/app/AppShell'
import { ReportActionBar } from './ReportActionBar'
import { ReportDetailHeaderBlock } from './ReportDetailHeaderBlock'
import { ReportDetailTabs } from './ReportDetailTabs'
import { ReportDocument } from './ReportDocument'
import { ReportSourceRail } from './ReportSourceRail'
import { TimelineStrip } from './TimelinePanel'
import { useReportDraftAutosave } from '../hooks/useReportDraftAutosave'
import { buildSourceRailItems } from '../lib/reportDetailView'
import type {
  ReportDetailTab,
  ReportDetailWorkspaceProps,
  SourceActivationOrigin,
  ReportStubViewProps,
  SourceRailFilter,
} from '../types/reportDetailView'

export function ReportDetailWorkspace({
  report,
  currentUser,
  totalReportsCount,
  source,
  onOpenDashboard,
  onOpenReports,
}: ReportDetailWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<ReportDetailTab>('report')
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [activeSourceItemId, setActiveSourceItemId] = useState<string | null>(
    null,
  )
  const sourceActivationOrigin = useRef<SourceActivationOrigin | null>(null)
  const [reportUpdatedAt, setReportUpdatedAt] = useState<string | null>(
    report.updated_at,
  )
  const [sourceFilter, setSourceFilter] = useState<SourceRailFilter>('all')
  const {
    dirtyCount,
    draftContent,
    saveStatus,
    sections,
    handleContentChange,
    handleSectionUpdated: applySectionUpdated,
  } = useReportDraftAutosave({
    reportId: report.id,
    initialSections: report.sections,
    onSaveSuccess: () => {
      setReportUpdatedAt(new Date().toISOString())
    },
  })
  const sourceRailItems = useMemo(
    () => buildSourceRailItems(sections, report.timeline_items),
    [report.timeline_items, sections],
  )

  useEffect(() => {
    if (activeSectionId === null) {
      return
    }

    document.getElementById(`sec-${activeSectionId}`)?.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    })
  }, [activeSectionId])

  useEffect(() => {
    if (
      activeSourceItemId === null ||
      sourceActivationOrigin.current === null
    ) {
      return
    }

    if (sourceActivationOrigin.current === 'timeline') {
      document
        .getElementById(`source-item-${activeSourceItemId}`)
        ?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
    }

    if (sourceActivationOrigin.current === 'source-rail') {
      document.getElementById('report-timeline-strip')?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    }

    sourceActivationOrigin.current = null
  }, [activeSourceItemId])

  const handleSectionUpdated = useCallback(
    (updatedSection: UpdateReportSectionResponse): void => {
      setReportUpdatedAt(new Date().toISOString())
      applySectionUpdated(updatedSection)
    },
    [applySectionUpdated],
  )

  const handleSectionActivation = useCallback((sectionId: string): void => {
    setActiveSectionId(sectionId)
    setActiveSourceItemId(null)
    sourceActivationOrigin.current = null
  }, [])

  const handleTimelineSourceActivation = useCallback(
    (sourceItemId: string): void => {
      setSourceFilter('all')
      sourceActivationOrigin.current = 'timeline'
      setActiveSourceItemId(sourceItemId)
      setActiveSectionId(null)
    },
    [],
  )

  const handleSourceRailActivation = useCallback(
    (sourceItemId: string): void => {
      sourceActivationOrigin.current = 'source-rail'
      setActiveSourceItemId(sourceItemId)
      setActiveSectionId(null)
    },
    [],
  )

  return (
    <AppShell
      currentUser={currentUser}
      activeNavigationItem={source === 'dashboard' ? 'dashboard' : 'reports'}
      breadcrumbItems={[
        {
          label:
            source === 'dashboard'
              ? translations.dashboard.navigation.dashboard
              : translations.dashboard.navigation.all_reports,
          onClick: source === 'dashboard' ? onOpenDashboard : onOpenReports,
        },
        { label: translations.report_detail.tabs.report },
        { label: report.address },
      ]}
      totalReportsCount={totalReportsCount}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
    >
      <div className="fr-report-detail-page">
        <ReportDetailHeaderBlock report={report} />

        <div className="fr-report-detail-timeline-wrap">
          <div id="report-timeline-strip">
            <TimelineStrip
              items={sourceRailItems}
              sections={sections}
              activeSourceItemId={activeSourceItemId}
              onActiveSourceItemChange={handleTimelineSourceActivation}
            />
          </div>
        </div>

        <ReportDetailTabs
          activeTab={activeTab}
          reportCount={sections.length}
          evidenceCount={sourceRailItems.length}
          onActiveTabChange={setActiveTab}
        />

        <div
          className={viewClassName(activeTab, 'report')}
          id="view-report"
          role="tabpanel"
        >
          <div className="fr-report-detail-report-body">
            <ReportSourceRail
              activeSourceItemId={activeSourceItemId}
              filter={sourceFilter}
              items={sourceRailItems}
              onActiveSourceItemChange={handleSourceRailActivation}
              onFilterChange={setSourceFilter}
            />
            <ReportDocument
              activeSectionId={activeSectionId}
              draftContent={draftContent}
              reportId={report.id}
              reportUpdatedAt={reportUpdatedAt}
              sections={sections}
              timelineItems={report.timeline_items}
              onActiveSectionChange={handleSectionActivation}
              onContentChange={handleContentChange}
              onSectionUpdated={handleSectionUpdated}
            />
          </div>
        </div>

        <ReportStubView activeTab={activeTab} tab="transcript">
          {translations.report_detail.stubs.transcript}
        </ReportStubView>
        <ReportStubView activeTab={activeTab} tab="evidence">
          {translations.report_detail.stubs.evidence}
        </ReportStubView>

        <ReportActionBar dirtyCount={dirtyCount} saveStatus={saveStatus} />
      </div>
    </AppShell>
  )
}

function ReportStubView({ activeTab, children, tab }: ReportStubViewProps) {
  return (
    <div
      className={viewClassName(activeTab, tab)}
      id={`view-${tab}`}
      role="tabpanel"
    >
      <div className="fr-report-detail-stub">
        <Card padding="md">
          <p>{children}</p>
        </Card>
      </div>
    </div>
  )
}

function viewClassName(
  activeTab: ReportDetailTab,
  tab: ReportDetailTab,
): string {
  return [
    'fr-report-detail-view',
    activeTab === tab && 'fr-report-detail-view--active',
  ]
    .filter(Boolean)
    .join(' ')
}
