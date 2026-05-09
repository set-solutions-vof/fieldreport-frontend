import { Card } from '@/design-system'
import type { SectionSource } from '@/types/report'
import type { TimelineItem, TimelinePanelProps } from '@/types/reportView'
import { formatTimelineTime } from '../lib/formatTimelineTime'
import './TimelinePanel.css'

export function TimelinePanel({ sections }: TimelinePanelProps) {
  const timelineItems: TimelineItem[] = sections
    .flatMap((section) =>
      section.sources.map((source, sourceIndex) => ({
        id: `${section.id}-${sourceIndex}`,
        sectionLabel: section.label,
        source,
      })),
    )
    .sort(
      (firstItem, secondItem) =>
        sourceSortValue(firstItem.source) - sourceSortValue(secondItem.source),
    )

  if (timelineItems.length === 0) {
    return (
      <Card padding="md">
        <p className="fr-timeline-empty">
          Geen bronnen gekoppeld aan dit rapport.
        </p>
      </Card>
    )
  }

  return (
    <ol className="fr-timeline-list" aria-label="Tijdlijn bronnen">
      {timelineItems.map((timelineItem) => (
        <li className="fr-timeline-item" key={timelineItem.id}>
          <span className="fr-timeline-time">
            {formatTimelineTime(timelineItem.source)}
          </span>
          <div>
            <strong>{timelineItem.sectionLabel}</strong>
            <p>{truncateSummary(timelineItem.source.content_summary)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function sourceSortValue(source: SectionSource): number {
  if (source.type === 'audio') {
    return source.timestamp_start!
  }

  return new Date(source.capture_time!).getTime()
}

function truncateSummary(contentSummary: string): string {
  if (contentSummary.length <= 60) {
    return contentSummary
  }

  return `${contentSummary.slice(0, 60)}...`
}
