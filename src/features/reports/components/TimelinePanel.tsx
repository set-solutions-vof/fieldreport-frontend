import { formatSeconds } from '../lib/formatSeconds'
import { sourceTypeLabel } from '../lib/reportDetailView'
import type {
  TimelineStripEvent,
  TimelineStripProps,
  TimelineTick,
} from '../types/reportDetailView'
import './TimelinePanel.css'

const minuteMs = 60 * 1000
export function TimelineStrip({
  items,
  sections,
  activeSourceItemId,
  onActiveSourceItemChange,
}: TimelineStripProps) {
  const events = timelineEvents(items)
  const approvedCount = sections.filter((section) => section.is_approved).length
  const openCount = sections.length - approvedCount

  if (events.length === 0) {
    return (
      <div className="fr-timeline-strip-card">
        <div className="fr-timeline-strip-meta">
          <span className="fr-timeline-strip-label">Tijdlijn</span>
          <span className="fr-timeline-strip-range">–</span>
          <span className="fr-timeline-strip-sub">
            Geen bronmomenten gekoppeld
          </span>
        </div>
        <div className="fr-timeline-strip-track" />
        <div className="fr-timeline-strip-stats">
          <div className="fr-timeline-strip-stat">
            <span>Goedgekeurd</span>
            <strong>
              {approvedCount}
              <small>/ {sections.length} secties</small>
            </strong>
          </div>
          <div className="fr-timeline-strip-stat">
            <span>Controleren</span>
            <strong>
              {openCount}
              <small>openstaand</small>
            </strong>
          </div>
        </div>
      </div>
    )
  }

  const startTimestampMs = Math.min(0)
  const endTimestampMs = Math.max(
    ...events.map(
      (timelineEvent) => timelineEvent.timelineOffsetSeconds * 1000,
    ),
  )
  const durationMs = Math.max(endTimestampMs - startTimestampMs, minuteMs)
  const ticks = timelineTicks(startTimestampMs, endTimestampMs)

  return (
    <div className="fr-timeline-strip-card">
      <div className="fr-timeline-strip-meta">
        <span className="fr-timeline-strip-label">Tijdlijn</span>
        <span className="fr-timeline-strip-range">
          {formatSeconds(0)} →{' '}
          {formatSeconds((endTimestampMs - startTimestampMs) / 1000)}
        </span>
        <span className="fr-timeline-strip-sub">
          {events.length} momenten · {sections.length} secties
        </span>
      </div>

      <div className="fr-timeline-strip-track" aria-label="Bronmomenten">
        <div className="fr-timeline-strip-axis" />
        <div className="fr-timeline-strip-processed" />
        {ticks.map((tick) => (
          <span
            className={[
              'fr-timeline-strip-tick',
              tick.major && 'fr-timeline-strip-tick--major',
            ]
              .filter(Boolean)
              .join(' ')}
            key={tick.id}
            style={{ left: `${tick.position}%` }}
          >
            {tick.major && (
              <span className="fr-timeline-strip-tick-label">{tick.label}</span>
            )}
          </span>
        ))}
        {events.map((timelineEvent) => {
          const position =
            ((timelineEvent.timelineOffsetSeconds * 1000 - startTimestampMs) /
              durationMs) *
            100

          return (
            <button
              type="button"
              className={[
                'fr-timeline-strip-event',
                timelineEvent.allSectionsApproved &&
                  'fr-timeline-strip-event--approved',
                activeSourceItemId === timelineEvent.id &&
                  'fr-timeline-strip-event--active',
              ]
                .filter(Boolean)
                .join(' ')}
              key={timelineEvent.id}
              style={{ left: `${position}%` }}
              title={`${formatSeconds(
                timelineEvent.timelineOffsetSeconds,
              )} · ${sourceTypeLabel(timelineEvent.sourceType)} · ${timelineEvent.sectionLabels.join(', ')}`}
              aria-label={`${formatSeconds(
                timelineEvent.timelineOffsetSeconds,
              )} ${sourceTypeLabel(timelineEvent.sourceType)} ${timelineEvent.sectionLabels.join(', ')}`}
              aria-pressed={activeSourceItemId === timelineEvent.id}
              onClick={() => onActiveSourceItemChange(timelineEvent.id)}
            />
          )
        })}
      </div>

      <div className="fr-timeline-strip-stats">
        <div className="fr-timeline-strip-stat">
          <span>Goedgekeurd</span>
          <strong>
            {approvedCount}
            <small>/ {sections.length} secties</small>
          </strong>
        </div>
        <div className="fr-timeline-strip-stat">
          <span>Controleren</span>
          <strong>
            {openCount}
            <small>openstaand</small>
          </strong>
        </div>
      </div>
    </div>
  )
}

function timelineEvents(
  items: TimelineStripProps['items'],
): TimelineStripEvent[] {
  return items
    .map((item) => ({
      id: item.id,
      primarySectionId: item.primarySectionId,
      sectionIds: item.sectionIds,
      sectionLabels: item.sectionLabels,
      allSectionsApproved: item.allSectionsApproved,
      timelineOffsetSeconds: item.timelineItem.timeline_offset_seconds,
      sourceType: item.timelineItem.source_type,
    }))
    .sort(
      (firstEvent, secondEvent) =>
        firstEvent.timelineOffsetSeconds - secondEvent.timelineOffsetSeconds,
    )
}

function timelineTicks(
  startTimestampMs: number,
  endTimestampMs: number,
): TimelineTick[] {
  const durationMs = Math.max(endTimestampMs - startTimestampMs, minuteMs)
  const lastOffset = Math.floor(durationMs / minuteMs)
  const ticks: TimelineTick[] = []

  for (let minuteOffset = 0; minuteOffset <= lastOffset; minuteOffset += 1) {
    const timestampMs = startTimestampMs + minuteOffset * minuteMs
    const major = minuteOffset % 5 === 0

    ticks.push({
      id: String(timestampMs),
      label: formatSeconds((timestampMs - startTimestampMs) / 1000),
      position: ((minuteOffset * minuteMs) / durationMs) * 100,
      major,
    })
  }

  if (!ticks.some((tick) => tick.major)) {
    ticks.push({
      id: String(startTimestampMs),
      label: formatSeconds(0),
      position: 0,
      major: true,
    })
  }

  return ticks.filter((tick) => tick.position >= 0 && tick.position <= 100)
}
