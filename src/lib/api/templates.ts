import { normalizeTemplateStatus } from '@/features/templates/lib/templateSection'
import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  ConfirmTemplatePayload,
  TemplateStatusResponse,
} from '@/types/template'

const templateEndpoint = `${apiBaseUrl}/api/v1/template`

export async function getTemplateStatus(): Promise<TemplateStatusResponse> {
  const response = await authenticatedFetch(templateEndpoint)

  if (!response.ok) {
    throw new Error('Template request failed')
  }

  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}

export async function startTemplateAnalysis(
  files: File[],
): Promise<TemplateStatusResponse> {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await authenticatedFetch(`${templateEndpoint}/analysis`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Template analysis request failed')
  }

  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}

export async function getTemplateAnalysis(
  job_id: string,
): Promise<TemplateStatusResponse> {
  const response = await authenticatedFetch(
    `${templateEndpoint}/analysis/${job_id}`,
  )

  if (!response.ok) {
    throw new Error('Template analysis status request failed')
  }

  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}

export async function confirmTemplate(
  payload: ConfirmTemplatePayload,
): Promise<TemplateStatusResponse> {
  const response = await authenticatedFetch(templateEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Template confirmation request failed')
  }

  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}
