import type { TemplateSectionType, TemplateSectionWire } from '@/types/template'

export function templateSectionRenderType(
  section: TemplateSectionWire,
): TemplateSectionType {
  return section.render_type ?? section.type ?? 'text_block'
}
