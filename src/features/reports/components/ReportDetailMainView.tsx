import { translations } from '@/lib/translations'
import type { ReportDetailMainViewProps } from '@/types/reportDetailView'
import { ReportDocument } from './ReportDocument'
import { ReportEvidenceRail } from './ReportEvidenceRail'
import { ReportStubView } from './ReportStubView'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'

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
      <ReportStubView activeTab={activeTab} tab="transcript">
        {translations.report_detail.stubs.transcript}
      </ReportStubView>
      <ReportStubView activeTab={activeTab} tab="evidence">
        {translations.report_detail.stubs.evidence}
      </ReportStubView>
    </>
  )
}
