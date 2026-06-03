import type { OnboardingIconProps } from '@/types/onboardingIcon'

export function OnboardingIcon({ name, className }: OnboardingIconProps) {
  if (name === 'buildingProfile') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M8 6h8M8 10h8M8 14h5" />
        <path {...strokeProps} d="M6 4h12v16H6z" />
      </svg>
    )
  }

  if (name === 'lock') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect {...strokeProps} x="6" y="11" width="12" height="9" rx="1" />
        <path {...strokeProps} d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    )
  }

  if (name === 'photo') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <rect {...strokeProps} x="3" y="5" width="18" height="14" rx="1" />
        <circle {...strokeProps} cx="9" cy="11" r="2" />
        <path {...strokeProps} d="M3 17l5-4 4 3 4-3 5 4" />
      </svg>
    )
  }

  if (name === 'check') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M6 12l4 4 8-8" />
      </svg>
    )
  }

  if (name === 'chevronRight') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M9 6l6 6-6 6" />
      </svg>
    )
  }

  if (name === 'chevronLeft') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M15 6l-6 6 6 6" />
      </svg>
    )
  }

  if (name === 'x') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path {...strokeProps} d="M5 5l14 14M19 5L5 19" />
      </svg>
    )
  }

  return null
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}
