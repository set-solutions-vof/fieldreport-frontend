import { translations } from '@/lib/translations'
import type { TemplateSummaryHeaderProps } from '@/types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSummaryHeader({
  title,
  hint,
  stats,
  action,
  hasUnsavedChanges = false,
}: TemplateSummaryHeaderProps) {
  return (
    <header className="flex shrink-0 items-center [gap:var(--fr-space-6)] [padding:var(--fr-space-5)_var(--fr-space-8)] [background:var(--fr-surface)] [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)]">
      <div className="[min-width:var(--fr-space-0)] flex-1 [&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-md)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_p]:[margin:var(--fr-space-1)_var(--fr-space-0)_var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-sm)] [&_p]:[line-height:var(--fr-leading-snug)] [&_p]:[color:var(--fr-text-secondary)]">
        <h1>{title}</h1>
        <p>{hint}</p>
      </div>
      <div className="relative">
        <dl className="flex [gap:var(--fr-space-6)] [margin:var(--fr-space-0)]">
          {stats.map((stat) => (
            <div className="[&_dd]:[font-variant-numeric:tabular-nums] [&_dt]:[font-size:var(--fr-text-xs)] [&_dt]:[font-weight:var(--fr-weight-medium)] [&_dt]:[line-height:var(--fr-leading-snug)] [&_dt]:[color:var(--fr-text-tertiary)] [&_dt]:uppercase flex flex-col [gap:var(--fr-space-1)] [&_dd]:[margin:var(--fr-space-0)] [&_dd]:[font-size:var(--fr-text-lg)] [&_dd]:[font-weight:var(--fr-weight-semibold)] [&_dd]:[line-height:var(--fr-leading-tight)] [&_dd]:[color:var(--fr-text-primary)]" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        {hasUnsavedChanges && (
          <span className="absolute [top:50%] [left:calc(100%_+_var(--fr-space-3))] inline-flex items-center [gap:var(--fr-space-2)] [color:var(--fr-text-tertiary)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [line-height:var(--fr-leading-snug)] whitespace-nowrap [transform:translateY(-50%)]">
            <TemplateIcon
              name="edit"
              className="block [width:var(--fr-space-4)] [height:var(--fr-space-4)] [stroke-width:1.6] [width:var(--fr-space-3)] [height:var(--fr-space-3)]"
            />
            {translations.template.review.unsaved_changes_label}
          </span>
        )}
      </div>
      <div className="hidden">{action}</div>
    </header>
  )
}
