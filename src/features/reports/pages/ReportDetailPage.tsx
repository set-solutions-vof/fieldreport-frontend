import { useMemo } from 'react'
import { useAppChrome } from '@/app/useAppChrome'
import { translations } from '@/lib/translations'
import {
  ShellContentError,
  ShellContentLoader,
} from '@/components/ShellContentState'
import { TemplateSkeletonGrid } from '@/features/templates/components/TemplateSkeletonGrid'
import { ReportDetailWorkspace } from '../components/ReportDetailWorkspace'
import { useReportDetail } from '../hooks/useReportDetail'
import { isReportGenerating } from '../lib/reportLabels'
import type { ReportDetailPageProps } from '@/typing/reportView'

export function ReportDetailPage({
  reportId,
  source,
  reportList,
  onOpenDashboard,
  onOpenReports,
  onAuthenticationExpired,
}: ReportDetailPageProps) {
  const { report, isLoading, isError, errorMessage, retry } = useReportDetail({
    reportId,
    onAuthenticationExpired,
  })
  const { isLoading: isReportsLoading, isError: isReportsError } = reportList

  const reportBreadcrumbItems = useMemo(() => {
    if (report === null) {
      return undefined
    }

    if (isReportGenerating(report.status)) {
      return [
        {
          label:
            source === 'dashboard'
              ? translations.dashboard.navigation.dashboard
              : translations.dashboard.navigation.all_reports,
          onClick: source === 'dashboard' ? onOpenDashboard : onOpenReports,
        },
        { label: translations.report_detail.states.generating_breadcrumb },
      ]
    }

    return [
      {
        label:
          source === 'dashboard'
            ? translations.dashboard.navigation.dashboard
            : translations.dashboard.navigation.all_reports,
        onClick: source === 'dashboard' ? onOpenDashboard : onOpenReports,
      },
      { label: translations.report_detail.tabs.report },
      {
        label:
          report.metadata.address ??
          translations.dashboard.reports_table.unknown_address,
      },
    ]
  }, [onOpenDashboard, onOpenReports, report, source])

  useAppChrome({
    activeNavigationItem: source === 'dashboard' ? 'dashboard' : 'reports',
    breadcrumbItems: reportBreadcrumbItems,
  })

  if (isLoading || isReportsLoading) {
    return <ShellContentLoader />
  }

  if (isError || isReportsError || report === null) {
    return (
      <ShellContentError
        title={translations.report_detail.states.load_failed_title}
        message={errorMessage}
        onRetry={retry}
      />
    )
  }

  if (isReportGenerating(report.status)) {
    return (
      <main className="flex [min-height:calc(100dvh_-_var(--fr-space-14))] flex-col">
        <TemplateSkeletonGrid
          label={translations.report_detail.states.generating_title}
        />
      </main>
    )
  }

  return <ReportDetailWorkspace key={report.id} report={report} />
}
