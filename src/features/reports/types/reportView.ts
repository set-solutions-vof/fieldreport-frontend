import type { ReactNode } from 'react'
import type { CurrentUser } from '@/types/auth'
import type { ReportSummary } from '@/types/report'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
  onOpenDashboard: () => void
  onAuthenticationExpired: () => void
}

export type ReportDetailPageProps = {
  reportId: string
  onOpenDashboard: () => void
  onAuthenticationExpired: () => void
}

export type DashboardNavigationItem = 'dashboard' | 'reports' | 'profile'

export type DashboardShellProps = {
  children?: ReactNode
  currentUser: CurrentUser
  activeNavigationItem?: DashboardNavigationItem
  breadcrumbItems?: string[]
  totalReportsCount?: number
  onOpenDashboard?: () => void
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

export type ValidationReportsSectionProps = {
  reports: ReportSummary[]
  onOpenReport: (reportId: string) => void
}
