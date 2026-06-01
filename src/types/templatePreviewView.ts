import type { TemplateSectionGroup, TemplateSection } from '@/types/template'

export type TemplatePreviewPanelProps = {
  sections: TemplateSection[]
}

export type TemplatePreviewContentProps = {
  section: TemplateSection
}

export type TemplateKeyValuePreviewProps = {
  fields: string[] | null
}

export type TemplateGroupedTablePreviewProps = {
  section: TemplateSection
}

export type TemplateSectionGroupListProps = {
  groups: TemplateSectionGroup[]
}

export type TemplateSectionGroupProps = {
  title: string
  rows: string[]
}
