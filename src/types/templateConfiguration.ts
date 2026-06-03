import type { Dispatch, SetStateAction } from 'react'
import type {
  MetadataField,
  TemplateSectionGroup,
  TemplateSection,
  TemplateSectionType,
} from '@/types/template'

export type TemplatePageState =
  | { kind: 'empty' }
  | { kind: 'uploading'; files: File[] }
  | { kind: 'processing'; files: File[]; job_id: string; reportsCount: number }
  | {
      kind: 'preview'
      job_id: string
      metadataFields: MetadataField[]
      sections: TemplateSection[]
      reportsCount: number
    }
  | {
      kind: 'approved'
      metadataFields: MetadataField[]
      sections: TemplateSection[]
      reportsCount: number
    }
  | { kind: 'failed'; errorMessage: string; reportsCount: number }

export type TemplateUploadingPageState = Extract<
  TemplatePageState,
  { kind: 'uploading' }
>

export type TemplatePreviewPageState = Extract<
  TemplatePageState,
  { kind: 'preview' }
>

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
  startAnalysis: () => Promise<boolean>
  updateSectionLabel: (sectionId: string, label: string) => void
  updateSectionRenderType: (
    sectionId: string,
    renderType: TemplateSectionType,
  ) => void
  updateSectionFields: (sectionId: string, fields: string[]) => void
  updateSectionGroups: (
    sectionId: string,
    groups: TemplateSectionGroup[],
  ) => void
  deleteSection: (sectionId: string) => void
  reorderSections: (fromIndex: number, toIndex: number) => void
  confirmCurrentTemplate: () => Promise<boolean>
  resetAfterFailure: () => void
}

export type UseTemplateStatusStateParameters = {
  onAuthenticationExpired: () => void
}

export type UseTemplateStatusStateResult = {
  pageState: TemplatePageState
  setPageState: Dispatch<SetStateAction<TemplatePageState>>
  loadStatus: TemplateLoadStatus
  errorMessage: string | null
  actionErrorMessage: string | null
  setActionErrorMessage: Dispatch<SetStateAction<string | null>>
  retry: () => void
  showAuthenticationOrError: (error: unknown, message: string) => void
}
