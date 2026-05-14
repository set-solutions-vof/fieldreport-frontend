import * as React from 'react'
import './Logo.css'

export type LogoVariant = 'ink' | 'accent' | 'mono'

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Glyph color treatment. `ink` (default) is solid ink; `accent` uses the brand accent; `mono` uses currentColor for both glyph and wordmark. */
  variant?: LogoVariant
  /** Optical size in px. Sets font-size on the root; the glyph and wordmark scale together. */
  size?: number
  /** Render only the geometric mark (no wordmark). For favicons-in-DOM, app rails, etc. */
  markOnly?: boolean
  /** Set when the logo sits on a dark surface so the wordmark + notch flip correctly. */
  onDark?: boolean
  /** Override accessible label. Defaults to "FieldReport". */
  'aria-label'?: string
}

/**
 * FieldReport logo — the geometric mark + wordmark lockup.
 * The mark is a notched square that reads as a survey marker without
 * illustrating one. Built entirely from tokens; sized via the `size` prop.
 */
export const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  {
    variant = 'ink',
    size,
    markOnly = false,
    onDark = false,
    className,
    style,
    'aria-label': ariaLabel = 'FieldReport',
    ...rest
  },
  ref,
) {
  if (markOnly) {
    const markCls = [
      'fr-logo-mark',
      variant === 'accent' && 'fr-logo-mark--accent',
      className,
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <span
        ref={ref}
        className={markCls}
        role="img"
        aria-label={ariaLabel}
        style={{
          ...(size ? { fontSize: size, width: size, height: size } : null),
          ...style,
        }}
        {...rest}
      />
    )
  }

  const cls = [
    'fr-logo',
    variant === 'accent' && 'fr-logo--accent',
    variant === 'mono' && 'fr-logo--mono',
    onDark && 'fr-logo--on-dark',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      ref={ref}
      className={cls}
      role="img"
      aria-label={ariaLabel}
      style={{ ...(size ? { fontSize: size } : null), ...style }}
      {...rest}
    >
      <span className="fr-logo__glyph" aria-hidden="true" />
      <span className="fr-logo__wordmark" aria-hidden="true">
        <span className="fr-logo__field">Field</span>
        <span className="fr-logo__report">Report</span>
      </span>
    </span>
  )
})

Logo.displayName = 'Logo'

/** Convenience: render only the mark. Equivalent to <Logo markOnly />. */
export const LogoMark = React.forwardRef<
  HTMLSpanElement,
  Omit<LogoProps, 'markOnly'>
>(function LogoMark(props, ref) {
  return <Logo ref={ref} {...props} markOnly />
})
LogoMark.displayName = 'LogoMark'
