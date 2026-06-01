import type { ChangeEvent } from 'react'
import { translations } from '@/lib/translations'
import type { ReportSectionProps } from '@/types/reportDetailView'
import { useReportSection } from '../hooks/useReportSection'
import { sectionEvidenceChipLabels } from '../lib/reportDetailView'
import { SectionContentEditor } from './ReportSectionContentEditor'
import './ReportSection.css'

export function ReportSection({
  section,
  reportId,
  index,
  content,
  active,
  evidenceItemsById,
  onSectionUpdated,
  onContentChange,
  onActivate,
}: ReportSectionProps) {
  const { approve } = useReportSection({
    reportId,
    sectionId: section.id,
    onSuccess: onSectionUpdated,
  })
  const confidencePercentage = confidenceScorePercentage(
    section.confidence_score,
  )
  const evidenceChipLabels = sectionEvidenceChipLabels(section, evidenceItemsById)

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    onContentChange(section.id, event.currentTarget.value)
  }

  function updateStructuredContent(nextContent: string): void {
    onContentChange(section.id, nextContent)
  }

  function handleApprove(): void {
    void approve()
  }

  return (
    <section
      id={`sec-${section.id}`}
      className={['fr-report-section', active && 'fr-report-section--active']
        .filter(Boolean)
        .join(' ')}
      onClick={() => onActivate(section.id)}
      onFocus={() => onActivate(section.id)}
    >
      <div className="fr-report-section-header">
        <div className="fr-report-section-heading">
          <span className="fr-report-section-number">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2>{section.label}</h2>
        </div>
        <div className="fr-report-section-meta">
          <span
            className={[
              'fr-report-section-accuracy',
              accuracyClassName(confidencePercentage),
            ]
              .filter(Boolean)
              .join(' ')}
          >
            AI {confidencePercentage}%
            <span className="fr-report-section-accuracy-bar">
              <i style={{ width: `${confidencePercentage}%` }} />
            </span>
          </span>
          <button
            type="button"
            className={[
              'fr-report-section-approval',
              section.approved && 'fr-report-section-approval--done',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={section.approved}
            disabled={!section.approved && content.trim() === ''}
            onClick={handleApprove}
          >
            <span
              className="fr-report-section-approval-icon"
              aria-hidden="true"
            >
              {section.approved ? '✓' : '○'}
            </span>
            {section.approved
              ? translations.report_detail.section.approved_button
              : translations.report_detail.section.approve_button}
          </button>
        </div>
      </div>

      <SectionContentEditor
        section={section}
        content={content}
        evidenceItemsById={evidenceItemsById}
        onTextChange={handleContentChange}
        onStructuredChange={updateStructuredContent}
      />

      {evidenceChipLabels.length > 0 && (
        <div
          className="fr-report-section-evidence-chips"
          aria-label={`${translations.report_detail.section.sources_for_prefix} ${section.label}`}
        >
          {evidenceChipLabels.map((evidenceChipLabel) => (
            <span
              className="fr-report-section-evidence-chip"
              key={`${section.id}-${evidenceChipLabel}`}
            >
              {evidenceChipLabel}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}

function confidenceScorePercentage(confidenceScore: number): number {
  return Math.round(confidenceScore * 100)
}

function accuracyClassName(confidencePercentage: number): string | null {
  if (confidencePercentage < 60) {
    return 'fr-report-section-accuracy--alert'
  }

  if (confidencePercentage < 75) {
    return 'fr-report-section-accuracy--warn'
  }

  return null
}
