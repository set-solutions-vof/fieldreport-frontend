import { translations } from '@/lib/translations'
import type { TimelineStripMetaProps } from '@/typing/reportDetailView'

export function TimelineStripMeta({ range, summary }: TimelineStripMetaProps) {
  return (
    <div className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-1)]">
      <span className="[font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-tertiary)] [letter-spacing:0.08em] uppercase">
        {translations.report_detail.timeline.label}
      </span>
      <span className="[font-family:var(--fr-font-mono)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">{range}</span>
      <span className="[font-size:var(--fr-text-xs)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">{summary}</span>
    </div>
  )
}
