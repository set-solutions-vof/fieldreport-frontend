import type { ReactNode } from 'react'
import type { Report } from './report'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
}

export type ReportDetailPageProps = {
  reportId: string
}

export type DashboardShellProps = {
  children?: ReactNode
  reportsToValidateCount?: number
  totalReportsCount?: number
}

export type DashboardStatsProps = {
  reports: Report[]
}

export type StatCardProps = {
  title: string
  value: string
}

export type RecentReportsTableProps = {
  reports: Report[]
}

export type ReportCardProps = {
  report: Report
  onOpenReport: (reportId: string) => void
}

export type ValidationReportsSectionProps = {
  reports: Report[]
  onOpenReport: (reportId: string) => void
}
