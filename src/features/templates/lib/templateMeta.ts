import type { TemplateSectionType } from '@/types/template'
import type { TemplateIconName } from '../components/icons/TemplateIcon'

export function getTemplateTypeMeta(
  renderType: TemplateSectionType,
): TemplateTypeMeta {
  return templateTypeMeta[renderType]
}

export const templateTypeMeta: Record<TemplateSectionType, TemplateTypeMeta> = {
  text_block: {
    icon: 'paragraph',
    label: 'Tekstblok',
  },
  key_value_table: {
    icon: 'gridKV',
    label: 'Sleutel-waarde tabel',
  },
  measurement_table: {
    icon: 'list',
    label: 'Meettabel',
  },
  photo_grid: {
    icon: 'photo',
    label: 'Fotoraster',
  },
}

type TemplateTypeMeta = {
  icon: TemplateIconName
  label: string
}
