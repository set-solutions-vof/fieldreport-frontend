import type { ReactNode } from 'react'
import type { CurrentUser } from '@/typing/auth'

export type AppShellNavigationItem =
  | 'dashboard'
  | 'reports'
  | 'template'
  | 'team'
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
  onOpenHome?: () => void
  onOpenTemplate?: () => void
  onOpenTeam?: () => void
  onOpenProfile: () => void
  onLogout: () => void
}
