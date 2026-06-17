import { LogoMark } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { TemplateSkeletonGridProps } from '@/types/templateView'

const skeletonCards = Array.from({ length: 7 }, (_, index) => index)

export function TemplateSkeletonGrid({
  label = translations.template.processing.label,
}: TemplateSkeletonGridProps) {
  return (
    <div className="flex flex-1 flex-col items-center [padding:var(--fr-space-9)_var(--fr-space-6)_var(--fr-space-6)]">
      <div className="flex items-center [gap:var(--fr-space-3)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
        <LogoMark variant="accent" size={28} />
        <span>
          {label}
          <span className="inline-block overflow-hidden [width:0] [vertical-align:bottom] [animation:frTemplateDots_1400ms_steps(4)_infinite]">...</span>
        </span>
      </div>
      <div className="grid [width:min(_calc(var(--fr-space-15)_*_4_+_var(--fr-space-9)),_calc(100%_-_var(--fr-space-12))_)] [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [align-content:start] [gap:var(--fr-space-3)] [margin-top:var(--fr-space-7)]">
        {skeletonCards.map((skeletonCard) => (
          <div
            className={[
              'relative [height:calc(var(--fr-space-9)_+_var(--fr-space-2))] overflow-hidden [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [animation:frTemplateFadeUp_500ms_var(--fr-ease-out)_forwards]',
              skeletonCard === 0 && '[grid-column:span_2]',
            ]
              .filter(Boolean)
              .join(' ')}
            key={skeletonCard}
            style={{ animationDelay: `${skeletonCard * 80}ms` }}
          >
            <span className="absolute [inset:var(--fr-space-0)] [background:linear-gradient(_90deg,_var(--fr-color-neutral-100),_var(--fr-color-neutral-50),_var(--fr-color-neutral-100)_)] [background-size:200%_100%] [animation:frTemplateShimmer_1400ms_linear_infinite]" />
            <span className="absolute [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [top:calc(var(--fr-space-4)_+_var(--fr-space-1)_/_2)] [left:var(--fr-space-4)] [width:calc(var(--fr-space-4)_-_var(--fr-space-1)_/_2)] [height:calc(var(--fr-space-4)_-_var(--fr-space-1)_/_2)]" />
            <span className="absolute [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [top:var(--fr-space-5)] [left:var(--fr-space-7)] [width:38%] [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)]" />
            <span className="absolute [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [top:var(--fr-space-5)] [left:var(--fr-space-7)] [width:38%] [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [top:calc(var(--fr-space-7)_+_var(--fr-space-1)_/_2)] [width:26%] [height:var(--fr-space-2)] [opacity:0.7]" />
          </div>
        ))}
      </div>
    </div>
  )
}
