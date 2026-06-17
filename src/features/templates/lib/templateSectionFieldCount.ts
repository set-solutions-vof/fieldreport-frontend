import type { TemplateSection } from '@/typing/template'
import { templateSectionRenderType } from './templateSection'

export function getTemplateSectionFieldCount(section: TemplateSection): number {
  const renderType = templateSectionRenderType(section)

  if (
    renderType !== 'key_value_table' &&
    renderType !== 'measurement_table'
  ) {
    return 0
  }

  if (section.groups !== null && section.groups !== undefined) {
    return section.groups.reduce(
      (fieldCount, group) => fieldCount + group.fields.length,
      0,
    )
  }

  return section.fields?.length ?? 0
}
