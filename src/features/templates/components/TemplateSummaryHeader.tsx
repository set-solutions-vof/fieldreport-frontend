import type { ReactNode } from 'react'

export type TemplateSummaryStat = {
  label: string
  value: string
}

type TemplateSummaryHeaderProps = {
  title: ReactNode
  hint: string
  stats: TemplateSummaryStat[]
  action: ReactNode
}

export function TemplateSummaryHeader({
  title,
  hint,
  stats,
  action,
}: TemplateSummaryHeaderProps) {
  return (
    <header className="fr-template-summary">
      <div className="fr-template-summary__title">
        <h1>{title}</h1>
        <p>{hint}</p>
      </div>
      <dl className="fr-template-summary__stats">
        {stats.map((stat) => (
          <div className="fr-template-summary__stat" key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <div className="fr-template-summary__action">{action}</div>
    </header>
  )
}
