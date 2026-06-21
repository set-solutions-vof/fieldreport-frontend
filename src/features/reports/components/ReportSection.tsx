import type { ChangeEvent } from 'react'
import { translations } from '@/lib/translations'
import type { ReportSectionProps } from '@/typing/reportDetailView'
import { useReportSection } from '../hooks/useReportSection'
import { sectionEvidenceChipLabels } from '../lib/reportDetailView'
import { SectionContentEditor } from './ReportSectionContentEditor'

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
  const { approve, approveError } = useReportSection({
    reportId,
    sectionId: section.id,
    onSuccess: onSectionUpdated,
  })
  const confidencePercentage = confidenceScorePercentage(
    section.confidence_score,
  )
  const evidenceChipLabels = sectionEvidenceChipLabels(
    section,
    evidenceItemsById,
  )

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
      className={[
        '[padding:var(--fr-space-5)_var(--fr-space-0)] [border-bottom:1px_solid_var(--fr-border)] [scroll-margin-top:var(--fr-space-5)] last-child:[border-bottom:0]',
        active &&
          '[background:linear-gradient(_90deg,_color-mix(in_oklch,_var(--fr-accent-subtle)_60%,_transparent),_transparent_28%_)]',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onActivate(section.id)}
      onFocus={() => onActivate(section.id)}
    >
      <div className="flex items-center justify-between [gap:var(--fr-space-4)] [margin-bottom:var(--fr-space-3)]">
        <div className="flex [min-width:var(--fr-space-0)] [align-items:baseline] [gap:var(--fr-space-3)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
          <span className="flex-none [width:var(--fr-space-5)] [font-family:var(--fr-font-mono)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2>{section.label}</h2>
        </div>
        <div className="flex flex-none items-center [gap:var(--fr-space-3)]">
          <span
            className={[
              'inline-flex items-center [gap:var(--fr-space-1)] [min-height:var(--fr-control-height-sm)] [padding:var(--fr-space-0)_var(--fr-space-2)] [border:1px_solid_var(--fr-border)] [border-radius:var(--fr-radius-full)] [font-family:var(--fr-font-sans)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:1] [color:var(--fr-text-secondary)] [background:var(--fr-surface-sunken)] [font-variant-numeric:tabular-nums] whitespace-nowrap',
              accuracyClassName(confidencePercentage),
            ]
              .filter(Boolean)
              .join(' ')}
          >
            AI {confidencePercentage}%
            <span className="inline-block [width:32px] [height:3px] [margin-left:var(--fr-space-1)] overflow-hidden [border-radius:var(--fr-radius-full)] [background:var(--fr-border-strong)] [&_i]:block [&_i]:h-full [&_i]:[border-radius:inherit] [&_i]:[background:currentColor]">
              <i style={{ width: `${confidencePercentage}%` }} />
            </span>
          </span>
          <button
            type="button"
            className={[
              'inline-flex items-center [gap:var(--fr-space-2)] [min-height:var(--fr-control-height-sm)] [padding:var(--fr-space-0)_var(--fr-space-3)] [border:1px_solid_var(--fr-border-strong)] [border-radius:var(--fr-radius-full)] [font:inherit] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:1] [color:var(--fr-text-secondary)] [background:var(--fr-surface)] cursor-pointer [transition:background_var(--fr-duration-base)_var(--fr-ease-out),_color_var(--fr-duration-base)_var(--fr-ease-out),_border-color_var(--fr-duration-base)_var(--fr-ease-out)] whitespace-nowrap focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)] disabled:cursor-not-allowed disabled:[opacity:0.55]',
              section.approved &&
                '[color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border-color:var(--fr-status-approved-border)]',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-pressed={section.approved}
            disabled={!section.approved && content.trim() === ''}
            onClick={handleApprove}
          >
            <span
              className={[
                'inline-flex shrink-0 items-center justify-center [width:var(--fr-space-4)] [height:var(--fr-space-4)] [border-radius:var(--fr-radius-full)]',
                section.approved
                  ? '[color:var(--fr-text-on-accent)] [background:var(--fr-status-approved-fg)]'
                  : '[color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:1.5px_solid_currentColor]',
              ].join(' ')}
              aria-hidden="true"
            >
              {section.approved && (
                <svg
                  className="[width:var(--fr-space-3)] [height:var(--fr-space-3)]"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13.2 4.4 6.7 10.9 3.2 7.4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
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

      {approveError !== null && (
        <p
          className="[margin:var(--fr-space-3)_var(--fr-space-0)_var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-destructive)]"
          role="alert"
        >
          {approveError}
        </p>
      )}

      {evidenceChipLabels.length > 0 && (
        <div
          className="flex flex-wrap [gap:var(--fr-space-2)] [margin-top:var(--fr-space-4)]"
          aria-label={`${translations.report_detail.section.sources_for_prefix} ${section.label}`}
        >
          {evidenceChipLabels.map((evidenceChipLabel) => (
            <span
              className="inline-flex items-center [min-height:var(--fr-control-height-sm)] [padding:var(--fr-space-0)_var(--fr-space-2)] [border:1px_solid_color-mix(in_oklch,_var(--fr-accent)_24%,_var(--fr-accent-subtle))] [border-radius:var(--fr-radius-sm)] [font-family:var(--fr-font-mono)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:1] [color:var(--fr-accent)] [background:var(--fr-accent-subtle)]"
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
    return '[color:var(--fr-color-red-700)] [background:var(--fr-color-red-50)] [border-color:var(--fr-color-red-100)]'
  }

  if (confidencePercentage < 75) {
    return '[color:var(--fr-color-amber-700)] [background:var(--fr-color-amber-50)] [border-color:var(--fr-color-amber-100)]'
  }

  return null
}
