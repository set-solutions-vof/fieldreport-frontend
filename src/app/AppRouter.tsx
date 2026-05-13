import { useEffect, useState } from 'react'
import { LoginPage } from '@/features/auth/LoginPage'
import { DashboardPage } from '@/features/reports/pages/DashboardPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import { dashboardRoute, reportRoute, reportRouteId } from './routes'

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
        onOpenReport={(reportId) => navigate(reportRoute(reportId))}
        onAuthenticationExpired={handleAuthenticationExpired}
      />
    )
  }

  const currentReportId = reportRouteId(currentPath)

  if (currentReportId !== null) {
    return (
      <ReportDetailPage
        reportId={currentReportId}
        onAuthenticationExpired={handleAuthenticationExpired}
      />
    )
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />
}
