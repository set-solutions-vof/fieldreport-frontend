import { useEffect, useRef, useState } from 'react'
import { formatSeconds } from '../lib/formatSeconds'
import { sourceTypeLabel } from '../lib/reportDetailView'
import type {
  TimelineStripEvent,
  TimelineStripProps,
  TimelineTick,
} from '../types/reportDetailView'
import './TimelinePanel.css'

const minuteMs = 60 * 1000
const majorTickMinuteSteps = [1, 2, 5, 10, 15, 30, 60]
const tickLabelMinWidthPx = 72
export function TimelineStrip({
  items,
  sections,
  activeSourceItemId,
  onActiveSourceItemChange,
}: TimelineStripProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [trackWidth, setTrackWidth] = useState(0)
  const events = timelineEvents(items)
  const approvedCount = sections.filter((section) => section.is_approved).length
  const openCount = sections.length - approvedCount

  useEffect(() => {
    const trackElement = trackRef.current

    if (trackElement === null) {
      return
    }

    setTrackWidth(trackElement.clientWidth)

    const resizeObserver = new ResizeObserver(([entry]) => {
      setTrackWidth(entry.contentRect.width)
    })

    resizeObserver.observe(trackElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

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
  const ticks = timelineTicks(startTimestampMs, endTimestampMs, trackWidth)

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

      <div
        ref={trackRef}
        className="fr-timeline-strip-track"
        aria-label="Bronmomenten"
      >
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
  trackWidth: number,
): TimelineTick[] {
  const durationMs = Math.max(endTimestampMs - startTimestampMs, minuteMs)
  const lastOffset = Math.floor(durationMs / minuteMs)
  const majorStepMinutes = majorTickStepMinutes(durationMs, trackWidth)
  const ticks: TimelineTick[] = []

  for (let minuteOffset = 0; minuteOffset <= lastOffset; minuteOffset += 1) {
    const timestampMs = startTimestampMs + minuteOffset * minuteMs
    const major = minuteOffset % majorStepMinutes === 0

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

function majorTickStepMinutes(durationMs: number, trackWidth: number): number {
  const durationMinutes = Math.max(durationMs / minuteMs, 1)
  const maxLabelCount = Math.max(
    Math.floor(trackWidth / tickLabelMinWidthPx),
    1,
  )
  const minimumStepMinutes = durationMinutes / maxLabelCount

  return (
    majorTickMinuteSteps.find((step) => step >= minimumStepMinutes) ??
    majorTickMinuteSteps[majorTickMinuteSteps.length - 1]
  )
}
