import { useCallback, useEffect, useState } from 'react'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getReports } from '@/lib/api/reports'
import { translations } from '@/lib/translations'
import type { ReportSummary } from '@/types/report'
import type {
  ReportListStatus,
  UseReportListParameters,
  UseReportListResult,
} from '@/types/reportList'

export function useReportList({
  onAuthenticationExpired,
}: UseReportListParameters): UseReportListResult {
  const [reports, setReports] = useState<ReportSummary[]>([])
  const [status, setStatus] = useState<ReportListStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showReports = useCallback((fetchedReports: ReportSummary[]): void => {
    setReports(fetchedReports)
    setStatus('success')
  }, [])

  const showReportsError = useCallback(
    (error: unknown): void => {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage(translations.reports.errors.reports_load_failed)
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
