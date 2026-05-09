import type { ReportDetail, ReportSection } from './report'

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

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export type UseReportSectionParameters = {
  reportId: string
  sectionId: string
  onSuccess: (updatedSection: ReportSection) => void
}

export type UseReportSectionResult = {
  saveStatus: SaveStatus
  approve: () => Promise<void>
  saveContent: (content: string) => void
}
