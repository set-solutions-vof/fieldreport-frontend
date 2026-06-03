import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  CreateInspectionResponse,
  NewReportFormState,
} from '@/types/newReport'

const inspectionsEndpoint = `${apiBaseUrl}/api/v1/inspections`

export async function createInspection(
  form: NewReportFormState,
): Promise<CreateInspectionResponse> {
  const formData = new FormData()

  formData.append('metadata', JSON.stringify(form.metadata))

  if (form.extraContext) {
    formData.append('extra_context', form.extraContext)
  }

  form.audioFiles.forEach((file) => formData.append('audio_files', file))
  form.photoFiles.forEach((file) => formData.append('photo_files', file))

  const response = await authenticatedFetch(inspectionsEndpoint, {
    method: 'POST',
    body: formData,
  })
  return (await response.json()) as CreateInspectionResponse
}
