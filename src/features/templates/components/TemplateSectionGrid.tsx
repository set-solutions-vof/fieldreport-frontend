import type { TemplateSectionGridProps } from '../types/templateView'
import { templateSectionRenderType } from '../lib/templateSection'
import { TemplateSectionCard } from './TemplateSectionCard'

export function TemplateSectionGrid({
  sections,
  readonly = false,
  onLabelChange,
}: TemplateSectionGridProps) {
  return (
    <div className="fr-template-section-grid">
      {sections.map((section, index) => (
        <TemplateSectionCard
          key={section.id}
          section={section}
          index={index}
          readonly={readonly}
          feature={templateSectionRenderType(section) === 'key_value_table'}
          onLabelChange={onLabelChange}
        />
      ))}
    </div>
  )
}
