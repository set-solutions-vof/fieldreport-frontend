import { Card } from '@/design-system'
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
      aria-label="Dashboard statistieken"
    >
      <StatCard
        title="Rapporten deze maand"
        value={String(reportsThisMonth.length)}
      />
      <StatCard title="Schrijftijd bespaard" value="-" />
      <StatCard title="AI-nauwkeurigheid" value="-" />
      <StatCard
        title="Goedgekeurd · 7d"
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
