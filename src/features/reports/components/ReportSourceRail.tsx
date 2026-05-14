import { translations } from '@/lib/translations'
import {
  sourceTimeLabel,
  sourceTypeIconType,
  truncateSummary,
} from '../lib/reportDetailView'
import { SourceTypeIcon } from './icons/SourceTypeIcon'
import type {
  ReportSourceRailProps,
  SourceFilterChipProps,
} from '../types/reportDetailView'

export function ReportSourceRail({
  activeSourceItemId,
  filter,
  items,
  onActiveSourceItemChange,
  onFilterChange,
}: ReportSourceRailProps) {
  const filteredItems = items.filter((sourceRailItem) => {
    if (filter === 'open') {
      return sourceRailItem.hasOpenSections
    }

    if (filter === 'approved') {
      return sourceRailItem.allSectionsApproved
    }

    return true
  })

  return (
    <aside
      className="fr-report-source-rail"
      aria-label={translations.report_detail.source_rail.aria_label}
    >
      <div className="fr-report-source-rail-head">
        <span>{translations.report_detail.source_rail.title}</span>
      </div>
      <div
        className="fr-report-source-filter"
        aria-label={translations.report_detail.source_rail.filter_aria_label}
      >
        <SourceFilterChip
          active={filter === 'all'}
          label={translations.report_detail.source_rail.all_filter}
          onClick={() => onFilterChange('all')}
        />
        <SourceFilterChip
          active={filter === 'open'}
          label={translations.report_detail.source_rail.open_filter}
          onClick={() => onFilterChange('open')}
        />
        <SourceFilterChip
          active={filter === 'approved'}
          label={translations.report_detail.source_rail.approved_filter}
          onClick={() => onFilterChange('approved')}
        />
      </div>
      <div className="fr-report-source-rail-list">
        {filteredItems.map((sourceRailItem) => (
          <button
            id={`source-item-${sourceRailItem.id}`}
            type="button"
            className={[
              'fr-report-source-rail-item',
              activeSourceItemId === sourceRailItem.id &&
                'fr-report-source-rail-item--active',
            ]
              .filter(Boolean)
              .join(' ')}
            key={sourceRailItem.id}
            onClick={() => onActiveSourceItemChange(sourceRailItem.id)}
          >
            <span className="fr-report-source-rail-node" />
            <span className="fr-report-source-rail-row">
              <span className="fr-report-source-rail-time">
                {sourceTimeLabel(sourceRailItem)}
              </span>
              <span className="fr-report-source-rail-type">
                <SourceTypeIcon
                  type={sourceTypeIconType(
                    sourceRailItem.timelineItem.source_type,
                  )}
                  size={11}
                />
              </span>
            </span>
            <span className="fr-report-source-rail-title">
              {truncateSummary(
                sourceRailItem.timelineItem.content_summary ||
                  translations.report_detail.source_rail.fallback_source_title,
              )}
            </span>
            <span className="fr-report-source-rail-section">
              {translations.report_detail.source_rail.sections_label} ·{' '}
              <strong>{sourceRailItem.sectionLabels.join(', ')}</strong>
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}

function SourceFilterChip({ active, label, onClick }: SourceFilterChipProps) {
  return (
    <button
      type="button"
      className={[
        'fr-report-source-filter-chip',
        active && 'fr-report-source-filter-chip--active',
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
