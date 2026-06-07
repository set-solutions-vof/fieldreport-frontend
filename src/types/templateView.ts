import type { DragEvent, ReactNode } from 'react'
import type {
  TemplateSectionGroup,
  TemplateSection,
  TemplateSectionType,
} from '@/types/template'
import type { TemplateSaveStatus } from './templateConfiguration'

export type TemplateEmptyStateProps = {
  onUploadReports: () => void
}

export type TemplateFailedStateProps = {
  errorMessage: string
  onTryAgain: () => void
}

export type TemplateSkeletonGridProps = {
  label?: string
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
  editing?: boolean
  showPreview?: boolean
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
  onGroupsChange: (sectionId: string, groups: TemplateSectionGroup[]) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  onConfirm: () => void
  onEdit?: () => void
  onCancel?: () => void
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
  onGroupsChange?: (sectionId: string, groups: TemplateSectionGroup[]) => void
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
  onGroupsChange?: (sectionId: string, groups: TemplateSectionGroup[]) => void
  onReorder?: (fromIndex: number, toIndex: number) => void
}

export type TemplateSectionFieldsProps = {
  sectionId: string
  sectionLabel: string
  renderType: TemplateSectionType
  fields: string[]
  groups: TemplateSectionGroup[] | null
  readonly: boolean
  visibleFieldsCount: number
  onFieldsChange?: (sectionId: string, fields: string[]) => void
  onGroupsChange?: (sectionId: string, groups: TemplateSectionGroup[]) => void
}

export type TemplateSectionGroupsProps = {
  sectionId: string
  sectionLabel: string
  fields: string[]
  groups: TemplateSectionGroup[] | null
  readonly: boolean
  onGroupsChange?: (sectionId: string, groups: TemplateSectionGroup[]) => void
}

export type TemplateSectionGroupEditorProps = {
  collapsed: boolean
  group: TemplateSectionGroup
  readonly: boolean
  onAddRow: (groupId: string) => void
  onRemoveGroup: (groupId: string) => void
  onRemoveRow: (groupId: string, rowIndex: number) => void
  onToggleGroup: (groupId: string) => void
  onUpdateGroupLabel: (groupId: string, label: string) => void
  onUpdateRow: (groupId: string, rowIndex: number, field: string) => void
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

export type TemplateTypeSelectorMenuPosition = {
  top: number
  left: number
}

export type TemplateSectionLabelEditorProps = {
  sectionId: string
  label: string
  readonly: boolean
  onLabelChange?: (sectionId: string, label: string) => void
}

export type UseTemplateSectionDragParameters = {
  sectionId: string
  index: number
  draggable: boolean
  onDragStart?: (index: number) => void
  onDragOver?: (index: number, position: 'before' | 'after') => void
  onDrop?: () => void
  onDragEnd?: () => void
}

export type UseTemplateSectionDragResult = {
  handleDragStart: (event: DragEvent<HTMLElement>) => void
  handleDragOver: (event: DragEvent<HTMLElement>) => void
  handleDrop: (event: DragEvent<HTMLElement>) => void
  handleDragEnd: (event: DragEvent<HTMLElement>) => void
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
  onOpenTeam: () => void
  onAuthenticationExpired: () => void
}
