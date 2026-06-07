import { useCallback, useEffect, useState } from 'react'
import { TeamPage } from '@/features/team/pages/TeamPage'
import { TemplateConfigurationPage } from '@/features/templates/pages/TemplateConfigurationPage'
import type { AdminRouterProps } from '@/types/routes'
import { adminTeamRoute, templateRoute } from '../routes'

export function AdminRouter({ onAuthenticationExpired }: AdminRouterProps) {
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

  if (currentPath === adminTeamRoute) {
    return (
      <TeamPage
        onOpenTemplate={() => navigate(templateRoute)}
        onOpenTeam={() => navigate(adminTeamRoute)}
        onAuthenticationExpired={onAuthenticationExpired}
      />
    )
  }

  return (
    <TemplateConfigurationPage
      onOpenTemplate={() => navigate(templateRoute)}
      onOpenTeam={() => navigate(adminTeamRoute)}
      onAuthenticationExpired={onAuthenticationExpired}
    />
  )
}

function resolveAdminPath(path: string): string {
  if (path === adminTeamRoute) {
    return adminTeamRoute
  }

  return templateRoute
}
