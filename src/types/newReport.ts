export type InvestigationType = 'lekdetectie' | 'bouwkundig' | 'droogtechniek'

export type ClientType =
  | 'particulier'
  | 'verzekeraar'
  | 'juridisch'
  | 'aannemer'

export type NewReportFormState = {
  address: string
  inspectionDate: string
  investigationType: InvestigationType | ''
  clientType: ClientType | ''
  referenceNumber: string
  audioFiles: File[]
  photoFiles: File[]
  extraContext: string
}

export type NewReportFormErrors = {
  address?: string
  inspectionDate?: string
  investigationType?: string
  clientType?: string
  audioFiles?: string
  submit?: string
}

export type NewReportTextField = keyof Pick<
  NewReportFormState,
  | 'address'
  | 'inspectionDate'
  | 'investigationType'
  | 'clientType'
  | 'referenceNumber'
  | 'extraContext'
>

export type UseNewReportParameters = {
  onAuthenticationExpired: () => void
  onSuccess: (reportId: string) => void
}

export type UseNewReportResult = {
  form: NewReportFormState
  errors: NewReportFormErrors
  isSubmitting: boolean
  updateField: (field: NewReportTextField, value: string) => void
  addAudioFiles: (files: File[]) => void
  removeAudioFile: (name: string) => void
  addPhotoFiles: (files: File[]) => void
  removePhotoFile: (name: string) => void
  submit: () => Promise<void>
}

export type CreateInspectionResponse = {
  report_id: string
  status: 'processing'
}
