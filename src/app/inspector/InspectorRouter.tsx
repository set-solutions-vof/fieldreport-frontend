import { useCallback, useEffect, useState } from 'react'
import { AllReportsPage } from '@/features/reports/pages/AllReportsPage'
import { DashboardPage } from '@/features/reports/pages/DashboardPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import {
  allReportsReportRoute,
  allReportsReportRoutePrefix,
  allReportsRoute,
  dashboardReportRoute,
  dashboardReportRoutePrefix,
  dashboardRoute,
  reportRouteMatch,
} from '../routes'

type InspectorRouterProps = {
  onAuthenticationExpired: () => void
}

export function InspectorRouter({ onAuthenticationExpired }: InspectorRouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    if (!isInspectorPath(path)) {
      window.history.replaceState(null, '', dashboardRoute)
      return dashboardRoute
    }
    return path
  })

  const navigate = useCallback((path: string): void => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }, [])

  useEffect(() => {
    function handlePopState(): void {
      const nextPath = window.location.pathname
      const resolved = isInspectorPath(nextPath) ? nextPath : dashboardRoute
      if (resolved !== nextPath) {
        window.history.replaceState(null, '', resolved)
      }
      setCurrentPath(resolved)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (currentPath === dashboardRoute) {
    return (
      <DashboardPage
        onOpenReport={(reportId) => navigate(dashboardReportRoute(reportId))}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={onAuthenticationExpired}
      />
    )
  }

  if (currentPath === allReportsRoute) {
    return (
      <AllReportsPage
        onOpenReport={(reportId) => navigate(allReportsReportRoute(reportId))}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={onAuthenticationExpired}
      />
    )
  }

  const currentReportRoute = reportRouteMatch(currentPath)

  if (currentReportRoute !== null) {
    return (
      <ReportDetailPage
        reportId={currentReportRoute.reportId}
        source={currentReportRoute.source}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={onAuthenticationExpired}
      />
    )
  }

  return (
    <DashboardPage
      onOpenReport={(reportId) => navigate(dashboardReportRoute(reportId))}
      onOpenDashboard={() => navigate(dashboardRoute)}
      onOpenReports={() => navigate(allReportsRoute)}
      onAuthenticationExpired={onAuthenticationExpired}
    />
  )
}

function isInspectorPath(path: string): boolean {
  return (
    path === dashboardRoute ||
    path === allReportsRoute ||
    path.startsWith(dashboardReportRoutePrefix) ||
    path.startsWith(allReportsReportRoutePrefix)
  )
}
