import { translations } from '@/lib/translations'
import type { ReportStatus } from '@/types/report'

export function reportStatusLabel(status: ReportStatus): string {
  if (status === 'draft') {
    return translations.reports.status.draft
  }

  if (status === 'generating') {
    return translations.reports.status.generating
  }

  if (status === 'approved') {
    return translations.reports.status.approved
  }

  return translations.reports.status.failed
}
