import type { TemplateSection } from '@/types/template'

export type TemplatePageState =
  | { kind: 'empty' }
  | { kind: 'uploading'; files: File[] }
  | { kind: 'processing'; files: File[]; jobId: string; reportsCount: number }
  | { kind: 'preview'; sections: TemplateSection[]; reportsCount: number }
  | { kind: 'approved'; sections: TemplateSection[]; reportsCount: number }
  | { kind: 'failed'; errorMessage: string; reportsCount: number }

export type TemplateLoadStatus = 'loading' | 'success' | 'error'

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
  retry: () => void
  addFiles: (files: File[]) => void
  removeFile: (fileName: string) => void
  cancelUpload: () => void
  startAnalysis: () => Promise<void>
  updateSectionLabel: (sectionId: string, label: string) => void
  confirmCurrentTemplate: () => Promise<void>
  resetAfterFailure: () => void
}
