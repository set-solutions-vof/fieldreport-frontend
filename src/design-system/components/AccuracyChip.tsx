import * as React from 'react'
import './AccuracyChip.css'

export type AccuracyChipVariant = 'neutral' | 'warn' | 'alert'

export interface AccuracyChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number
  variant?: AccuracyChipVariant
  label?: React.ReactNode
}

type AccuracyChipStyle = React.CSSProperties & {
  '--fr-accuracy-chip-value': string
}

const getAccuracyChipVariant = (value: number): AccuracyChipVariant => {
  if (value < 60) {
    return 'alert'
  }

  if (value < 75) {
    return 'warn'
  }

  return 'neutral'
}

export const AccuracyChip = React.forwardRef<
  HTMLSpanElement,
  AccuracyChipProps
>(function AccuracyChip(
  { value, variant, label = 'AI', className, ...rest },
  ref,
) {
  const resolvedVariant = variant ?? getAccuracyChipVariant(value)
  const classNames = [
    'fr-accuracy-chip',
    `fr-accuracy-chip--${resolvedVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style: AccuracyChipStyle = {
    '--fr-accuracy-chip-value': `${value}%`,
  }

  return (
    <span ref={ref} className={classNames} style={style} {...rest}>
      <span>{label}</span>
      <span className="fr-accuracy-chip__value">{value}%</span>
      <span className="fr-accuracy-chip__meter" aria-hidden="true">
        <span className="fr-accuracy-chip__meter-fill" />
      </span>
    </span>
  )
})

AccuracyChip.displayName = 'AccuracyChip'
