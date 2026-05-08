export const dashboardRoute = '/dashboard'
export const reportRoutePrefix = '/reports/'

export function reportRoute(reportId: string): string {
  return `${reportRoutePrefix}${reportId}`
}

export function reportRouteId(path: string): string | null {
  if (!path.startsWith(reportRoutePrefix)) {
    return null
  }

  const reportId = path.slice(reportRoutePrefix.length)

  if (reportId === '') {
    return null
  }

  return reportId
}
