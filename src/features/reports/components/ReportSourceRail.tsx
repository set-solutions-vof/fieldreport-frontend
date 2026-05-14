import {
  sourceTimeLabel,
  sourceTypeIconType,
  truncateSummary,
} from '../lib/reportDetailView'
import { SourceTypeIcon } from './SourceTypeIcon'
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
    <aside className="fr-report-source-rail" aria-label="Bron-momenten">
      <div className="fr-report-source-rail-head">
        <span>Bron-momenten</span>
      </div>
      <div className="fr-report-source-filter" aria-label="Bronnen filteren">
        <SourceFilterChip
          active={filter === 'all'}
          label="Alles"
          onClick={() => onFilterChange('all')}
        />
        <SourceFilterChip
          active={filter === 'open'}
          label="Open"
          onClick={() => onFilterChange('open')}
        />
        <SourceFilterChip
          active={filter === 'approved'}
          label="Goedgekeurd"
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
                sourceRailItem.timelineItem.content_summary || 'Bron',
              )}
            </span>
            <span className="fr-report-source-rail-section">
              Secties ·{' '}
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
