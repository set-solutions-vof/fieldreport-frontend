import * as React from 'react'
import './Card.css'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'

type CardCommon = {
  padding?: CardPadding
  interactive?: boolean
}

export type CardProps =
  | (CardCommon &
      React.HTMLAttributes<HTMLDivElement> & { interactive?: false })
  | (CardCommon &
      React.ButtonHTMLAttributes<HTMLButtonElement> & { interactive: true })

export const Card = React.forwardRef<HTMLElement, CardProps>(
  function Card(props, ref) {
    const {
      padding = 'md',
      interactive = false,
      className,
      children,
      ...rest
    } = props as CardCommon &
      React.HTMLAttributes<HTMLElement> &
      React.ButtonHTMLAttributes<HTMLButtonElement>

    const cls = [
      'fr-card',
      `fr-card--padding-${padding}`,
      interactive && 'fr-card--interactive',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cls}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cls}
        {...(rest as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    className={['fr-card__header', className].filter(Boolean).join(' ')}
    {...rest}
  />
)

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...rest
}) => (
  <h3
    className={['fr-card__title', className].filter(Boolean).join(' ')}
    {...rest}
  />
)

export const CardSubtitle: React.FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...rest }) => (
  <p
    className={['fr-card__subtitle', className].filter(Boolean).join(' ')}
    {...rest}
  />
)

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => (
  <div
    className={['fr-card__footer', className].filter(Boolean).join(' ')}
    {...rest}
  />
)
