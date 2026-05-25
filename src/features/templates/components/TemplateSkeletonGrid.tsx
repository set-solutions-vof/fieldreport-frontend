import { LogoMark } from '@/design-system'
import '../pages/TemplateSectionGroupsState.css'
import '../pages/TemplateSummaryState.css'
import '../pages/TemplateUploadState.css'

const skeletonCards = Array.from({ length: 7 }, (_, index) => index)

type TemplateSkeletonGridProps = {
  label?: string
}

export function TemplateSkeletonGrid({
  label = 'Analysing your reports',
}: TemplateSkeletonGridProps) {
  return (
    <div className="fr-template-processing">
      <div className="fr-template-processing__label">
        <LogoMark variant="accent" size={28} />
        <span>
          {label}
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
