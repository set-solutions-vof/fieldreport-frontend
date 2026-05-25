import { useState } from 'react'
import { createInspection } from '@/lib/api/inspections'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type {
  ClientType,
  InvestigationType,
  NewReportFormErrors,
  NewReportFormState,
  NewReportTextField,
  UseNewReportParameters,
  UseNewReportResult,
} from '@/types/newReport'

const emptyForm: NewReportFormState = {
  address: '',
  inspectionDate: '',
  investigationType: '',
  clientType: '',
  referenceNumber: '',
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

  function clearErrorForField(field: NewReportTextField): void {
    setErrors((currentErrors) => ({
      ...currentErrors,
      address: field === 'address' ? undefined : currentErrors.address,
      inspectionDate:
        field === 'inspectionDate' ? undefined : currentErrors.inspectionDate,
      investigationType:
        field === 'investigationType'
          ? undefined
          : currentErrors.investigationType,
      clientType: field === 'clientType' ? undefined : currentErrors.clientType,
      submit: undefined,
    }))
  }

  function updateField(field: NewReportTextField, value: string): void {
    clearErrorForField(field)
    setForm((currentForm) => {
      if (field === 'investigationType') {
        return {
          ...currentForm,
          investigationType: value as InvestigationType | '',
        }
      }

      if (field === 'clientType') {
        return { ...currentForm, clientType: value as ClientType | '' }
      }

      return { ...currentForm, [field]: value }
    })
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

  async function submit(): Promise<void> {
    const validationErrors = validateForm(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await createInspection(form)
      onSuccess(response.report_id)
    } catch (error) {
      if (isAuthenticationExpiredError(error)) {
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

  if (!form.address.trim()) {
    validationErrors.address = translations.new_report.errors.address_required
  }

  if (!form.inspectionDate) {
    validationErrors.inspectionDate =
      translations.new_report.errors.date_required
  }

  if (!form.investigationType) {
    validationErrors.investigationType =
      translations.new_report.errors.investigation_type_required
  }

  if (!form.clientType) {
    validationErrors.clientType =
      translations.new_report.errors.client_type_required
  }

  if (form.audioFiles.length === 0) {
    validationErrors.audioFiles = translations.new_report.errors.audio_required
  }

  return validationErrors
}
