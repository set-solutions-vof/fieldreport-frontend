import type { ChangeEvent } from 'react'
import { Textarea } from '@/design-system'
import { translations } from '@/lib/translations'
import { useReportSection } from '../hooks/useReportSection'
import { sectionSourceChipLabels } from '../lib/reportDetailView'
import type { ReportSectionProps } from '../types/reportDetailView'
import './ReportSection.css'

export function ReportSection({
  section,
  reportId,
  index,
  content,
  active,
  timelineItemsById,
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
  const sourceChipLabels = sectionSourceChipLabels(section, timelineItemsById)

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    onContentChange(section.id, event.currentTarget.value)
  }

  function handleApprove(): void {
    if (section.is_approved || content.trim() === '') {
      return
    }

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
              section.is_approved && 'fr-report-section-approval--done',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={section.is_approved}
            disabled={!section.is_approved && content.trim() === ''}
            onClick={handleApprove}
          >
            <span
              className="fr-report-section-approval-icon"
              aria-hidden="true"
            >
              {section.is_approved ? '✓' : '○'}
            </span>
            {section.is_approved
              ? translations.report_detail.section.approved_button
              : translations.report_detail.section.approve_button}
          </button>
        </div>
      </div>

      <Textarea
        aria-label={`${section.label} ${translations.report_detail.section.inspector_text_suffix}`}
        className="fr-report-section-textarea"
        fieldClassName="fr-report-section-field"
        value={content}
        rows={textareaRows(content)}
        onChange={handleContentChange}
      />

      {sourceChipLabels.length > 0 && (
        <div
          className="fr-report-section-source-chips"
          aria-label={`${translations.report_detail.section.sources_for_prefix} ${section.label}`}
        >
          {sourceChipLabels.map((sourceChipLabel) => (
            <span
              className="fr-report-section-source-chip"
              key={`${section.id}-${sourceChipLabel}`}
            >
              {sourceChipLabel}
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

function textareaRows(content: string): number {
  return Math.max(5, Math.min(12, content.split('\n').length + 3))
}
