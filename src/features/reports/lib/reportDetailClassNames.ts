import type { ReportDetailTab } from '@/types/reportDetailView'

export function reportDetailViewClassName(
  activeTab: ReportDetailTab,
  tab: ReportDetailTab,
): string {
  if (activeTab === tab) {
    return 'block'
  }

  return 'hidden'
}
