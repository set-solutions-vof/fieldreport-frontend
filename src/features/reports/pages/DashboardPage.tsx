import { Button, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { AppShell } from '@/app/AppShell'
import { DashboardStats } from '../components/DashboardStats'
import { RecentReportsTable } from '../components/RecentReportsTable'
import { ValidationReportsSection } from '../components/ValidationReportsSection'
import { useReportList } from '../hooks/useReportList'
import type { DashboardPageProps } from '@/types/reportView'

export function DashboardPage({
  onOpenReport,
  onOpenNewReport,
  onOpenDashboard,
  onOpenReports,
  onOpenProfile,
  onAuthenticationExpired,
  onLogout,
}: DashboardPageProps) {
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
  const reportsToValidate = reports.filter(
    (report) => report.status === 'draft',
  )
  const recentReports = reports.slice(0, 5)

  if (isLoading || isCurrentUserLoading) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || isCurrentUserError || currentUser === null) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
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
      activeNavigationItem="dashboard"
      breadcrumbItems={[{ label: translations.dashboard.navigation.dashboard }]}
      totalReportsCount={reports.length}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <ValidationReportsSection
        reports={reportsToValidate}
        onOpenReport={onOpenReport}
        onOpenNewReport={onOpenNewReport}
      />
      <DashboardStats reports={reports} />
      <RecentReportsTable
        reports={recentReports}
        onOpenReports={onOpenReports}
      />
    </AppShell>
  )
}
