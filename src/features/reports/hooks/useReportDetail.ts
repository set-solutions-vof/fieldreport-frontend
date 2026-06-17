import { useCallback, useEffect, useState } from 'react'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { getReport } from '@/lib/api/reports'
import { translations } from '@/lib/translations'
import { isReportGenerating } from '../lib/reportLabels'
import type { ReportDetail } from '@/typing/report'
import type {
  ReportDetailLoadStatus,
  UseReportDetailParameters,
  UseReportDetailResult,
} from '@/typing/reportDetail'

export function useReportDetail({
  reportId,
  onAuthenticationExpired,
}: UseReportDetailParameters): UseReportDetailResult {
  const [report, setReport] = useState<ReportDetail | null>(null)
  const [status, setStatus] = useState<ReportDetailLoadStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [reloadIndex, setReloadIndex] = useState(0)

  const showReport = useCallback((fetchedReport: ReportDetail): void => {
    setReport(fetchedReport)
    setStatus('success')
  }, [])

  const showReportError = useCallback(
    (error: unknown): void => {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setStatus('error')
      setErrorMessage(translations.reports.errors.report_load_failed)
    },
    [onAuthenticationExpired],
  )

  const loadReport = useCallback((): void => {
    setStatus('loading')
    setErrorMessage(null)
    setReloadIndex((currentReloadIndex) => currentReloadIndex + 1)
  }, [])

  useEffect(() => {
    let isCancelled = false
    let pollTimeoutId: number | undefined

    function fetchReport(): void {
      void getReport(reportId)
        .then((fetchedReport) => {
          if (isCancelled) {
            return
          }

          showReport(fetchedReport)

          if (isReportGenerating(fetchedReport.status)) {
            pollTimeoutId = window.setTimeout(fetchReport, 3000)
          }
        })
        .catch((error: unknown) => {
          if (!isCancelled) {
            showReportError(error)
          }
        })
    }

    fetchReport()

    return () => {
      isCancelled = true

      if (pollTimeoutId !== undefined) {
        window.clearTimeout(pollTimeoutId)
      }
    }
  }, [reportId, reloadIndex, showReport, showReportError])

  return {
    report,
    isLoading: status === 'loading',
    isError: status === 'error',
    errorMessage,
    retry: loadReport,
  }
}
