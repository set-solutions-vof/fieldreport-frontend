import * as React from 'react'
import './SourceRailItem.css'

export type SourceRailItemVariant = 'neutral' | 'warn' | 'alert' | 'active'
export type SourceRailItemConnector = 'start' | 'middle' | 'end' | 'none'

export interface SourceRailItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'title'
> {
  timestamp: React.ReactNode
  icon?: React.ReactNode
  title: React.ReactNode
  sectionRef: React.ReactNode
  variant?: SourceRailItemVariant
  active?: boolean
  connector?: SourceRailItemConnector
}

export const SourceRailItem = React.forwardRef<
  HTMLButtonElement,
  SourceRailItemProps
>(function SourceRailItem(
  {
    timestamp,
    icon,
    title,
    sectionRef,
    variant = 'neutral',
    active = false,
    connector = 'middle',
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  const resolvedVariant = active ? 'active' : variant
  const classNames = [
    'fr-source-rail-item',
    `fr-source-rail-item--${resolvedVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      data-connector={connector}
      aria-pressed={active || undefined}
      {...rest}
    >
      <span className="fr-source-rail-item__rail" aria-hidden="true">
        <span className="fr-source-rail-item__node" />
      </span>
      <span className="fr-source-rail-item__timestamp">{timestamp}</span>
      <span className="fr-source-rail-item__content">
        <span className="fr-source-rail-item__title">
          {icon && (
            <span className="fr-source-rail-item__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{title}</span>
        </span>
        <span className="fr-source-rail-item__section">{sectionRef}</span>
      </span>
    </button>
  )
})

SourceRailItem.displayName = 'SourceRailItem'
