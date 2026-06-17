import { Button, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { AppShell } from '@/app/AppShell'
import { TemplateSkeletonGrid } from '@/features/templates/components/TemplateSkeletonGrid'
import { translations } from '@/lib/translations'
import { ReportDetailWorkspace } from '../components/ReportDetailWorkspace'
import { useReportDetail } from '../hooks/useReportDetail'
import { useReportList } from '../hooks/useReportList'
import { isReportGenerating } from '../lib/reportLabels'
import type { ReportDetailPageProps } from '@/types/reportView'

export function ReportDetailPage({
  reportId,
  source,
  onOpenDashboard,
  onOpenReports,
  onOpenProfile,
  onAuthenticationExpired,
  onLogout,
}: ReportDetailPageProps) {
  const { report, isLoading, isError, errorMessage, retry } = useReportDetail({
    reportId,
    onAuthenticationExpired,
  })
  const {
    currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    errorMessage: currentUserErrorMessage,
    retry: retryCurrentUser,
  } = useCurrentUser({ onAuthenticationExpired })
  const {
    reports,
    isLoading: isReportsLoading,
    isError: isReportsError,
    errorMessage: reportsErrorMessage,
    retry: retryReports,
  } = useReportList({ onAuthenticationExpired })

  if (isLoading || isCurrentUserLoading || isReportsLoading) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-8)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (
    isError ||
    isCurrentUserError ||
    isReportsError ||
    report === null ||
    currentUser === null
  ) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-8)] [background:var(--fr-background)]">
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <h1>{translations.report_detail.states.load_failed_title}</h1>
          <p>
            {errorMessage ?? currentUserErrorMessage ?? reportsErrorMessage}
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              retry()
              retryCurrentUser()
              retryReports()
            }}
          >
            {translations.report_detail.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  if (isReportGenerating(report.status)) {
    return (
      <AppShell
        currentUser={currentUser}
        activeNavigationItem={source === 'dashboard' ? 'dashboard' : 'reports'}
        breadcrumbItems={[
          {
            label:
              source === 'dashboard'
                ? translations.dashboard.navigation.dashboard
                : translations.dashboard.navigation.all_reports,
            onClick: source === 'dashboard' ? onOpenDashboard : onOpenReports,
          },
          { label: translations.report_detail.states.generating_breadcrumb },
        ]}
        contentClassName="[gap:var(--fr-space-0)] [padding:var(--fr-space-0)]"
        totalReportsCount={reports.length}
        onOpenDashboard={onOpenDashboard}
        onOpenReports={onOpenReports}
        onOpenProfile={onOpenProfile}
        onLogout={onLogout}
      >
        <main className="flex [min-height:calc(100dvh_-_var(--fr-space-14))] flex-col">
          <TemplateSkeletonGrid
            label={translations.report_detail.states.generating_title}
          />
        </main>
      </AppShell>
    )
  }

  return (
    <ReportDetailWorkspace
      key={report.id}
      report={report}
      currentUser={currentUser}
      totalReportsCount={reports.length}
      source={source}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    />
  )
}
