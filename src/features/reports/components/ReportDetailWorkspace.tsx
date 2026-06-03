import { useCallback, useMemo, useRef, useState } from 'react'
import { getReport } from '@/lib/api/reports'
import { translations } from '@/lib/translations'
import type { ReportStatus, ReportSectionUpdateResponse } from '@/types/report'
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
  buildEvidenceRailItems,
  mergeUpdatedSection,
} from '../lib/reportDetailView'
import type {
  ReportDetailTab,
  ReportDetailWorkspaceProps,
  EvidenceActivationOrigin,
  EvidenceRailFilter,
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
  const [activeEvidenceItemId, setActiveEvidenceItemId] = useState<
    string | null
  >(null)
  const evidenceActivationOriginRef = useRef<EvidenceActivationOrigin | null>(
    null,
  )
  const [reportStatus, setReportStatus] = useState<ReportStatus>(report.status)
  const [reportUpdatedAt, setReportUpdatedAt] = useState<string | null>(
    report.updated_at,
  )
  const [evidenceFilter, setEvidenceFilter] =
    useState<EvidenceRailFilter>('all')
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
  const evidenceRailItems = useMemo(
    () => buildEvidenceRailItems(sections, report.evidence_items),
    [report.evidence_items, sections],
  )
  useReportDetailScrolling({
    activeSectionId,
    activeEvidenceItemId,
    evidenceActivationOriginRef,
  })

  const handleSectionUpdated = useCallback(
    (updatedSection: ReportSectionUpdateResponse): void => {
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
    setActiveEvidenceItemId(null)
    evidenceActivationOriginRef.current = null
  }, [])

  const handleTimelineEvidenceActivation = useCallback(
    (evidenceItemId: string): void => {
      setEvidenceFilter('all')
      evidenceActivationOriginRef.current = 'timeline'
      setActiveEvidenceItemId(evidenceItemId)
      setActiveSectionId(null)
    },
    [],
  )

  const handleEvidenceRailActivation = useCallback(
    (evidenceItemId: string): void => {
      evidenceActivationOriginRef.current = 'evidence-rail'
      setActiveEvidenceItemId(evidenceItemId)
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
              items={evidenceRailItems}
              sections={sections}
              activeEvidenceItemId={activeEvidenceItemId}
              onActiveEvidenceItemChange={handleTimelineEvidenceActivation}
            />
          </div>
        </div>

        <ReportDetailTabs
          activeTab={activeTab}
          reportCount={sections.length}
          evidenceCount={evidenceRailItems.length}
          onActiveTabChange={setActiveTab}
        />

        <ReportDetailMainView
          activeSectionId={activeSectionId}
          activeEvidenceItemId={activeEvidenceItemId}
          activeTab={activeTab}
          draftContent={draftContent}
          filter={evidenceFilter}
          report={report}
          reportUpdatedAt={reportUpdatedAt}
          sections={sections}
          evidenceRailItems={evidenceRailItems}
          onActiveSectionChange={handleSectionActivation}
          onContentChange={handleContentChange}
          onFilterChange={setEvidenceFilter}
          onSectionUpdated={handleSectionUpdated}
          onEvidenceRailActivation={handleEvidenceRailActivation}
        />
        <ReportActionBar dirtyCount={dirtyCount} saveStatus={saveStatus} />
      </div>
    </AppShell>
  )
}
