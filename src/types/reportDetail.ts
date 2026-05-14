import type { ReportDetail, UpdateReportSectionResponse } from './report'

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

export type UseReportSectionParameters = {
  reportId: string
  sectionId: string
  onSuccess: (updatedSection: UpdateReportSectionResponse) => void
}

export type UseReportSectionResult = {
  approve: () => Promise<void>
}
