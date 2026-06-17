import type { ReportDetail, ReportSectionUpdateResponse } from './report'

export type ReportDetailLoadStatus = 'loading' | 'success' | 'error'

export type UseReportDetailParameters = {
  reportId: string
  onAuthenticationExpired: () => void
}

export type UseReportDetailResult = {
  report: ReportDetail | null
  isLoading: boolean
  isError: boolean
  errorMessage: string | null
  retry: () => void
}

export type UseReportSectionParameters = {
  reportId: string
  sectionId: string
  onSuccess: (updatedSection: ReportSectionUpdateResponse) => void
}

export type UseReportSectionResult = {
  approve: () => Promise<void>
  approveError: string | null
}
