import type { TemplateSectionType } from '@/types/template'
import type { TemplateTypeMeta } from '../types/templateView'

export const templateTypeMeta: Record<TemplateSectionType, TemplateTypeMeta> = {
  text: {
    icon: 'paragraph',
    label: 'Tekstblok',
  },
  kv: {
    icon: 'gridKV',
    label: 'Sleutel-waarde tabel',
  },
  measure: {
    icon: 'list',
    label: 'Meettabel',
  },
  photo: {
    icon: 'photo',
    label: 'Fotoraster',
  },
}
