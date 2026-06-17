import type { TemplatePreviewContentProps } from '@/typing/templatePreviewView'
import { TemplateIcon } from './icons/TemplateIcon'
import {
  GroupedTablePreview,
  KeyValuePreview,
} from './TemplatePreviewSectionContent'

const photoPreviewIndexes = Array.from(
  { length: 4 },
  (_, photoPreviewIndex) => photoPreviewIndex,
)

export function TemplatePreviewContent({
  section,
}: TemplatePreviewContentProps) {
  if (section.render_type === 'text_block') {
    return (
      <div className="flex flex-col [gap:var(--fr-space-2)]">
        <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)]" />
        <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:95%]" />
        <span className="block w-full [height:calc(var(--fr-space-3)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [width:60%]" />
      </div>
    )
  }

  if (section.render_type === 'key_value_table') {
    return <KeyValuePreview section={section} />
  }

  if (section.render_type === 'measurement_table') {
    return <GroupedTablePreview section={section} />
  }

  return (
    <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
      {photoPreviewIndexes.map((photoPreviewIndex) => (
        <figure
          className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-2)] [margin:var(--fr-space-0)] [&_figcaption]:flex [&_figcaption]:flex-col [&_figcaption]:[gap:var(--fr-space-1)]"
          key={photoPreviewIndex}
        >
          <div className="flex items-center justify-center [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)] [aspect-ratio:3_/_2]">
            <TemplateIcon
              name="photo"
              className="[width:var(--fr-space-5)] [height:var(--fr-space-5)] [color:var(--fr-text-tertiary)] [stroke-width:1.4]"
            />
          </div>
          <figcaption aria-label="Voorbeeld bijschrift">
            <span className="block [width:86%] [height:calc(var(--fr-space-2)_-_var(--fr-space-1)_/_2)] [background:var(--fr-color-neutral-100)] [border-radius:var(--fr-radius-md)]" />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
