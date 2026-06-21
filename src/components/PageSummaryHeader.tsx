import type { PageSummaryHeaderProps } from '@/typing/pageHeaderView'
import { pageTitleClassName } from './pageTitleClassName'

export function PageSummaryHeader({
  title,
  titleLeadingIcon,
  metadata,
  metadataBadges,
  hint,
  action,
}: PageSummaryHeaderProps) {
  const showMetadataRow =
    (metadata !== null && metadata !== undefined && metadata !== '') ||
    (metadataBadges !== null && metadataBadges !== undefined) ||
    (action !== null && action !== undefined)

  return (
    <section className="flex [width:100%] flex-col [gap:var(--fr-space-3)]">
      <div className="flex [min-width:var(--fr-space-0)] items-center [gap:var(--fr-space-3)]">
        {titleLeadingIcon}
        <h1 className={pageTitleClassName}>{title}</h1>
      </div>
      {showMetadataRow ? (
        <div className="flex items-center justify-between [gap:var(--fr-space-4)]">
          <div className="flex [min-width:var(--fr-space-0)] flex-wrap items-center [column-gap:var(--fr-space-3)] [row-gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
            {metadata !== null && metadata !== undefined && metadata !== '' ? (
              <span>{metadata}</span>
            ) : null}
            {metadataBadges}
          </div>
          {action !== null && action !== undefined ? (
            <div className="flex shrink-0 items-center [gap:var(--fr-space-2)]">
              {action}
            </div>
          ) : null}
        </div>
      ) : null}
      {hint !== null && hint !== undefined && hint !== '' ? (
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
          {hint}
        </p>
      ) : null}
    </section>
  )
}
