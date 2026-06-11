import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from 'react'
import type { MetadataField } from './template'

export type NewReportPageProps = {
  onAuthenticationExpired: () => void
  onReportCreated: (reportId: string) => void
  onCancel: () => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  onOpenProfile: () => void
  onLogout: () => void
  totalReportsCount: number
}

export type FileChipProps = {
  file: File
  onRemove: (name: string) => void
}

export type NewReportCompletionProgressProps = {
  metadataFields: MetadataField[]
  metadataValue: Record<string, string | null>
}

export type NewReportProjectDetailsCardProps = {
  fields: MetadataField[]
  inspectorName: string
  isSubmitting: boolean
  isTemplateError: boolean
  isTemplateLoading: boolean
  metadataValue: Record<string, string | null>
  showMetadataErrors: boolean
  templateErrorMessage: string | null
  onMetadataChange: (value: Record<string, string | null>) => void
  onRetryTemplate: () => void
}

export type DynamicMetadataFormProps = {
  fields: MetadataField[]
  value: Record<string, string | null>
  onChange: (value: Record<string, string | null>) => void
  showErrors: boolean
}

export type NewReportFilesCardProps = {
  audioFiles: File[]
  audioInputRef: RefObject<HTMLInputElement | null>
  audioError?: string
  photoFiles: File[]
  photosInputRef: RefObject<HTMLInputElement | null>
  onAddAudioFiles: (files: File[]) => void
  onAddPhotoFiles: (files: File[]) => void
  onRemoveAudioFile: (name: string) => void
  onRemovePhotoFile: (name: string) => void
}

export type NewReportUploadZoneHandlers = {
  onDragOver: (event: DragEvent<HTMLElement>) => void
  onDrop: (event: DragEvent<HTMLElement>) => void
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void
  onOpenPicker: () => void
}

export type NewReportAudioUploadZoneProps = {
  files: File[]
  error?: string
  onRemoveFile: (name: string) => void
  handlers: NewReportUploadZoneHandlers
}

export type NewReportPhotosUploadZoneProps = {
  files: File[]
  onRemoveFile: (name: string) => void
  handlers: NewReportUploadZoneHandlers
}

export type NewReportContextCardProps = {
  extraContext: string
  isSubmitting: boolean
  onExtraContextChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}
