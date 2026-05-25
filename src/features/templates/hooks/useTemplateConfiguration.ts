import { useState } from 'react'
import { confirmTemplate, startTemplateAnalysis } from '@/lib/api/templates'
import { translations } from '@/lib/translations'
import type {
  TemplateSectionGroup,
  TemplateSectionType,
} from '@/types/template'
import { pageStateFromTemplateStatus } from '../lib/pageStateFromTemplateStatus'
import {
  deletePreviewSection,
  reorderPreviewSections,
  updatePreviewSectionFields,
  updatePreviewSectionLabel,
  updatePreviewSectionGroups,
  updatePreviewSectionRenderType,
} from '../lib/templatePreviewState'
import type {
  TemplatePreviewPageState,
  TemplateUploadingPageState,
  UseTemplateConfigurationParameters,
  UseTemplateConfigurationResult,
} from '@/types/templateConfiguration'
import { useTemplateAutoSave } from './useTemplateAutoSave'
import { useTemplateStatusState } from './useTemplateStatusState'

export function useTemplateConfiguration({
  onAuthenticationExpired,
}: UseTemplateConfigurationParameters): UseTemplateConfigurationResult {
  const {
    pageState,
    setPageState,
    loadStatus,
    errorMessage,
    actionErrorMessage,
    setActionErrorMessage,
    retry,
    showAuthenticationOrError,
  } = useTemplateStatusState({ onAuthenticationExpired })
  const [isConfirming, setIsConfirming] = useState(false)
  const saveStatus = useTemplateAutoSave(pageState)

  function addFiles(files: File[]): void {
    setActionErrorMessage(null)
    setPageState((currentState) => ({
      kind: 'uploading',
      files:
        currentState.kind === 'uploading'
          ? [...currentState.files, ...files]
          : files,
    }))
  }

  function removeFile(fileName: string): void {
    setPageState((currentState) => {
      const uploadingState = currentState as TemplateUploadingPageState
      const remainingFiles = uploadingState.files.filter(
        (file) => file.name !== fileName,
      )

      return remainingFiles.length > 0
        ? { kind: 'uploading', files: remainingFiles }
        : { kind: 'empty' }
    })
  }

  function cancelUpload(): void {
    setActionErrorMessage(null)
    setPageState({ kind: 'empty' })
  }

  async function startAnalysis(): Promise<void> {
    const uploadingState = pageState as TemplateUploadingPageState
    setActionErrorMessage(null)

    try {
      const templateStatus = await startTemplateAnalysis(uploadingState.files)
      setPageState(
        pageStateFromTemplateStatus(templateStatus, uploadingState.files),
      )
    } catch (error) {
      showAuthenticationOrError(
        error,
        translations.template.errors.analysis_failed,
      )
    }
  }

  function updateSectionLabel(sectionId: string, label: string): void {
    setPageState((currentState) =>
      updatePreviewSectionLabel(currentState, sectionId, label),
    )
  }

  function updateSectionRenderType(
    sectionId: string,
    renderType: TemplateSectionType,
  ): void {
    setPageState((currentState) =>
      updatePreviewSectionRenderType(currentState, sectionId, renderType),
    )
  }

  function updateSectionFields(sectionId: string, fields: string[]): void {
    setPageState((currentState) =>
      updatePreviewSectionFields(currentState, sectionId, fields),
    )
  }

  function updateSectionGroups(
    sectionId: string,
    groups: TemplateSectionGroup[],
  ): void {
    setPageState((currentState) =>
      updatePreviewSectionGroups(currentState, sectionId, groups),
    )
  }

  function deleteSection(sectionId: string): void {
    setPageState((currentState) =>
      deletePreviewSection(currentState, sectionId),
    )
  }

  function reorderSections(fromIndex: number, toIndex: number): void {
    setPageState((currentState) =>
      reorderPreviewSections(currentState, fromIndex, toIndex),
    )
  }

  function resetAfterFailure(): void {
    setActionErrorMessage(null)
    setPageState({ kind: 'empty' })
  }

  async function confirmCurrentTemplate(): Promise<void> {
    const previewState = pageState as TemplatePreviewPageState
    setActionErrorMessage(null)
    setIsConfirming(true)

    try {
      const templateStatus = await confirmTemplate({
        sections: previewState.sections,
      })
      setPageState(pageStateFromTemplateStatus(templateStatus))
    } catch (error) {
      showAuthenticationOrError(
        error,
        translations.template.errors.confirm_failed,
      )
    } finally {
      setIsConfirming(false)
    }
  }

  return {
    pageState,
    isLoading: loadStatus === 'loading',
    isError: loadStatus === 'error',
    errorMessage,
    actionErrorMessage,
    isConfirming,
    saveStatus,
    retry,
    addFiles,
    removeFile,
    cancelUpload,
    startAnalysis,
    updateSectionLabel,
    updateSectionRenderType,
    updateSectionFields,
    updateSectionGroups,
    deleteSection,
    reorderSections,
    confirmCurrentTemplate,
    resetAfterFailure,
  }
}
