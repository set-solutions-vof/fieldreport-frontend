import { translations } from '@/lib/translations'
import { formatDuration } from '../lib/formatDuration'
import {
  timelineAudioDurationSeconds,
  timelineDurationMs,
  timelineEndTimestampMs,
  timelineEvents,
  timelineStartTimestampMs,
  timelineTicks,
} from '../lib/timelineStrip'
import { useElementWidth } from '../hooks/useElementWidth'
import type { TimelineStripProps } from '@/types/reportDetailView'
import { TimelineStripMeta } from './TimelineStripMeta'
import { TimelineStripStats } from './TimelineStripStats'
import { TimelineStripTrack } from './TimelineStripTrack'
import './TimelinePanel.css'

export function TimelineStrip({
  items,
  sections,
  activeEvidenceItemId,
  onActiveEvidenceItemChange,
}: TimelineStripProps) {
  const { elementRef: trackRef, elementWidth: trackWidth } =
    useElementWidth<HTMLDivElement>()
  const events = timelineEvents(items)
  const approvedCount = sections.filter((section) => section.approved).length
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
  const audioDurationSeconds = timelineAudioDurationSeconds(items)
  const endTimestampMs = timelineEndTimestampMs(events, audioDurationSeconds)
  const durationSeconds = (endTimestampMs - startTimestampMs) / 1000
  const durationMs = timelineDurationMs(startTimestampMs, endTimestampMs)
  const ticks = timelineTicks(startTimestampMs, endTimestampMs, trackWidth)

  return (
    <div className="fr-timeline-strip-card">
      <TimelineStripMeta
        range={`${formatDuration(0)} → ${formatDuration(durationSeconds)}`}
        summary={`${events.length} ${
          translations.report_detail.timeline.moments_suffix
        } · ${sections.length} ${
          translations.report_detail.timeline.sections_suffix
        }`}
      />
      <TimelineStripTrack
        activeEvidenceItemId={activeEvidenceItemId}
        durationMs={durationMs}
        events={events}
        startTimestampMs={startTimestampMs}
        ticks={ticks}
        trackRef={trackRef}
        onActiveEvidenceItemChange={onActiveEvidenceItemChange}
      />
      <TimelineStripStats
        approvedCount={approvedCount}
        openCount={openCount}
        sectionCount={sections.length}
      />
    </div>
  )
}
