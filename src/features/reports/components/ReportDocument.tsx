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
    <article className="w-full [max-width:880px] [margin:var(--fr-space-0)_auto] overflow-hidden [border:1px_solid_var(--fr-border)] [border-radius:14px] [background:var(--fr-surface)] [box-shadow:0_1px_0_rgba(15,_23,_42,_0.03),_0_10px_30px_rgba(15,_23,_42,_0.05)]">
      <header className="[padding:var(--fr-space-4)_var(--fr-space-6)_var(--fr-space-5)] [border-bottom:1px_solid_var(--fr-border)] [background:linear-gradient(_180deg,_var(--fr-surface),_var(--fr-surface-sunken)_)]">
        <div className="flex [gap:var(--fr-space-5)] [margin-top:var(--fr-space-0)]">
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

      <div className="[padding:var(--fr-space-3)_var(--fr-space-6)_var(--fr-space-5)]">
        {sections.length === 0 ? (
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
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
    <div className="flex flex-col [gap:var(--fr-space-1)] [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-medium)] [&_span]:[line-height:var(--fr-leading-snug)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[letter-spacing:0.08em] [&_span]:uppercase [&_strong]:[font-size:var(--fr-text-base)] [&_strong]:[font-weight:var(--fr-weight-medium)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_strong]:[font-variant-numeric:tabular-nums]">
      <span>{label}</span>
      <strong>{value}</strong>
      {progress !== null && (
        <div className="[width:120px] [height:var(--fr-space-1)] [margin-top:var(--fr-space-2)] overflow-hidden [border-radius:var(--fr-radius-full)] [background:var(--fr-surface-active)] [&_i]:block [&_i]:h-full [&_i]:[border-radius:inherit] [&_i]:[background:var(--fr-accent)]">
          <i style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}
