import { translations } from '@/lib/translations'
import { formatDuration } from '../lib/formatDuration'
import { evidenceTypeLabel } from '../lib/reportDetailView'
import { timelineEventPosition } from '../lib/timelineStrip'
import type { TimelineStripTrackProps } from '@/types/reportDetailView'

export function TimelineStripTrack({
  activeEvidenceItemId,
  durationMs,
  events,
  startTimestampMs,
  ticks,
  trackRef,
  onActiveEvidenceItemChange,
}: TimelineStripTrackProps) {
  return (
    <div
      ref={trackRef}
      className="relative [height:46px]"
      aria-label={translations.report_detail.timeline.track_aria_label}
    >
      <div className="absolute [top:22px] [left:var(--fr-space-0)] [height:1px] [right:var(--fr-space-0)] [background:var(--fr-border-strong)]" />
      <div className="absolute [top:22px] [left:var(--fr-space-0)] [height:1px] w-full [background:var(--fr-text-primary)]" />
      {ticks.map((tick) => (
        <span
          className={[
            'absolute [top:18px] [width:1px] [height:5px] [background:var(--fr-text-disabled)]',
            tick.major && '[top:16px] [height:var(--fr-space-2)] [background:var(--fr-text-tertiary)]',
          ]
            .filter(Boolean)
            .join(' ')}
          key={tick.id}
          style={{ left: `${tick.position}%` }}
        >
          {tick.major && (
            <span className="absolute [top:var(--fr-space-3)] [left:50%] [transform:translateX(-50%)] [font-family:var(--fr-font-mono)] [font-size:10.5px] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] whitespace-nowrap">{tick.label}</span>
          )}
        </span>
      ))}
      {events.map((timelineEvent) => (
        <button
          type="button"
          className={[
            'absolute [top:13px] grid [width:14px] [height:14px] place-items-center [padding:var(--fr-space-0)] [border:1.5px_solid_var(--fr-text-tertiary)] [border-radius:var(--fr-radius-full)] [color:var(--fr-text-tertiary)] [background:var(--fr-surface)] cursor-pointer [transform:translateX(-50%)] [transition:transform_var(--fr-duration-base)_var(--fr-ease-out)] appearance-none hover:[transform:translateX(-50%)_scale(1.18)] focus-visible:outline-none focus-visible:[box-shadow:var(--fr-shadow-focus)]',
            timelineEvent.allSectionsApproved &&
              '[color:var(--fr-text-on-accent)] [background:var(--fr-text-primary)] [border-color:var(--fr-text-primary)]',
            activeEvidenceItemId === timelineEvent.id &&
              '[color:var(--fr-text-on-accent)] [background:var(--fr-text-primary)] [border-color:var(--fr-text-primary)] [box-shadow:0_0_0_4px_rgba(15,_23,_42,_0.08)]',
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
          aria-pressed={activeEvidenceItemId === timelineEvent.id}
          onClick={() => onActiveEvidenceItemChange(timelineEvent.id)}
        />
      ))}
    </div>
  )
}

function timelineEventTitle(
  timelineEvent: TimelineStripTrackProps['events'][number],
): string {
  return `${formatDuration(timelineEvent.timelineSeconds)} · ${evidenceTypeLabel(
    timelineEvent.evidenceType,
  )} · ${timelineEvent.sectionLabels.join(', ')}`
}

function timelineEventLabel(
  timelineEvent: TimelineStripTrackProps['events'][number],
): string {
  return `${formatDuration(timelineEvent.timelineSeconds)} ${evidenceTypeLabel(
    timelineEvent.evidenceType,
  )} ${timelineEvent.sectionLabels.join(', ')}`
}
