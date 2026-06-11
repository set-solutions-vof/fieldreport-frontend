import type { ReportRouteMatch } from '@/types/routes'

export const dashboardRoute = '/dashboard'
export const allReportsRoute = '/reports'
export const newReportRoute = '/reports/new'
export const profileRoute = '/profile'
export const templateRoute = '/admin/template'
export const adminTeamRoute = '/admin/team'
export const onboardingRoute = '/onboarding'
export const inviteRoutePrefix = '/invite/'
export const dashboardReportRoutePrefix = '/dashboard/reports/'
export const allReportsReportRoutePrefix = '/reports/'

export function dashboardReportRoute(reportId: string): string {
  return `${dashboardReportRoutePrefix}${reportId}`
}

export function allReportsReportRoute(reportId: string): string {
  return `${allReportsReportRoutePrefix}${reportId}`
}

export function reportRouteMatch(path: string): ReportRouteMatch | null {
  const dashboardReportId = routeId(path, dashboardReportRoutePrefix)

  if (dashboardReportId !== null) {
    return {
      reportId: dashboardReportId,
      source: 'dashboard',
    }
  }

  const allReportsReportId = isReportDetailRoute(path)
    ? routeId(path, allReportsReportRoutePrefix)
    : null

  if (allReportsReportId !== null) {
    return {
      reportId: allReportsReportId,
      source: 'reports',
    }
  }

  return null
}

export function isReportDetailRoute(path: string): boolean {
  return (
    path.startsWith(allReportsReportRoutePrefix) &&
    path.replace(allReportsReportRoutePrefix, '') !== 'new'
  )
}

export function inviteTokenFromPath(path: string): string | null {
  if (!path.startsWith(inviteRoutePrefix)) {
    return null
  }

  const token = path.slice(inviteRoutePrefix.length)

  if (token === '') {
    return null
  }

  return token
}

function routeId(path: string, routePrefix: string): string | null {
  if (!path.startsWith(routePrefix)) {
    return null
  }

  const reportId = path.slice(routePrefix.length)

  if (reportId === '') {
    return null
  }

  return reportId
}
