import { useCallback, useEffect, useState } from 'react'
import { getTemplateAnalysis, getTemplateStatus } from '@/lib/api/templates'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { TemplateStatusResponse } from '@/types/template'
import type {
  TemplateLoadStatus,
  TemplatePageState,
  UseTemplateStatusStateParameters,
  UseTemplateStatusStateResult,
} from '@/types/templateConfiguration'
import { pageStateFromTemplateStatus } from '../lib/pageStateFromTemplateStatus'

export function useTemplateStatusState({
  onAuthenticationExpired,
}: UseTemplateStatusStateParameters): UseTemplateStatusStateResult {
  const [pageState, setPageState] = useState<TemplatePageState>({
    kind: 'empty',
  })
  const [loadStatus, setLoadStatus] = useState<TemplateLoadStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(
    null,
  )

  const showAuthenticationOrError = useCallback(
    (error: unknown, message: string): void => {
      if (error instanceof AuthenticationExpiredError) {
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
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setLoadStatus('error')
      setErrorMessage(translations.template.errors.load_failed)
    },
    [onAuthenticationExpired],
  )

  const fetchTemplateStatus = useCallback((): void => {
    void getTemplateStatus()
      .then(showTemplateStatus)
      .catch(showTemplateLoadError)
  }, [showTemplateStatus, showTemplateLoadError])

  const loadTemplateStatus = useCallback((): void => {
    setLoadStatus('loading')
    setErrorMessage(null)
    setActionErrorMessage(null)
    fetchTemplateStatus()
  }, [fetchTemplateStatus])

  useEffect(() => {
    fetchTemplateStatus()
  }, [fetchTemplateStatus])

  useEffect(() => {
    if (pageState.kind !== 'processing') {
      return
    }

    const pollAnalysis = window.setInterval(() => {
      void getTemplateAnalysis(pageState.job_id)
        .then((templateStatus) => {
          if (templateStatus.status !== 'processing') {
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

  return {
    pageState,
    setPageState,
    loadStatus,
    errorMessage,
    actionErrorMessage,
    setActionErrorMessage,
    retry: loadTemplateStatus,
    showAuthenticationOrError,
  }
}
