import { useState } from 'react'
import { createInspection } from '@/lib/api/inspections'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type {
  NewReportFormErrors,
  NewReportFormState,
  NewReportTextField,
  UseNewReportParameters,
  UseNewReportResult,
} from '@/typing/newReport'
import type { MetadataField } from '@/typing/template'

const emptyForm: NewReportFormState = {
  metadata: {},
  audioFiles: [],
  photoFiles: [],
  extraContext: '',
}

export function useNewReport({
  onAuthenticationExpired,
  onSuccess,
}: UseNewReportParameters): UseNewReportResult {
  const [form, setForm] = useState<NewReportFormState>(emptyForm)
  const [errors, setErrors] = useState<NewReportFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showMetadataErrors, setShowMetadataErrors] = useState(false)

  function clearSubmitError(): void {
    setErrors((currentErrors) => ({
      ...currentErrors,
      submit: undefined,
    }))
  }

  function updateField(field: NewReportTextField, value: string): void {
    clearSubmitError()
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  function updateMetadata(metadata: Record<string, string | null>): void {
    setErrors((currentErrors) => ({ ...currentErrors, submit: undefined }))
    setForm((currentForm) => ({ ...currentForm, metadata }))
  }

  function addAudioFiles(files: File[]): void {
    setErrors((currentErrors) => ({
      ...currentErrors,
      audioFiles: undefined,
      submit: undefined,
    }))
    setForm((currentForm) => ({
      ...currentForm,
      audioFiles: [...currentForm.audioFiles, ...files],
    }))
  }

  function removeAudioFile(name: string): void {
    setForm((currentForm) => ({
      ...currentForm,
      audioFiles: currentForm.audioFiles.filter((file) => file.name !== name),
    }))
  }

  function addPhotoFiles(files: File[]): void {
    setErrors((currentErrors) => ({ ...currentErrors, submit: undefined }))
    setForm((currentForm) => ({
      ...currentForm,
      photoFiles: [...currentForm.photoFiles, ...files],
    }))
  }

  function removePhotoFile(name: string): void {
    setForm((currentForm) => ({
      ...currentForm,
      photoFiles: currentForm.photoFiles.filter((file) => file.name !== name),
    }))
  }

  async function submit(metadataFields: MetadataField[]): Promise<void> {
    const validationErrors = validateForm(form)
    const hasMissingMetadata = hasMissingRequiredMetadata(
      metadataFields,
      form.metadata,
    )

    if (hasMissingMetadata) {
      setShowMetadataErrors(true)
    }

    if (Object.keys(validationErrors).length > 0 || hasMissingMetadata) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})
    setShowMetadataErrors(false)

    try {
      const response = await createInspection(form)
      onSuccess(response.report_id)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setErrors({
        submit: translations.new_report.errors.submit_failed,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    showMetadataErrors,
    updateMetadata,
    updateField,
    addAudioFiles,
    removeAudioFile,
    addPhotoFiles,
    removePhotoFile,
    submit,
  }
}

function validateForm(form: NewReportFormState): NewReportFormErrors {
  const validationErrors: NewReportFormErrors = {}

  if (form.audioFiles.length === 0) {
    validationErrors.audioFiles = translations.new_report.errors.audio_required
  }

  return validationErrors
}

function hasMissingRequiredMetadata(
  metadataFields: MetadataField[],
  metadataValue: Record<string, string | null>,
): boolean {
  return metadataFields.some(
    (field) => field.required && !metadataValue[field.key]?.trim(),
  )
}
