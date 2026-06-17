import { translations } from '@/lib/translations'
import {
  ShellContentError,
  ShellContentLoader,
} from '@/components/ShellContentState'
import { DashboardStats } from '../components/DashboardStats'
import { RecentReportsTable } from '../components/RecentReportsTable'
import { ValidationReportsSection } from '../components/ValidationReportsSection'
import type { DashboardPageProps } from '@/typing/reportView'

export function DashboardPage({
  reportList,
  onOpenReport,
  onOpenNewReport,
  onOpenReports,
}: DashboardPageProps) {
  const { reports, isLoading, isError, errorMessage, retry } = reportList
  const reportsToValidate = reports.filter(
    (report) => report.status === 'draft',
  )
  const recentReports = reports.slice(0, 5)

  if (isLoading) {
    return <ShellContentLoader />
  }

  if (isError) {
    return (
      <ShellContentError
        title={translations.dashboard.states.reports_load_failed_title}
        message={errorMessage}
        onRetry={retry}
      />
    )
  }

  return (
    <>
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
    </>
  )
}
