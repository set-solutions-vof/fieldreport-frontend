import * as React from 'react'
import './FilterChip.css'

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  onToggle?: () => void
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  function FilterChip(
    {
      selected = false,
      onToggle,
      className,
      type = 'button',
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    const classNames = ['fr-fchip', selected && 'fr-fchip--selected', className]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        aria-pressed={selected}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            onToggle?.()
          }
        }}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

FilterChip.displayName = 'FilterChip'
