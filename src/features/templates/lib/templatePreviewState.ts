import type {
  TemplateSectionGroup,
  TemplateSectionType,
} from '@/types/template'
import type {
  TemplateEditablePageState,
  TemplatePageState,
} from '@/types/templateConfiguration'

function isEditableTemplateState(
  state: TemplatePageState,
): state is TemplateEditablePageState {
  return state.kind === 'preview' || state.kind === 'editing'
}

export function updatePreviewSectionLabel(
  currentState: TemplatePageState,
  sectionId: string,
  label: string,
): TemplatePageState {
  return updatePreviewSections(currentState, (sections) =>
    sections.map((section) =>
      section.id === sectionId ? { ...section, label } : section,
    ),
  )
}

export function updatePreviewSectionRenderType(
  currentState: TemplatePageState,
  sectionId: string,
  renderType: TemplateSectionType,
): TemplatePageState {
  return updatePreviewSections(currentState, (sections) =>
    sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            render_type: renderType,
            fields:
              renderType === 'key_value_table' ||
              renderType === 'measurement_table'
                ? (section.fields ?? [])
                : null,
          }
        : section,
    ),
  )
}

export function updatePreviewSectionFields(
  currentState: TemplatePageState,
  sectionId: string,
  fields: string[],
): TemplatePageState {
  return updatePreviewSections(currentState, (sections) =>
    sections.map((section) =>
      section.id === sectionId ? { ...section, fields } : section,
    ),
  )
}

export function updatePreviewSectionGroups(
  currentState: TemplatePageState,
  sectionId: string,
  groups: TemplateSectionGroup[],
): TemplatePageState {
  return updatePreviewSections(currentState, (sections) =>
    sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            fields: groups.flatMap((group) => group.fields),
            groups,
          }
        : section,
    ),
  )
}

export function deletePreviewSection(
  currentState: TemplatePageState,
  sectionId: string,
): TemplatePageState {
  return updatePreviewSections(currentState, (sections) =>
    sections.filter((section) => section.id !== sectionId),
  )
}

export function reorderPreviewSections(
  currentState: TemplatePageState,
  fromIndex: number,
  toIndex: number,
): TemplatePageState {
  if (fromIndex === toIndex || !isEditableTemplateState(currentState)) {
    return currentState
  }

  const sections = [...currentState.sections]
  const [movedSection] = sections.splice(fromIndex, 1)
  sections.splice(toIndex, 0, movedSection)

  return {
    ...currentState,
    sections: sections.map((section, index) => ({
      ...section,
      order: index,
    })),
  }
}

function updatePreviewSections(
  currentState: TemplatePageState,
  updateSections: (
    sections: TemplateEditablePageState['sections'],
  ) => TemplateEditablePageState['sections'],
): TemplatePageState {
  if (!isEditableTemplateState(currentState)) {
    return currentState
  }

  return {
    ...currentState,
    sections: updateSections(currentState.sections),
  }
}
