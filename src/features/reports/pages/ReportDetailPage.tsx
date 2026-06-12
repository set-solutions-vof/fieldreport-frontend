import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { AppShell } from '@/app/AppShell'
import { TemplateSkeletonGrid } from '@/features/templates/components/TemplateSkeletonGrid'
import { translations } from '@/lib/translations'
import { ReportDetailWorkspace } from '../components/ReportDetailWorkspace'
import { useReportDetail } from '../hooks/useReportDetail'
import { useReportList } from '../hooks/useReportList'
import { isReportGenerating } from '../lib/reportLabels'
import type { ReportDetailPageProps } from '@/types/reportView'
import './ReportDetailPage.css'

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
      <main className="fr-report-detail-loading-page">
        <div className="fr-report-detail-state">
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
      <main className="fr-report-detail-loading-page">
        <div className="fr-report-detail-state">
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
        contentClassName="fr-dashboard-content--template"
        totalReportsCount={reports.length}
        onOpenDashboard={onOpenDashboard}
        onOpenReports={onOpenReports}
        onOpenProfile={onOpenProfile}
        onLogout={onLogout}
      >
        <main className="fr-report-generating-page">
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
