import type { ReactNode } from 'react'
import type { CurrentUser } from '@/types/auth'

export type AppShellNavigationItem =
  | 'dashboard'
  | 'reports'
  | 'template'
  | 'profile'

export type AppShellBreadcrumbItem = {
  label: string
  onClick?: () => void
}

export type AppShellProps = {
  children?: ReactNode
  currentUser: CurrentUser
  activeNavigationItem?: AppShellNavigationItem
  breadcrumbItems?: AppShellBreadcrumbItem[]
  contentClassName?: string
  totalReportsCount?: number
  onOpenDashboard?: () => void
  onOpenReports?: () => void
  onOpenTemplate?: () => void
}
