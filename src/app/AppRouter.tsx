import { useEffect, useState } from 'react'
import { LoginPage } from '@/features/auth/LoginPage'
import { AllReportsPage } from '@/features/reports/pages/AllReportsPage'
import { DashboardPage } from '@/features/reports/pages/DashboardPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import {
  allReportsReportRoute,
  allReportsRoute,
  dashboardReportRoute,
  dashboardRoute,
  reportRouteMatch,
} from './routes'

export function AppRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    function handlePopState(): void {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(path: string): void {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
  }

  function handleLoginSuccess(): void {
    setIsAuthenticated(true)
    navigate(dashboardRoute)
  }

  function handleAuthenticationExpired(): void {
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  if (currentPath === dashboardRoute) {
    return (
      <DashboardPage
        onOpenReport={(reportId) => navigate(dashboardReportRoute(reportId))}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={handleAuthenticationExpired}
      />
    )
  }

  if (currentPath === allReportsRoute) {
    return (
      <AllReportsPage
        onOpenReport={(reportId) => navigate(allReportsReportRoute(reportId))}
        onOpenDashboard={() => navigate(dashboardRoute)}
        onOpenReports={() => navigate(allReportsRoute)}
        onAuthenticationExpired={handleAuthenticationExpired}
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
        onAuthenticationExpired={handleAuthenticationExpired}
      />
    )
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />
}
