import type { AdminPageProps } from '@/typing/routes'
import type { ReportSummary } from '@/typing/report'
import type { TeamUser } from '@/typing/team'

export type AdminHomeDateRange = {
  startDate: string
  endDate: string
}

export type AdminHomeDateRangePreset =
  | 'custom'
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'month_to_date'

export type AdminHomeMetric = {
  id: string
  label: string
  contextLabel: string
  value: string
  series: AdminHomeChartPoint[]
}

export type AdminHomeSummaryStat = {
  id: string
  label: string
  value: string
  hint: string
}

export type AdminHomeChartPoint = {
  date: string
  endDate?: string
  value: number
}

export type AdminHomeChartMetric = 'reports' | 'approved' | 'draft'

export type AdminHomeChartBucketSize = 'day' | 'week' | 'month'

export type AdminHomeChartBucket = {
  startDate: string
  endDate: string
}

export type AdminHomeUserFilterId = 'all' | string

export type AdminHomeUserFilterOption = {
  id: string
  label: string
}

export type AdminHomePageProps = Pick<
  AdminPageProps,
  'currentUser' | 'onAuthenticationExpired'
>

export type UseAdminHomeStatsParameters = {
  onAuthenticationExpired: () => void
}

export type AdminHomeStatsInput = {
  reports: ReportSummary[]
  teamUsers: TeamUser[]
  dateRange: AdminHomeDateRange
}
