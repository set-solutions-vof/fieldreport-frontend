import type { EvidenceTypeIconProps } from '@/typing/reportIconView'

export function EvidenceTypeIcon({ type, size }: EvidenceTypeIconProps) {
  if (type === 'audio') {
    return (
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="6" y="2" width="4" height="9" rx="2" />
        <path d="M4 8a4 4 0 0 0 8 0M8 11v3" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <circle cx="8" cy="8" r="2.2" />
    </svg>
  )
}
