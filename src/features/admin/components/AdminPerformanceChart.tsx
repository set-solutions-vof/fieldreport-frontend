import { translations } from '@/lib/translations'
import type { AdminHomeChartMetric } from '@/typing/adminHome'
import type { AdminPerformanceChartProps } from '@/typing/adminHomeView'
import { adminPerformanceChartPadding } from '../lib/adminPerformanceChartLayout'
import { formatAdminChartPointLabel } from '../lib/adminHomeFormat'
import { useAdminPerformanceChartHover } from '../hooks/useAdminPerformanceChartHover'
import { AdminHoverTooltip } from './AdminHoverTooltip'
import { AdminPerformanceChartPlot } from './AdminPerformanceChartPlot'

export function AdminPerformanceChart({
  points,
  metric,
  onMetricChange,
}: AdminPerformanceChartProps) {
  const chartHover = useAdminPerformanceChartHover(points)
  const selectedMetricLabel =
    translations.admin_home.performance.metrics[metric]

  return (
    <div className="flex flex-col [gap:var(--fr-space-4)] [padding:var(--fr-space-5)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)]">
      <div className="flex flex-wrap items-center justify-between [gap:var(--fr-space-3)]">
        <h2 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">
          {translations.admin_home.performance.title}
        </h2>
        <label className="flex items-center [gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
          {translations.admin_home.performance.metric_label}
          <select
            className="[min-height:var(--fr-control-height-md)] [padding:var(--fr-space-1)_var(--fr-space-3)] [font:inherit] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] [transition:var(--fr-transition-base)] hover:[border-color:color-mix(in_oklch,var(--fr-accent)_35%,var(--fr-border))]"
            value={metric}
            onChange={(event) =>
              onMetricChange(event.target.value as AdminHomeChartMetric)
            }
          >
            <option value="reports">
              {translations.admin_home.performance.metrics.reports}
            </option>
            <option value="approved">
              {translations.admin_home.performance.metrics.approved}
            </option>
            <option value="draft">
              {translations.admin_home.performance.metrics.draft}
            </option>
          </select>
        </label>
      </div>

      <div className="flex items-center [gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-accent)]">
        <span className="inline-block [width:var(--fr-space-2)] [height:var(--fr-space-2)] rotate-45 [background:var(--fr-accent)]" />
        {selectedMetricLabel}
      </div>

      <div className="relative overflow-x-auto">
        <AdminPerformanceChartPlot
          points={points}
          svgRef={chartHover.svgRef}
          hoverIndex={chartHover.hoverIndex}
          plotWidth={chartHover.plotWidth}
          plotHeight={chartHover.plotHeight}
          axisMaxValue={chartHover.axisMaxValue}
          gridTicks={chartHover.gridTicks}
          pointCoordinates={chartHover.pointCoordinates}
          linePoints={chartHover.linePoints}
          showPointMarkers={chartHover.showPointMarkers}
          labelIndexes={chartHover.labelIndexes}
          activeCoordinate={chartHover.activeCoordinate}
          onPointerMove={chartHover.handlePointerMove}
          onPointerLeave={chartHover.handlePointerLeave}
        />

        {chartHover.activePoint !== null &&
          chartHover.tooltipAnchor !== null &&
          chartHover.activeCoordinate !== null && (
            <AdminHoverTooltip
              date={formatAdminChartPointLabel(chartHover.activePoint)}
              label={`${selectedMetricLabel}: ${chartHover.activePoint.value}`}
              clientX={chartHover.tooltipAnchor.clientX}
              clientY={chartHover.tooltipAnchor.clientY}
              preferBelow={
                chartHover.activeCoordinate.y <
                adminPerformanceChartPadding.top + 56
              }
            />
          )}
      </div>
    </div>
  )
}
