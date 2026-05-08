import type { Report } from './report'

export type ReportsStatus = 'loading' | 'success'

export type UseReportsResult = {
  reports: Report[]
  isLoading: boolean
}
