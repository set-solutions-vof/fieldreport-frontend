import type { ReportDetailPageProps } from '@/types/reportView'
import './ReportDetailPage.css'

export function ReportDetailPage({ reportId }: ReportDetailPageProps) {
  return (
    <main className="fr-report-detail-placeholder">
      <h1>Rapport</h1>
      <p>{reportId}</p>
    </main>
  )
}
