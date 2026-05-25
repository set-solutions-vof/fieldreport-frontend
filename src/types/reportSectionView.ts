import type { ChangeEvent } from 'react'
import type { TextareaProps } from '@/design-system'
import type { ReportTimelineItem } from './report'
import type { ReportSectionProps } from './reportDetailView'
import type { TemplateSectionGroup } from './template'

export type SectionContentEditorProps = {
  section: ReportSectionProps['section']
  content: string
  timelineItemsById: Record<string, ReportTimelineItem>
  onTextChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onStructuredChange: (content: string) => void
}

export type KeyValueSectionEditorProps = {
  fields: string[]
  content: string
  onContentChange: (content: string) => void
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
  timelineItemsById: Record<string, ReportTimelineItem>
  onContentChange: (content: string) => void
}

export type PhotoGridTile = Pick<
  ReportTimelineItem,
  'id' | 'content_summary' | 'image_url' | 'thumbnail_url'
>

export type ReportSectionImageProps = {
  timelineItem: PhotoGridTile
}

export type AutoSizedTextareaProps = TextareaProps
