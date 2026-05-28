import * as React from 'react'
import './EvidenceRailItem.css'

export type EvidenceRailItemVariant = 'neutral' | 'warn' | 'alert' | 'active'
export type EvidenceRailItemConnector = 'start' | 'middle' | 'end' | 'none'

export interface EvidenceRailItemProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'title'
> {
  timestamp: React.ReactNode
  icon?: React.ReactNode
  title: React.ReactNode
  sectionRef: React.ReactNode
  variant?: EvidenceRailItemVariant
  active?: boolean
  connector?: EvidenceRailItemConnector
}

export const EvidenceRailItem = React.forwardRef<
  HTMLButtonElement,
  EvidenceRailItemProps
>(function EvidenceRailItem(
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
    'fr-evidence-rail-item',
    `fr-evidence-rail-item--${resolvedVariant}`,
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
      <span className="fr-evidence-rail-item__rail" aria-hidden="true">
        <span className="fr-evidence-rail-item__node" />
      </span>
      <span className="fr-evidence-rail-item__timestamp">{timestamp}</span>
      <span className="fr-evidence-rail-item__content">
        <span className="fr-evidence-rail-item__title">
          {icon && (
            <span className="fr-evidence-rail-item__icon" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{title}</span>
        </span>
        <span className="fr-evidence-rail-item__section">{sectionRef}</span>
      </span>
    </button>
  )
})

EvidenceRailItem.displayName = 'EvidenceRailItem'
