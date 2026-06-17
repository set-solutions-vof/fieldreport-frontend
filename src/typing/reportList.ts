import type { ReportSummary } from './report'

export type ReportListStatus = 'loading' | 'success' | 'error'

export type UseReportListParameters = {
  onAuthenticationExpired: () => void
}

export type UseReportListResult = {
  reports: ReportSummary[]
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}
