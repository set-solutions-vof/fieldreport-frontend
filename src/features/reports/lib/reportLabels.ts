import type { BadgeVariant } from '@/design-system'
import { translations } from '@/lib/translations'
import type { ReportStatus } from '@/types/report'

export function isReportGenerating(status: ReportStatus): boolean {
  return status === 'generating' || status === 'processing'
}

export function reportStatusBadgeVariant(status: ReportStatus): BadgeVariant {
  if (isReportGenerating(status)) {
    return 'generating'
  }

  if (status === 'draft' || status === 'approved' || status === 'failed') {
    return status
  }

  return 'failed'
}

export function reportStatusLabel(status: ReportStatus): string {
  if (status === 'draft') {
    return translations.reports.status.draft
  }

  if (isReportGenerating(status)) {
    return translations.reports.status.generating
  }

  if (status === 'approved') {
    return translations.reports.status.approved
  }

  return translations.reports.status.failed
}
