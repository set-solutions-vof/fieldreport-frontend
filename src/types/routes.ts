import type { CurrentUser } from '@/types/auth'

export type ReportRouteSource = 'dashboard' | 'reports'

export type ReportRouteMatch = {
  reportId: string
  source: ReportRouteSource
}

export type InspectorRouterProps = {
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type AdminRouterProps = {
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type AdminOnboardingGateProps = {
  currentUser: CurrentUser
  onAuthenticationExpired: () => void
  onLogout: () => void
}
