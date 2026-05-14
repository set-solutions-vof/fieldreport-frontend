import type { ReportDetailTab } from '../../types/reportDetailView'

export function ReportDetailTabIcon({ tab }: ReportDetailTabIconProps) {
  if (tab === 'report') {
    return (
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="2" width="10" height="12" rx="1.5" />
        <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
      </svg>
    )
  }

  if (tab === 'transcript') {
    return (
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 4h10M3 8h10M3 12h7" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
      <circle cx="6" cy="7" r="1.2" />
      <path d="M3 11l3-3 3 3 2-2 2 2" />
    </svg>
  )
}

type ReportDetailTabIconProps = {
  tab: ReportDetailTab
}
