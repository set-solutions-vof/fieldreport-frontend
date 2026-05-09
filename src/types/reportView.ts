import type { ReactNode } from 'react'
import type { CurrentUser } from './auth'
import type {
  ReportDetail,
  ReportSection,
  ReportSummary,
  SectionSource,
} from './report'

export type DashboardPageProps = {
  onOpenReport: (reportId: string) => void
  onAuthenticationExpired: () => void
}

export type ReportDetailPageProps = {
  reportId: string
  onBackToDashboard: () => void
  onAuthenticationExpired: () => void
}

export type DetailPanelTab = 'timeline' | 'photos' | 'stats'

export type ReportDetailContentProps = {
  report: ReportDetail
  currentUser: CurrentUser
  reportsToValidateCount: number
  totalReportsCount: number
  onBackToDashboard: () => void
}

export type ReportDetailHeaderProps = {
  report: ReportDetail
  onBackToDashboard: () => void
}

export type ReportDetailSectionsProps = {
  reportId: string
  sections: ReportSection[]
  onSectionUpdated: (updated: ReportSection) => void
}

export type ReportDetailSidePanelProps = {
  activeTab: DetailPanelTab
  sections: ReportSection[]
  onActiveTabChange: (activeTab: DetailPanelTab) => void
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

export type ReportSectionProps = {
  section: ReportSection
  reportId: string
  onSectionUpdated: (updated: ReportSection) => void
}

export type ConfidenceLevelConfig = {
  className: string
  label: string
}

export type TimelinePanelProps = {
  sections: ReportSection[]
}

export type TimelineItem = {
  id: string
  sectionLabel: string
  source: SectionSource
}

export type ValidationReportsSectionProps = {
  reports: ReportSummary[]
  onOpenReport: (reportId: string) => void
}
