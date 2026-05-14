import * as React from 'react'
import './CitationChip.css'

export type CitationChipVariant = 'neutral' | 'warn' | 'alert'

export interface CitationChipProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  timestamp: string
  variant?: CitationChipVariant
  children?: React.ReactNode
}

export const CitationChip = React.forwardRef<
  HTMLButtonElement,
  CitationChipProps
>(function CitationChip(
  {
    timestamp,
    variant = 'neutral',
    children,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  const classNames = [
    'fr-citation-chip',
    `fr-citation-chip--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type={type} className={classNames} {...rest}>
      {children ?? `[${timestamp}]`}
    </button>
  )
})

CitationChip.displayName = 'CitationChip'
