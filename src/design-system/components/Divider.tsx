import * as React from 'react'
import './Divider.css'

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  decorative?: boolean
}

export const Divider = React.forwardRef<HTMLElement, DividerProps>(
  function Divider(
    {
      orientation = 'horizontal',
      spacing = 'none',
      decorative = true,
      className,
      ...rest
    },
    ref,
  ) {
    const cls = [
      'fr-divider',
      `fr-divider--${orientation}`,
      spacing !== 'none' && `fr-divider--spacing-${spacing}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (orientation === 'horizontal' && decorative) {
      return (
        <hr ref={ref as React.Ref<HTMLHRElement>} className={cls} {...rest} />
      )
    }
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cls}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={!decorative ? orientation : undefined}
        {...rest}
      />
    )
  },
)

Divider.displayName = 'Divider'
