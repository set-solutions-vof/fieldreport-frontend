import type { ReportDetailMainViewProps } from '@/types/reportDetailView'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'
import { transcriptSegments } from '../lib/reportDetailView'
import { ReportDocument } from './ReportDocument'
import { ReportEvidenceRail } from './ReportEvidenceRail'
import { ReportEvidenceView } from './ReportEvidenceView'
import { ReportTranscriptView } from './ReportTranscriptView'

export function ReportDetailMainView({
  activeSectionId,
  activeEvidenceItemId,
  activeTab,
  draftContent,
  filter,
  report,
  reportUpdatedAt,
  sections,
  evidenceRailItems,
  onActiveSectionChange,
  onContentChange,
  onFilterChange,
  onSectionUpdated,
  onEvidenceRailActivation,
}: ReportDetailMainViewProps) {
  return (
    <>
      <div
        className={reportDetailViewClassName(activeTab, 'report')}
        id="view-report"
        role="tabpanel"
      >
        <div className="fr-report-detail-report-body">
          <ReportEvidenceRail
            activeEvidenceItemId={activeEvidenceItemId}
            filter={filter}
            items={evidenceRailItems}
            onActiveEvidenceItemChange={onEvidenceRailActivation}
            onFilterChange={onFilterChange}
          />
          <ReportDocument
            activeSectionId={activeSectionId}
            draftContent={draftContent}
            reportId={report.id}
            reportUpdatedAt={reportUpdatedAt}
            sections={sections}
            evidenceItems={report.evidence_items}
            onActiveSectionChange={onActiveSectionChange}
            onContentChange={onContentChange}
            onSectionUpdated={onSectionUpdated}
          />
        </div>
      </div>
      <ReportTranscriptView
        activeTab={activeTab}
        inspectorName={report.inspector_name}
        segments={transcriptSegments(report.evidence_items)}
        evidenceRailItems={evidenceRailItems}
      />
      <ReportEvidenceView activeTab={activeTab} items={evidenceRailItems} />
    </>
  )
}
