import type { ChangeEvent, DragEvent, KeyboardEvent, RefObject } from 'react'
import type {
  ClientType,
  InvestigationType,
  NewReportFormErrors,
  NewReportFormState,
  NewReportTextField,
} from './newReport'

export type NewReportPageProps = {
  onAuthenticationExpired: () => void
  onReportCreated: (reportId: string) => void
  onCancel: () => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  totalReportsCount: number
}

export type FileChipProps = {
  file: File
  onRemove: (name: string) => void
}

export type NewReportCompletionProgressProps = {
  errors: NewReportFormErrors
  form: NewReportFormState
}

export type NewReportProjectDetailsCardProps = {
  clientTypes: ClientType[]
  errors: NewReportFormErrors
  form: NewReportFormState
  investigationTypes: InvestigationType[]
  isSubmitting: boolean
  onFieldChange: (field: NewReportTextField, value: string) => void
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
