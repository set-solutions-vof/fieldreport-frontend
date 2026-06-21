import type { PageHeaderProps } from '@/typing/pageHeaderView'
import { pageTitleClassName } from './pageTitleClassName'

export function PageHeader({
  title,
  eyebrowLabel,
  metadata,
  titleLeadingIcon,
  titleId,
  className,
  withBottomSpacing = true,
}: PageHeaderProps) {
  return (
    <div
      className={[
        withBottomSpacing && '[margin-bottom:var(--fr-space-6)]',
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
        <h1 className={pageTitleClassName} id={titleId}>
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
