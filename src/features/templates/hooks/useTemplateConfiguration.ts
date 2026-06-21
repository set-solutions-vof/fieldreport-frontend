import { useRef, useState } from 'react'
import { confirmTemplate, startTemplateAnalysis } from '@/lib/api/templates'
import { translations } from '@/lib/translations'
import type {
  TemplateSectionGroup,
  TemplateSectionType,
} from '@/typing/template'
import { pageStateFromTemplateStatus } from '../lib/pageStateFromTemplateStatus'
import {
  addPreviewSection,
  deletePreviewSection,
  reorderPreviewSections,
  updatePreviewSectionFields,
  updatePreviewSectionLabel,
  updatePreviewSectionGroups,
  updatePreviewSectionRenderType,
} from '../lib/templatePreviewState'
import type {
  TemplateEditablePageState,
  TemplatePageState,
  TemplateUploadingPageState,
  UseTemplateConfigurationParameters,
  UseTemplateConfigurationResult,
} from '@/typing/templateConfiguration'
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
  const approvedSnapshotRef = useRef<Extract<
    TemplatePageState,
    { kind: 'approved' }
  > | null>(null)
  const [hasEditedApprovedTemplate, setHasEditedApprovedTemplate] =
    useState(false)

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

  async function startAnalysis(): Promise<'processing' | 'ready' | 'failed'> {
    const uploadingState = pageState as TemplateUploadingPageState
    setActionErrorMessage(null)

    try {
      const templateStatus = await startTemplateAnalysis(uploadingState.files)
      const nextState = pageStateFromTemplateStatus(
        templateStatus,
        uploadingState.files,
      )
      setPageState(nextState)

      if (nextState.kind === 'preview' || nextState.kind === 'approved') {
        return 'ready'
      }

      if (nextState.kind === 'processing') {
        return 'processing'
      }

      return 'failed'
    } catch (error) {
      showAuthenticationOrError(
        error,
        translations.template.errors.analysis_failed,
      )
      return 'failed'
    }
  }

  function updateSectionLabel(sectionId: string, label: string): void {
    markTemplateChanged()
    setPageState((currentState) =>
      updatePreviewSectionLabel(currentState, sectionId, label),
    )
  }

  function updateSectionRenderType(
    sectionId: string,
    renderType: TemplateSectionType,
  ): void {
    markTemplateChanged()
    setPageState((currentState) =>
      updatePreviewSectionRenderType(currentState, sectionId, renderType),
    )
  }

  function updateSectionFields(sectionId: string, fields: string[]): void {
    markTemplateChanged()
    setPageState((currentState) =>
      updatePreviewSectionFields(currentState, sectionId, fields),
    )
  }

  function updateSectionGroups(
    sectionId: string,
    groups: TemplateSectionGroup[],
  ): void {
    markTemplateChanged()
    setPageState((currentState) =>
      updatePreviewSectionGroups(currentState, sectionId, groups),
    )
  }

  function deleteSection(sectionId: string): void {
    markTemplateChanged()
    setPageState((currentState) =>
      deletePreviewSection(currentState, sectionId),
    )
  }

  function addSection(): string {
    const sectionId = crypto.randomUUID()
    markTemplateChanged()
    setPageState((currentState) =>
      addPreviewSection(
        currentState,
        sectionId,
        translations.template.review.new_section_label,
      ),
    )
    return sectionId
  }

  function reorderSections(fromIndex: number, toIndex: number): void {
    markTemplateChanged()
    setPageState((currentState) =>
      reorderPreviewSections(currentState, fromIndex, toIndex),
    )
  }

  function markTemplateChanged(): void {
    if (pageState.kind === 'editing') {
      setHasEditedApprovedTemplate(true)
    }
  }

  function resetAfterFailure(): void {
    setActionErrorMessage(null)
    setPageState({ kind: 'empty' })
  }

  function startEditingTemplate(): void {
    if (pageState.kind !== 'approved') {
      return
    }

    approvedSnapshotRef.current = pageState
    setHasEditedApprovedTemplate(false)
    setActionErrorMessage(null)
    setPageState({
      kind: 'editing',
      metadataFields: pageState.metadataFields,
      sections: pageState.sections,
      reportsCount: pageState.reportsCount,
      version: pageState.version,
      updatedAt: pageState.updatedAt,
    })
  }

  function cancelEditing(): void {
    const approvedSnapshot = approvedSnapshotRef.current
    if (pageState.kind !== 'editing' || approvedSnapshot === null) {
      return
    }

    setActionErrorMessage(null)
    setPageState(approvedSnapshot)
    approvedSnapshotRef.current = null
    setHasEditedApprovedTemplate(false)
  }

  async function confirmCurrentTemplate(): Promise<boolean> {
    if (pageState.kind !== 'preview' && pageState.kind !== 'editing') {
      return false
    }

    const editableState = pageState as TemplateEditablePageState
    setActionErrorMessage(null)
    setIsConfirming(true)

    try {
      const templateStatus = await confirmTemplate({
        metadata_fields: editableState.metadataFields,
        sections: editableState.sections,
      })
      approvedSnapshotRef.current = null
      setHasEditedApprovedTemplate(false)
      setPageState(pageStateFromTemplateStatus(templateStatus))
      return true
    } catch (error) {
      showAuthenticationOrError(
        error,
        translations.template.errors.confirm_failed,
      )
      return false
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
    hasUnsavedChanges:
      pageState.kind === 'preview' ||
      (pageState.kind === 'editing' && hasEditedApprovedTemplate),
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
    addSection,
    reorderSections,
    confirmCurrentTemplate,
    startEditingTemplate,
    cancelEditing,
    resetAfterFailure,
  }
}
