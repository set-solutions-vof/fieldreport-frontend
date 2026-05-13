import * as React from 'react'
import './IssueCallout.css'

export type IssueCalloutVariant = 'warn' | 'alert'

export interface IssueCalloutProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  variant?: IssueCalloutVariant
  title?: React.ReactNode
  action?: React.ReactNode
}

export const IssueCallout = React.forwardRef<HTMLDivElement, IssueCalloutProps>(
  function IssueCallout(
    { variant = 'warn', title, action, className, children, ...rest },
    ref,
  ) {
    const classNames = [
      'fr-issue-callout',
      `fr-issue-callout--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classNames} {...rest}>
        <div className="fr-issue-callout__content">
          {title && <div className="fr-issue-callout__title">{title}</div>}
          {children && <div className="fr-issue-callout__body">{children}</div>}
        </div>
        {action && <div className="fr-issue-callout__action">{action}</div>}
      </div>
    )
  },
)

IssueCallout.displayName = 'IssueCallout'
