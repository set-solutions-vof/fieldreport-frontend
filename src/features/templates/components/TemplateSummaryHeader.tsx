import { translations } from '@/lib/translations'
import type { TemplateSummaryHeaderProps } from '../types/templateView'
import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSummaryHeader({
  title,
  hint,
  stats,
  action,
  saveStatus = 'idle',
}: TemplateSummaryHeaderProps) {
  return (
    <header className="fr-template-summary">
      <div className="fr-template-summary__title">
        <h1>{title}</h1>
        <p>{hint}</p>
      </div>
      <div className="fr-template-summary__stats-shell">
        <dl className="fr-template-summary__stats">
          {stats.map((stat) => (
            <div className="fr-template-summary__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <span
          className={[
            'fr-template-summary__save-status',
            saveStatus === 'saved' && 'fr-template-summary__save-status--saved',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <TemplateIcon
            name="checkCircle"
            className="fr-template-summary__save-status-icon"
          />
          {translations.template.review.saved_label}
        </span>
      </div>
      <div className="fr-template-summary__action">{action}</div>
    </header>
  )
}
