import { useCallback, useEffect, useState } from 'react'
import { isAuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getReport } from '@/lib/api/reports'
import type { ReportDetail } from '@/types/report'
import type {
  ReportDetailStatus,
  UseReportParameters,
  UseReportResult,
} from '@/types/reportDetail'

export function useReport({
  reportId,
  onAuthenticationExpired,
}: UseReportParameters): UseReportResult {
  const [report, setReport] = useState<ReportDetail | null>(null)
  const [status, setStatus] = useState<ReportDetailStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const showReport = useCallback((fetchedReport: ReportDetail): void => {
    setReport(fetchedReport)
    setStatus('success')
  }, [])

  const showReportError = useCallback(
    (error: unknown): void => {
      if (isAuthenticationExpiredError(error)) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage('Rapport kon niet worden geladen.')
    },
    [onAuthenticationExpired],
  )

  const fetchReport = useCallback((): void => {
    void getReport(reportId).then(showReport).catch(showReportError)
  }, [reportId, showReport, showReportError])

  const loadReport = useCallback((): void => {
    setStatus('loading')
    setErrorMessage(null)
    fetchReport()
  }, [fetchReport])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  return {
    report,
    isLoading: status === 'loading',
    isError: status === 'error',
    errorMessage,
    retry: loadReport,
  }
}
