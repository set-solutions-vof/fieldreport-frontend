import type { ReactNode } from 'react'
import type { TemplateSection, TemplateSectionType } from '@/types/template'
import type { TemplateSaveStatus } from './templateConfiguration'

export type TemplateEmptyStateProps = {
  onUploadReports: () => void
}

export type TemplateFailedStateProps = {
  errorMessage: string
  onTryAgain: () => void
}

export type TemplateFieldChipProps = {
  children: string
  neutral?: boolean
  onRemove?: () => void
  removeLabel?: string
}

export type TemplateReviewStateProps = {
  sections: TemplateSection[]
  approved?: boolean
  actionErrorMessage: string | null
  isConfirming: boolean
  saveStatus?: TemplateSaveStatus
  onLabelChange: (sectionId: string, label: string) => void
  onDelete: (sectionId: string) => void
  onRenderTypeChange: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  onFieldsChange: (sectionId: string, fields: string[]) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  onConfirm: () => void
}

export type TemplateSectionCardProps = {
  section: TemplateSection
  index: number
  readonly?: boolean
  feature?: boolean
  isDuplicatePhotoGrid?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
  onDelete?: (sectionId: string) => void
  onRenderTypeChange?: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  onFieldsChange?: (sectionId: string, fields: string[]) => void
  draggable?: boolean
  isDragging?: boolean
  dropIndicator?: 'before' | 'after' | null
  onDragStart?: (index: number) => void
  onDragOver?: (index: number, position: 'before' | 'after') => void
  onDrop?: () => void
  onDragEnd?: () => void
}

export type TemplateSectionGridProps = {
  sections: TemplateSection[]
  readonly?: boolean
  isDuplicatePhotoGrid?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
  onDelete?: (sectionId: string) => void
  onRenderTypeChange?: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  onFieldsChange?: (sectionId: string, fields: string[]) => void
  onReorder?: (fromIndex: number, toIndex: number) => void
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
  saveStatus?: TemplateSaveStatus
}

export type TemplateTypePillProps = {
  type: TemplateSectionType
}

export type TemplateTypeSelectorProps = {
  type: TemplateSectionType
  readonly?: boolean
  ariaLabel: string
  onChange: (renderType: TemplateSectionType) => void
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
