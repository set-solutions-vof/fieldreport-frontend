import type { ReportSummary } from './report'

export type ReportsStatus = 'loading' | 'success' | 'error'

export type UseReportsResult = {
  reports: ReportSummary[]
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}
