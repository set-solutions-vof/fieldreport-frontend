import * as React from 'react'
import './Spinner.css'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  label?: string
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { size = 'md', label = 'Loading', className, ...rest },
    ref,
  ) {
    const cls = ['fr-spinner', `fr-spinner--${size}`, className]
      .filter(Boolean)
      .join(' ')
    return (
      <span
        ref={ref}
        className={cls}
        role={label ? 'status' : undefined}
        aria-live={label ? 'polite' : undefined}
        aria-label={label || undefined}
        {...rest}
      />
    )
  },
)

Spinner.displayName = 'Spinner'
