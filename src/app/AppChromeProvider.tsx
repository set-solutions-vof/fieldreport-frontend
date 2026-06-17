import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AppShell } from '@/app/AppShell'
import { AppChromeContext } from '@/app/appChromeContext'
import type {
  AppChromeOverrides,
  AppChromeProviderProps,
} from '@/typing/appChrome'

export function AppChromeProvider({
  currentUser,
  defaultChrome,
  navigation,
  children,
}: AppChromeProviderProps & { children: ReactNode }) {
  const [overrides, setOverridesState] = useState<AppChromeOverrides>({})

  const setOverrides = useCallback(
    (nextOverrides: AppChromeOverrides): void => {
      setOverridesState(nextOverrides)
    },
    [],
  )

  const contextValue = useMemo(
    () => ({
      setOverrides,
    }),
    [setOverrides],
  )

  const shellUser = overrides.currentUser ?? currentUser

  return (
    <AppChromeContext.Provider value={contextValue}>
      <AppShell
        currentUser={shellUser}
        activeNavigationItem={
          overrides.activeNavigationItem ?? defaultChrome.activeNavigationItem
        }
        breadcrumbItems={
          overrides.breadcrumbItems ?? defaultChrome.breadcrumbItems
        }
        contentClassName={
          overrides.contentClassName ?? defaultChrome.contentClassName
        }
        totalReportsCount={navigation.totalReportsCount}
        onOpenDashboard={navigation.onOpenDashboard}
        onOpenReports={navigation.onOpenReports}
        onOpenTemplate={navigation.onOpenTemplate}
        onOpenTeam={navigation.onOpenTeam}
        onOpenProfile={navigation.onOpenProfile}
        onLogout={navigation.onLogout}
      >
        {children}
      </AppShell>
    </AppChromeContext.Provider>
  )
}
