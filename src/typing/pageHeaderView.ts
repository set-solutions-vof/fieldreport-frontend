import type { ReactNode } from 'react'

export type PageHeaderProps = {
  title: ReactNode
  eyebrowLabel?: ReactNode
  metadata?: ReactNode
  titleLeadingIcon?: ReactNode
  titleId?: string
  className?: string
  withBottomSpacing?: boolean
}

export type PageSummaryHeaderProps = {
  title: ReactNode
  titleLeadingIcon?: ReactNode
  metadata?: ReactNode
  metadataBadges?: ReactNode
  hint?: ReactNode
  action?: ReactNode
}
