import { useCallback, useEffect, useState } from 'react'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getReports } from '@/lib/api/reports'
import type { ReportSummary } from '@/types/report'
import type { ReportsStatus, UseReportsResult } from '@/types/reportList'

export function useReports({
  onAuthenticationExpired,
}: {
  onAuthenticationExpired: () => void
}): UseReportsResult {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [status, setStatus] = useState<ReportsStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showReports = useCallback((fetchedReports: ReportSummary[]): void => {
    setReports(fetchedReports)
    setStatus('success')
  }, [])

  const showReportsError = useCallback(
    (error: unknown): void => {
      if (isAuthenticationExpiredError(error)) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage('Rapporten konden niet worden geladen.')
    },
    [onAuthenticationExpired],
  )

  const fetchReports = useCallback((): void => {
    void getReports().then(showReports).catch(showReportsError)
  }, [showReports, showReportsError])

  const loadReports = useCallback((): void => {
    setStatus('loading')
    setErrorMessage(null)
    fetchReports()
  }, [fetchReports])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return {
    reports,
    isLoading: status === 'loading',
    isError: status === 'error',
    errorMessage,
    retry: loadReports,
  }
}
