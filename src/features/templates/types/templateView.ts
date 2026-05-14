import type { ReactNode } from 'react'
import type { TemplateSection, TemplateSectionType } from '@/types/template'

export type TemplateIconName =
  | 'upload'
  | 'document'
  | 'documentDashed'
  | 'x'
  | 'grip'
  | 'paragraph'
  | 'gridKV'
  | 'list'
  | 'photo'
  | 'checkCircle'
  | 'edit'

export type TemplateTypeMeta = {
  icon: TemplateIconName
  label: string
}

export type TemplateEmptyStateProps = {
  onUploadReports: () => void
}

export type TemplateFieldChipProps = {
  children: string
  neutral?: boolean
}

export type TemplateIconProps = {
  name: TemplateIconName
  className?: string
}

export type TemplateReviewStateProps = {
  sections: TemplateSection[]
  approved?: boolean
  actionErrorMessage: string | null
  isConfirming: boolean
  onLabelChange: (sectionId: string, label: string) => void
  onConfirm: () => void
}

export type TemplateSectionCardProps = {
  section: TemplateSection
  index: number
  readonly?: boolean
  feature?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
}

export type TemplateSectionGridProps = {
  sections: TemplateSection[]
  readonly?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
}

export type TemplateSummaryStat = {
  label: string
  value: string
}

export type TemplateSummaryHeaderProps = {
  title: ReactNode
  hint: string
  stats: TemplateSummaryStat[]
  action: ReactNode
}

export type TemplateTypePillProps = {
  type: TemplateSectionType
}

export type TemplateUploadingStateProps = {
  files: File[]
  actionErrorMessage: string | null
  onAddFiles: () => void
  onRemoveFile: (fileName: string) => void
  onCancel: () => void
  onStartAnalysis: () => void
}

export type TemplateConfigurationPageProps = {
  onOpenTemplate: () => void
  onAuthenticationExpired: () => void
}
