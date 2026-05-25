import { useCallback, useEffect, useState } from 'react'
import { AllReportsPage } from '@/features/reports/pages/AllReportsPage'
import { DashboardPage } from '@/features/reports/pages/DashboardPage'
import { NewReportPage } from '@/features/reports/pages/NewReportPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import type { InspectorRouterProps } from '@/types/routes'
import {
  allReportsReportRoute,
  allReportsReportRoutePrefix,
  allReportsRoute,
  dashboardReportRoute,
  dashboardReportRoutePrefix,
  dashboardRoute,
  newReportRoute,
  reportRouteMatch,
} from '../routes'

export function InspectorRouter({
  onAuthenticationExpired,
}: InspectorRouterProps) {
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
        onOpenNewReport={() => navigate(newReportRoute)}
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

  if (currentPath === newReportRoute) {
    return (
      <NewReportPage
        onReportCreated={(reportId) => navigate(allReportsReportRoute(reportId))}
        onCancel={() => navigate(dashboardRoute)}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={onAuthenticationExpired}
        totalReportsCount={0}
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
      onOpenNewReport={() => navigate(newReportRoute)}
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
    path === newReportRoute ||
    path.startsWith(dashboardReportRoutePrefix) ||
    path.startsWith(allReportsReportRoutePrefix)
  )
}
