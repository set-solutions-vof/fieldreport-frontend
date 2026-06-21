import type { AdminMetricCardProps } from '@/typing/adminHomeView'
import { AdminSparkline } from './AdminSparkline'

export function AdminMetricCard({ metric }: AdminMetricCardProps) {
  return (
    <div className="flex h-full min-h-[calc(var(--fr-space-16)+var(--fr-space-6))] flex-col">
      <div className="flex flex-col [gap:var(--fr-space-1)] [padding:var(--fr-space-5)_var(--fr-space-5)_var(--fr-space-4)]">
        <h3 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">
          {metric.label}
        </h3>
        <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [letter-spacing:0.05em] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)] uppercase">
          {metric.contextLabel}
        </p>
        <strong className="tabular-nums [margin-top:var(--fr-space-2)] [font-size:var(--fr-text-3xl)] [font-weight:var(--fr-weight-bold)] [line-height:var(--fr-leading-tight)] [color:var(--fr-text-primary)]">
          {metric.value}
        </strong>
      </div>
      <div className="mt-auto">
        <AdminSparkline points={metric.series} valueLabel={metric.label} />
      </div>
    </div>
  )
}
