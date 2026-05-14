import type { TemplateSection } from '@/types/template'
import { TemplateSectionCard } from './TemplateSectionCard'

type TemplateSectionGridProps = {
  sections: TemplateSection[]
  readonly?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
}

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
          feature={section.type === 'kv'}
          onLabelChange={onLabelChange}
        />
      ))}
    </div>
  )
}
