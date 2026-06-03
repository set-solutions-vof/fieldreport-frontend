import type { ChangeEvent } from 'react'
import type { TextareaProps } from '@/design-system'
import type { ReportEvidenceItem } from './report'
import type { ReportSectionProps } from './reportDetailView'
import type { TemplateSectionGroup } from './template'

export type SectionContentEditorProps = {
  section: ReportSectionProps['section']
  content: string
  evidenceItemsById: Record<string, ReportEvidenceItem>
  onTextChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onStructuredChange: (content: string) => void
}

export type GroupedFieldsSectionEditorProps = {
  sectionLabel: string
  fields: string[]
  groups: TemplateSectionGroup[] | null
  content: string
  onContentChange: (content: string) => void
}

export type PhotoGridSectionEditorProps = {
  section: ReportSectionProps['section']
  content: string
  evidenceItemsById: Record<string, ReportEvidenceItem>
  onContentChange: (content: string) => void
}

export type PhotoGridTile = Pick<
  ReportEvidenceItem,
  'id' | 'content_summary'
>

export type ReportSectionImageProps = {
  evidenceItem: PhotoGridTile
}

export type AutoSizedTextareaProps = TextareaProps
