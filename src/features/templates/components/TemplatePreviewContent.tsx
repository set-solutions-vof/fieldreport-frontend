import type { TemplatePreviewContentProps } from '@/types/templatePreviewView'
import { TemplateIcon } from './icons/TemplateIcon'
import {
  GroupedTablePreview,
  KeyValuePreview,
} from './TemplatePreviewSectionContent'
import './TemplatePreviewContent.css'

const photoPreviewIndexes = Array.from(
  { length: 4 },
  (_, photoPreviewIndex) => photoPreviewIndex,
)

export function TemplatePreviewContent({
  section,
}: TemplatePreviewContentProps) {
  if (section.render_type === 'text_block') {
    return (
      <div className="fr-template-preview-panel__text-lines">
        <span className="fr-template-preview-panel__placeholder-line" />
        <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--wide" />
        <span className="fr-template-preview-panel__placeholder-line fr-template-preview-panel__placeholder-line--short" />
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
    <div className="fr-template-preview-panel__photo-grid">
      {photoPreviewIndexes.map((photoPreviewIndex) => (
        <figure
          className="fr-template-preview-panel__photo-preview"
          key={photoPreviewIndex}
        >
          <div className="fr-template-preview-panel__photo-tile">
            <TemplateIcon
              name="photo"
              className="fr-template-preview-panel__photo-icon"
            />
          </div>
          <figcaption aria-label="Voorbeeld bijschrift">
            <span className="fr-template-preview-panel__photo-caption-line" />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
