import type { ReportDetailMainViewProps } from '@/typing/reportDetailView'
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
  sourceMomentRailItems,
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
        <div className="grid [grid-template-columns:280px_minmax(var(--fr-space-0),_1fr)] [align-items:start] [gap:var(--fr-space-6)] [padding:var(--fr-space-6)_var(--fr-space-7)_var(--fr-space-10)]">
          <ReportEvidenceRail
            activeEvidenceItemId={activeEvidenceItemId}
            filter={filter}
            items={sourceMomentRailItems}
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
        evidenceRailItems={sourceMomentRailItems}
      />
      <ReportEvidenceView activeTab={activeTab} items={evidenceRailItems} />
    </>
  )
}
