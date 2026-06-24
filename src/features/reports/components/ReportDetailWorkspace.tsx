import { useCallback, useMemo, useRef, useState } from 'react'
import { getReport } from '@/lib/api/reports'
import type { ReportStatus, ReportSectionUpdateResponse } from '@/typing/report'
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
  sourceMomentRailItems,
  transcriptSegments,
} from '../lib/reportDetailView'
import type {
  ReportDetailTab,
  ReportDetailWorkspaceProps,
  EvidenceActivationOrigin,
  EvidenceRailFilter,
} from '@/typing/reportDetailView'

export function ReportDetailWorkspace({ report }: ReportDetailWorkspaceProps) {
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
  const sourceMoments = useMemo(
    () => sourceMomentRailItems(evidenceRailItems),
    [evidenceRailItems],
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

      void getReport(report.id)
        .then((fetchedReport) => {
          setReportStatus(fetchedReport.status)
          setReportUpdatedAt(fetchedReport.updated_at)
        })
        .catch(() => {})
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
    <div className="flex flex-col [min-width:var(--fr-space-0)] [margin:calc(var(--fr-space-5)_*_-1)] [padding-bottom:var(--fr-space-10)]">
      <ReportDetailHeaderBlock report={report} reportStatus={reportStatus} />

      <div className="[padding:var(--fr-space-0)_var(--fr-space-5)_var(--fr-space-4)]">
        <div id="report-timeline-strip">
          <TimelineStrip
            items={sourceMoments}
            sections={sections}
            activeEvidenceItemId={activeEvidenceItemId}
            onActiveEvidenceItemChange={handleTimelineEvidenceActivation}
          />
        </div>
      </div>

      <ReportDetailTabs
        activeTab={activeTab}
        reportCount={sections.length}
        transcriptCount={transcriptSegments(report.evidence_items).length}
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
        sourceMomentRailItems={sourceMoments}
        onActiveSectionChange={handleSectionActivation}
        onContentChange={handleContentChange}
        onFilterChange={setEvidenceFilter}
        onSectionUpdated={handleSectionUpdated}
        onEvidenceRailActivation={handleEvidenceRailActivation}
      />
      <ReportActionBar
        dirtyCount={dirtyCount}
        saveStatus={saveStatus}
        reportId={report.id}
        allSectionsApproved={allSectionsApproved(sections)}
      />
    </div>
  )
}
