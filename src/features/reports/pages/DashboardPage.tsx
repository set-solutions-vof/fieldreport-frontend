import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { DashboardShell } from '../components/DashboardShell'
import { DashboardStats } from '../components/DashboardStats'
import { RecentReportsTable } from '../components/RecentReportsTable'
import { ValidationReportsSection } from '../components/ValidationReportsSection'
import { useReports } from '../hooks/useReports'
import { formatReportCount } from '../lib/formatReportCount'
import type { DashboardPageProps } from '@/types/reportView'
import './DashboardPage.css'

export function DashboardPage({
  onOpenReport,
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
  const reportsToValidateCount = reportsToValidate.length

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
          <h1>Rapporten laden is mislukt</h1>
          <p>{errorMessage ?? currentUserErrorMessage}</p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              retry()
              retryCurrentUser()
            }}
          >
            Opnieuw proberen
          </Button>
        </div>
      </main>
    )
  }

  return (
    <DashboardShell
      currentUser={currentUser}
      activeNavigationItem="dashboard"
      breadcrumbItems={['Dashboard']}
      reportsToValidateCount={reportsToValidateCount}
      totalReportsCount={reports.length}
    >
      <section className="fr-dashboard-intro">
        <h1>Te valideren</h1>
        <p>{dashboardIntroText(reportsToValidateCount)}</p>
      </section>
      <ValidationReportsSection
        reports={reportsToValidate}
        onOpenReport={onOpenReport}
      />
      <DashboardStats reports={reports} />
      <RecentReportsTable reports={recentReports} />
    </DashboardShell>
  )
}

function dashboardIntroText(reportsToValidateCount: number): string {
  if (reportsToValidateCount === 0) {
    return 'Er wacht geen rapport op je controle.'
  }

  return `${formatReportCount(
    reportsToValidateCount,
  )} wacht${reportsToValidateCount === 1 ? '' : 'en'} op je controle. Gemiddelde nog niet beschikbaar.`
}
