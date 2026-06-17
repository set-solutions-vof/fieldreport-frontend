import type { DragEvent, ReactNode } from 'react'
import type { AdminPageProps } from '@/typing/routes'
import type {
  TemplateSectionGroup,
  TemplateSection,
  TemplateSectionType,
} from '@/typing/template'

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
  hasUnsavedChanges?: boolean
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

export type TemplateSectionEditorProps = TemplateSectionGridProps

export type TemplateSectionSidebarProps = {
  sections: TemplateSection[]
  selectedSectionId: string
  readonly?: boolean
  draggingIndex: number | null
  dropTarget: { index: number; position: 'before' | 'after' } | null
  onSelectSection: (sectionId: string) => void
  onDragStart?: (index: number) => void
  onDragOver?: (index: number, position: 'before' | 'after') => void
  onDrop?: () => void
  onDragEnd?: () => void
}

export type TemplateSectionSidebarItemProps = {
  sectionId: string
  index: number
  label: string
  fieldCount: number
  isSelected: boolean
  readonly: boolean
  isDragging: boolean
  dropIndicator: 'before' | 'after' | null
  onSelect: () => void
  onDragStart?: (index: number) => void
  onDragOver?: (index: number, position: 'before' | 'after') => void
  onDrop?: () => void
  onDragEnd?: () => void
}

export type TemplateSectionDetailProps = {
  section: TemplateSection
  index: number
  readonly?: boolean
  onLabelChange?: (sectionId: string, label: string) => void
  onDelete?: (sectionId: string) => void
  onRenderTypeChange?: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  onFieldsChange?: (sectionId: string, fields: string[]) => void
  onGroupsChange?: (sectionId: string, groups: TemplateSectionGroup[]) => void
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
  titleLeadingIcon?: ReactNode
  metadata?: ReactNode
  action: ReactNode
  hasUnsavedChanges?: boolean
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
  prominent?: boolean
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

export type TemplateConfigurationPageProps = AdminPageProps
