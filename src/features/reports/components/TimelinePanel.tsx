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
import type { TimelineStripProps } from '@/typing/reportDetailView'
import { TimelineStripMeta } from './TimelineStripMeta'
import { TimelineStripStats } from './TimelineStripStats'
import { TimelineStripTrack } from './TimelineStripTrack'

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
      <div className="grid [grid-template-columns:180px_minmax(var(--fr-space-0),_1fr)_220px] items-center [gap:var(--fr-space-5)] [padding:var(--fr-space-4)_var(--fr-space-5)] [border:1px_solid_var(--fr-border)] [border-radius:10px] [background:var(--fr-surface)]">
        <TimelineStripMeta
          range="–"
          summary={translations.report_detail.timeline.empty}
        />
        <div className="relative [height:46px]" />
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
    <div className="grid [grid-template-columns:180px_minmax(var(--fr-space-0),_1fr)_220px] items-center [gap:var(--fr-space-5)] [padding:var(--fr-space-4)_var(--fr-space-5)] [border:1px_solid_var(--fr-border)] [border-radius:10px] [background:var(--fr-surface)]">
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
