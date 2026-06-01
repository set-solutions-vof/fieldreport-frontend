import type {
  TemplatePageState,
  TemplateSaveStatus,
} from '@/types/templateConfiguration'

export function useTemplateAutoSave(
  pageState: TemplatePageState,
): TemplateSaveStatus {
  void pageState
  return 'idle'
}
