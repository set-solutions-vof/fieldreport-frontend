import { translations } from '@/lib/translations'
import { formatSeconds } from '../lib/formatSeconds'
import {
  timelineDurationMs,
  timelineEndTimestampMs,
  timelineEvents,
  timelineStartTimestampMs,
  timelineTicks,
} from '../lib/timelineStrip'
import { useElementWidth } from '../hooks/useElementWidth'
import type { TimelineStripProps } from '../types/reportDetailView'
import { TimelineStripMeta } from './TimelineStripMeta'
import { TimelineStripStats } from './TimelineStripStats'
import { TimelineStripTrack } from './TimelineStripTrack'
import './TimelinePanel.css'

export function TimelineStrip({
  items,
  sections,
  activeSourceItemId,
  onActiveSourceItemChange,
}: TimelineStripProps) {
  const { elementRef: trackRef, elementWidth: trackWidth } =
    useElementWidth<HTMLDivElement>()
  const events = timelineEvents(items)
  const approvedCount = sections.filter((section) => section.is_approved).length
  const openCount = sections.length - approvedCount

  if (events.length === 0) {
    return (
      <div className="fr-timeline-strip-card">
        <TimelineStripMeta
          range="–"
          summary={translations.report_detail.timeline.empty}
        />
        <div className="fr-timeline-strip-track" />
        <TimelineStripStats
          approvedCount={approvedCount}
          openCount={openCount}
          sectionCount={sections.length}
        />
      </div>
    )
  }

  const startTimestampMs = timelineStartTimestampMs()
  const endTimestampMs = timelineEndTimestampMs(events)
  const durationMs = timelineDurationMs(startTimestampMs, endTimestampMs)
  const ticks = timelineTicks(startTimestampMs, endTimestampMs, trackWidth)

  return (
    <div className="fr-timeline-strip-card">
      <TimelineStripMeta
        range={`${formatSeconds(0)} → ${formatSeconds(
          (endTimestampMs - startTimestampMs) / 1000,
        )}`}
        summary={`${events.length} ${
          translations.report_detail.timeline.moments_suffix
        } · ${sections.length} ${
          translations.report_detail.timeline.sections_suffix
        }`}
      />
      <TimelineStripTrack
        activeSourceItemId={activeSourceItemId}
        durationMs={durationMs}
        events={events}
        startTimestampMs={startTimestampMs}
        ticks={ticks}
        trackRef={trackRef}
        onActiveSourceItemChange={onActiveSourceItemChange}
      />
      <TimelineStripStats
        approvedCount={approvedCount}
        openCount={openCount}
        sectionCount={sections.length}
      />
    </div>
  )
}
