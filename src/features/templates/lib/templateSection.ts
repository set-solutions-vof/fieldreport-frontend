import type { TemplateSectionType, TemplateSectionWire } from '@/typing/template'

export function templateSectionRenderType(
  section: TemplateSectionWire,
): TemplateSectionType {
  return section.render_type ?? 'text_block'
}
