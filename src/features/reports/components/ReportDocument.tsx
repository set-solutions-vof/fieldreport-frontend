import { translations } from '@/lib/translations'
import { ReportSection } from './ReportSection'
import {
  averageConfidenceLabel,
  averageConfidenceProgress,
  sectionContent,
} from '../lib/reportDetailView'
import { formatUpdatedAt } from '../lib/formatReportDate'
import type {
  DocumentStatusCellProps,
  ReportDocumentProps,
} from '@/types/reportDetailView'

export function ReportDocument({
  activeSectionId,
  draftContent,
  reportId,
  reportUpdatedAt,
  sections,
  evidenceItems,
  onActiveSectionChange,
  onContentChange,
  onSectionUpdated,
}: ReportDocumentProps) {
  const approvedCount = sections.filter((section) => section.approved).length
  const evidenceItemsById = Object.fromEntries(
    evidenceItems.map((evidenceItem) => [evidenceItem.id, evidenceItem]),
  )

  return (
    <article className="fr-report-document">
      <header className="fr-report-document-header">
        <div className="fr-report-document-status">
          <DocumentStatusCell
            label={translations.report_detail.document.approval_progress}
            value={`${approvedCount} ${translations.report_detail.document.approval_progress_separator} ${sections.length} ${translations.report_detail.document.sections_suffix}`}
            progress={
              sections.length === 0
                ? 0
                : (approvedCount / sections.length) * 100
            }
          />
          <DocumentStatusCell
            label={translations.report_detail.document.average_confidence}
            value={averageConfidenceLabel(sections)}
            progress={averageConfidenceProgress(sections)}
          />
          <DocumentStatusCell
            label={translations.report_detail.document.open_issues}
            value={String(sections.length - approvedCount)}
            progress={
              sections.length === 0
                ? 0
                : ((sections.length - approvedCount) / sections.length) * 100
            }
          />
          <DocumentStatusCell
            label={translations.report_detail.document.last_updated}
            value={formatUpdatedAt(reportUpdatedAt)}
            progress={null}
          />
        </div>
      </header>

      <div className="fr-report-document-body">
        {sections.length === 0 ? (
          <p className="fr-report-detail-empty">
            {translations.report_detail.document.empty}
          </p>
        ) : (
          sections.map((section, sectionIndex) => (
            <ReportSection
              key={section.id}
              reportId={reportId}
              section={section}
              index={sectionIndex}
              content={draftContent[section.id] ?? sectionContent(section)}
              active={activeSectionId === section.id}
              evidenceItemsById={evidenceItemsById}
              onSectionUpdated={onSectionUpdated}
              onContentChange={onContentChange}
              onActivate={onActiveSectionChange}
            />
          ))
        )}
      </div>
    </article>
  )
}

function DocumentStatusCell({
  label,
  value,
  progress,
}: DocumentStatusCellProps) {
  return (
    <div className="fr-report-document-status-cell">
      <span>{label}</span>
      <strong>{value}</strong>
      {progress !== null && (
        <div className="fr-report-document-progress">
          <i style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}
