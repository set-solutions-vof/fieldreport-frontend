import { Button, Spinner } from '@/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import type { ReportDetailPageProps } from '@/types/reportView'
import { ReportDetailContent } from '../components/ReportDetailContent'
import { useReport } from '../hooks/useReport'
import { useReports } from '../hooks/useReports'
import './ReportDetailPage.css'

export function ReportDetailPage({
  reportId,
  onBackToDashboard,
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
          <h1>Rapport laden is mislukt</h1>
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
            Opnieuw proberen
          </Button>
        </div>
      </main>
    )
  }

  return (
    <ReportDetailContent
      key={report.id}
      report={report}
      currentUser={currentUser}
      reportsToValidateCount={
        reports.filter((reportSummary) => reportSummary.status === 'draft')
          .length
      }
      totalReportsCount={reports.length}
      onBackToDashboard={onBackToDashboard}
    />
  )
}
