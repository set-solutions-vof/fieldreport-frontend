import * as React from 'react'
import './CalmTimeline.css'

export type CalmTimelineEventVariant = 'neutral' | 'warn' | 'alert' | 'active'

export interface CalmTimelineLabel {
  id: string
  label: React.ReactNode
  position: number
}

export interface CalmTimelineEvent {
  id: string
  label: string
  position: number
  variant?: CalmTimelineEventVariant
  tooltip?: string
}

export interface CalmTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  labels: CalmTimelineLabel[]
  events: CalmTimelineEvent[]
  activeEventId?: string
  onEventSelect?: (eventItem: CalmTimelineEvent) => void
}

type CalmTimelinePositionStyle = React.CSSProperties & {
  '--fr-calm-timeline-position': string
}

const getPositionStyle = (position: number): CalmTimelinePositionStyle => ({
  '--fr-calm-timeline-position': `${position}%`,
})

export const CalmTimeline = React.forwardRef<HTMLDivElement, CalmTimelineProps>(
  function CalmTimeline(
    { labels, events, activeEventId, onEventSelect, className, ...rest },
    ref,
  ) {
    const classNames = ['fr-calm-timeline', className].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classNames} {...rest}>
        <div className="fr-calm-timeline__axis">
          {labels.map((timelineLabel) => (
            <span
              key={timelineLabel.id}
              className="fr-calm-timeline__label"
              style={getPositionStyle(timelineLabel.position)}
            >
              {timelineLabel.label}
            </span>
          ))}
          {events.map((timelineEvent) => {
            const resolvedVariant =
              timelineEvent.id === activeEventId
                ? 'active'
                : (timelineEvent.variant ?? 'neutral')
            const eventClassNames = [
              'fr-calm-timeline__event',
              `fr-calm-timeline__event--${resolvedVariant}`,
            ].join(' ')

            return (
              <button
                key={timelineEvent.id}
                type="button"
                className={eventClassNames}
                style={getPositionStyle(timelineEvent.position)}
                title={timelineEvent.tooltip ?? timelineEvent.label}
                aria-label={timelineEvent.tooltip ?? timelineEvent.label}
                aria-pressed={timelineEvent.id === activeEventId}
                onClick={() => onEventSelect?.(timelineEvent)}
              >
                <span className="fr-calm-timeline__dot" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>
    )
  },
)

CalmTimeline.displayName = 'CalmTimeline'
