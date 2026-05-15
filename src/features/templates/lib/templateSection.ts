import type {
  TemplateSection,
  TemplateSectionType,
  TemplateStatusResponse,
} from '@/types/template'

type TemplateSectionWire = {
  id: string
  key?: string
  label: string
  order?: number
  render_type?: TemplateSectionType
  type?: TemplateSectionType
  fields?: string[] | null
}

export function templateSectionRenderType(
  section: TemplateSectionWire,
): TemplateSectionType {
  return section.render_type ?? section.type ?? 'text_block'
}

export function normalizeTemplateSection(
  section: TemplateSectionWire,
  index: number,
): TemplateSection {
  return {
    id: section.id,
    key: section.key ?? section.id,
    label: section.label,
    order: section.order ?? index,
    render_type: templateSectionRenderType(section),
    fields: section.fields ?? null,
  }
}

export function normalizeTemplateSections(
  sections: TemplateSectionWire[],
): TemplateSection[] {
  return sections
    .map(normalizeTemplateSection)
    .sort((left, right) => left.order - right.order)
}

export function normalizeTemplateStatus(
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
