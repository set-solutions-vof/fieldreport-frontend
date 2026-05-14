import * as React from 'react'
import { Spinner } from './Spinner'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'secondary',
      size = 'md',
      disabled = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      type = 'button',
      className,
      children,
      onClick,
      ...rest
    },
    ref,
  ) {
    const isInert = disabled || loading
    const cls = [
      'fr-button',
      `fr-button--${variant}`,
      `fr-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const spinnerSize = size === 'lg' ? 'md' : 'sm'

    return (
      <button
        ref={ref}
        type={type}
        className={cls}
        disabled={disabled}
        aria-disabled={isInert || undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        onClick={(e) => {
          if (isInert) {
            e.preventDefault()
            return
          }
          onClick?.(e)
        }}
        {...rest}
      >
        {loading ? (
          <Spinner size={spinnerSize} label="" aria-hidden="true" />
        ) : (
          leadingIcon && <span aria-hidden="true">{leadingIcon}</span>
        )}
        <span className="fr-button__label">{children}</span>
        {!loading && trailingIcon && (
          <span aria-hidden="true">{trailingIcon}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
