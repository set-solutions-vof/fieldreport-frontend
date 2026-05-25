import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { translations } from '@/lib/translations'
import { ReportDetailWorkspace } from '../components/ReportDetailWorkspace'
import { useReportDetail } from '../hooks/useReportDetail'
import { useReportList } from '../hooks/useReportList'
import type { ReportDetailPageProps } from '@/types/reportView'
import './ReportDetailPage.css'

export function ReportDetailPage({
  reportId,
  source,
  onOpenDashboard,
  onOpenReports,
  onAuthenticationExpired,
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

  return (
    <ReportDetailWorkspace
      key={report.id}
      report={report}
      currentUser={currentUser}
      totalReportsCount={reports.length}
      source={source}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
    />
  )
}
