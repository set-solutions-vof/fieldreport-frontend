import type { TemplateSectionType } from '@/types/template'
import type { TemplateIconName } from '../components/TemplateIcon'

type TemplateTypeMeta = {
  icon: TemplateIconName
  label: string
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
