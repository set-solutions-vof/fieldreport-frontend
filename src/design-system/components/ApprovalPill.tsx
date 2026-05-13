import * as React from 'react'
import './ApprovalPill.css'

export interface ApprovalPillProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  approved: boolean
  approveLabel?: React.ReactNode
  approvedLabel?: React.ReactNode
  onToggle?: () => void
}

export const ApprovalPill = React.forwardRef<
  HTMLButtonElement,
  ApprovalPillProps
>(function ApprovalPill(
  {
    approved,
    approveLabel = 'Goedkeuren',
    approvedLabel = 'Goedgekeurd',
    onToggle,
    className,
    type = 'button',
    onClick,
    ...rest
  },
  ref,
) {
  const classNames = [
    'fr-approval-pill',
    approved && 'fr-approval-pill--approved',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const symbol = approved ? '✓' : '○'
  const label = approved ? approvedLabel : approveLabel

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      aria-pressed={approved}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          onToggle?.()
        }
      }}
      {...rest}
    >
      <span className="fr-approval-pill__symbol" aria-hidden="true">
        {symbol}
      </span>
      <span>{label}</span>
    </button>
  )
})

ApprovalPill.displayName = 'ApprovalPill'
