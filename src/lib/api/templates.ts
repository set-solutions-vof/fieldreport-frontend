import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type {
  ConfirmTemplatePayload,
  TemplateSection,
  TemplateSectionType,
  TemplateSectionWire,
  TemplateStatusResponse,
} from '@/types/template'

const templateEndpoint = `${apiBaseUrl}/api/v1/template`

function templateSectionRenderType(
  section: TemplateSectionWire,
): TemplateSectionType {
  return section.render_type ?? section.type ?? 'text_block'
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
  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}

export async function getTemplateAnalysis(
  jobId: string,
): Promise<TemplateStatusResponse> {
  const response = await authenticatedFetch(
    `${templateEndpoint}/analysis/${jobId}`,
  )
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
  return normalizeTemplateStatus(
    (await response.json()) as TemplateStatusResponse,
  )
}
