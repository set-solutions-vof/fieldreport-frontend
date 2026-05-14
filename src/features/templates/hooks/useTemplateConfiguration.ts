import { useCallback, useEffect, useState } from 'react'
import {
  confirmTemplate,
  getTemplateAnalysis,
  getTemplateStatus,
  startTemplateAnalysis,
} from '@/lib/api/templates'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { TemplateSection, TemplateStatusResponse } from '@/types/template'

export type TemplatePageState =
  | { kind: 'empty' }
  | { kind: 'uploading'; files: File[] }
  | { kind: 'processing'; files: File[]; jobId: string; reportsCount: number }
  | { kind: 'preview'; sections: TemplateSection[]; reportsCount: number }
  | { kind: 'approved'; sections: TemplateSection[]; reportsCount: number }

type TemplateLoadStatus = 'loading' | 'success' | 'error'

type UseTemplateConfigurationParameters = {
  onAuthenticationExpired: () => void
}

type UseTemplateConfigurationResult = {
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
}

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
    setPageState((currentState) => {
      if (currentState.kind !== 'preview') {
        return currentState
      }

      return {
        ...currentState,
        sections: currentState.sections.map((section) =>
          section.id === sectionId ? { ...section, label } : section,
        ),
      }
    })
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
    retry: loadTemplateStatus,
    addFiles,
    removeFile,
    cancelUpload,
    startAnalysis,
    updateSectionLabel,
    confirmCurrentTemplate,
  }
}

function pageStateFromTemplateStatus(
  templateStatus: TemplateStatusResponse,
  files: File[] = [],
): TemplatePageState {
  if (templateStatus.status === 'not_configured') {
    return { kind: 'empty' }
  }

  if (templateStatus.status === 'extracting') {
    return {
      kind: 'processing',
      files,
      jobId: templateStatus.jobId,
      reportsCount: templateStatus.reports_count,
    }
  }

  if (templateStatus.status === 'pending_review') {
    return {
      kind: 'preview',
      sections: templateStatus.sections,
      reportsCount: templateStatus.reports_count,
    }
  }

  return {
    kind: 'approved',
    sections: templateStatus.sections,
    reportsCount: templateStatus.reports_count,
  }
}
