import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import { getAuthTokens } from '@/lib/auth/tokenStore'
import type {
  ConfirmTemplatePayload,
  TemplateSection,
  TemplateSectionType,
  TemplateSectionWire,
  TemplateStatusResponse,
} from '@/typing/template'

const templateEndpoint = `${apiBaseUrl}/api/v1/template`

function templateSectionRenderType(
  section: TemplateSectionWire,
): TemplateSectionType {
  return section.render_type ?? 'text_block'
}

function normalizeTemplateSection(
  section: TemplateSectionWire,
  index: number,
): TemplateSection {
  return {
    id: section.id,
    label: section.label,
    order: section.order ?? index,
    render_type: templateSectionRenderType(section),
    fields: section.fields ?? null,
    found_in: section.found_in,
    groups: section.groups ?? null,
  }
}

function normalizeTemplateSections(
  sections: TemplateSectionWire[],
): TemplateSection[] {
  return sections
    .map(normalizeTemplateSection)
    .sort((left, right) => left.order - right.order)
}

function normalizeTemplateStatus(
  templateStatus: TemplateStatusResponse,
): TemplateStatusResponse {
  if (templateStatus.status === 'pending_review') {
    return {
      ...templateStatus,
      sections: normalizeTemplateSections(templateStatus.sections),
    }
  }

  if (templateStatus.status === 'active') {
    return {
      ...templateStatus,
      sections: normalizeTemplateSections(templateStatus.sections),
    }
  }

  return templateStatus
}

export async function getTemplateStatus(): Promise<TemplateStatusResponse> {
  const response = await authenticatedFetch(templateEndpoint)
  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}

export async function getTemplatePdfPreview(): Promise<void> {
  await authenticatedFetch(`${templateEndpoint}/preview-pdf`)
}

export function getTemplatePdfPreviewUrl(): string {
  const { access_token } = getAuthTokens()
  return `${templateEndpoint}/preview-pdf?access_token=${access_token}`
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
  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}
