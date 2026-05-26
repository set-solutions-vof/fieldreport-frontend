import type {
  TemplatePageState,
  TemplateSaveStatus,
} from '@/types/templateConfiguration'

export function useTemplateAutoSave(
  _pageState: TemplatePageState,
): TemplateSaveStatus {
  return 'idle'
}
