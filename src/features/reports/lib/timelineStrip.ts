import { formatDuration } from './formatDuration'
import type {
  TimelineStripEvent,
  TimelineStripProps,
  TimelineTick,
} from '@/typing/reportDetailView'

const minuteMs = 60 * 1000
const majorTickMinuteSteps = [1, 2, 5, 10, 15, 30, 60]
const tickLabelMinWidthPx = 72

export function timelineEvents(
  items: TimelineStripProps['items'],
): TimelineStripEvent[] {
  return items
    .filter(
      (item) =>
        item.evidenceItem.evidence_type === 'transcription_segment' &&
        item.evidenceItem.timeline_seconds !== null,
    )
    .map((item) => ({
      id: item.id,
      primarySectionId: item.primarySectionId,
      sectionIds: item.sectionIds,
      sectionLabels: item.sectionLabels,
      allSectionsApproved: item.allSectionsApproved,
      timelineSeconds: item.evidenceItem.timeline_seconds!,
      evidenceType: item.evidenceItem.evidence_type,
    }))
    .sort(
      (firstEvent, secondEvent) =>
        firstEvent.timelineSeconds - secondEvent.timelineSeconds,
    )
}

export function timelineAudioDurationSeconds(
  items: TimelineStripProps['items'],
): number {
  return items.reduce((maxDuration, item) => {
    if (item.evidenceItem.evidence_type !== 'transcription_segment') {
      return maxDuration
    }

    return Math.max(
      maxDuration,
      transcriptionSegmentAbsoluteEndSeconds(item.evidenceItem),
    )
  }, 0)
}

function transcriptionSegmentAbsoluteEndSeconds(
  evidenceItem: TimelineStripProps['items'][number]['evidenceItem'],
): number {
  const { timeline_seconds, start_seconds, end_seconds } = evidenceItem

  if (timeline_seconds === null) {
    return 0
  }

  if (end_seconds !== null && start_seconds !== null) {
    return timeline_seconds + (end_seconds - start_seconds)
  }

  if (end_seconds !== null) {
    return end_seconds
  }

  return timeline_seconds
}

export function timelineStartTimestampMs(): number {
  return 0
}

export function timelineEndTimestampMs(
  events: TimelineStripEvent[],
  audioDurationSeconds: number,
): number {
  const maxEventSeconds = events.reduce(
    (maxSeconds, timelineEvent) =>
      Math.max(maxSeconds, timelineEvent.timelineSeconds),
    0,
  )

  return Math.max(maxEventSeconds, audioDurationSeconds) * 1000
}

export function timelineDurationMs(
  startTimestampMs: number,
  endTimestampMs: number,
): number {
  return Math.max(endTimestampMs - startTimestampMs, 1000)
}

export function timelineEventPosition(
  timelineEvent: TimelineStripEvent,
  startTimestampMs: number,
  durationMs: number,
): number {
  return (
    ((timelineEvent.timelineSeconds * 1000 - startTimestampMs) / durationMs) *
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
      label: formatDuration((timestampMs - startTimestampMs) / 1000),
      position: ((minuteOffset * minuteMs) / durationMs) * 100,
      major,
    })
  }

  if (!ticks.some((tick) => tick.major)) {
    ticks.push({
      id: String(startTimestampMs),
      label: formatDuration(0),
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
