import type {
  TemplateSection,
  TemplateSectionType,
  TemplateSectionWire,
  TemplateStatusResponse,
} from '@/types/template'

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
    label: section.label,
    order: section.order ?? index,
    render_type: templateSectionRenderType(section),
    fields: section.fields ?? null,
    found_in: section.found_in,
    groups: section.groups ?? null,
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
