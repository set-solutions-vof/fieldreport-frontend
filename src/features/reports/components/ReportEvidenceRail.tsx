import { translations } from '@/lib/translations'
import {
  evidenceTimeLabel,
  evidenceTypeIconType,
  truncateSummary,
} from '../lib/reportDetailView'
import { EvidenceTypeIcon } from './icons/EvidenceTypeIcon'
import type {
  ReportEvidenceRailProps,
  EvidenceFilterChipProps,
} from '@/typing/reportDetailView'

export function ReportEvidenceRail({
  activeEvidenceItemId,
  filter,
  items,
  onActiveEvidenceItemChange,
  onFilterChange,
}: ReportEvidenceRailProps) {
  const filteredItems = items.filter((evidenceRailItem) => {
    if (filter === 'open') {
      return evidenceRailItem.hasOpenSections
    }

    if (filter === 'approved') {
      return evidenceRailItem.allSectionsApproved
    }

    return true
  })

  return (
    <aside
      className="sticky [top:var(--fr-space-4)] [min-width:var(--fr-space-0)]"
      aria-label={translations.report_detail.evidence_rail.aria_label}
    >
      <div className="flex items-center justify-between [margin-bottom:var(--fr-space-3)] [&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-medium)] [&_span]:[line-height:var(--fr-leading-snug)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[letter-spacing:0.08em] [&_span]:uppercase">
        <span>{translations.report_detail.evidence_rail.title}</span>
      </div>
      <div
        className="flex flex-wrap [gap:var(--fr-space-1)] [margin-bottom:var(--fr-space-4)]"
        aria-label={translations.report_detail.evidence_rail.filter_aria_label}
      >
        <EvidenceFilterChip
          active={filter === 'all'}
          label={translations.report_detail.evidence_rail.all_filter}
          onClick={() => onFilterChange('all')}
        />
        <EvidenceFilterChip
          active={filter === 'open'}
          label={translations.report_detail.evidence_rail.open_filter}
          onClick={() => onFilterChange('open')}
        />
        <EvidenceFilterChip
          active={filter === 'approved'}
          label={translations.report_detail.evidence_rail.approved_filter}
          onClick={() => onFilterChange('approved')}
        />
      </div>
      <div className="relative flex flex-col [padding-left:var(--fr-space-5)] [&::before]:[content:''] [&::before]:absolute [&::before]:[top:var(--fr-space-2)] [&::before]:[bottom:var(--fr-space-2)] [&::before]:[left:5px] [&::before]:[width:1px] [&::before]:[background:var(--fr-border)]">
        {filteredItems.map((evidenceRailItem) => {
          const active = activeEvidenceItemId === evidenceRailItem.id

          return (
            <button
              id={`evidence-item-${evidenceRailItem.id}`}
              type="button"
              className={[
                'relative flex flex-col items-stretch [gap:var(--fr-space-1)] [margin-bottom:var(--fr-space-1)] [padding:var(--fr-space-2)_var(--fr-space-3)_var(--fr-space-3)] [border:1px_solid_transparent] [border-radius:var(--fr-space-2)] [color:var(--fr-text-primary)] text-left bg-transparent cursor-pointer hover:[border-color:var(--fr-border)] hover:[background:var(--fr-surface)]',
                active &&
                  '[border-color:var(--fr-border-strong)] [background:var(--fr-surface)] [box-shadow:var(--fr-shadow-sm)]',
              ]
                .filter(Boolean)
                .join(' ')}
              key={evidenceRailItem.id}
              onClick={() => onActiveEvidenceItemChange(evidenceRailItem.id)}
            >
              <span
                className={[
                  'absolute [top:var(--fr-space-4)] [left:-17px] [width:9px] [height:9px] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [background:var(--fr-surface)]',
                  active
                    ? '[border-color:var(--fr-accent)] [background:var(--fr-accent)]'
                    : evidenceRailItem.allSectionsApproved &&
                        '[border-color:var(--fr-status-approved-border)] [background:var(--fr-status-approved-bg)]',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
              <span className="flex items-center justify-between [gap:var(--fr-space-2)]">
                <span className="[font-family:var(--fr-font-mono)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
                  {evidenceTimeLabel(evidenceRailItem)}
                </span>
                <span className="inline-flex items-center [font-size:11px] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)]">
                  <EvidenceTypeIcon
                    type={evidenceTypeIconType(
                      evidenceRailItem.evidenceItem.evidence_type,
                    )}
                    size={11}
                  />
                </span>
              </span>
              <span className="overflow-hidden [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)] text-ellipsis whitespace-nowrap">
                {truncateSummary(
                  evidenceRailItem.evidenceItem.content_summary ||
                    translations.report_detail.evidence_rail
                      .fallback_source_title,
                )}
              </span>
              <span className="[font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [&_strong]:[font-weight:var(--fr-weight-medium)] [&_strong]:[color:var(--fr-text-secondary)]">
                {translations.report_detail.evidence_rail.sections_label} ·{' '}
                <strong>{evidenceRailItem.sectionLabels.join(', ')}</strong>
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

function EvidenceFilterChip({
  active,
  label,
  onClick,
}: EvidenceFilterChipProps) {
  return (
    <button
      type="button"
      className={
        active
          ? '[padding:var(--fr-space-1)_var(--fr-space-2)] [border:1px_solid] [border-radius:var(--fr-radius-full)] [font:inherit] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)] [border-color:var(--fr-accent)] cursor-pointer'
          : '[padding:var(--fr-space-1)_var(--fr-space-2)] [border:1px_solid] [border-radius:var(--fr-radius-full)] [font:inherit] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)] [background:var(--fr-surface)] [border-color:var(--fr-border)] cursor-pointer hover:[border-color:var(--fr-border-strong)] hover:[background:var(--fr-surface-hover)]'
      }
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
