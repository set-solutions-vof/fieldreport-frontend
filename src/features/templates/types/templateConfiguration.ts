import type { TemplateSection, TemplateSectionType } from '@/types/template'

export type TemplatePageState =
  | { kind: 'empty' }
  | { kind: 'uploading'; files: File[] }
  | { kind: 'processing'; files: File[]; jobId: string; reportsCount: number }
  | {
      kind: 'preview'
      jobId: string
      sections: TemplateSection[]
      reportsCount: number
    }
  | { kind: 'approved'; sections: TemplateSection[]; reportsCount: number }
  | { kind: 'failed'; errorMessage: string; reportsCount: number }

export type TemplateLoadStatus = 'loading' | 'success' | 'error'
export type TemplateSaveStatus = 'idle' | 'saved'

export type UseTemplateConfigurationParameters = {
  onAuthenticationExpired: () => void
}

export type UseTemplateConfigurationResult = {
  pageState: TemplatePageState
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  actionErrorMessage: string | null
  isConfirming: boolean
  saveStatus: TemplateSaveStatus
  retry: () => void
  addFiles: (files: File[]) => void
  removeFile: (fileName: string) => void
  cancelUpload: () => void
  startAnalysis: () => Promise<void>
  updateSectionLabel: (sectionId: string, label: string) => void
  updateSectionRenderType: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  updateSectionFields: (sectionId: string, fields: string[]) => void
  deleteSection: (sectionId: string) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  confirmCurrentTemplate: () => Promise<void>
  resetAfterFailure: () => void
}
