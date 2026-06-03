import type { ReportRouteMatch } from '@/types/routes'

export const dashboardRoute = '/dashboard'
export const allReportsRoute = '/reports'
export const newReportRoute = '/reports/new'
export const templateRoute = '/admin/template'
export const onboardingRoute = '/onboarding'
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

  const allReportsReportId = routeId(path, allReportsReportRoutePrefix)

  if (allReportsReportId !== null) {
    return {
      reportId: allReportsReportId,
      source: 'reports',
    }
  }

  return null
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
