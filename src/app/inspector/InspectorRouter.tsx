import { useCallback, useEffect, useState } from 'react'
import { AppChromeProvider } from '@/app/AppChromeProvider'
import { AccountProfilePage } from '@/features/profile/AccountProfilePage'
import { AllReportsPage } from '@/features/reports/pages/AllReportsPage'
import { DashboardPage } from '@/features/reports/pages/DashboardPage'
import { NewReportPage } from '@/features/reports/pages/NewReportPage'
import { ReportDetailPage } from '@/features/reports/pages/ReportDetailPage'
import { useReportList } from '@/features/reports/hooks/useReportList'
import type { InspectorRouterProps } from '@/typing/routes'
import {
  allReportsReportRoute,
  allReportsRoute,
  dashboardReportRoute,
  dashboardReportRoutePrefix,
  dashboardRoute,
  isReportDetailRoute,
  newReportRoute,
  profileRoute,
  reportRouteMatch,
} from '../routes'
import { inspectorShellChrome } from './inspectorShellChrome'

export function InspectorRouter({
  currentUser,
  onAuthenticationExpired,
  onLogout,
}: InspectorRouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    if (!isInspectorPath(path)) {
      window.history.replaceState(null, '', dashboardRoute)
      return dashboardRoute
    }
    return path
  })
  const reportList = useReportList({ onAuthenticationExpired })

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

  const onOpenDashboard = useCallback((): void => {
    navigate(dashboardRoute)
  }, [navigate])

  const onOpenReports = useCallback((): void => {
    navigate(allReportsRoute)
  }, [navigate])

  const onOpenProfile = useCallback((): void => {
    navigate(profileRoute)
  }, [navigate])

  const currentReportRoute = reportRouteMatch(currentPath)
  const sharedPageProps = {
    currentUser,
    reportList,
    onOpenDashboard,
    onOpenReports,
    onOpenProfile,
    onAuthenticationExpired,
    onLogout,
  }

  let content

  if (currentPath === dashboardRoute) {
    content = (
      <DashboardPage
        {...sharedPageProps}
        onOpenReport={(reportId) => navigate(dashboardReportRoute(reportId))}
        onOpenNewReport={() => navigate(newReportRoute)}
      />
    )
  } else if (currentPath === allReportsRoute) {
    content = (
      <AllReportsPage
        {...sharedPageProps}
        onOpenReport={(reportId) => navigate(allReportsReportRoute(reportId))}
      />
    )
  } else if (currentPath === newReportRoute) {
    content = (
      <NewReportPage
        {...sharedPageProps}
        onReportCreated={(reportId) =>
          navigate(allReportsReportRoute(reportId))
        }
        onCancel={onOpenDashboard}
      />
    )
  } else if (currentPath === profileRoute) {
    content = (
      <AccountProfilePage
        currentUser={currentUser}
        onCancel={onOpenDashboard}
        onOpenDashboard={onOpenDashboard}
        onOpenReports={onOpenReports}
        onOpenProfile={onOpenProfile}
        onAuthenticationExpired={onAuthenticationExpired}
        onLogout={onLogout}
      />
    )
  } else if (currentReportRoute !== null) {
    content = (
      <ReportDetailPage
        {...sharedPageProps}
        reportId={currentReportRoute.reportId}
        source={currentReportRoute.source}
      />
    )
  } else {
    content = (
      <DashboardPage
        {...sharedPageProps}
        onOpenReport={(reportId) => navigate(dashboardReportRoute(reportId))}
        onOpenNewReport={() => navigate(newReportRoute)}
      />
    )
  }

  return (
    <AppChromeProvider
      key={currentPath}
      currentUser={currentUser}
      defaultChrome={inspectorShellChrome(currentPath, currentReportRoute, {
        onOpenDashboard,
        onOpenReports,
      })}
      navigation={{
        totalReportsCount: reportList.reports.length,
        onOpenDashboard,
        onOpenReports,
        onOpenProfile,
        onLogout,
      }}
    >
      {content}
    </AppChromeProvider>
  )
}

function isInspectorPath(path: string): boolean {
  return (
    path === dashboardRoute ||
    path === allReportsRoute ||
    path === newReportRoute ||
    path === profileRoute ||
    path.startsWith(dashboardReportRoutePrefix) ||
    isReportDetailRoute(path)
  )
}
