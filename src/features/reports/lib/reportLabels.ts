import type { ReportStatus } from '@/types/report'

export function reportStatusLabel(status: ReportStatus): string {
  if (status === 'draft') {
    return 'Concept'
  }

  if (status === 'generating') {
    return 'Genereren'
  }

  if (status === 'approved') {
    return 'Goedgekeurd'
  }

  return 'Mislukt'
}
