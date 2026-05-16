import { useCallback, useEffect, useState } from 'react'
import {
  confirmTemplate,
  getTemplateAnalysis,
  getTemplateStatus,
  startTemplateAnalysis,
} from '@/lib/api/templates'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type {
  TemplateSectionType,
  TemplateStatusResponse,
} from '@/types/template'
import { pageStateFromTemplateStatus } from '../lib/pageStateFromTemplateStatus'
import {
  deletePreviewSection,
  reorderPreviewSections,
  updatePreviewSectionFields,
  updatePreviewSectionLabel,
  updatePreviewSectionRenderType,
} from '../lib/templatePreviewState'
import type {
  TemplateLoadStatus,
  TemplatePageState,
  UseTemplateConfigurationParameters,
  UseTemplateConfigurationResult,
} from '../types/templateConfiguration'
import { useTemplateAutoSave } from './useTemplateAutoSave'

export function useTemplateConfiguration({
  onAuthenticationExpired,
}: UseTemplateConfigurationParameters): UseTemplateConfigurationResult {
  const [pageState, setPageState] = useState<TemplatePageState>({
    kind: 'empty',
  })
  const [loadStatus, setLoadStatus] = useState<TemplateLoadStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(
    null,
  )
  const [isConfirming, setIsConfirming] = useState(false)
  const saveStatus = useTemplateAutoSave(pageState)

  const showAuthenticationOrError = useCallback(
    (error: unknown, message: string): void => {
      if (isAuthenticationExpiredError(error)) {
        onAuthenticationExpired()
        return
      }

      setActionErrorMessage(message)
    },
    [onAuthenticationExpired],
  )

  const showTemplateStatus = useCallback(
    (templateStatus: TemplateStatusResponse): void => {
      setPageState(pageStateFromTemplateStatus(templateStatus))
      setLoadStatus('success')
    },
    [],
  )

  const showTemplateLoadError = useCallback(
    (error: unknown): void => {
      if (isAuthenticationExpiredError(error)) {
        onAuthenticationExpired()
        return
      }

      setLoadStatus('error')
      setErrorMessage(translations.template.errors.load_failed)
    },
    [onAuthenticationExpired],
  )

  const loadTemplateStatus = useCallback((): void => {
    setLoadStatus('loading')
    setErrorMessage(null)
    setActionErrorMessage(null)
    void getTemplateStatus()
      .then(showTemplateStatus)
      .catch(showTemplateLoadError)
  }, [showTemplateStatus, showTemplateLoadError])

  useEffect(() => {
    void getTemplateStatus()
      .then(showTemplateStatus)
      .catch(showTemplateLoadError)
  }, [showTemplateStatus, showTemplateLoadError])

  useEffect(() => {
    if (pageState.kind !== 'processing') {
      return
    }

    const pollAnalysis = window.setInterval(() => {
      void getTemplateAnalysis(pageState.jobId)
        .then((templateStatus) => {
          if (templateStatus.status !== 'extracting') {
            showTemplateStatus(templateStatus)
          }
        })
        .catch((error: unknown) =>
          showAuthenticationOrError(
            error,
            translations.template.errors.analysis_failed,
          ),
        )
    }, 2500)

    return () => window.clearInterval(pollAnalysis)
  }, [pageState, showTemplateStatus, showAuthenticationOrError])

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
      if (currentState.kind !== 'uploading') {
        return currentState
      }

      const remainingFiles = currentState.files.filter(
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
    if (pageState.kind !== 'uploading') {
      return
    }

    setActionErrorMessage(null)

    try {
      const templateStatus = await startTemplateAnalysis(pageState.files)
      setPageState(pageStateFromTemplateStatus(templateStatus, pageState.files))
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
    if (pageState.kind !== 'preview') {
      return
    }

    setActionErrorMessage(null)
    setIsConfirming(true)

    try {
      const templateStatus = await confirmTemplate({
        sections: pageState.sections,
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
    retry: loadTemplateStatus,
    addFiles,
    removeFile,
    cancelUpload,
    startAnalysis,
    updateSectionLabel,
    updateSectionRenderType,
    updateSectionFields,
    deleteSection,
    reorderSections,
    confirmCurrentTemplate,
    resetAfterFailure,
  }
}
