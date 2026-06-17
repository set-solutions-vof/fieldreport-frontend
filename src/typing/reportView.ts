import type { ReportSummary } from '@/typing/report'
import type { InspectorPageProps, ReportRouteSource } from '@/typing/routes'

export type DashboardPageProps = InspectorPageProps & {
  onOpenReport: (reportId: string) => void
  onOpenNewReport: () => void
}

export type AllReportsPageProps = InspectorPageProps & {
  onOpenReport: (reportId: string) => void
}

export type ReportDetailPageProps = InspectorPageProps & {
  reportId: string
  source: ReportRouteSource
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
  onOpenNewReport: () => void
}

export type ReportsTableProps = {
  reports: ReportSummary[]
  emptyMessage: string
  unknownAddress: string
  onOpenReport?: (reportId: string) => void
}
