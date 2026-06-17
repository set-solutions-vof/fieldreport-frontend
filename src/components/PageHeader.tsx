import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: ReactNode
  eyebrowLabel?: ReactNode
  metadata?: ReactNode
  titleLeadingIcon?: ReactNode
  titleId?: string
  className?: string
}

export function PageHeader({
  title,
  eyebrowLabel,
  metadata,
  titleLeadingIcon,
  titleId,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={[
        '[margin-bottom:var(--fr-space-6)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrowLabel && (
        <span className="[display:block] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [letter-spacing:var(--fr-tracking-label)] [color:var(--fr-text-tertiary)] uppercase [margin-bottom:var(--fr-space-2)]">
          {eyebrowLabel}
        </span>
      )}
      <div className="flex items-center [gap:var(--fr-space-3)]">
        {titleLeadingIcon}
        <h1
          className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-extrabold)] [line-height:var(--fr-leading-tight)] [letter-spacing:var(--fr-tracking-title)] [color:var(--fr-text-primary)]"
          id={titleId}
        >
          {title}
        </h1>
      </div>
      {metadata && (
        <p className="[margin:var(--fr-space-2)_var(--fr-space-0)_var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)] [&_strong]:[font-weight:var(--fr-weight-medium)] [&_strong]:[color:var(--fr-text-primary)]">
          {metadata}
        </p>
      )}
    </div>
  )
}
