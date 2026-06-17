import { Button, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { AppShell } from '@/app/AppShell'
import { PageHeader } from '@/components/PageHeader'
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
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError || isCurrentUserError || currentUser === null) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
          <PageHeader
            title={translations.dashboard.states.reports_load_failed_title}
            metadata={errorMessage ?? currentUserErrorMessage}
          />
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
