import type { TemplateSectionType } from '@/typing/template'
import type { TemplateTypeMeta } from '@/typing/templateIcon'

export function getTemplateTypeMeta(
  renderType: TemplateSectionType,
): TemplateTypeMeta {
  return templateTypeMeta[renderType]
}

export const templateTypeMeta: Record<TemplateSectionType, TemplateTypeMeta> = {
  text_block: {
    icon: 'paragraph',
    label: 'Tekstblok',
    description: "Vrije tekst, alinea's en beschrijvingen",
  },
  key_value_table: {
    icon: 'gridKV',
    label: 'Sleutel-waarde tabel',
    description: 'Velden met een label en een waarde',
  },
  measurement_table: {
    icon: 'list',
    label: 'Meettabel',
    description: 'Rijen met meetmethoden en resultaten',
  },
  photo_grid: {
    icon: 'photo',
    label: 'Fotoraster',
    description: "Foto's die tijdens de inspectie zijn gemaakt",
  },
}

export const templateTypeOptions: TemplateSectionType[] = [
  'text_block',
  'key_value_table',
  'measurement_table',
  'photo_grid',
]
