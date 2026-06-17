import { Card } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { DashboardStatsProps, StatCardProps } from '@/typing/reportView'

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
      className="overflow-hidden"
      padding="none"
      aria-label={translations.dashboard.stats.aria_label}
    >
      <div className="grid grid-cols-4">
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
      </div>
    </Card>
  )
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="flex flex-col [gap:var(--fr-space-3)] [padding:var(--fr-space-5)] [border-left:1px_solid_var(--fr-border)] first-child:[border-left:0] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-base)] [&_h2]:[font-weight:var(--fr-weight-medium)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-secondary)] [&_strong]:[font-size:var(--fr-text-xl)] [&_strong]:[font-weight:var(--fr-weight-bold)] [&_strong]:[line-height:var(--fr-leading-tight)] [&_strong]:[color:var(--fr-text-primary)]">
      <h2>{title}</h2>
      <strong>{value}</strong>
    </div>
  )
}
