import type { ReactNode } from 'react'
import type { CurrentUser } from '@/types/auth'
import type { ReportSummary } from '@/types/report'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
  onAuthenticationExpired: () => void
}

export type ReportDetailPageProps = {
  reportId: string
  onAuthenticationExpired: () => void
}

export type DashboardNavigationItem =
  | 'dashboard'
  | 'validation'
  | 'reports'
  | 'locations'
  | 'profile'

export type DashboardShellProps = {
  children?: ReactNode
  currentUser: CurrentUser
  activeNavigationItem?: DashboardNavigationItem
  breadcrumbItems?: string[]
  reportsToValidateCount?: number
  totalReportsCount?: number
}

export type DashboardStatsProps = {
  reports: ReportSummary[]
}

export type StatCardProps = {
  title: string
  value: string
}

export type RecentReportsTableProps = {
  reports: ReportSummary[]
}

export type ReportCardProps = {
  report: ReportSummary
  onOpenReport: (reportId: string) => void
}

export type ValidationReportsSectionProps = {
  reports: ReportSummary[]
  onOpenReport: (reportId: string) => void
}
