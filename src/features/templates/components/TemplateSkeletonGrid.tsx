import { LogoMark } from '@/design-system'

const skeletonCards = Array.from({ length: 7 }, (_, index) => index)

export function TemplateSkeletonGrid() {
  return (
    <div className="fr-template-processing">
      <div className="fr-template-processing__label">
        <LogoMark variant="accent" size={28} />
        <span>
          Analysing your reports
          <span className="fr-template-ellipsis">...</span>
        </span>
      </div>
      <div className="fr-template-skeleton-grid">
        {skeletonCards.map((skeletonCard) => (
          <div
            className={[
              'fr-template-skeleton-card',
              skeletonCard === 0 && 'fr-template-skeleton-card--feature',
            ]
              .filter(Boolean)
              .join(' ')}
            key={skeletonCard}
            style={{ animationDelay: `${skeletonCard * 80}ms` }}
          >
            <span className="fr-template-shimmer" />
            <span className="fr-template-skeleton-card__square" />
            <span className="fr-template-skeleton-card__line" />
            <span className="fr-template-skeleton-card__line fr-template-skeleton-card__line--short" />
          </div>
        ))}
      </div>
    </div>
  )
}
