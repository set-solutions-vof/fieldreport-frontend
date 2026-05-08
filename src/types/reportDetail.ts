import type { ReportDetail } from './report'

export type ReportDetailStatus = 'loading' | 'success' | 'error'

export type UseReportParameters = {
  reportId: string
  onAuthenticationExpired: () => void
}

export type UseReportResult = {
  report: ReportDetail | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}
