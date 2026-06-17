import { translations } from '@/lib/translations'
import type { TimelineStripStatsProps } from '@/typing/reportDetailView'

export function TimelineStripStats({
  approvedCount,
  openCount,
  sectionCount,
}: TimelineStripStatsProps) {
  return (
    <div className="flex justify-end [gap:var(--fr-space-5)]">
      <div className="[&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-medium)] [&_span]:[line-height:var(--fr-leading-snug)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[letter-spacing:0.08em] [&_span]:uppercase flex flex-col items-end [gap:var(--fr-space-1)] text-right [&_strong]:[font-size:var(--fr-text-md)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_strong]:[font-variant-numeric:tabular-nums] [&_small]:[margin-left:var(--fr-space-1)] [&_small]:[font-size:var(--fr-text-xs)] [&_small]:[font-weight:var(--fr-weight-medium)] [&_small]:[color:var(--fr-text-tertiary)]">
        <span>{translations.report_detail.timeline.approved}</span>
        <strong>
          {approvedCount}
          <small>
            / {sectionCount}{' '}
            {translations.report_detail.timeline.sections_suffix}
          </small>
        </strong>
      </div>
      <div className="[&_span]:[font-size:var(--fr-text-xs)] [&_span]:[font-weight:var(--fr-weight-medium)] [&_span]:[line-height:var(--fr-leading-snug)] [&_span]:[color:var(--fr-text-tertiary)] [&_span]:[letter-spacing:0.08em] [&_span]:uppercase flex flex-col items-end [gap:var(--fr-space-1)] text-right [&_strong]:[font-size:var(--fr-text-md)] [&_strong]:[font-weight:var(--fr-weight-semibold)] [&_strong]:[line-height:var(--fr-leading-snug)] [&_strong]:[color:var(--fr-text-primary)] [&_strong]:[font-variant-numeric:tabular-nums] [&_small]:[margin-left:var(--fr-space-1)] [&_small]:[font-size:var(--fr-text-xs)] [&_small]:[font-weight:var(--fr-weight-medium)] [&_small]:[color:var(--fr-text-tertiary)]">
        <span>{translations.report_detail.timeline.review}</span>
        <strong>
          {openCount}
          <small>{translations.report_detail.timeline.open}</small>
        </strong>
      </div>
    </div>
  )
}
