import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { AppShell } from '@/app/AppShell'
import { ReportsTable } from '../components/ReportsTable'
import { useReportList } from '../hooks/useReportList'
import type { AllReportsPageProps } from '@/types/reportView'
import './DashboardPage.css'

export function AllReportsPage({
  onOpenReport,
  onOpenDashboard,
  onOpenReports,
  onAuthenticationExpired,
}: AllReportsPageProps) {
  const { reports, isLoading, isError, errorMessage, retry } = useReportList({
    onAuthenticationExpired,
  })
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })

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
    <AppShell
      currentUser={currentUser}
      activeNavigationItem="reports"
      breadcrumbItems={[
        { label: translations.dashboard.navigation.all_reports },
      ]}
      totalReportsCount={reports.length}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
    >
      <section className="fr-dashboard-section">
        <div className="fr-dashboard-section-header">
          <h2>{translations.dashboard.all_reports.title}</h2>
        </div>
        <ReportsTable
          reports={reports}
          emptyMessage={translations.dashboard.all_reports.empty}
          unknownAddress={translations.dashboard.reports_table.unknown_address}
          onOpenReport={onOpenReport}
        />
      </section>
    </AppShell>
  )
}
