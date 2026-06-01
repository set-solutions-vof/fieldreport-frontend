export type ReportRouteSource = 'dashboard' | 'reports'

export type ReportRouteMatch = {
  reportId: string
  source: ReportRouteSource
}

export type InspectorRouterProps = {
  onAuthenticationExpired: () => void
}

export type AdminRouterProps = {
  onAuthenticationExpired: () => void
}
