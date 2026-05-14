import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { DashboardShell } from '../components/DashboardShell'
import { DashboardStats } from '../components/DashboardStats'
import { RecentReportsTable } from '../components/RecentReportsTable'
import { ValidationReportsSection } from '../components/ValidationReportsSection'
import { useReports } from '../hooks/useReports'
import type { DashboardPageProps } from '../types/reportView'
import './DashboardPage.css'

export function DashboardPage({
  onOpenReport,
  onOpenDashboard,
  onAuthenticationExpired,
}: DashboardPageProps) {
  const { reports, isLoading, isError, errorMessage, retry } = useReports({
    onAuthenticationExpired,
  })
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })
  const reportsToValidate = reports.filter(
    (report) => report.status === 'draft',
  )
  const recentReports = reports.slice(0, 5)

  if (isLoading || isCurrentUserLoading) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || isCurrentUserError || currentUser === null) {
    return (
      <main className="fr-dashboard-loading-page">
        <div className="fr-dashboard-state">
          <h1>{translations.dashboard.states.reports_load_failed_title}</h1>
          <p>{errorMessage ?? currentUserErrorMessage}</p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              retry()
              retryCurrentUser()
            }}
          >
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <DashboardShell
      currentUser={currentUser}
      activeNavigationItem="dashboard"
      breadcrumbItems={[translations.dashboard.navigation.dashboard]}
      totalReportsCount={reports.length}
      onOpenDashboard={onOpenDashboard}
    >
      <ValidationReportsSection
        reports={reportsToValidate}
        onOpenReport={onOpenReport}
      />
      <DashboardStats reports={reports} />
      <RecentReportsTable reports={recentReports} />
    </DashboardShell>
  )
}
