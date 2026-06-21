import { translations } from '@/lib/translations'
import type { AdminPerformanceOverviewProps } from '@/typing/adminHomeView'
import { AdminDateRangePicker } from './AdminDateRangePicker'
import { AdminTeamUserFilter } from './AdminTeamUserFilter'
import { AdminMetricCard } from './AdminMetricCard'
import { AdminStatTile } from './AdminStatTile'

const metricTileClassName =
  '[padding:var(--fr-space-5)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)]'

export function AdminPerformanceOverview({
  summaryStats,
  metrics,
  dateRange,
  dateRangePreset,
  userFilterId,
  userFilterOptions,
  onDateRangeChange,
  onUserFilterChange,
}: AdminPerformanceOverviewProps) {
  return (
    <div className="flex flex-col [gap:var(--fr-space-5)]">
      <h2 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">
        {translations.admin_home.performance.overview_title}
      </h2>

      <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
        {summaryStats.map((stat) => (
          <AdminStatTile
            key={stat.id}
            title={stat.label}
            value={stat.value}
            hint={stat.hint}
          />
        ))}
      </div>

      <div className="grid [grid-template-columns:repeat(3,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
        <AdminDateRangePicker
          value={dateRange}
          preset={dateRangePreset}
          onChange={onDateRangeChange}
        />
        <div className="col-span-2 flex items-end justify-end">
          <AdminTeamUserFilter
            value={userFilterId}
            options={userFilterOptions}
            onChange={onUserFilterChange}
          />
        </div>
      </div>

      <div className="grid [grid-template-columns:repeat(3,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`${metricTileClassName} overflow-hidden [padding:var(--fr-space-0)]`}
          >
            <AdminMetricCard metric={metric} />
          </div>
        ))}
      </div>
    </div>
  )
}
