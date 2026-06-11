import type { ActiveTemplate, MetadataField } from './template'

export type NewReportFormState = {
  metadata: Record<string, string | null>
  audioFiles: File[]
  photoFiles: File[]
  extraContext: string
}

export type NewReportFormErrors = {
  audioFiles?: string
  submit?: string
}

export type NewReportTextField = 'extraContext'

export type UseNewReportParameters = {
  onAuthenticationExpired: () => void
  onSuccess: (reportId: string) => void
}

export type UseNewReportResult = {
  form: NewReportFormState
  errors: NewReportFormErrors
  isSubmitting: boolean
  showMetadataErrors: boolean
  updateMetadata: (metadata: Record<string, string | null>) => void
  updateField: (field: NewReportTextField, value: string) => void
  addAudioFiles: (files: File[]) => void
  removeAudioFile: (name: string) => void
  addPhotoFiles: (files: File[]) => void
  removePhotoFile: (name: string) => void
  submit: (metadataFields: MetadataField[]) => Promise<void>
}

export type CreateInspectionResponse = {
  report_id: string
  status: 'generating'
}

export type UseActiveTemplateParameters = {
  onAuthenticationExpired: () => void
}

export type UseActiveTemplateResult = {
  template: ActiveTemplate | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}
