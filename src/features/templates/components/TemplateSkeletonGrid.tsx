import { LogoMark } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { TemplateSkeletonGridProps } from '@/typing/templateView'
import { templateSidebarWidthClass } from '../lib/templateLayout'

const skeletonSidebarItems = Array.from({ length: 6 }, (_, index) => index)
const skeletonFieldCards = Array.from({ length: 4 }, (_, index) => index)

export function TemplateSkeletonGrid({
  label = translations.template.processing.label,
}: TemplateSkeletonGridProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex overflow-hidden [border-bottom:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface)]">
        <div
          className={`flex shrink-0 items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-5)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)] ${templateSidebarWidthClass}`}
        >
          <LogoMark variant="accent" size={28} />
          <span>
            {label}
            <span className="inline-block overflow-hidden [width:0] [vertical-align:bottom] [animation:frTemplateDots_1400ms_steps(4)_infinite]">
              ...
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex shrink-0 flex-col [gap:var(--fr-space-2)] [padding:var(--fr-space-4)_var(--fr-space-3)] [border-right:var(--fr-border-width-sm)_solid_var(--fr-border)] [background:var(--fr-surface)] ${templateSidebarWidthClass}`}
        >
          {skeletonSidebarItems.map((item) => (
            <div
              key={item}
              className="relative [height:var(--fr-space-9)] overflow-hidden [background:var(--fr-color-neutral-50)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [animation:frTemplateFadeUp_500ms_var(--fr-ease-out)_forwards]"
              style={{ animationDelay: `${item * 80}ms` }}
            >
              <span className="absolute [inset:var(--fr-space-0)] [background:linear-gradient(_90deg,_var(--fr-color-neutral-100),_var(--fr-color-neutral-50),_var(--fr-color-neutral-100)_)] [background-size:200%_100%] [animation:frTemplateShimmer_1400ms_linear_infinite]" />
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col [gap:var(--fr-space-3)] [padding:var(--fr-space-6)_var(--fr-space-8)]">
          {skeletonFieldCards.map((card) => (
            <div
              key={card}
              className="relative [height:calc(var(--fr-space-9)_+_var(--fr-space-2))] overflow-hidden [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [animation:frTemplateFadeUp_500ms_var(--fr-ease-out)_forwards]"
              style={{ animationDelay: `${card * 80}ms` }}
            >
              <span className="absolute [inset:var(--fr-space-0)] [background:linear-gradient(_90deg,_var(--fr-color-neutral-100),_var(--fr-color-neutral-50),_var(--fr-color-neutral-100)_)] [background-size:200%_100%] [animation:frTemplateShimmer_1400ms_linear_infinite]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
