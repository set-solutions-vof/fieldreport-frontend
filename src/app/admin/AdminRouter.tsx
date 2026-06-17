import { useCallback, useEffect, useState } from 'react'
import { AppChromeProvider } from '@/app/AppChromeProvider'
import { AccountProfilePage } from '@/features/profile/AccountProfilePage'
import { TeamPage } from '@/features/team/pages/TeamPage'
import { TemplateConfigurationPage } from '@/features/templates/pages/TemplateConfigurationPage'
import type { AdminRouterProps } from '@/typing/routes'
import { adminShellChrome } from './adminShellChrome'
import { adminTeamRoute, profileRoute, templateRoute } from '../routes'

export function AdminRouter({
  currentUser,
  onAuthenticationExpired,
  onLogout,
}: AdminRouterProps) {
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    const resolvedPath = resolveAdminPath(path)
    if (resolvedPath !== path) {
      window.history.replaceState(null, '', resolvedPath)
    }
    return resolvedPath
  })

  const navigate = useCallback((path: string): void => {
    const resolvedPath = resolveAdminPath(path)
    window.history.pushState(null, '', resolvedPath)
    setCurrentPath(resolvedPath)
  }, [])

  useEffect(() => {
    function handlePopState(): void {
      const resolvedPath = resolveAdminPath(window.location.pathname)
      if (resolvedPath !== window.location.pathname) {
        window.history.replaceState(null, '', resolvedPath)
      }
      setCurrentPath(resolvedPath)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const onOpenTemplate = useCallback((): void => {
    navigate(templateRoute)
  }, [navigate])

  const onOpenTeam = useCallback((): void => {
    navigate(adminTeamRoute)
  }, [navigate])

  const onOpenProfile = useCallback((): void => {
    navigate(profileRoute)
  }, [navigate])

  const sharedPageProps = {
    currentUser,
    onOpenTemplate,
    onOpenTeam,
    onOpenProfile,
    onAuthenticationExpired,
    onLogout,
  }

  let content

  if (currentPath === adminTeamRoute) {
    content = <TeamPage {...sharedPageProps} />
  } else if (currentPath === profileRoute) {
    content = (
      <AccountProfilePage
        {...sharedPageProps}
        onCancel={onOpenTemplate}
      />
    )
  } else {
    content = <TemplateConfigurationPage {...sharedPageProps} />
  }

  return (
    <AppChromeProvider
      key={currentPath}
      currentUser={currentUser}
      defaultChrome={adminShellChrome(currentPath)}
      navigation={{
        onOpenTemplate,
        onOpenTeam,
        onOpenProfile,
        onLogout,
      }}
    >
      {content}
    </AppChromeProvider>
  )
}

function resolveAdminPath(path: string): string {
  if (path === adminTeamRoute) {
    return adminTeamRoute
  }

  if (path === profileRoute) {
    return profileRoute
  }

  return templateRoute
}
