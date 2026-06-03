import { useCallback, useEffect, useState } from 'react'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getTemplateStatus } from '@/lib/api/templates'
import { translations } from '@/lib/translations'
import type { ActiveTemplate } from '@/types/template'
import type {
  UseActiveTemplateParameters,
  UseActiveTemplateResult,
} from '@/types/newReport'

type ActiveTemplateStatus = 'loading' | 'success' | 'error'

export function useActiveTemplate({
  onAuthenticationExpired,
}: UseActiveTemplateParameters): UseActiveTemplateResult {
  const [template, setTemplate] = useState<ActiveTemplate | null>(null)
  const [status, setStatus] = useState<ActiveTemplateStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showTemplateError = useCallback(
    (error: unknown): void => {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage(translations.new_report.errors.template_load_failed)
    },
    [onAuthenticationExpired],
  )

  const loadTemplate = useCallback((): void => {
    setStatus('loading')
    setErrorMessage(null)
    void getTemplateStatus()
      .then((templateStatus) => {
        if (templateStatus.status !== 'active') {
          throw new Error('No active template configured')
        }
        setTemplate(templateStatus)
        setStatus('success')
      })
      .catch(showTemplateError)
  }, [showTemplateError])

  useEffect(() => {
    loadTemplate()
  }, [loadTemplate])

  return {
    template,
    isLoading: status === 'loading',
    isError: status === 'error',
    errorMessage,
    retry: loadTemplate,
  }
}
