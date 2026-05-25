import { translations } from '@/lib/translations'
import type { ReportDetailMainViewProps } from '@/types/reportDetailView'
import { ReportDocument } from './ReportDocument'
import { ReportSourceRail } from './ReportSourceRail'
import { ReportStubView } from './ReportStubView'
import { reportDetailViewClassName } from '../lib/reportDetailClassNames'

export function ReportDetailMainView({
  activeSectionId,
  activeSourceItemId,
  activeTab,
  draftContent,
  filter,
  report,
  reportUpdatedAt,
  sections,
  sourceRailItems,
  onActiveSectionChange,
  onContentChange,
  onFilterChange,
  onSectionUpdated,
  onSourceRailActivation,
}: ReportDetailMainViewProps) {
  return (
    <>
      <div
        className={reportDetailViewClassName(activeTab, 'report')}
        id="view-report"
        role="tabpanel"
      >
        <div className="fr-report-detail-report-body">
          <ReportSourceRail
            activeSourceItemId={activeSourceItemId}
            filter={filter}
            items={sourceRailItems}
            onActiveSourceItemChange={onSourceRailActivation}
            onFilterChange={onFilterChange}
          />
          <ReportDocument
            activeSectionId={activeSectionId}
            draftContent={draftContent}
            reportId={report.id}
            reportUpdatedAt={reportUpdatedAt}
            sections={sections}
            timelineItems={report.timeline_items}
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
