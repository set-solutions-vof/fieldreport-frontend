import { useCallback, useMemo, useRef, useState } from 'react'
import { getReport } from '@/lib/api/reports'
import { translations } from '@/lib/translations'
import type { ReportStatus, UpdateReportSectionResponse } from '@/types/report'
import { AppShell } from '@/app/AppShell'
import { ReportActionBar } from './ReportActionBar'
import { ReportDetailHeaderBlock } from './ReportDetailHeaderBlock'
import { ReportDetailMainView } from './ReportDetailMainView'
import { ReportDetailTabs } from './ReportDetailTabs'
import { TimelineStrip } from './TimelinePanel'
import { useReportDraftAutosave } from '../hooks/useReportDraftAutosave'
import { useReportDetailScrolling } from '../hooks/useReportDetailScrolling'
import {
  allSectionsApproved,
  buildSourceRailItems,
  mergeUpdatedSection,
} from '../lib/reportDetailView'
import type {
  ReportDetailTab,
  ReportDetailWorkspaceProps,
  SourceActivationOrigin,
  SourceRailFilter,
} from '@/types/reportDetailView'

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
  const sourceActivationOriginRef = useRef<SourceActivationOrigin | null>(null)
  const [reportStatus, setReportStatus] = useState<ReportStatus>(report.status)
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
  useReportDetailScrolling({
    activeSectionId,
    activeSourceItemId,
    sourceActivationOriginRef,
  })

  const handleSectionUpdated = useCallback(
    (updatedSection: UpdateReportSectionResponse): void => {
      setReportUpdatedAt(new Date().toISOString())
      applySectionUpdated(updatedSection)

      const nextSections = sections.map((section) =>
        section.id === updatedSection.id
          ? mergeUpdatedSection(section, updatedSection)
          : section,
      )

      if (!allSectionsApproved(nextSections)) {
        return
      }

      void getReport(report.id).then((fetchedReport) => {
        setReportStatus(fetchedReport.status)
        setReportUpdatedAt(fetchedReport.updated_at)
      })
    },
    [applySectionUpdated, report.id, sections],
  )

  const handleSectionActivation = useCallback((sectionId: string): void => {
    setActiveSectionId(sectionId)
    setActiveSourceItemId(null)
    sourceActivationOriginRef.current = null
  }, [])

  const handleTimelineSourceActivation = useCallback(
    (sourceItemId: string): void => {
      setSourceFilter('all')
      sourceActivationOriginRef.current = 'timeline'
      setActiveSourceItemId(sourceItemId)
      setActiveSectionId(null)
    },
    [],
  )

  const handleSourceRailActivation = useCallback(
    (sourceItemId: string): void => {
      sourceActivationOriginRef.current = 'source-rail'
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
        <ReportDetailHeaderBlock report={report} reportStatus={reportStatus} />

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

        <ReportDetailMainView
          activeSectionId={activeSectionId}
          activeSourceItemId={activeSourceItemId}
          activeTab={activeTab}
          draftContent={draftContent}
          filter={sourceFilter}
          report={report}
          reportUpdatedAt={reportUpdatedAt}
          sections={sections}
          sourceRailItems={sourceRailItems}
          onActiveSectionChange={handleSectionActivation}
          onContentChange={handleContentChange}
          onFilterChange={setSourceFilter}
          onSectionUpdated={handleSectionUpdated}
          onSourceRailActivation={handleSourceRailActivation}
        />
        <ReportActionBar dirtyCount={dirtyCount} saveStatus={saveStatus} />
      </div>
    </AppShell>
  )
}
