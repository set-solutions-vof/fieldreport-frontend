import { translations } from '@/lib/translations'

export function formatReportCount(reportCount: number): string {
  if (reportCount === 0) {
    return translations.dashboard.report_count.none
  }

  if (reportCount === 1) {
    return translations.dashboard.report_count.one
  }

  return `${reportCount} ${translations.dashboard.report_count.many_suffix}`
}
