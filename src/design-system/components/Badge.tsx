import * as React from 'react'
import { Spinner } from './Spinner'
import './Badge.css'

export type BadgeVariant = 'draft' | 'approved' | 'generating' | 'failed'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Report-status variant. */
  variant: BadgeVariant
  /**
   * Show a leading indicator. `auto` (default) shows a spinner for `generating`
   * and a dot for everything else. `dot` forces a dot, `none` hides it.
   * The indicator means the variant is never communicated by color alone.
   */
  indicator?: 'auto' | 'dot' | 'none'
}

const VARIANT_LABEL: Record<BadgeVariant, string> = {
  draft: 'Draft',
  approved: 'Approved',
  generating: 'Generating',
  failed: 'Failed',
}

/**
 * Badge — small inline status pill mapped to report lifecycle states.
 * Pairs a leading indicator (dot or spinner) with the color so meaning
 * is conveyed by both shape and hue.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge(
    { variant, indicator = 'auto', className, children, ...rest },
    ref,
  ) {
    const cls = ['fr-badge', `fr-badge--${variant}`, className]
      .filter(Boolean)
      .join(' ')

    const showSpinner =
      indicator !== 'none' && variant === 'generating' && indicator === 'auto'
    const showDot = indicator !== 'none' && !showSpinner

    return (
      <span ref={ref} className={cls} {...rest}>
        {showSpinner && <Spinner size="sm" label="" aria-hidden="true" />}
        {showDot && <span className="fr-badge__dot" aria-hidden="true" />}
        <span>{children ?? VARIANT_LABEL[variant]}</span>
      </span>
    )
  },
)

Badge.displayName = 'Badge'
