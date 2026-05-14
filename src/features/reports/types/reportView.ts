import type { ReactNode } from 'react'
import type { CurrentUser } from '@/types/auth'
import type { ReportSummary } from '@/types/report'
import type { ReportRouteSource } from '@/types/routes'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  onOpenTemplate: () => void
  onAuthenticationExpired: () => void
}

export type AllReportsPageProps = {
  onOpenReport: (reportId: string) => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  onOpenTemplate: () => void
  onAuthenticationExpired: () => void
}

export type ReportDetailPageProps = {
  reportId: string
  source: ReportRouteSource
  onOpenDashboard: () => void
  onOpenReports: () => void
  onOpenTemplate: () => void
  onAuthenticationExpired: () => void
}

export type DashboardNavigationItem =
  | 'dashboard'
  | 'reports'
  | 'template'
  | 'profile'

export type DashboardBreadcrumbItem = {
  label: string
  onClick?: () => void
}

export type DashboardShellProps = {
  children?: ReactNode
  currentUser: CurrentUser
  activeNavigationItem?: DashboardNavigationItem
  breadcrumbItems?: DashboardBreadcrumbItem[]
  contentClassName?: string
  totalReportsCount?: number
  onOpenDashboard?: () => void
  onOpenReports?: () => void
  onOpenTemplate?: () => void
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
  onOpenReports: () => void
}

export type ValidationReportsSectionProps = {
  reports: ReportSummary[]
  onOpenReport: (reportId: string) => void
}

export type ReportsTableProps = {
  reports: ReportSummary[]
  emptyMessage: string
  unknownAddress: string
  onOpenReport?: (reportId: string) => void
}
