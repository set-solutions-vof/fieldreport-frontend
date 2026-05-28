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
} from '@/types/reportDetailView'

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
      className="fr-report-evidence-rail"
      aria-label={translations.report_detail.evidence_rail.aria_label}
    >
      <div className="fr-report-evidence-rail-head">
        <span>{translations.report_detail.evidence_rail.title}</span>
      </div>
      <div
        className="fr-report-evidence-filter"
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
      <div className="fr-report-evidence-rail-list">
        {filteredItems.map((evidenceRailItem) => (
          <button
            id={`evidence-item-${evidenceRailItem.id}`}
            type="button"
            className={[
              'fr-report-evidence-rail-item',
              activeEvidenceItemId === evidenceRailItem.id &&
                'fr-report-evidence-rail-item--active',
            ]
              .filter(Boolean)
              .join(' ')}
            key={evidenceRailItem.id}
            onClick={() => onActiveEvidenceItemChange(evidenceRailItem.id)}
          >
            <span className="fr-report-evidence-rail-node" />
            <span className="fr-report-evidence-rail-row">
              <span className="fr-report-evidence-rail-time">
                {evidenceTimeLabel(evidenceRailItem)}
              </span>
              <span className="fr-report-evidence-rail-type">
                <EvidenceTypeIcon
                  type={evidenceTypeIconType(
                    evidenceRailItem.evidenceItem.evidence_type,
                  )}
                  size={11}
                />
              </span>
            </span>
            <span className="fr-report-evidence-rail-title">
              {truncateSummary(
                evidenceRailItem.evidenceItem.content_summary ||
                  translations.report_detail.evidence_rail.fallback_source_title,
              )}
            </span>
            <span className="fr-report-evidence-rail-section">
              {translations.report_detail.evidence_rail.sections_label} ·{' '}
              <strong>{evidenceRailItem.sectionLabels.join(', ')}</strong>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

function EvidenceFilterChip({ active, label, onClick }: EvidenceFilterChipProps) {
  return (
    <button
      type="button"
      className={[
        'fr-report-evidence-filter-chip',
        active && 'fr-report-evidence-filter-chip--active',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
