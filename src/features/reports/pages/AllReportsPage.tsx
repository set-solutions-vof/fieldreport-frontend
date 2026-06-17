import { Button, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { AppShell } from '@/app/AppShell'
import { PageHeader } from '@/components/PageHeader'
import { ReportsTable } from '../components/ReportsTable'
import { useReportList } from '../hooks/useReportList'
import type { AllReportsPageProps } from '@/types/reportView'

export function AllReportsPage({
  onOpenReport,
  onOpenDashboard,
  onOpenReports,
  onOpenProfile,
  onAuthenticationExpired,
  onLogout,
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
      activeNavigationItem="reports"
      breadcrumbItems={[
        { label: translations.dashboard.navigation.all_reports },
      ]}
      totalReportsCount={reports.length}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <section className="flex flex-col [gap:var(--fr-space-4)]">
        <div className="flex items-center justify-between [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-lg)] [&_h2]:[font-weight:var(--fr-weight-bold)] [&_h2]:[letter-spacing:var(--fr-tracking-section)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
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
