import { translations } from '@/lib/translations'
import type { TimelineStripStatsProps } from '../types/reportDetailView'

export function TimelineStripStats({
  approvedCount,
  openCount,
  sectionCount,
}: TimelineStripStatsProps) {
  return (
    <div className="fr-timeline-strip-stats">
      <div className="fr-timeline-strip-stat">
        <span>{translations.report_detail.timeline.approved}</span>
        <strong>
          {approvedCount}
          <small>
            / {sectionCount}{' '}
            {translations.report_detail.timeline.sections_suffix}
          </small>
        </strong>
      </div>
      <div className="fr-timeline-strip-stat">
        <span>{translations.report_detail.timeline.review}</span>
        <strong>
          {openCount}
          <small>{translations.report_detail.timeline.open}</small>
        </strong>
      </div>
    </div>
  )
}
