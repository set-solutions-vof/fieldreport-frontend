export type ReportRouteSource = 'dashboard' | 'reports'

export type ReportRouteMatch = {
  reportId: string
  source: ReportRouteSource
}
