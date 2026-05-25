import { Card } from '@/design-system'
import { translations } from '@/lib/translations'
import type { DashboardStatsProps, StatCardProps } from '@/types/reportView'
import './DashboardStats.css'

export function DashboardStats({ reports }: DashboardStatsProps) {
  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)

  const reportsThisMonth = reports.filter((report) => {
    const inspectionDate = new Date(report.inspection_date)

    return (
      inspectionDate.getMonth() === today.getMonth() &&
      inspectionDate.getFullYear() === today.getFullYear()
    )
  })

  const approvedLastSevenDays = reports.filter((report) => {
    const inspectionDate = new Date(report.inspection_date)

    return report.status === 'approved' && inspectionDate >= sevenDaysAgo
  })

  return (
    <Card
      className="fr-dashboard-stats"
      padding="none"
      aria-label={translations.dashboard.stats.aria_label}
    >
      <StatCard
        title={translations.dashboard.stats.reports_this_month}
        value={String(reportsThisMonth.length)}
      />
      <StatCard
        title={translations.dashboard.stats.writing_time_saved}
        value="-"
      />
      <StatCard title={translations.dashboard.stats.ai_accuracy} value="-" />
      <StatCard
        title={translations.dashboard.stats.approved_last_seven_days}
        value={String(approvedLastSevenDays.length)}
      />
    </Card>
  )
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="fr-dashboard-stat">
      <h2>{title}</h2>
      <strong>{value}</strong>
    </div>
  )
}
