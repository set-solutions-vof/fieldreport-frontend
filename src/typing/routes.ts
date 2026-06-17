import type { CurrentUser } from '@/typing/auth'
import type { UseReportListResult } from '@/typing/reportList'

export type ReportRouteSource = 'dashboard' | 'reports'

export type ReportRouteMatch = {
  reportId: string
  source: ReportRouteSource
}

export type AuthenticatedRouterProps = {
  currentUser: CurrentUser
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type InspectorRouterProps = AuthenticatedRouterProps

export type AdminRouterProps = AuthenticatedRouterProps

export type AdminOnboardingGateProps = AuthenticatedRouterProps

export type InspectorPageProps = {
  currentUser: CurrentUser
  reportList: UseReportListResult
  onOpenDashboard: () => void
  onOpenReports: () => void
  onOpenProfile: () => void
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type AdminPageProps = {
  currentUser: CurrentUser
  onOpenTemplate: () => void
  onOpenTeam: () => void
  onOpenProfile: () => void
  onAuthenticationExpired: () => void
  onLogout: () => void
}
