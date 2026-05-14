import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { ReportDetailWorkspace } from '../components/ReportDetailWorkspace'
import { useReport } from '../hooks/useReport'
import { useReports } from '../hooks/useReports'
import type { ReportDetailPageProps } from '../types/reportView'
import './ReportDetailPage.css'

export function ReportDetailPage({
  reportId,
  onOpenDashboard,
  onAuthenticationExpired,
}: ReportDetailPageProps) {
  const { report, isLoading, isError, errorMessage, retry } = useReport({
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
  } = useReports({ onAuthenticationExpired })

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

  return (
    <ReportDetailWorkspace
      key={report.id}
      report={report}
      currentUser={currentUser}
      totalReportsCount={reports.length}
      onOpenDashboard={onOpenDashboard}
    />
  )
}
