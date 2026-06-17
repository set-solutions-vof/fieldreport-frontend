import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionPhotoHint() {
  return (
    <p className="inline-flex items-center [gap:var(--fr-space-2)] [margin:var(--fr-space-0)] [color:var(--fr-text-tertiary)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)]">
      <TemplateIcon
        name="photo"
        className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 block [stroke-width:1.6]"
      />
      Deze sectie bevat foto's die tijdens de inspectie zijn gemaakt.
    </p>
  )
}
