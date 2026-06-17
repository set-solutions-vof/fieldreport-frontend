import type {
  AppShellBreadcrumbItem,
  AppShellNavigationItem,
} from '@/typing/appShell'
import type { CurrentUser } from '@/typing/auth'

export type AppChromeDefaults = {
  activeNavigationItem: AppShellNavigationItem
  breadcrumbItems: AppShellBreadcrumbItem[]
  contentClassName?: string
}

export type AppChromeOverrides = {
  activeNavigationItem?: AppShellNavigationItem
  breadcrumbItems?: AppShellBreadcrumbItem[]
  contentClassName?: string
  currentUser?: CurrentUser
}

export type AppChromeContextValue = {
  setOverrides: (overrides: AppChromeOverrides) => void
}

export type AppChromeNavigationProps = {
  totalReportsCount?: number
  onOpenDashboard?: () => void
  onOpenReports?: () => void
  onOpenTemplate?: () => void
  onOpenTeam?: () => void
  onOpenProfile: () => void
  onLogout: () => void
}

export type AppChromeProviderProps = {
  currentUser: CurrentUser
  defaultChrome: AppChromeDefaults
  navigation: AppChromeNavigationProps
}
