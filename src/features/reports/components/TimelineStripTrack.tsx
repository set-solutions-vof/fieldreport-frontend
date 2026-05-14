import { translations } from '@/lib/translations'
import { formatSeconds } from '../lib/formatSeconds'
import { sourceTypeLabel } from '../lib/reportDetailView'
import { timelineEventPosition } from '../lib/timelineStrip'
import type { TimelineStripTrackProps } from '../types/reportDetailView'

export function TimelineStripTrack({
  activeSourceItemId,
  durationMs,
  events,
  startTimestampMs,
  ticks,
  trackRef,
  onActiveSourceItemChange,
}: TimelineStripTrackProps) {
  return (
    <div
      ref={trackRef}
      className="fr-timeline-strip-track"
      aria-label={translations.report_detail.timeline.track_aria_label}
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
      {events.map((timelineEvent) => (
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
          style={{
            left: `${timelineEventPosition(
              timelineEvent,
              startTimestampMs,
              durationMs,
            )}%`,
          }}
          title={timelineEventTitle(timelineEvent)}
          aria-label={timelineEventLabel(timelineEvent)}
          aria-pressed={activeSourceItemId === timelineEvent.id}
          onClick={() => onActiveSourceItemChange(timelineEvent.id)}
        />
      ))}
    </div>
  )
}

function timelineEventTitle(
  timelineEvent: TimelineStripTrackProps['events'][number],
): string {
  return `${formatSeconds(timelineEvent.timelineOffsetSeconds)} · ${sourceTypeLabel(
    timelineEvent.sourceType,
  )} · ${timelineEvent.sectionLabels.join(', ')}`
}

function timelineEventLabel(
  timelineEvent: TimelineStripTrackProps['events'][number],
): string {
  return `${formatSeconds(timelineEvent.timelineOffsetSeconds)} ${sourceTypeLabel(
    timelineEvent.sourceType,
  )} ${timelineEvent.sectionLabels.join(', ')}`
}
