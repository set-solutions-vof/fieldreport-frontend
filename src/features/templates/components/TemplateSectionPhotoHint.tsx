import { TemplateIcon } from './icons/TemplateIcon'

export function TemplateSectionPhotoHint() {
  return (
    <p className="fr-template-section-card__photo-hint">
      <TemplateIcon
        name="photo"
        className="fr-template-section-card__photo-hint-icon"
      />
      Deze sectie bevat foto's die tijdens de inspectie zijn gemaakt.
    </p>
  )
}
