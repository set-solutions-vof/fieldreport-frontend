import type { ReportSummary } from '@/types/report'
import type { ReportRouteSource } from '@/types/routes'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
  onOpenNewReport: () => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  onAuthenticationExpired: () => void
}

export type AllReportsPageProps = {
  onOpenReport: (reportId: string) => void
  onOpenDashboard: () => void
  onOpenReports: () => void
  onAuthenticationExpired: () => void
}

export type ReportDetailPageProps = {
  reportId: string
  source: ReportRouteSource
  onOpenDashboard: () => void
  onOpenReports: () => void
  onAuthenticationExpired: () => void
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
