import type { ReportDetailTab } from '@/types/reportDetailView'

export function reportDetailViewClassName(
  activeTab: ReportDetailTab,
  tab: ReportDetailTab,
): string {
  return [
    'fr-report-detail-view',
    activeTab === tab && 'fr-report-detail-view--active',
  ]
    .filter(Boolean)
    .join(' ')
}
