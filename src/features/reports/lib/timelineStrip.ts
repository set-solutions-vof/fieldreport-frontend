import { formatSeconds } from './formatSeconds'
import type {
  TimelineStripEvent,
  TimelineStripProps,
  TimelineTick,
} from '../types/reportDetailView'

const minuteMs = 60 * 1000
const majorTickMinuteSteps = [1, 2, 5, 10, 15, 30, 60]
const tickLabelMinWidthPx = 72

export function timelineEvents(
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

export function timelineStartTimestampMs(): number {
  return 0
}

export function timelineEndTimestampMs(events: TimelineStripEvent[]): number {
  return Math.max(
    ...events.map(
      (timelineEvent) => timelineEvent.timelineOffsetSeconds * 1000,
    ),
  )
}

export function timelineDurationMs(
  startTimestampMs: number,
  endTimestampMs: number,
): number {
  return Math.max(endTimestampMs - startTimestampMs, minuteMs)
}

export function timelineEventPosition(
  timelineEvent: TimelineStripEvent,
  startTimestampMs: number,
  durationMs: number,
): number {
  return (
    ((timelineEvent.timelineOffsetSeconds * 1000 - startTimestampMs) /
      durationMs) *
    100
  )
}

export function timelineTicks(
  startTimestampMs: number,
  endTimestampMs: number,
  trackWidth: number,
): TimelineTick[] {
  const durationMs = timelineDurationMs(startTimestampMs, endTimestampMs)
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
