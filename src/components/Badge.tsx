import type { ReportStatus } from '@/types'

type BadgeProps = {
  status: ReportStatus
}

const config: Record<ReportStatus, { label: string; className: string }> = {
  draft: { label: 'Concept', className: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Goedgekeurd', className: 'bg-green-100 text-green-800' },
  generating: {
    label: 'Wordt aangemaakt',
    className: 'bg-blue-100 text-blue-800',
  },
  failed: { label: 'Mislukt', className: 'bg-red-100 text-red-800' },
}

export function Badge({ status }: BadgeProps) {
  const { label, className } = config[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  )
}
