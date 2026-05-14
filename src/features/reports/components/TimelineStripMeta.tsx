import { translations } from '@/lib/translations'
import type { TimelineStripMetaProps } from '../types/reportDetailView'

export function TimelineStripMeta({ range, summary }: TimelineStripMetaProps) {
  return (
    <div className="fr-timeline-strip-meta">
      <span className="fr-timeline-strip-label">
        {translations.report_detail.timeline.label}
      </span>
      <span className="fr-timeline-strip-range">{range}</span>
      <span className="fr-timeline-strip-sub">{summary}</span>
    </div>
  )
}
