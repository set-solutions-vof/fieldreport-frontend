import type { TemplateSectionGroup, TemplateSection } from '@/types/template'

export type TemplatePreviewPanelProps = {
  sections: TemplateSection[]
}

export type TemplatePreviewContentProps = {
  section: TemplateSection
}

export type TemplateKeyValuePreviewProps = {
  section: TemplateSection
}

export type TemplateGroupedTablePreviewProps = {
  section: TemplateSection
}

export type TemplateSectionGroupListProps = {
  groups: TemplateSectionGroup[]
  compact?: boolean
}

export type TemplateSectionGroupProps = {
  title: string
  rows: string[]
  compact?: boolean
}
