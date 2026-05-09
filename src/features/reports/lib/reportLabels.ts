import type { ReportSection, ReportStatus } from '@/types/report'
import type { ConfidenceLevelConfig } from '@/types/reportView'

export const confidenceLevelConfig: Record<
  ReportSection['confidence_level'],
  ConfidenceLevelConfig
> = {
  high: {
    className: 'fr-report-section-card--confidence-high',
    label: 'Hoge zekerheid',
  },
  medium: {
    className: 'fr-report-section-card--confidence-medium',
    label: 'Controleren aanbevolen',
  },
  low: {
    className: 'fr-report-section-card--confidence-low',
    label: 'Lage zekerheid',
  },
}

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
